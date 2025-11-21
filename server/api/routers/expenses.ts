import { Effect, Schema } from "effect";
import { RuntimeServer } from "@/lib/runtime-server";
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
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
