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
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
