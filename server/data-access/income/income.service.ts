import { Effect } from "effect";
import { db } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";
import type {
  CreateIncomeSchema,
  DeleteIncomeSchema,
  GetIncomeSchema,
  UpdateIncomeSchema,
} from "@/server/data-access/income/income.schema";

export class IncomeService extends Effect.Service<IncomeService>()(
  "IncomeService",
  {
    effect: Effect.gen(function* () {
      return {
        createIncome: ({
          name,
          notes,
          price,
          source,
          date,
          accountId,
          recurring,
          recurringFrequency,
          tagIds,
          userId,
        }: CreateIncomeSchema & { userId: string }) =>
          Effect.gen(function* () {
            const income = yield* execute(
              db.income.create({
                data: {
                  notes,
                  name,
                  price,
                  source,
                  date,
                  accountId,
                  recurring,
                  recurringFrequency,
                  userId,
                },
              })
            );

            // Create IncomeTag relations if tagIds provided
            if (tagIds && tagIds.length > 0) {
              const incomeTags = tagIds.map((tagId) => ({
                incomeId: income.id,
                tagId,
              }));
              yield* execute(
                db.incomeTag.createMany({
                  data: incomeTags,
                  skipDuplicates: true,
                })
              );
            }

            return income;
          }),
        getIncome: ({
          sources,
          to,
          from,
          userId,
        }: GetIncomeSchema & { userId: string }) =>
          Effect.gen(function* () {
            const OR = sources
              ? {
                  OR: sources.split(",").map((source: string) => ({
                    source: { contains: source },
                  })),
                }
              : undefined;

            const where: Record<string, unknown> = {
              userId,
              ...(sources && OR),
            };

            if (to && from) {
              where.date = { lte: to, gte: from };
            }

            return yield* execute(
              db.income.findMany({
                where,
                orderBy: { updatedAt: "desc" },
                select: {
                  notes: true,
                  name: true,
                  price: true,
                  source: true,
                  id: true,
                  date: true,
                  createdAt: true,
                  updatedAt: true,
                },
              })
            );
          }),
        updateIncome: ({
          id,
          name,
          notes,
          price,
          source,
          date,
          accountId,
          recurring,
          recurringFrequency,
          tagIds,
        }: UpdateIncomeSchema) =>
          Effect.gen(function* () {
            const income = yield* execute(
              db.income.update({
                data: {
                  notes,
                  name,
                  price,
                  date,
                  source,
                  accountId,
                  recurring: recurring ?? undefined,
                  recurringFrequency,
                },
                where: { id },
              })
            );

            // Update tags if provided
            if (tagIds !== undefined) {
              // Delete existing tags
              yield* execute(
                db.incomeTag.deleteMany({
                  where: { incomeId: id },
                })
              );

              // Create new tags
              if (tagIds.length > 0) {
                const incomeTags = tagIds.map((tagId) => ({
                  incomeId: id,
                  tagId,
                }));
                yield* execute(
                  db.incomeTag.createMany({
                    data: incomeTags,
                    skipDuplicates: true,
                  })
                );
              }
            }

            return income;
          }),
        deleteIncome: ({ id }: DeleteIncomeSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.income.delete({
                where: { id },
              })
            );
          }),
        getIncomeWithFilters: ({
          dateRange,
          source,
          accountId,
          tags,
          amountRange,
          recurring,
          search,
          sortBy = "date",
          sortDirection = "desc",
          userId,
        }: GetIncomeWithFiltersSchema & { userId: string }) =>
          Effect.gen(function* () {
            const where: Record<string, unknown> = {
              userId,
            };

            // Date range filter
            if (dateRange?.from && dateRange?.to) {
              where.date = { gte: dateRange.from, lte: dateRange.to };
            }

            // Source filter
            if (source) {
              where.source = source;
            }

            // Account filter
            if (accountId) {
              where.accountId = accountId;
            }

            // Recurring filter
            if (recurring === "recurring") {
              where.recurring = true;
            } else if (recurring === "one-time") {
              where.recurring = false;
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

            // Tags filter
            if (tags && tags.length > 0) {
              where.tags = {
                some: {
                  tag: {
                    name: { in: tags },
                  },
                },
              };
            }

            // Sort
            const orderBy: Record<string, string> = {};
            if (sortBy === "date") {
              orderBy.date = sortDirection;
            } else if (sortBy === "amount") {
              orderBy.price = sortDirection;
            } else if (sortBy === "source") {
              orderBy.source = sortDirection;
            } else {
              orderBy.updatedAt = sortDirection;
            }

            const income = yield* execute(
              db.income.findMany({
                where,
                orderBy,
                include: {
                  tags: {
                    include: {
                      tag: true,
                    },
                  },
                },
              })
            );

            // Transform to Income format
            return income.map((inc) => ({
              id: inc.id,
              type: "income" as const,
              amount: Number(inc.price),
              source: inc.source,
              description: inc.name,
              date: inc.date,
              accountId: inc.accountId || "",
              tags: inc.tags.map((it) => it.tag.name),
              notes: inc.notes || "",
              recurring: inc.recurring,
              recurringFrequency: inc.recurringFrequency as
                | "monthly"
                | "quarterly"
                | "yearly"
                | "weekly"
                | "semi-annual"
                | undefined,
            }));
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

            const [currentIncome, previousIncome] = yield* Effect.all([
              execute(
                db.income.findMany({
                  where: {
                    userId,
                    date: { gte: fromStr, lte: toStr },
                  },
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
            ]);

            // Calculate totals
            const totalIncome = currentIncome.reduce(
              (sum, i) => sum + Number(i.price),
              0
            );
            const prevTotalIncome = previousIncome.reduce(
              (sum, i) => sum + Number(i.price),
              0
            );

            // Calculate average monthly (assuming monthly period)
            const avgMonthly = totalIncome;
            const prevAvgMonthly = prevTotalIncome;

            // Top source
            const sourceTotals = new Map<string, number>();
            currentIncome.forEach((inc) => {
              const current = sourceTotals.get(inc.source) || 0;
              sourceTotals.set(inc.source, current + Number(inc.price));
            });

            let topSource: TopSource = {
              source: "None",
              amount: 0,
              percentage: 0,
            };
            if (sourceTotals.size > 0) {
              const entries = Array.from(sourceTotals.entries());
              entries.sort((a, b) => b[1] - a[1]);
              const [source, amount] = entries[0];
              topSource = {
                source,
                amount,
                percentage: totalIncome > 0 ? (amount / totalIncome) * 100 : 0,
              };
            }

            // Comparison to last month
            const change = totalIncome - prevTotalIncome;
            const changePercent =
              prevTotalIncome > 0
                ? (change / prevTotalIncome) * 100
                : totalIncome > 0
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

            // Total recurring income
            const recurringIncome = currentIncome
              .filter((i) => i.recurring)
              .reduce((sum, i) => sum + Number(i.price), 0);
            const prevRecurringIncome = previousIncome
              .filter((i) => i.recurring)
              .reduce((sum, i) => sum + Number(i.price), 0);

            // Transaction count
            const transactionCount: TransactionCount = {
              thisMonth: currentIncome.length,
              lastMonth: previousIncome.length,
              change: currentIncome.length - previousIncome.length,
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
              totalIncomeThisMonth: createMetricValue(
                totalIncome,
                prevTotalIncome
              ),
              averageMonthlyIncome: createMetricValue(
                avgMonthly,
                prevAvgMonthly
              ),
              topIncomeSource: topSource,
              comparisonToLastMonth: comparison,
              totalRecurringIncome: createMetricValue(
                recurringIncome,
                prevRecurringIncome
              ),
              transactionCount,
            };

            return summaryMetrics;
          }),
        getFilterOptions: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const [income, accounts, tags] = yield* Effect.all([
              execute(
                db.income.findMany({
                  where: { userId },
                  select: { source: true },
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
              execute(
                db.tag.findMany({
                  where: { userId },
                  select: { id: true, name: true },
                })
              ),
            ]);

            const sources = Array.from(
              new Set(income.map((i) => i.source))
            ).sort();

            const filterOptions: FilterOptions = {
              sources,
              accounts: accounts.map((acc) => ({
                id: acc.id,
                name: acc.name,
                type: acc.type as Account["type"],
              })),
              tags: tags.map((t) => t.name).sort(),
              tagIds: tags.map((t) => t.id),
            };

            return filterOptions;
          }),
        bulkDeleteIncome: ({ incomeIds }: BulkDeleteIncomeSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.income.deleteMany({
                where: {
                  id: { in: incomeIds },
                },
              })
            );
          }),
        bulkUpdateSource: ({ incomeIds, source }: BulkUpdateSourceSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.income.updateMany({
                where: {
                  id: { in: incomeIds },
                },
                data: {
                  source,
                },
              })
            );
          }),
        bulkAddTags: ({
          incomeIds,
          tagIds,
        }: BulkAddTagsSchema & { userId: string }) =>
          Effect.gen(function* () {
            // Create IncomeTag records for each income-tag combination
            const incomeTags = incomeIds.flatMap((incomeId) =>
              tagIds.map((tagId) => ({
                incomeId,
                tagId,
              }))
            );

            // Use createMany with skipDuplicates to avoid errors on existing relations
            yield* execute(
              db.incomeTag.createMany({
                data: incomeTags,
                skipDuplicates: true,
              })
            );
            return { success: true };
          }),
      };
    }),
  }
) {}
