import { format } from 'date-fns';
import { z } from 'zod/v4';
import { dateFormat } from '@/constants/date';
import {
  calculatePaidDates,
  calculatePrevRenewalDate,
  calculateRenewalDate,
} from '@/lib/date';
import {
  ZCreateOrPatchSubscriptionsSchema,
  ZGetSubscriptionsSchema,
} from '@/server/api/schema';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const subscriptionsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ZCreateOrPatchSubscriptionsSchema.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { notes, name, price, paid, date, url } = input;

      return ctx.db.subscription.create({
        data: {
          notes,
          name,
          price,
          paid,
          url,
          date,
          userId,
        },
      });
    }),

  get: protectedProcedure
    .input(ZGetSubscriptionsSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { to, from } = input;

      const data = await ctx.db.subscription.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
      });

      let updatedDate = data.map((datum) => {
        const renewal_date = calculateRenewalDate(datum.date, datum.paid);
        const prev_renewal_date = format(
          calculatePrevRenewalDate(renewal_date, datum.paid),
          dateFormat
        );
        return {
          ...datum,
          renewal_date: format(renewal_date, dateFormat),
          prev_renewal_date,
          paid_dates: calculatePaidDates(datum, from, to),
        };
      });

      if (from !== '' && to !== '') {
        updatedDate = updatedDate.filter((datum) => datum.paid_dates?.length);
      }

      return updatedDate;
    }),

  patch: protectedProcedure
    .input(ZCreateOrPatchSubscriptionsSchema)
    .mutation(async ({ ctx, input }) => {
      const { notes, name, price, paid, id, url, date, active, cancelledAt } =
        input;

      return ctx.db.subscription.update({
        data: { notes, name, price, date, url, paid, active, cancelledAt },
        where: { id },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return ctx.db.subscription.delete({
        where: { id },
      });
    }),
});
