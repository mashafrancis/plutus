import { Effect, Schema } from "effect";
import { RuntimeServer } from "@/lib/runtime-server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { SubscriptionInputs } from "@/server/data-access/subscriptions/subscriptions.schema";
import { SubscriptionsService } from "@/server/data-access/subscriptions/subscriptions.service";

export const subscriptionsRouter = Effect.gen(function* () {
  const subscriptionsService = yield* SubscriptionsService;

  return {
    create: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.create))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await subscriptionsService
          .createSubscription({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    get: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.get))
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await subscriptionsService
          .getSubscriptions({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    patch: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.update))
      .mutation(
        async ({ input }) =>
          await subscriptionsService
            .updateSubscription(input)
            .pipe(RuntimeServer.runPromise)
      ),
    delete: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.delete))
      .mutation(
        async ({ input }) =>
          await subscriptionsService
            .deleteSubscription(input)
            .pipe(RuntimeServer.runPromise)
      ),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
