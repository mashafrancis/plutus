import {
  ZCreateOrPatchExpensesSchema,
  ZGetExpensesSchema,
} from "@/server/api/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod/v4";

export const expensesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ZCreateOrPatchExpensesSchema.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { notes, name, price, category, date, paid_via } = input;

      return ctx.db.expense.create({
        data: {
          notes,
          name,
          price,
          category,
          date,
          paid_via,
          userId,
        },
      });
    }),

  get: protectedProcedure
    .input(ZGetExpensesSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { categories, to, from } = input;
      const OR = {
        OR: categories
          ?.split(",")
          .map((category: any) => ({ category: { contains: category } })),
      };

      const where = {
        userId,
        ...(categories?.length && OR),
        ...(to && from && { date: { lte: to, gte: from } }),
      };

      if (!from && !to) {
        where.date = undefined;
      }

      const post = await ctx.db.expense.findMany({
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
      });

      return post ?? null;
    }),

  patch: protectedProcedure
    .input(ZCreateOrPatchExpensesSchema)
    .mutation(async ({ ctx, input }) => {
      const { notes, name, price, category, date, paid_via, id } = input;

      return ctx.db.expense.update({
        data: { notes, name, price, date, paid_via, category },
        where: { id },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return ctx.db.expense.delete({
        where: { id: id },
      });
    }),
});
