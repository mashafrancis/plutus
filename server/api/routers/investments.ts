import { Effect, Schema } from "effect";
import { RuntimeServer } from "@/lib/runtime-server";
import type { InvestmentsData } from "@/lib/types/investments";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { InvestmentInputs } from "@/server/data-access/investments/investments.schema";
import { InvestmentsService } from "@/server/data-access/investments/investments.service";

export const investmentsRouter = Effect.gen(function* () {
  const investmentsService = yield* InvestmentsService;

  return {
    create: protectedProcedure
      .input(Schema.standardSchemaV1(InvestmentInputs.create))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await investmentsService
          .createInvestment({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    get: protectedProcedure
      .input(Schema.standardSchemaV1(InvestmentInputs.get))
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await investmentsService
          .getInvestments({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    patch: protectedProcedure
      .input(Schema.standardSchemaV1(InvestmentInputs.update))
      .mutation(
        async ({ input }) =>
          await investmentsService
            .updateInvestment(input)
            .pipe(RuntimeServer.runPromise)
      ),
    delete: protectedProcedure
      .input(Schema.standardSchemaV1(InvestmentInputs.delete))
      .mutation(
        async ({ input }) =>
          await investmentsService
            .deleteInvestment(input)
            .pipe(RuntimeServer.runPromise)
      ),
    getWithFilters: protectedProcedure
      .input(Schema.standardSchemaV1(InvestmentInputs.getWithFilters))
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await investmentsService
          .getInvestmentsWithFilters({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    getSummaryMetrics: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await investmentsService
        .getSummaryMetrics({ userId })
        .pipe(RuntimeServer.runPromise);
    }),
    getFilterOptions: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await investmentsService
        .getFilterOptions({ userId })
        .pipe(RuntimeServer.runPromise);
    }),
    getChartData: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await investmentsService
        .getChartData({ userId })
        .pipe(RuntimeServer.runPromise);
    }),
    recordTransaction: protectedProcedure
      .input(Schema.standardSchemaV1(InvestmentInputs.recordTransaction))
      .mutation(
        async ({ input }) =>
          await investmentsService
            .recordTransaction(input)
            .pipe(RuntimeServer.runPromise)
      ),
    updateValue: protectedProcedure
      .input(Schema.standardSchemaV1(InvestmentInputs.updateValue))
      .mutation(
        async ({ input }) =>
          await investmentsService
            .updateValue(input)
            .pipe(RuntimeServer.runPromise)
      ),
    getTransactionHistory: protectedProcedure
      .input(Schema.standardSchemaV1(InvestmentInputs.getTransactionHistory))
      .query(
        async ({ input }) =>
          await investmentsService
            .getTransactionHistory({ investmentId: input.investmentId })
            .pipe(RuntimeServer.runPromise)
      ),
    addPriceHistory: protectedProcedure
      .input(Schema.standardSchemaV1(InvestmentInputs.addPriceHistory))
      .mutation(
        async ({ input }) =>
          await investmentsService
            .addPriceHistory(input)
            .pipe(RuntimeServer.runPromise)
      ),
    getData: protectedProcedure
      .input(
        Schema.optional(
          Schema.Struct({
            filters: Schema.optional(
              Schema.Struct({
                assetType: Schema.optional(Schema.String),
                account: Schema.optional(Schema.String),
                gainLossStatus: Schema.optional(Schema.String),
                search: Schema.optional(Schema.String),
              })
            ),
          })
        )
      )
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const filters = input?.filters || {};

        const [investments, summaryMetrics, filterOptions, chartData] =
          await Promise.all([
            investmentsService
              .getInvestmentsWithFilters({ userId, ...filters })
              .pipe(RuntimeServer.runPromise),
            investmentsService
              .getSummaryMetrics({ userId })
              .pipe(RuntimeServer.runPromise),
            investmentsService
              .getFilterOptions({ userId })
              .pipe(RuntimeServer.runPromise),
            investmentsService
              .getChartData({ userId })
              .pipe(RuntimeServer.runPromise),
          ]);

        const investmentsData: InvestmentsData = {
          summaryMetrics,
          investments,
          filterOptions,
          chartData,
        };

        return investmentsData;
      }),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
