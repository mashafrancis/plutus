import { Effect } from "effect";
import { db } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";
import type {
  ChartData,
  FilterOptions,
  Investment,
  SummaryMetrics,
  TransactionRecord,
} from "@/lib/types/investments";
import type {
  AddPriceHistorySchema,
  CreateInvestmentSchema,
  DeleteInvestmentSchema,
  GetInvestmentsSchema,
  GetInvestmentsWithFiltersSchema,
  GetTransactionHistorySchema,
  RecordTransactionSchema,
  UpdateInvestmentSchema,
  UpdateValueSchema,
} from "@/server/data-access/investments/investments.schema";

export class InvestmentsService extends Effect.Service<InvestmentsService>()(
  "InvestmentsService",
  {
    effect: Effect.gen(function* () {
      return {
        createInvestment: ({
          name,
          ticker,
          notes,
          assetType,
          shares,
          costBasis,
          currentValue,
          sector,
          category,
          categoryId,
          accountId,
          date,
          note,
          userId,
        }: CreateInvestmentSchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.investment.create({
                data: {
                  notes,
                  name,
                  ticker,
                  assetType: assetType || "stocks",
                  shares,
                  costBasis,
                  currentValue,
                  sector,
                  category,
                  categoryId,
                  accountId,
                  date,
                  note,
                  userId,
                },
              })
            );
          }),
        getInvestments: ({
          categories,
          to,
          from,
          userId,
        }: GetInvestmentsSchema & { userId: string }) =>
          Effect.gen(function* () {
            const OR = categories
              ? {
                  OR: categories.split(",").map((category: string) => ({
                    category: { contains: category },
                  })),
                }
              : undefined;

            const where: Record<string, unknown> = {
              userId,
              ...(categories && OR),
            };

            if (to && from) {
              where.date = { lte: to, gte: from };
            }

            return yield* execute(
              db.investment.findMany({
                where,
                orderBy: { updatedAt: "desc" },
                select: {
                  notes: true,
                  name: true,
                  ticker: true,
                  assetType: true,
                  shares: true,
                  costBasis: true,
                  currentValue: true,
                  sector: true,
                  category: true,
                  categoryId: true,
                  accountId: true,
                  date: true,
                  note: true,
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                },
              })
            );
          }),
        updateInvestment: ({
          id,
          name,
          ticker,
          notes,
          assetType,
          shares,
          costBasis,
          currentValue,
          sector,
          category,
          categoryId,
          accountId,
          date,
          note,
        }: UpdateInvestmentSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.investment.update({
                data: {
                  notes,
                  name,
                  ticker,
                  assetType,
                  shares,
                  costBasis,
                  currentValue,
                  sector,
                  category,
                  categoryId,
                  accountId,
                  date,
                  note,
                },
                where: { id },
              })
            );
          }),
        deleteInvestment: ({ id }: DeleteInvestmentSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.investment.delete({
                where: { id },
              })
            );
          }),
        getInvestmentsWithFilters: ({
          assetType,
          account,
          gainLossStatus,
          search,
          userId,
        }: GetInvestmentsWithFiltersSchema & { userId: string }) =>
          Effect.gen(function* () {
            const where: Record<string, unknown> = {
              userId,
            };

            if (assetType) {
              where.assetType = assetType;
            }

            if (account) {
              where.accountId = account;
            }

            if (search) {
              where.OR = [
                { name: { contains: search } },
                { ticker: { contains: search } },
                { notes: { contains: search } },
              ];
            }

            const investments = yield* execute(
              db.investment.findMany({
                where,
                orderBy: { updatedAt: "desc" },
                include: {
                  transactions: {
                    orderBy: { date: "desc" },
                  },
                  priceHistory: {
                    orderBy: { date: "desc" },
                    take: 1,
                  },
                },
              })
            );

            // Calculate total portfolio value for allocation percentage
            const totalPortfolioValue = investments.reduce(
              (sum, inv) => sum + Number(inv.currentValue),
              0
            );

            // Get yesterday's price history for today's change calculation
            const today = new Date().toISOString().split("T")[0];
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0];

            const yesterdayPrices = yield* execute(
              db.investmentPriceHistory.findMany({
                where: {
                  investmentId: { in: investments.map((inv) => inv.id) },
                  date: yesterday,
                },
              })
            );

            const priceMap = new Map(
              yesterdayPrices.map((p) => [p.investmentId, Number(p.value)])
            );

            // Transform to Investment format with calculated fields
            const transformedInvestments: Investment[] = investments.map(
              (inv) => {
                const costBasisNum = Number(inv.costBasis);
                const currentValueNum = Number(inv.currentValue);
                const gainLossDollar = currentValueNum - costBasisNum;
                const gainLossPercent =
                  costBasisNum > 0 ? (gainLossDollar / costBasisNum) * 100 : 0;
                const allocationPercent =
                  totalPortfolioValue > 0
                    ? (currentValueNum / totalPortfolioValue) * 100
                    : 0;

                const yesterdayValue = priceMap.get(inv.id) || currentValueNum;
                const todayChangeDollar = currentValueNum - yesterdayValue;
                const todayChangePercent =
                  yesterdayValue > 0
                    ? (todayChangeDollar / yesterdayValue) * 100
                    : 0;

                // Filter by gain/loss status if specified
                if (gainLossStatus === "winners" && gainLossDollar <= 0) {
                  return null;
                }
                if (gainLossStatus === "losers" && gainLossDollar >= 0) {
                  return null;
                }

                return {
                  id: inv.id,
                  name: inv.name,
                  ticker: inv.ticker || "",
                  assetType: inv.assetType as Investment["assetType"],
                  shares: Number(inv.shares),
                  costBasis: costBasisNum,
                  currentValue: currentValueNum,
                  gainLossDollar,
                  gainLossPercent,
                  todayChangeDollar,
                  todayChangePercent,
                  allocationPercent,
                  accountId: inv.accountId || "",
                  sector: inv.sector || "",
                  transactionHistory: inv.transactions.map((txn) => ({
                    id: txn.id,
                    date: txn.date,
                    type: txn.type as "buy" | "sell",
                    shares: Number(txn.shares),
                    price: Number(txn.price),
                    total: Number(txn.total),
                  })),
                  note: inv.note,
                };
              }
            );

            return transformedInvestments.filter(
              (inv): inv is Investment => inv !== null
            );
          }),
        getSummaryMetrics: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const investments = yield* execute(
              db.investment.findMany({
                where: { userId },
                include: {
                  priceHistory: {
                    orderBy: { date: "desc" },
                    take: 2,
                  },
                },
              })
            );

            if (investments.length === 0) {
              return {
                totalPortfolioValue: {
                  value: 0,
                  previousValue: 0,
                  change: 0,
                  changePercent: 0,
                },
                totalInvested: {
                  value: 0,
                  previousValue: 0,
                  change: 0,
                  changePercent: 0,
                },
                totalGainLoss: {
                  dollar: 0,
                  percent: 0,
                  trend: "neutral" as const,
                },
                todayChange: {
                  dollar: 0,
                  percent: 0,
                  trend: "neutral" as const,
                },
                assetAllocation: {
                  stocks: 0,
                  etfs: 0,
                  crypto: 0,
                  retirement: 0,
                  bonds: 0,
                  savings: 0,
                  realEstate: 0,
                },
                topPerformer: {
                  name: "",
                  ticker: "",
                  gainLossPercent: 0,
                  gainLossDollar: 0,
                },
                worstPerformer: {
                  name: "",
                  ticker: "",
                  gainLossPercent: 0,
                  gainLossDollar: 0,
                },
              } satisfies SummaryMetrics;
            }

            const totalPortfolioValue = investments.reduce(
              (sum, inv) => sum + Number(inv.currentValue),
              0
            );
            const totalInvested = investments.reduce(
              (sum, inv) => sum + Number(inv.costBasis),
              0
            );
            const totalGainLossDollar = totalPortfolioValue - totalInvested;
            const totalGainLossPercent =
              totalInvested > 0
                ? (totalGainLossDollar / totalInvested) * 100
                : 0;

            // Calculate today's change from price history
            const today = new Date().toISOString().split("T")[0];
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0];

            const [todayPrices, yesterdayPrices] = yield* Effect.all([
              execute(
                db.investmentPriceHistory.findMany({
                  where: {
                    investmentId: { in: investments.map((inv) => inv.id) },
                    date: today,
                  },
                })
              ),
              execute(
                db.investmentPriceHistory.findMany({
                  where: {
                    investmentId: { in: investments.map((inv) => inv.id) },
                    date: yesterday,
                  },
                })
              ),
            ]);

            const todayTotal =
              todayPrices.length > 0
                ? todayPrices.reduce((sum, p) => sum + Number(p.value), 0)
                : totalPortfolioValue;
            const yesterdayTotal =
              yesterdayPrices.length > 0
                ? yesterdayPrices.reduce((sum, p) => sum + Number(p.value), 0)
                : totalPortfolioValue;

            const todayChangeDollar = todayTotal - yesterdayTotal;
            const todayChangePercent =
              yesterdayTotal > 0
                ? (todayChangeDollar / yesterdayTotal) * 100
                : 0;

            // Calculate asset allocation
            const allocationMap = new Map<string, number>();
            investments.forEach((inv) => {
              const current = allocationMap.get(inv.assetType) || 0;
              allocationMap.set(
                inv.assetType,
                current + Number(inv.currentValue)
              );
            });

            const assetAllocation = {
              stocks: 0,
              etfs: 0,
              crypto: 0,
              retirement: 0,
              bonds: 0,
              savings: 0,
              realEstate: 0,
            };

            allocationMap.forEach((value, type) => {
              const percentage =
                totalPortfolioValue > 0
                  ? (value / totalPortfolioValue) * 100
                  : 0;
              if (type === "stocks") assetAllocation.stocks = percentage;
              else if (type === "etfs") assetAllocation.etfs = percentage;
              else if (type === "crypto") assetAllocation.crypto = percentage;
              else if (type === "retirement")
                assetAllocation.retirement = percentage;
              else if (type === "bonds") assetAllocation.bonds = percentage;
              else if (type === "savings") assetAllocation.savings = percentage;
              else if (type === "real-estate")
                assetAllocation.realEstate = percentage;
            });

            // Find top and worst performers
            const performers = investments.map((inv) => {
              const costBasisNum = Number(inv.costBasis);
              const currentValueNum = Number(inv.currentValue);
              const gainLossDollar = currentValueNum - costBasisNum;
              const gainLossPercent =
                costBasisNum > 0 ? (gainLossDollar / costBasisNum) * 100 : 0;
              return {
                name: inv.name,
                ticker: inv.ticker || "",
                gainLossDollar,
                gainLossPercent,
              };
            });

            performers.sort((a, b) => b.gainLossPercent - a.gainLossPercent);
            const topPerformer = performers[0] || {
              name: "",
              ticker: "",
              gainLossDollar: 0,
              gainLossPercent: 0,
            };
            const worstPerformer =
              performers[performers.length - 1] || topPerformer;

            // Previous values (simplified - using same values for now)
            const previousPortfolioValue = totalPortfolioValue * 0.98;
            const previousInvested = totalInvested;

            return {
              totalPortfolioValue: {
                value: totalPortfolioValue,
                previousValue: previousPortfolioValue,
                change: totalPortfolioValue - previousPortfolioValue,
                changePercent:
                  previousPortfolioValue > 0
                    ? ((totalPortfolioValue - previousPortfolioValue) /
                        previousPortfolioValue) *
                      100
                    : 0,
              },
              totalInvested: {
                value: totalInvested,
                previousValue: previousInvested,
                change: 0,
                changePercent: 0,
              },
              totalGainLoss: {
                dollar: totalGainLossDollar,
                percent: totalGainLossPercent,
                trend:
                  totalGainLossDollar > 0
                    ? "up"
                    : totalGainLossDollar < 0
                      ? "down"
                      : "neutral",
              },
              todayChange: {
                dollar: todayChangeDollar,
                percent: todayChangePercent,
                trend:
                  todayChangeDollar > 0
                    ? "up"
                    : todayChangeDollar < 0
                      ? "down"
                      : "neutral",
              },
              assetAllocation,
              topPerformer: {
                name: topPerformer.name,
                ticker: topPerformer.ticker,
                gainLossPercent: topPerformer.gainLossPercent,
                gainLossDollar: topPerformer.gainLossDollar,
              },
              worstPerformer: {
                name: worstPerformer.name,
                ticker: worstPerformer.ticker,
                gainLossPercent: worstPerformer.gainLossPercent,
                gainLossDollar: worstPerformer.gainLossDollar,
              },
            } satisfies SummaryMetrics;
          }),
        getFilterOptions: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const [investments, accounts] = yield* Effect.all([
              execute(
                db.investment.findMany({
                  where: { userId },
                  select: {
                    assetType: true,
                    accountId: true,
                  },
                })
              ),
              execute(
                db.financialAccount.findMany({
                  where: {
                    userId,
                    isArchived: false,
                  },
                  select: {
                    id: true,
                    name: true,
                    type: true,
                  },
                })
              ),
            ]);

            const assetTypes = Array.from(
              new Set(investments.map((inv) => inv.assetType))
            ).sort() as Investment["assetType"][];

            const filterOptions: FilterOptions = {
              assetTypes,
              accounts: accounts.map((acc) => ({
                id: acc.id,
                name: acc.name,
                type: acc.type as FilterOptions["accounts"][number]["type"],
              })),
              gainLossStatuses: ["all", "winners", "losers"],
            };

            return filterOptions;
          }),
        getChartData: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const investments = yield* execute(
              db.investment.findMany({
                where: { userId },
                include: {
                  priceHistory: {
                    orderBy: { date: "asc" },
                  },
                },
              })
            );

            const totalPortfolioValue = investments.reduce(
              (sum, inv) => sum + Number(inv.currentValue),
              0
            );

            // Allocation chart data
            const allocationMap = new Map<string, number>();
            investments.forEach((inv) => {
              const current = allocationMap.get(inv.assetType) || 0;
              allocationMap.set(
                inv.assetType,
                current + Number(inv.currentValue)
              );
            });

            const allocation = Array.from(allocationMap.entries()).map(
              ([type, value]) => ({
                type,
                value,
                percentage:
                  totalPortfolioValue > 0
                    ? (value / totalPortfolioValue) * 100
                    : 0,
              })
            );

            // Performance over time - aggregate daily portfolio values
            const performanceMap = new Map<string, number>();
            investments.forEach((inv) => {
              inv.priceHistory.forEach((ph) => {
                const current = performanceMap.get(ph.date) || 0;
                performanceMap.set(ph.date, current + Number(ph.value));
              });
            });

            const performanceOverTime = Array.from(performanceMap.entries())
              .map(([date, value]) => ({ date, value }))
              .sort((a, b) => a.date.localeCompare(b.date));

            // Gain/Loss by investment
            const gainLossByInvestment = investments.map((inv) => {
              const costBasisNum = Number(inv.costBasis);
              const currentValueNum = Number(inv.currentValue);
              const gainLossDollar = currentValueNum - costBasisNum;
              const gainLossPercent =
                costBasisNum > 0 ? (gainLossDollar / costBasisNum) * 100 : 0;
              return {
                name: inv.name,
                ticker: inv.ticker || "",
                gainLossDollar,
                gainLossPercent,
              };
            });

            // Sector breakdown
            const sectorMap = new Map<string, number>();
            investments.forEach((inv) => {
              if (inv.sector) {
                const current = sectorMap.get(inv.sector) || 0;
                sectorMap.set(inv.sector, current + Number(inv.currentValue));
              }
            });

            const sectorBreakdown = Array.from(sectorMap.entries()).map(
              ([sector, value]) => ({
                sector,
                value,
                percentage:
                  totalPortfolioValue > 0
                    ? (value / totalPortfolioValue) * 100
                    : 0,
              })
            );

            return {
              allocation,
              performanceOverTime,
              gainLossByInvestment,
              sectorBreakdown,
            } satisfies ChartData;
          }),
        recordTransaction: ({
          investmentId,
          type,
          shares,
          price,
          total,
          date,
        }: RecordTransactionSchema) =>
          Effect.gen(function* () {
            const transaction = yield* execute(
              db.investmentTransaction.create({
                data: {
                  investmentId,
                  type,
                  shares,
                  price,
                  total,
                  date,
                },
              })
            );

            // Update investment cost basis and shares based on transaction
            const investment = yield* execute(
              db.investment.findUnique({
                where: { id: investmentId },
              })
            );

            if (investment) {
              const currentShares = Number(investment.shares);
              const currentCostBasis = Number(investment.costBasis);
              const txnShares = Number(shares);
              const txnTotal = Number(total);

              let newShares = currentShares;
              let newCostBasis = currentCostBasis;

              if (type === "buy") {
                newShares = currentShares + txnShares;
                newCostBasis = currentCostBasis + txnTotal;
              } else if (type === "sell") {
                newShares = Math.max(0, currentShares - txnShares);
                // For sells, reduce cost basis proportionally
                const costPerShare =
                  currentShares > 0 ? currentCostBasis / currentShares : 0;
                newCostBasis = Math.max(
                  0,
                  currentCostBasis - costPerShare * txnShares
                );
              }

              yield* execute(
                db.investment.update({
                  where: { id: investmentId },
                  data: {
                    shares: newShares.toString(),
                    costBasis: newCostBasis.toString(),
                  },
                })
              );
            }

            return transaction;
          }),
        updateValue: ({ investmentId, currentValue }: UpdateValueSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.investment.update({
                where: { id: investmentId },
                data: { currentValue },
              })
            );
          }),
        getTransactionHistory: ({
          investmentId,
        }: GetTransactionHistorySchema) =>
          Effect.gen(function* () {
            const transactions = yield* execute(
              db.investmentTransaction.findMany({
                where: { investmentId },
                orderBy: { date: "desc" },
              })
            );

            return transactions.map((txn) => ({
              id: txn.id,
              date: txn.date,
              type: txn.type as "buy" | "sell",
              shares: Number(txn.shares),
              price: Number(txn.price),
              total: Number(txn.total),
            })) satisfies TransactionRecord[];
          }),
        addPriceHistory: ({
          investmentId,
          date,
          value,
        }: AddPriceHistorySchema) =>
          Effect.gen(function* () {
            // Check if price history exists for this date
            const existing = yield* execute(
              db.investmentPriceHistory.findFirst({
                where: {
                  investmentId,
                  date,
                },
              })
            );

            if (existing) {
              // Update existing
              return yield* execute(
                db.investmentPriceHistory.update({
                  where: { id: existing.id },
                  data: { value },
                })
              );
            }
            // Create new
            return yield* execute(
              db.investmentPriceHistory.create({
                data: {
                  investmentId,
                  date,
                  value,
                },
              })
            );
          }),
        getLatestPriceHistory: ({ investmentId }: { investmentId: string }) =>
          Effect.gen(function* () {
            const latest = yield* execute(
              db.investmentPriceHistory.findFirst({
                where: { investmentId },
                orderBy: { date: "desc" },
              })
            );

            return latest
              ? {
                  date: latest.date,
                  value: Number(latest.value),
                }
              : null;
          }),
      };
    }),
  }
) {}
