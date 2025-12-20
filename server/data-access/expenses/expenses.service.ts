import { Effect } from "effect";
import { db } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";
import type {
  Account,
  BudgetProgressMetric,
  ComparisonMetric,
  FilterOptions,
  MetricValue,
  SummaryMetrics,
  TopCategory,
  TransactionCount,
} from "@/lib/types/expenses";
import type {
  BulkAddTagsSchema,
  BulkDeleteExpensesSchema,
  BulkUpdateCategorySchema,
  CreateExpenseSchema,
  DeleteExpenseSchema,
  GetExpensesSchema,
  GetExpensesWithFiltersSchema,
  UpdateExpenseSchema,
} from "@/server/data-access/expenses/expenses.schema";

export class ExpensesService extends Effect.Service<ExpensesService>()(
  "ExpensesService",
  {
    effect: Effect.gen(function* () {
      return {
        createExpense: ({
          name,
          notes,
          price,
          category,
          date,
          paid_via,
          accountId,
          recurring,
          recurringFrequency,
          tagIds,
          userId,
        }: CreateExpenseSchema & { userId: string }) =>
          Effect.gen(function* () {
            const expense = yield* execute(
              db.expense.create({
                data: {
                  notes,
                  name,
                  price,
                  category,
                  date,
                  paid_via,
                  accountId,
                  recurring,
                  recurringFrequency,
                  userId,
                },
              })
            );

            // Create ExpenseTag relations if tagIds provided
            if (tagIds && tagIds.length > 0) {
              const expenseTags = tagIds.map((tagId) => ({
                expenseId: expense.id,
                tagId,
              }));
              yield* execute(
                db.expenseTag.createMany({
                  data: expenseTags,
                  skipDuplicates: true,
                })
              );
            }

            return expense;
          }),
        getExpenses: ({
          categories,
          to,
          from,
          userId,
        }: GetExpensesSchema & { userId: string }) =>
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
              db.expense.findMany({
                where,
                orderBy: { updatedAt: "desc" },
                select: {
                  notes: true,
                  name: true,
                  price: true,
                  category: true,
                  paid_via: true,
                  id: true,
                  date: true,
                  createdAt: true,
                  updatedAt: true,
                },
              })
            );
          }),
        updateExpense: ({
          id,
          name,
          notes,
          price,
          category,
          date,
          paid_via,
          accountId,
          recurring,
          recurringFrequency,
          tagIds,
        }: UpdateExpenseSchema) =>
          Effect.gen(function* () {
            const expense = yield* execute(
              db.expense.update({
                data: {
                  notes,
                  name,
                  price,
                  date,
                  paid_via,
                  category,
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
                db.expenseTag.deleteMany({
                  where: { expenseId: id },
                })
              );

              // Create new tags
              if (tagIds.length > 0) {
                const expenseTags = tagIds.map((tagId) => ({
                  expenseId: id,
                  tagId,
                }));
                yield* execute(
                  db.expenseTag.createMany({
                    data: expenseTags,
                    skipDuplicates: true,
                  })
                );
              }
            }

            return expense;
          }),
        deleteExpense: ({ id }: DeleteExpenseSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.expense.delete({
                where: { id },
              })
            );
          }),
        getExpensesWithFilters: ({
          dateRange,
          category,
          accountId,
          tags,
          amountRange,
          recurring,
          search,
          sortBy = "date",
          sortDirection = "desc",
          userId,
        }: GetExpensesWithFiltersSchema & { userId: string }) =>
          Effect.gen(function* () {
            const where: Record<string, unknown> = {
              userId,
            };

            // Date range filter
            if (dateRange?.from && dateRange?.to) {
              where.date = { gte: dateRange.from, lte: dateRange.to };
            }

            // Category filter
            if (category) {
              where.category = category;
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
            } else if (sortBy === "category") {
              orderBy.category = sortDirection;
            } else {
              orderBy.updatedAt = sortDirection;
            }

            const expenses = yield* execute(
              db.expense.findMany({
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

            // Transform to Expense format
            return expenses.map((exp) => ({
              id: exp.id,
              type: "expense" as const,
              amount: Number(exp.price),
              category: exp.category,
              description: exp.name,
              date: exp.date,
              accountId: exp.accountId || "",
              tags: exp.tags.map((et) => et.tag.name),
              notes: exp.notes || "",
              recurring: exp.recurring,
              recurringFrequency: exp.recurringFrequency as
                | "monthly"
                | "quarterly"
                | "yearly"
                | "weekly"
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

            const [currentExpenses, previousExpenses, budgets] =
              yield* Effect.all([
                execute(
                  db.expense.findMany({
                    where: {
                      userId,
                      date: { gte: fromStr, lte: toStr },
                    },
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
                  db.budget.findMany({
                    where: {
                      userId,
                      period: "monthly",
                    },
                  })
                ),
              ]);

            // Calculate totals
            const totalSpending = currentExpenses.reduce(
              (sum, e) => sum + Number(e.price),
              0
            );
            const prevTotalSpending = previousExpenses.reduce(
              (sum, e) => sum + Number(e.price),
              0
            );

            // Calculate daily average
            const daysInMonth = Math.ceil(
              (new Date(toStr).getTime() - new Date(fromStr).getTime()) /
                (1000 * 60 * 60 * 24)
            );
            const avgDaily = daysInMonth > 0 ? totalSpending / daysInMonth : 0;
            const prevDaysInMonth = Math.ceil(
              (new Date(prevToStr).getTime() -
                new Date(prevFromStr).getTime()) /
                (1000 * 60 * 60 * 24)
            );
            const prevAvgDaily =
              prevDaysInMonth > 0 ? prevTotalSpending / prevDaysInMonth : 0;

            // Top category
            const categoryTotals = new Map<string, number>();
            currentExpenses.forEach((exp) => {
              const current = categoryTotals.get(exp.category) || 0;
              categoryTotals.set(exp.category, current + Number(exp.price));
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
                percentage:
                  totalSpending > 0 ? (amount / totalSpending) * 100 : 0,
              };
            }

            // Budget progress
            const totalBudget = budgets.reduce(
              (sum, b) => sum + Number(b.limit),
              0
            );
            const budgetProgress: BudgetProgressMetric = {
              totalSpent: totalSpending,
              totalBudget,
              percentage:
                totalBudget > 0 ? (totalSpending / totalBudget) * 100 : 0,
              status:
                totalBudget === 0
                  ? "good"
                  : totalSpending > totalBudget
                    ? "over"
                    : (totalSpending / totalBudget) * 100 >= 80
                      ? "warning"
                      : "good",
            };

            // Comparison to last month
            const change = totalSpending - prevTotalSpending;
            const changePercent =
              prevTotalSpending > 0
                ? (change / prevTotalSpending) * 100
                : totalSpending > 0
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

            // Transaction count
            const transactionCount: TransactionCount = {
              thisMonth: currentExpenses.length,
              lastMonth: previousExpenses.length,
              change: currentExpenses.length - previousExpenses.length,
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
              totalSpendingThisMonth: createMetricValue(
                totalSpending,
                prevTotalSpending
              ),
              averageDailySpending: createMetricValue(avgDaily, prevAvgDaily),
              topSpendingCategory: topCategory,
              budgetProgress,
              comparisonToLastMonth: comparison,
              transactionCount,
            };

            return summaryMetrics;
          }),
        getFilterOptions: ({ userId }: { userId: string }) =>
          Effect.gen(function* () {
            const [expenses, accounts, tags] = yield* Effect.all([
              execute(
                db.expense.findMany({
                  where: { userId },
                  select: { category: true },
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

            const categories = Array.from(
              new Set(expenses.map((e) => e.category))
            ).sort();

            const filterOptions: FilterOptions = {
              categories,
              accounts: accounts.map((acc) => ({
                id: acc.id,
                name: acc.name,
                type: acc.type as Account["type"],
              })),
              tags: tags.map((t) => t.name).sort(),
              // Also return tag IDs for modal use
              tagIds: tags.map((t) => t.id),
            };

            return filterOptions;
          }),
        bulkDeleteExpenses: ({ expenseIds }: BulkDeleteExpensesSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.expense.deleteMany({
                where: {
                  id: { in: expenseIds },
                },
              })
            );
          }),
        bulkUpdateCategory: ({
          expenseIds,
          category,
        }: BulkUpdateCategorySchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.expense.updateMany({
                where: {
                  id: { in: expenseIds },
                },
                data: {
                  category,
                },
              })
            );
          }),
        bulkAddTags: ({
          expenseIds,
          tagIds,
        }: BulkAddTagsSchema & { userId: string }) =>
          Effect.gen(function* () {
            // Create ExpenseTag records for each expense-tag combination
            const expenseTags = expenseIds.flatMap((expenseId) =>
              tagIds.map((tagId) => ({
                expenseId,
                tagId,
              }))
            );

            // Use createMany with skipDuplicates to avoid errors on existing relations
            yield* execute(
              db.expenseTag.createMany({
                data: expenseTags,
                skipDuplicates: true,
              })
            );
            return { success: true };
          }),
        getBudgetProgress: ({
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
            const fromStr =
              dateRange?.from || currentMonthStart.toISOString().split("T")[0];
            const toStr = dateRange?.to || now.toISOString().split("T")[0];

            const [budgets, expenses] = yield* Effect.all([
              execute(
                db.budget.findMany({
                  where: {
                    userId,
                    period: "monthly",
                  },
                })
              ),
              execute(
                db.expense.findMany({
                  where: {
                    userId,
                    date: { gte: fromStr, lte: toStr },
                  },
                })
              ),
            ]);

            const budgetProgress: BudgetProgress[] = budgets.map((budget) => {
              const categoryExpenses = expenses.filter(
                (exp) => exp.categoryId === budget.categoryId
              );
              const spent = categoryExpenses.reduce(
                (sum, exp) => sum + Number(exp.price),
                0
              );
              const target = Number(budget.limit);
              const percentage = target > 0 ? (spent / target) * 100 : 0;
              const status =
                percentage > 100
                  ? "over"
                  : percentage >= 80
                    ? "warning"
                    : "good";

              // Get category name if available
              const categoryName = budget.categoryId || "Unknown";

              return {
                category: categoryName,
                spent,
                target,
                percentage,
                status,
              };
            });

            return budgetProgress;
          }),
        getData: ({
          userId,
          filters,
          dateRange,
        }: {
          userId: string;
          filters?: GetExpensesWithFiltersSchema;
          dateRange?: { from: string; to: string };
        }) =>
          Effect.gen(function* () {
            const [expenses, summaryMetrics, filterOptions, budgetProgress] =
              yield* Effect.all([
                this.getExpensesWithFilters({
                  userId,
                  ...(filters || {}),
                  dateRange,
                }),
                this.getSummaryMetrics({ userId, dateRange }),
                this.getFilterOptions({ userId }),
                this.getBudgetProgress({ userId, dateRange }),
              ]);

            return {
              summaryMetrics,
              expenses,
              filterOptions,
              budgetProgress,
            };
          }),
      };
    }),
  }
) {}
