import { Effect, Schema } from "effect";
import { RuntimeServer } from "@/lib/runtime-server";
import type { ExpensesData } from "@/lib/types/expenses";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ExpenseInputs } from "@/server/data-access/expenses/expenses.schema";
import { ExpensesService } from "@/server/data-access/expenses/expenses.service";

export const expensesRouter = Effect.gen(function* () {
  const expenseService = yield* ExpensesService;

  return {
    create: protectedProcedure
      .input(Schema.standardSchemaV1(ExpenseInputs.create))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await expenseService
          .createExpense({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    get: protectedProcedure
      .input(Schema.standardSchemaV1(ExpenseInputs.get))
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await expenseService
          .getExpenses({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    patch: protectedProcedure
      .input(Schema.standardSchemaV1(ExpenseInputs.update))
      .mutation(
        async ({ input }) =>
          await expenseService
            .updateExpense(input)
            .pipe(RuntimeServer.runPromise)
      ),
    delete: protectedProcedure
      .input(Schema.standardSchemaV1(ExpenseInputs.delete))
      .mutation(
        async ({ input }) =>
          await expenseService
            .deleteExpense(input)
            .pipe(RuntimeServer.runPromise)
      ),
    getWithFilters: protectedProcedure
      .input(Schema.standardSchemaV1(ExpenseInputs.getWithFilters))
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await expenseService
          .getExpensesWithFilters({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    getSummaryMetrics: protectedProcedure
      .input(
        Schema.standardSchemaV1(
          Schema.optional(
            Schema.Struct({
              dateRange: Schema.optional(
                Schema.Struct({
                  from: Schema.String,
                  to: Schema.String,
                })
              ),
            })
          )
        )
      )
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await expenseService
          .getSummaryMetrics({ userId, dateRange: input?.dateRange })
          .pipe(RuntimeServer.runPromise);
      }),
    getFilterOptions: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await expenseService
        .getFilterOptions({ userId })
        .pipe(RuntimeServer.runPromise);
    }),
    bulkDelete: protectedProcedure
      .input(Schema.standardSchemaV1(ExpenseInputs.bulkDelete))
      .mutation(
        async ({ input }) =>
          await expenseService
            .bulkDeleteExpenses(input)
            .pipe(RuntimeServer.runPromise)
      ),
    bulkUpdateCategory: protectedProcedure
      .input(Schema.standardSchemaV1(ExpenseInputs.bulkUpdateCategory))
      .mutation(
        async ({ input }) =>
          await expenseService
            .bulkUpdateCategory(input)
            .pipe(RuntimeServer.runPromise)
      ),
    bulkAddTags: protectedProcedure
      .input(Schema.standardSchemaV1(ExpenseInputs.bulkAddTags))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await expenseService
          .bulkAddTags({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    getData: protectedProcedure
      .input(
        Schema.standardSchemaV1(
          Schema.optional(
            Schema.Struct({
              dateRange: Schema.optional(
                Schema.Struct({
                  from: Schema.String,
                  to: Schema.String,
                })
              ),
              filters: Schema.optional(
                Schema.Struct({
                  category: Schema.optional(Schema.String),
                  accountId: Schema.optional(Schema.String),
                  tags: Schema.optional(Schema.Array(Schema.String)),
                  amountRange: Schema.optional(
                    Schema.Struct({
                      min: Schema.optional(Schema.Number),
                      max: Schema.optional(Schema.Number),
                    })
                  ),
                  recurring: Schema.optional(
                    Schema.Literal("all", "recurring", "one-time")
                  ),
                  search: Schema.optional(Schema.String),
                  sortBy: Schema.optional(Schema.String),
                  sortDirection: Schema.optional(Schema.Literal("asc", "desc")),
                })
              ),
            })
          )
        )
      )
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const filters = input?.filters || {};
        const dateRange = input?.dateRange;

        const [expenses, summaryMetrics, filterOptions] = await Promise.all([
          expenseService
            .getExpensesWithFilters({
              userId,
              ...filters,
              dateRange,
            })
            .pipe(RuntimeServer.runPromise),
          expenseService
            .getSummaryMetrics({ userId, dateRange })
            .pipe(RuntimeServer.runPromise),
          expenseService
            .getFilterOptions({ userId })
            .pipe(RuntimeServer.runPromise),
        ]);

        // Get budget progress
        const budgetProgress = await expenseService
          .getBudgetProgress({ userId, dateRange })
          .pipe(RuntimeServer.runPromise);

        const expensesData: ExpensesData = {
          summaryMetrics,
          expenses,
          filterOptions,
          budgetProgress,
        };

        return expensesData;
      }),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
