import { z } from "zod/v4";
import {
  ZCreateOrPatchInvestmentsSchema,
  ZGetInvestmentsSchema,
} from "@/server/api/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const investmentsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ZCreateOrPatchInvestmentsSchema.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { notes, name, price, category, date } = input;

      return ctx.db.investment.create({
        data: {
          notes,
          name,
          price,
          category,
          date,
          userId,
        },
      });
    }),

  get: protectedProcedure
    .input(ZGetInvestmentsSchema)
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

      const post = await ctx.db.investment.findMany({
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
      });

      return post ?? null;
    }),

  patch: protectedProcedure
    .input(ZCreateOrPatchInvestmentsSchema)
    .mutation(async ({ ctx, input }) => {
      const { notes, name, price, category, date, id } = input;

      return ctx.db.investment.update({
        data: { notes, name, price, date, category },
        where: { id },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return ctx.db.investment.delete({
        where: { id: id },
      });
    }),
});
