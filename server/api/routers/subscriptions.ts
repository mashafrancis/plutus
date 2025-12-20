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
    getWithFilters: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.getWithFilters))
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await subscriptionsService
          .getSubscriptionsWithFilters({ userId, ...input })
          .pipe(RuntimeServer.runPromise);
      }),
    getSummaryMetrics: protectedProcedure
      .input(
        Schema.standardSchemaV1(
          Schema.optional(
            Schema.Struct({
              dateRange: Schema.optional(
                Schema.Struct({
                  from: Schema.String,
                  to: Schema.String,
                })
              ),
            })
          )
        )
      )
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        return await subscriptionsService
          .getSummaryMetrics({ userId, dateRange: input?.dateRange })
          .pipe(RuntimeServer.runPromise);
      }),
    getFilterOptions: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return await subscriptionsService
        .getFilterOptions({ userId })
        .pipe(RuntimeServer.runPromise);
    }),
    pause: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.pause))
      .mutation(
        async ({ input }) =>
          await subscriptionsService
            .pauseSubscription(input)
            .pipe(RuntimeServer.runPromise)
      ),
    resume: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.resume))
      .mutation(
        async ({ input }) =>
          await subscriptionsService
            .resumeSubscription(input)
            .pipe(RuntimeServer.runPromise)
      ),
    cancel: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.cancel))
      .mutation(
        async ({ input }) =>
          await subscriptionsService
            .cancelSubscription(input)
            .pipe(RuntimeServer.runPromise)
      ),
    getPaymentHistory: protectedProcedure
      .input(
        Schema.standardSchemaV1(
          Schema.Struct({ subscriptionId: Schema.String })
        )
      )
      .query(
        async ({ input }) =>
          await subscriptionsService
            .getPaymentHistory({ subscriptionId: input.subscriptionId })
            .pipe(RuntimeServer.runPromise)
      ),
    addPayment: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.addPayment))
      .mutation(
        async ({ input }) =>
          await subscriptionsService
            .addPayment(input)
            .pipe(RuntimeServer.runPromise)
      ),
    bulkPause: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.bulkPause))
      .mutation(
        async ({ input }) =>
          await subscriptionsService
            .bulkPause(input)
            .pipe(RuntimeServer.runPromise)
      ),
    bulkCancel: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.bulkCancel))
      .mutation(
        async ({ input }) =>
          await subscriptionsService
            .bulkCancel(input)
            .pipe(RuntimeServer.runPromise)
      ),
    bulkChangeCategory: protectedProcedure
      .input(Schema.standardSchemaV1(SubscriptionInputs.bulkChangeCategory))
      .mutation(
        async ({ input }) =>
          await subscriptionsService
            .bulkChangeCategory(input)
            .pipe(RuntimeServer.runPromise)
      ),
    getData: protectedProcedure
      .input(
        Schema.standardSchemaV1(
          Schema.optional(
            Schema.Struct({
              dateRange: Schema.optional(
                Schema.Struct({
                  from: Schema.String,
                  to: Schema.String,
                })
              ),
              filters: Schema.optional(
                Schema.Struct({
                  category: Schema.optional(Schema.String),
                  status: Schema.optional(Schema.String),
                  billingCycle: Schema.optional(Schema.String),
                  amountRange: Schema.optional(
                    Schema.Struct({
                      min: Schema.optional(Schema.Number),
                      max: Schema.optional(Schema.Number),
                    })
                  ),
                  search: Schema.optional(Schema.String),
                  sortBy: Schema.optional(Schema.String),
                  sortDirection: Schema.optional(Schema.Literal("asc", "desc")),
                })
              ),
            })
          )
        )
      )
      .query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const filters = input?.filters || {};
        const dateRange = input?.dateRange;

        const [subscriptions, summaryMetrics, filterOptions] =
          await Promise.all([
            subscriptionsService
              .getSubscriptionsWithFilters({
                userId,
                ...filters,
                dateRange,
              })
              .pipe(RuntimeServer.runPromise),
            subscriptionsService
              .getSummaryMetrics({ userId, dateRange })
              .pipe(RuntimeServer.runPromise),
            subscriptionsService
              .getFilterOptions({ userId })
              .pipe(RuntimeServer.runPromise),
          ]);

        const subscriptionsData: SubscriptionsData = {
          summaryMetrics,
          subscriptions,
          filterOptions,
        };

        return subscriptionsData;
      }),
  };
}).pipe((result) => createTRPCRouter(RuntimeServer.runSync(result)));
