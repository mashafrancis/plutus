import { Effect } from "effect";
import { prisma } from "@/lib/db/client";
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
          category,
          date,
          userId,
        }: CreateIncomeSchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              prisma.income.create({
                data: {
                  notes,
                  name,
                  price,
                  category,
                  date,
                  userId,
                },
              })
            );
          }),
        getIncome: ({
          categories,
          to,
          from,
          userId,
        }: GetIncomeSchema & { userId: string }) =>
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
              prisma.income.findMany({
                where,
                orderBy: { updatedAt: "desc" },
                select: {
                  notes: true,
                  name: true,
                  price: true,
                  category: true,
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
          category,
          date,
        }: UpdateIncomeSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              prisma.income.update({
                data: { notes, name, price, date, category },
                where: { id },
              })
            );
          }),
        deleteIncome: ({ id }: DeleteIncomeSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              prisma.income.delete({
                where: { id },
              })
            );
          }),
      };
    }),
  }
) {}
