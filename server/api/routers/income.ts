import { Effect, Schema } from "effect";
import { RuntimeServer } from "@/lib/runtime-server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { IncomeInputs } from "@/server/data-access/income/income.schema";
import { IncomeService } from "@/server/data-access/income/income.service";

export const incomeRouter = Effect.gen(function* () {
  const incomeService = yield* IncomeService;

  return {
    create: protectedProcedure
      .input(Schema.standardSchemaV1(IncomeInputs.create))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await incomeService
          .createIncome({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    get: protectedProcedure
      .input(Schema.standardSchemaV1(IncomeInputs.get))
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await incomeService
          .getIncome({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    patch: protectedProcedure
      .input(Schema.standardSchemaV1(IncomeInputs.update))
      .mutation(
        async ({ input }) =>
          await incomeService.updateIncome(input).pipe(RuntimeServer.runPromise)
      ),
    delete: protectedProcedure
      .input(Schema.standardSchemaV1(IncomeInputs.delete))
      .mutation(
        async ({ input }) =>
          await incomeService.deleteIncome(input).pipe(RuntimeServer.runPromise)
      ),
    getWithFilters: protectedProcedure
      .input(Schema.standardSchemaV1(IncomeInputs.getWithFilters))
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await incomeService
          .getIncomeWithFilters({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    getSummaryMetrics: protectedProcedure
      .input(
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
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await incomeService
          .getSummaryMetrics({ userId, dateRange: input?.dateRange })
          .pipe(RuntimeServer.runPromise);
      }),
    getFilterOptions: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await incomeService
        .getFilterOptions({ userId })
        .pipe(RuntimeServer.runPromise);
    }),
    bulkDelete: protectedProcedure
      .input(Schema.standardSchemaV1(IncomeInputs.bulkDelete))
      .mutation(
        async ({ input }) =>
          await incomeService
            .bulkDeleteIncome(input)
            .pipe(RuntimeServer.runPromise)
      ),
    bulkUpdateSource: protectedProcedure
      .input(Schema.standardSchemaV1(IncomeInputs.bulkUpdateSource))
      .mutation(
        async ({ input }) =>
          await incomeService
            .bulkUpdateSource(input)
            .pipe(RuntimeServer.runPromise)
      ),
    bulkAddTags: protectedProcedure
      .input(Schema.standardSchemaV1(IncomeInputs.bulkAddTags))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await incomeService
          .bulkAddTags({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    getData: protectedProcedure
      .input(
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
                source: Schema.optional(Schema.String),
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
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const filters = input?.filters || {};
        const dateRange = input?.dateRange;

        const [income, summaryMetrics, filterOptions] = await Promise.all([
          incomeService
            .getIncomeWithFilters({
              userId,
              ...filters,
              dateRange,
            })
            .pipe(RuntimeServer.runPromise),
          incomeService
            .getSummaryMetrics({ userId, dateRange })
            .pipe(RuntimeServer.runPromise),
          incomeService
            .getFilterOptions({ userId })
            .pipe(RuntimeServer.runPromise),
        ]);

        const incomeData: IncomeData = {
          summaryMetrics,
          income,
          filterOptions,
        };

        return incomeData;
      }),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
