import { Effect, Schema } from "effect";
import { RuntimeServer } from "@/lib/runtime-server";
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
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
