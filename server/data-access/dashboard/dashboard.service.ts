import { Effect } from "effect";
import { db } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";
import type {
  Account,
  BudgetProgress,
  CategorySpending,
  DashboardData,
  IncomeBySource,
  InvestmentHolding,
  InvestmentPerformance,
  MetricValue,
  Subscription,
  Transaction,
} from "@/lib/types/dashboard";
import type { GetDashboardDataSchema } from "./dashboard.schema";

function getDateRange(
  timeframe = "month",
  from?: string,
  to?: string
): { from: Date; to: Date; previousFrom: Date; previousTo: Date } {
  const now = new Date();
  let fromDate: Date;
  let toDate: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (from && to) {
    fromDate = new Date(from);
    toDate = new Date(to);
  } else {
    switch (timeframe) {
      case "week": {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        fromDate = weekStart;
        break;
      }
      case "quarter": {
        const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
        fromDate = new Date(now.getFullYear(), quarterStartMonth, 1);
        break;
      }
      case "year": {
        fromDate = new Date(now.getFullYear(), 0, 1);
        break;
      }
      case "month":
      default: {
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      }
    }
  }

  const diff = toDate.getTime() - fromDate.getTime();
  const previousTo = new Date(fromDate.getTime() - 1);
  const previousFrom = new Date(previousTo.getTime() - diff);

  return { from: fromDate, to: toDate, previousFrom, previousTo };
}

function calculateTrend(
  current: number,
  previous: number
): "up" | "down" | "neutral" {
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "neutral";
}

function createMetricValue(current: number, previous: number): MetricValue {
  const change = current - previous;
  const changePercent =
    previous === 0 ? (current > 0 ? 100 : 0) : (change / previous) * 100;
  return {
    value: current,
    previousValue: previous,
    change,
    changePercent,
    trend: calculateTrend(current, previous),
  };
}

