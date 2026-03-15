import { v } from "convex/values";
import { Effect } from "effect";
import type { Doc, Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { convertCurrency } from "./lib/currency";
import { daysAgo, endOfDay, startOfDay } from "./lib/dates";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { UnknownError } from "./schemas/errors";

export interface CategorySpending {
  categoryId: Id<"categories">;
  name: string;
  icon: string;
  color: string;
  amount: number;
  percentage: number;
}

export interface DashboardSummary {
  totalBalance: number;
  balanceByCurrency: Record<string, number>;
  totalIncome: number;
  totalExpenses: number;
  netChange: number;
  spendingByCategory: CategorySpending[];
  recentTransactions: Doc<"transactions">[];
  accountBalances: Array<{
    id: Id<"accounts">;
    name: string;
    balance: number;
    currency: string;
    type: string;
  }>;
  upcomingSubscriptions: Doc<"subscriptions">[];
}

export const getSummary = query({
  args: {
    days: v.optional(v.number()),
    baseCurrency: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<DashboardSummary> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);
        const days = args.days ?? 30;
        const baseCurrency = args.baseCurrency ?? "USD";

        const dateRange = {
          start: startOfDay(daysAgo(days - 1)),
          end: endOfDay(Date.now()),
        };

        // Fetch data in parallel
        const [accounts, transactions, categories, subscriptions] =
          yield* Effect.all([
            Effect.tryPromise({
              try: () =>
                ctx.db
                  .query("accounts")
                  .withIndex("by_userId_archived", (q) =>
                    q.eq("userId", user.subject).eq("isArchived", false)
                  )
                  .collect(),
              catch: (error) => new UnknownError({ error }),
            }),
            Effect.tryPromise({
              try: () =>
                ctx.db
                  .query("transactions")
                  .withIndex("by_userId_date", (q) =>
                    q
                      .eq("userId", user.subject)
                      .gte("date", dateRange.start)
                      .lte("date", dateRange.end)
                  )
                  .collect(),
              catch: (error) => new UnknownError({ error }),
            }),
            Effect.tryPromise({
              try: () =>
                ctx.db
                  .query("categories")
                  .withIndex("by_userId", (q) => q.eq("userId", user.subject))
                  .collect(),
              catch: (error) => new UnknownError({ error }),
            }),
            Effect.tryPromise({
              try: () =>
                ctx.db
                  .query("subscriptions")
                  .withIndex("by_userId_status", (q) =>
                    q.eq("userId", user.subject).eq("status", "active")
                  )
                  .collect(),
              catch: (error) => new UnknownError({ error }),
            }),
          ]);

        // Calculate total balance with currency conversion
        let totalBalance = 0;
        const balanceByCurrency: Record<string, number> = {};

        for (const account of accounts) {
          balanceByCurrency[account.currency] =
            (balanceByCurrency[account.currency] || 0) + account.balance;

          const converted = yield* convertCurrency(
            ctx,
            account.balance,
            account.currency,
            baseCurrency
          );
          totalBalance += converted;
        }

        // Calculate income/expenses
        let totalIncome = 0;
        let totalExpenses = 0;
        const categorySpending: Record<string, number> = {};

        for (const tx of transactions) {
          const converted = yield* convertCurrency(
            ctx,
            tx.convertedAmount,
            tx.currency,
            baseCurrency
          );

          if (tx.type === "income") {
            totalIncome += converted;
          } else if (tx.type === "expense") {
            totalExpenses += converted;
            const catId = tx.categoryId.toString();
            categorySpending[catId] =
              (categorySpending[catId] || 0) + converted;
          }
        }

        // Build spending by category
        const categoryMap = new Map(
          categories.map((c) => [c._id.toString(), c])
        );
        const spendingByCategory: CategorySpending[] = Object.entries(
          categorySpending
        )
          .map(([catId, amount]) => {
            const cat = categoryMap.get(catId);
            return {
              categoryId: catId as Id<"categories">,
              name: cat?.name ?? "Unknown",
              icon: cat?.icon ?? "❓",
              color: cat?.color ?? "#888888",
              amount,
              percentage:
                totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
            };
          })
          .sort((a, b) => b.amount - a.amount);

        // Get recent transactions
        const recentTransactions = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("transactions")
              .withIndex("by_userId_date", (q) => q.eq("userId", user.subject))
              .order("desc")
              .take(10),
          catch: (error) => new UnknownError({ error }),
        });

        // Get upcoming subscriptions (next 7 days)
        const sevenDaysFromNow = Date.now() + 7 * 24 * 60 * 60 * 1000;
        const upcomingSubscriptions = subscriptions
          .filter((s) => s.nextRenewalDate <= sevenDaysFromNow)
          .sort((a, b) => a.nextRenewalDate - b.nextRenewalDate);

        // Account balances for display
        const accountBalances = accounts.map((a) => ({
          id: a._id,
          name: a.name,
          balance: a.balance,
          currency: a.currency,
          type: a.type,
        }));

        return {
          totalBalance,
          balanceByCurrency,
          totalIncome,
          totalExpenses,
          netChange: totalIncome - totalExpenses,
          spendingByCategory,
          recentTransactions,
          accountBalances,
          upcomingSubscriptions,
        };
      })
    ),
});

export const getSpendingTrend = query({
  args: {
    days: v.optional(v.number()),
    baseCurrency: v.optional(v.string()),
  },
  handler: (
    ctx,
    args
  ): Promise<Array<{ date: string; income: number; expenses: number }>> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);
        const days = args.days ?? 30;
        const baseCurrency = args.baseCurrency ?? "USD";

        const dateRange = {
          start: startOfDay(daysAgo(days - 1)),
          end: endOfDay(Date.now()),
        };

        const transactions = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("transactions")
              .withIndex("by_userId_date", (q) =>
                q
                  .eq("userId", user.subject)
                  .gte("date", dateRange.start)
                  .lte("date", dateRange.end)
              )
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        // Group by date
        const dailyData: Record<string, { income: number; expenses: number }> =
          {};

        for (const tx of transactions) {
          const isoStr = new Date(tx.date).toISOString();
          const dateStr = isoStr.substring(0, isoStr.indexOf("T"));
          const entry = dailyData[dateStr] ?? { income: 0, expenses: 0 };
          dailyData[dateStr] = entry;

          const converted = yield* convertCurrency(
            ctx,
            tx.convertedAmount,
            tx.currency,
            baseCurrency
          );

          if (tx.type === "income") {
            entry.income += converted;
          } else if (tx.type === "expense") {
            entry.expenses += converted;
          }
        }

        // Fill in missing dates
        const result: Array<{
          date: string;
          income: number;
          expenses: number;
        }> = [];
        const current = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);

        while (current <= endDate) {
          const isoStr = current.toISOString();
          const dateStr = isoStr.substring(0, isoStr.indexOf("T"));
          result.push({
            date: dateStr,
            income: dailyData[dateStr]?.income ?? 0,
            expenses: dailyData[dateStr]?.expenses ?? 0,
          });
          current.setDate(current.getDate() + 1);
        }

        return result;
      })
    ),
});
