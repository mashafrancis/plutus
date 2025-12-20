import { Effect, Schema } from "effect";
import { RuntimeServer } from "@/lib/runtime-server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { DashboardInputs } from "@/server/data-access/dashboard/dashboard.schema";
import { DashboardService } from "@/server/data-access/dashboard/dashboard.service";
import { InsightsService } from "@/server/data-access/insights/insights.service";

export const dashboardRouter = Effect.gen(function* () {
  const dashboardService = yield* DashboardService;
  const insightsService = yield* InsightsService;

  return {
    getData: protectedProcedure
      .input(Schema.standardSchemaV1(DashboardInputs.getData))
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const dashboardData = await dashboardService
          .getDashboardData({ userId, ...input })
          .pipe(RuntimeServer.runPromise);

        // Generate insights
        const insights = await insightsService
          .generateInsights({
            userId,
            budgetProgress: dashboardData.budgetProgress,
            spendingByCategory: dashboardData.spendingByCategory,
            savingsRate: dashboardData.metrics.savingsRate.value,
            previousSavingsRate:
              dashboardData.metrics.savingsRate.previousValue,
          })
          .pipe(RuntimeServer.runPromise);

        return {
          ...dashboardData,
          insights,
        };
      }),
    dismissInsight: protectedProcedure
      .input(Schema.standardSchemaV1(DashboardInputs.dismissInsight))
      .mutation(async ({ ctx, input }) => {
        // For now, we'll just return success
        // In the future, we could store dismissed insights in a database table
        return { success: true, insightId: input.insightId };
      }),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