export class DashboardService extends Effect.Service<DashboardService>()(
  "DashboardService",
  {
    effect: Effect.gen(function* () {
      return {
        getDashboardData: ({
          timeframe = "month",
          from,
          to,
          userId,
        }: GetDashboardDataSchema & { userId: string }) =>
          Effect.gen(function* () {
            const {
              from: fromDate,
              to: toDate,
              previousFrom,
              previousTo,
            } = getDateRange(timeframe, from, to);

            const fromStr = fromDate.toISOString().split("T")[0];
            const toStr = toDate.toISOString().split("T")[0];
            const prevFromStr = previousFrom.toISOString().split("T")[0];
            const prevToStr = previousTo.toISOString().split("T")[0];

            // Fetch all data in parallel
            const [
              expenses,
              previousExpenses,
              income,
              previousIncome,
              investments,
              subscriptions,
              financialAccounts,
              liabilities,
              budgets,
              categories,
            ] = yield* Effect.all([
              execute(
                db.expense.findMany({
                  where: {
                    userId,
                    date: { gte: fromStr, lte: toStr },
                  },
                  orderBy: { date: "desc" },
                })
              ),
              execute(
                db.expense.findMany({
                  where: {
                    userId,
                    date: { gte: prevFromStr, lte: prevToStr },
                  },
                })
              ),
              execute(
                db.income.findMany({
                  where: {
                    userId,
                    date: { gte: fromStr, lte: toStr },
                  },
                  orderBy: { date: "desc" },
                })
              ),
              execute(
                db.income.findMany({
                  where: {
                    userId,
                    date: { gte: prevFromStr, lte: prevToStr },
                  },
                })
              ),
              execute(
                db.investment.findMany({
                  where: {
                    userId,
                  },
                })
              ),
              execute(
                db.subscription.findMany({
                  where: {
                    userId,
                    active: true,
                  },
                })
              ),
              execute(
                db.financialAccount.findMany({
                  where: {
                    userId,
                    isArchived: false,
                  },
                })
              ),
              execute(
                db.liability.findMany({
                  where: {
                    userId,
                  },
                })
              ),
              execute(
                db.budget.findMany({
                  where: {
                    userId,
                    period: timeframe === "month" ? "monthly" : "yearly",
                  },
                })
              ),
              execute(
                db.category.findMany({
                  where: {
                    userId,
                    type: "expense",
                    isArchived: false,
                  },
                })
              ),
            ]);

            // Calculate totals
            const totalExpenses = expenses.reduce(
              (sum, e) => sum + Number(e.price),
              0
            );
            const prevTotalExpenses = previousExpenses.reduce(
              (sum, e) => sum + Number(e.price),
              0
            );
            const totalIncome = income.reduce(
              (sum, i) => sum + Number(i.price),
              0
            );
            const prevTotalIncome = previousIncome.reduce(
              (sum, i) => sum + Number(i.price),
              0
            );

            // Calculate account balances
            const accountBalances = financialAccounts.reduce(
              (sum, acc) => sum + Number(acc.currentBalance),
              0
            );
            const prevAccountBalances = accountBalances; // Simplified

            // Calculate investment values
            const investmentValue = investments.reduce(
              (sum, inv) => sum + Number(inv.price) * Number(inv.units),
              0
            );
            const prevInvestmentValue = investmentValue; // Simplified

            // Calculate liability balances
            const liabilityBalances = liabilities.reduce(
              (sum, liab) => sum + Number(liab.balance),
              0
            );
            const prevLiabilityBalances = liabilityBalances; // Simplified

            // Net worth
            const netWorth =
              accountBalances + investmentValue - liabilityBalances;
            const prevNetWorth =
              prevAccountBalances + prevInvestmentValue - prevLiabilityBalances;

            // Cash flow
            const cashFlow = totalIncome - totalExpenses;
            const prevCashFlow = prevTotalIncome - prevTotalExpenses;

            // Savings rate
            const savingsRate =
              totalIncome > 0 ? (cashFlow / totalIncome) * 100 : 0;
            const prevSavingsRate =
              prevTotalIncome > 0 ? (prevCashFlow / prevTotalIncome) * 100 : 0;

            // Total balance (excluding credit accounts)
            const totalBalance = financialAccounts
              .filter((acc) => acc.type !== "credit")
              .reduce((sum, acc) => sum + Number(acc.currentBalance), 0);
            const prevTotalBalance = totalBalance; // Simplified

            // Spending by category
            const categorySpendingMap = new Map<string, number>();
            expenses.forEach((exp) => {
              const cat = exp.category || "Other";
              const current = categorySpendingMap.get(cat) || 0;
              categorySpendingMap.set(cat, current + Number(exp.price));
            });

            const categoryColors = [
              "#3b82f6",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
              "#ec4899",
              "#06b6d4",
              "#14b8a6",
              "#64748b",
            ];
            const spendingByCategory: CategorySpending[] = Array.from(
              categorySpendingMap.entries()
            )
              .map(([category, amount], idx) => ({
                category,
                amount,
                color: categoryColors[idx % categoryColors.length],
              }))
              .sort((a, b) => b.amount - a.amount);

            // Income by source
            const incomeSourceMap = new Map<string, number>();
            income.forEach((inc) => {
              const source = inc.category || "Other";
              const current = incomeSourceMap.get(source) || 0;
              incomeSourceMap.set(source, current + Number(inc.price));
            });

            const incomeBySource: IncomeBySource[] = Array.from(
              incomeSourceMap.entries()
            )
              .map(([source, amount]) => ({ source, amount }))
              .sort((a, b) => b.amount - a.amount);

            // Budget progress
            const budgetProgress: BudgetProgress[] = budgets.map((budget) => {
              const categoryExpenses = expenses
                .filter((exp) => exp.categoryId === budget.categoryId)
                .reduce((sum, exp) => sum + Number(exp.price), 0);
              const target = Number(budget.limit);
              const percentage =
                target > 0 ? (categoryExpenses / target) * 100 : 0;
              const category = categories.find(
                (cat) => cat.id === budget.categoryId
              );
              return {
                category: category?.name || "Unknown",
                spent: categoryExpenses,
                target,
                percentage,
              };
            });

            // Investment performance
            const investmentCostBasis = investments.reduce(
              (sum, inv) => sum + Number(inv.price) * Number(inv.units),
              0
            );
            const totalGain = investmentValue - investmentCostBasis;
            const gainPercent =
              investmentCostBasis > 0
                ? (totalGain / investmentCostBasis) * 100
                : 0;

            const holdings: InvestmentHolding[] = investments.map((inv) => {
              const value = Number(inv.price) * Number(inv.units);
              const costBasis = value; // Simplified
              const gain = value - costBasis;
              const gainPercent = costBasis > 0 ? (gain / costBasis) * 100 : 0;
              return {
                name: inv.name,
                value,
                gain,
                gainPercent,
              };
            });

            const investmentPerformance: InvestmentPerformance = {
              totalValue: investmentValue,
              totalCostBasis: investmentCostBasis,
              totalGain,
              gainPercent,
              monthlyChange: 0, // Simplified
              monthlyChangePercent: 0, // Simplified
              holdings,
            };

            // Upcoming subscriptions (next 30 days)
            const today = new Date();
            const nextMonth = new Date(today);
            nextMonth.setDate(today.getDate() + 30);

            const upcomingSubscriptions: Subscription[] = subscriptions
              .filter((sub) => {
                const nextDate = new Date(sub.date);
                return nextDate >= today && nextDate <= nextMonth;
              })
              .slice(0, 5)
              .map((sub) => ({
                id: sub.id,
                name: sub.name,
                amount: Number(sub.price),
                nextPaymentDate: sub.date,
                frequency: sub.paid as "monthly" | "yearly" | "weekly",
                accountId: sub.accountId || "",
              }));

            // Recent transactions (last 5)
            const recentTransactions: Transaction[] = [
              ...expenses.slice(0, 5).map((exp) => ({
                id: exp.id,
                type: "expense" as const,
                amount: Number(exp.price),
                category: exp.category,
                description: exp.name,
                date: exp.date,
                accountId: exp.accountId || "",
                tags: [],
              })),
              ...income.slice(0, 5).map((inc) => ({
                id: inc.id,
                type: "income" as const,
                amount: Number(inc.price),
                category: inc.category,
                description: inc.name,
                date: inc.date,
                accountId: inc.accountId || "",
                tags: [],
              })),
            ]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .slice(0, 5);

            // Accounts
            const accounts: Account[] = financialAccounts.map((acc) => ({
              id: acc.id,
              name: acc.name,
              type: acc.type as Account["type"],
              balance: Number(acc.currentBalance),
              currency: acc.currency,
            }));

            const dashboardData: DashboardData = {
              metrics: {
                netWorth: createMetricValue(netWorth, prevNetWorth),
                monthlyCashFlow: createMetricValue(cashFlow, prevCashFlow),
                totalBalance: createMetricValue(totalBalance, prevTotalBalance),
                savingsRate: createMetricValue(savingsRate, prevSavingsRate),
                monthlySpending: createMetricValue(
                  totalExpenses,
                  prevTotalExpenses
                ),
                monthlyIncome: createMetricValue(totalIncome, prevTotalIncome),
              },
              cashFlowData: [],
              netWorthData: [],
              spendingByCategory,
              incomeBySource,
              budgetProgress,
              investmentPerformance,
              upcomingSubscriptions,
              recentTransactions,
              insights: [], // Will be populated by insights service
              accounts,
            };

            return dashboardData;
          }),
      };
    }),
  }
) {}
