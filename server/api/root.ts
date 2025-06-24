import { expensesRouter } from '@/server/api/routers/expenses';
import { incomeRouter } from '@/server/api/routers/income';
import { investmentsRouter } from '@/server/api/routers/investments';
import { subscriptionsRouter } from '@/server/api/routers/subscriptions';
import { usersRouter } from '@/server/api/routers/users';
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  expenses: expensesRouter,
  investments: investmentsRouter,
  income: incomeRouter,
  subscriptions: subscriptionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
