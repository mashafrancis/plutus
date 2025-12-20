import { format } from "date-fns";
import { Effect } from "effect";
import { dateFormat } from "@/constants/date";
import { calculateRenewalDate } from "@/lib/date";
import { db } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";
import type {
  CreateSubscriptionSchema,
  DeleteSubscriptionSchema,
  GetSubscriptionsSchema,
  UpdateSubscriptionSchema,
} from "@/server/data-access/subscriptions/subscriptions.schema";

export class SubscriptionsService extends Effect.Service<SubscriptionsService>()(
  "SubscriptionsService",
  {
    effect: Effect.gen(function* () {
      return {
        createSubscription: ({
          name,
          notes,
          price,
          billingCycle,
          category,
          status,
          url,
          startDate,
          nextPaymentDate,
          accountId,
          notify,
          userId,
        }: CreateSubscriptionSchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.create({
                data: {
                  notes,
                  name,
                  price,
                  billingCycle,
                  category,
                  status: status || "active",
                  url,
                  startDate,
                  nextPaymentDate,
                  accountId,
                  notify,
                  userId,
                },
              })
            );
          }),
        getSubscriptions: ({
          to,
          from,
          userId,
        }: GetSubscriptionsSchema & { userId: string }) =>
          Effect.gen(function* () {
            const data = yield* execute(
              db.subscription.findMany({
                where: { userId },
                orderBy: { startDate: "desc" },
                include: {
                  payments: {
                    orderBy: { date: "desc" },
                  },
                },
              })
            );

            return data.map((sub) => {
              // Calculate next payment date if not set
              const nextPayment = sub.nextPaymentDate
                ? new Date(sub.nextPaymentDate)
                : calculateRenewalDate(sub.startDate, sub.billingCycle);

              // Calculate total spent from payments
              const totalSpent = sub.payments.reduce(
                (sum, p) => sum + Number(p.amount),
                0
              );

              return {
                id: sub.id,
                name: sub.name,
                category: sub.category,
                amount: Number(sub.price),
                billingCycle: sub.billingCycle as
                  | "monthly"
                  | "yearly"
                  | "weekly",
                nextPaymentDate: format(nextPayment, dateFormat),
                status: sub.status as "active" | "paused" | "cancelled",
                paymentMethodId: sub.accountId || "",
                startDate: sub.startDate,
                totalSpent,
                paymentHistory: sub.payments.map((p) => ({
                  id: p.id,
                  date: p.date,
                  amount: Number(p.amount),
                  status: p.status as "paid" | "pending" | "failed",
                })),
              };
            });
          }),
        updateSubscription: ({
          id,
          name,
          notes,
          price,
          billingCycle,
          category,
          status,
          url,
          startDate,
          nextPaymentDate,
          accountId,
        }: UpdateSubscriptionSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.update({
                data: {
                  notes,
                  name,
                  price,
                  billingCycle,
                  category,
                  status,
                  url,
                  startDate,
                  nextPaymentDate,
                  accountId,
                },
                where: { id },
              })
            );
          }),
        deleteSubscription: ({ id }: DeleteSubscriptionSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.delete({
                where: { id },
              })
            );
          }),
        getSubscriptionsWithFilters: ({
          category,
          status,
          billingCycle,
          amountRange,
          search,
          sortBy = "nextPaymentDate",
          sortDirection = "asc",
          userId,
        }: GetSubscriptionsWithFiltersSchema & { userId: string }) =>
          Effect.gen(function* () {
            const where: Record<string, unknown> = {
              userId,
            };

            if (category) {
              where.category = category;
            }

            if (status) {
              where.status = status;
            }

            if (billingCycle) {
              where.billingCycle = billingCycle;
            }

            // Amount range filter
            if (
              amountRange?.min !== undefined ||
              amountRange?.max !== undefined
            ) {
              const priceFilter: Record<string, unknown> = {};
              if (amountRange.min !== undefined) {
                priceFilter.gte = amountRange.min.toString();
              }
              if (amountRange.max !== undefined) {
                priceFilter.lte = amountRange.max.toString();
              }
              where.price = priceFilter;
            }

            // Search filter (name or notes)
            if (search) {
              where.OR = [
                { name: { contains: search } },
                { notes: { contains: search } },
              ];
            }

            // Sort
            const orderBy: Record<string, string> = {};
            if (sortBy === "name") {
              orderBy.name = sortDirection;
            } else if (sortBy === "amount") {
              orderBy.price = sortDirection;
            } else if (sortBy === "nextPaymentDate") {
              orderBy.nextPaymentDate = sortDirection;
            } else if (sortBy === "startDate") {
              orderBy.startDate = sortDirection;
            } else {
              orderBy.updatedAt = sortDirection;
            }

            const subscriptions = yield* execute(
              db.subscription.findMany({
                where,
                orderBy,
                include: {
                  payments: {
                    orderBy: { date: "desc" },
                  },
                },
              })
            );

            // Transform to Subscription format
            return subscriptions.map((sub) => {
              const nextPayment = sub.nextPaymentDate
                ? new Date(sub.nextPaymentDate)
                : calculateRenewalDate(sub.startDate, sub.billingCycle);

              const totalSpent = sub.payments.reduce(
                (sum, p) => sum + Number(p.amount),
                0
              );

              return {
                id: sub.id,
                name: sub.name,
                category: sub.category,
                amount: Number(sub.price),
                billingCycle: sub.billingCycle as
                  | "monthly"
                  | "yearly"
                  | "weekly",
                nextPaymentDate: format(nextPayment, dateFormat),
                status: sub.status as "active" | "paused" | "cancelled",
                paymentMethodId: sub.accountId || "",
                startDate: sub.startDate,
                totalSpent,
                paymentHistory: sub.payments.map((p) => ({
                  id: p.id,
                  date: p.date,
                  amount: Number(p.amount),
                  status: p.status as "paid" | "pending" | "failed",
                })),
              };
            });
          }),
        getSummaryMetrics: ({
          userId,
          dateRange,
        }: {
          userId: string;
          dateRange?: { from: string; to: string };
        }) =>
          Effect.gen(function* () {
            const now = new Date();
            const currentMonthStart = new Date(
              now.getFullYear(),
              now.getMonth(),
              1
            );
            const lastMonthStart = new Date(
              now.getFullYear(),
              now.getMonth() - 1,
              1
            );
            const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

            const fromStr =
              dateRange?.from || currentMonthStart.toISOString().split("T")[0];
            const toStr = dateRange?.to || now.toISOString().split("T")[0];
            const prevFromStr = lastMonthStart.toISOString().split("T")[0];
            const prevToStr = lastMonthEnd.toISOString().split("T")[0];

            const [currentSubs, previousSubs] = yield* Effect.all([
              execute(
                db.subscription.findMany({
                  where: {
                    userId,
                    status: { in: ["active", "paused"] },
                  },
                })
              ),
              execute(
                db.subscription.findMany({
                  where: {
                    userId,
                    status: { in: ["active", "paused"] },
                  },
                })
              ),
            ]);

            // Calculate monthly cost (only active subscriptions)
            const activeSubs = currentSubs.filter((s) => s.status === "active");
            const monthlyCost = activeSubs.reduce((sum, sub) => {
              const amount = Number(sub.price);
              if (sub.billingCycle === "monthly") {
                return sum + amount;
              }
              if (sub.billingCycle === "yearly") {
                return sum + amount / 12;
              }
              if (sub.billingCycle === "weekly") {
                return sum + amount * 4.33; // Approximate weeks per month
              }
              return sum;
            }, 0);

            const yearlyCost = monthlyCost * 12;

            // Calculate previous month costs (simplified - using same data for now)
            const prevMonthlyCost = monthlyCost * 0.95; // Placeholder
            const prevYearlyCost = yearlyCost * 0.95;

            // Active count
            const activeCount = activeSubs.length;
            const prevActiveCount = Math.max(0, activeCount - 1); // Placeholder

            // Upcoming renewals (within 7 days)
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);

            const upcomingThisWeek = activeSubs.filter((sub) => {
              const nextPayment = sub.nextPaymentDate
                ? new Date(sub.nextPaymentDate)
                : calculateRenewalDate(sub.startDate, sub.billingCycle);
              return nextPayment >= today && nextPayment <= nextWeek;
            });

            const upcomingThisMonth = activeSubs.filter((sub) => {
              const nextPayment = sub.nextPaymentDate
                ? new Date(sub.nextPaymentDate)
                : calculateRenewalDate(sub.startDate, sub.billingCycle);
              const monthEnd = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0
              );
              return nextPayment >= today && nextPayment <= monthEnd;
            });

            const upcomingTotalAmount = upcomingThisWeek.reduce(
              (sum, sub) => sum + Number(sub.price),
              0
            );

            // Top category
            const categoryTotals = new Map<string, number>();
            activeSubs.forEach((sub) => {
              const amount = Number(sub.price);
              const monthlyAmount =
                sub.billingCycle === "monthly"
                  ? amount
                  : sub.billingCycle === "yearly"
                    ? amount / 12
                    : amount * 4.33;
              const current = categoryTotals.get(sub.category) || 0;
              categoryTotals.set(sub.category, current + monthlyAmount);
            });

            let topCategory: TopCategory = {
              category: "None",
              amount: 0,
              percentage: 0,
            };
            if (categoryTotals.size > 0) {
              const entries = Array.from(categoryTotals.entries());
              entries.sort((a, b) => b[1] - a[1]);
              const [category, amount] = entries[0];
              topCategory = {
                category,
                amount,
                percentage: monthlyCost > 0 ? (amount / monthlyCost) * 100 : 0,
              };
            }

            // Comparison to last month
            const change = monthlyCost - prevMonthlyCost;
            const changePercent =
              prevMonthlyCost > 0
                ? (change / prevMonthlyCost) * 100
                : monthlyCost > 0
                  ? 100
                  : 0;
            const comparison: ComparisonMetric = {
              change,
              changePercent,
              trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
              message:
                changePercent > 0
                  ? `${changePercent.toFixed(1)}% more than last month`
                  : changePercent < 0
                    ? `${Math.abs(changePercent).toFixed(1)}% less than last month`
                    : "No change from last month",
            };

            // Create metric values
            const createMetricValue = (
              current: number,
              previous: number
            ): MetricValue => {
              const change = current - previous;
              const changePercent =
                previous === 0
                  ? current > 0
                    ? 100
                    : 0
                  : (change / previous) * 100;
              return {
                value: current,
                previousValue: previous,
                change,
                changePercent,
                trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
              };
            };

            const summaryMetrics: SummaryMetrics = {
              totalMonthlyCost: createMetricValue(monthlyCost, prevMonthlyCost),
              totalYearlyCost: createMetricValue(yearlyCost, prevYearlyCost),
              activeCount: {
                value: activeCount,
                previousValue: prevActiveCount,
                change: activeCount - prevActiveCount,
              },
              upcomingRenewalsCount: {
                thisWeek: upcomingThisWeek.length,
                thisMonth: upcomingThisMonth.length,
                totalAmount: upcomingTotalAmount,
              },
              topSpendingCategory: topCategory,
              comparisonToLastMonth: comparison,
            };

            return summaryMetrics;
          }),
        getFilterOptions: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const [subscriptions, accounts] = yield* Effect.all([
              execute(
                db.subscription.findMany({
                  where: { userId },
                  select: {
                    category: true,
                    status: true,
                    billingCycle: true,
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

            const categories = Array.from(
              new Set(subscriptions.map((s) => s.category))
            ).sort();

            const statuses = Array.from(
              new Set(subscriptions.map((s) => s.status))
            ).sort() as ("active" | "paused" | "cancelled")[];

            const billingCycles = Array.from(
              new Set(subscriptions.map((s) => s.billingCycle))
            ).sort() as ("monthly" | "yearly" | "weekly")[];

            const filterOptions: FilterOptions = {
              categories,
              statuses,
              billingCycles,
              accounts: accounts.map((acc) => ({
                id: acc.id,
                name: acc.name,
                type: acc.type as Account["type"],
              })),
            };

            return filterOptions;
          }),
        pauseSubscription: ({ id }: PauseSubscriptionSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.update({
                where: { id },
                data: { status: "paused" },
              })
            );
          }),
        resumeSubscription: ({ id }: ResumeSubscriptionSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.update({
                where: { id },
                data: { status: "active" },
              })
            );
          }),
        cancelSubscription: ({ id }: CancelSubscriptionSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.update({
                where: { id },
                data: {
                  status: "cancelled",
                  cancelledAt: new Date().toISOString().split("T")[0],
                },
              })
            );
          }),
        getPaymentHistory: ({ subscriptionId }: { subscriptionId: string }) =>
          Effect.gen(function* () {
            const payments = yield* execute(
              db.subscriptionPayment.findMany({
                where: { subscriptionId },
                orderBy: { date: "desc" },
              })
            );

            return payments.map((p) => ({
              id: p.id,
              date: p.date,
              amount: Number(p.amount),
              status: p.status as "paid" | "pending" | "failed",
            }));
          }),
        addPayment: ({
          subscriptionId,
          amount,
          date,
          status,
        }: AddPaymentSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscriptionPayment.create({
                data: {
                  subscriptionId,
                  amount,
                  date,
                  status,
                },
              })
            );
          }),
        bulkPause: ({ subscriptionIds }: BulkPauseSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.updateMany({
                where: {
                  id: { in: subscriptionIds },
                },
                data: {
                  status: "paused",
                },
              })
            );
          }),
        bulkCancel: ({ subscriptionIds }: BulkCancelSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.updateMany({
                where: {
                  id: { in: subscriptionIds },
                },
                data: {
                  status: "cancelled",
                  cancelledAt: new Date().toISOString().split("T")[0],
                },
              })
            );
          }),
        bulkChangeCategory: ({
          subscriptionIds,
          category,
        }: BulkChangeCategorySchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.updateMany({
                where: {
                  id: { in: subscriptionIds },
                },
                data: {
                  category,
                },
              })
            );
          }),
      };
    }),
  }
) {}
