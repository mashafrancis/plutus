import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const post = await ctx.db.user.findUnique({
      where: { id: userId },
      select: {
        currency: true,
        locale: true,
        billing_start_date: true,
        trial_start_date: true,
        order_status: true,
        usage: true,
        email: true,
        plan_status: true,
        new_signup_email: true,
      },
    });

    return post ?? null;
  }),
});
