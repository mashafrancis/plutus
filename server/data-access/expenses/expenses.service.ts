import { Effect } from "effect";
import { db } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";
import type {
  CreateExpenseSchema,
  DeleteExpenseSchema,
  GetExpensesSchema,
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
          userId,
        }: CreateExpenseSchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.expense.create({
                data: {
                  notes,
                  name,
                  price,
                  category,
                  date,
                  paid_via,
                  userId,
                },
              })
            );
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
        }: UpdateExpenseSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.expense.update({
                data: { notes, name, price, date, paid_via, category },
                where: { id },
              })
            );
          }),
        deleteExpense: ({ id }: DeleteExpenseSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.expense.delete({
                where: { id },
              })
            );
          }),
      };
    }),
  }
) {}
