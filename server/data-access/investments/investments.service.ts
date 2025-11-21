import { Effect } from "effect";
import { prisma } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";
import type {
  CreateInvestmentSchema,
  DeleteInvestmentSchema,
  GetInvestmentsSchema,
  UpdateInvestmentSchema,
} from "@/server/data-access/investments/investments.schema";

export class InvestmentsService extends Effect.Service<InvestmentsService>()(
  "InvestmentsService",
  {
    effect: Effect.gen(function* () {
      return {
        createInvestment: ({
          name,
          notes,
          price,
          category,
          date,
          userId,
        }: CreateInvestmentSchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              prisma.investment.create({
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
        getInvestments: ({
          categories,
          to,
          from,
          userId,
        }: GetInvestmentsSchema & { userId: string }) =>
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
              prisma.investment.findMany({
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
        updateInvestment: ({
          id,
          name,
          notes,
          price,
          category,
          date,
        }: UpdateInvestmentSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              prisma.investment.update({
                data: { notes, name, price, date, category },
                where: { id },
              })
            );
          }),
        deleteInvestment: ({ id }: DeleteInvestmentSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              prisma.investment.delete({
                where: { id },
              })
            );
          }),
      };
    }),
  }
) {}
