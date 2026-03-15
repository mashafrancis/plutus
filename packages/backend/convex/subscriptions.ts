import { v } from "convex/values";
import { Effect } from "effect";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { convertCurrency } from "./lib/currency";
import { calculateNextRenewalDate } from "./lib/dates";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { NotFoundError, UnknownError } from "./schemas/errors";

export const list = query({
  args: {
    status: v.optional(
      v.union(v.literal("active"), v.literal("paused"), v.literal("cancelled"))
    ),
  },
  handler: (ctx, args): Promise<Doc<"subscriptions">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        if (args.status) {
          const status = args.status;
          return yield* Effect.tryPromise({
            try: () =>
              ctx.db
                .query("subscriptions")
                .withIndex("by_userId_status", (q) =>
                  q.eq("userId", user.subject).eq("status", status)
                )
                .collect(),
            catch: (error) => new UnknownError({ error }),
          });
        }

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("subscriptions")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });
      })
    ),
});

export const get = query({
  args: { id: v.id("subscriptions") },
  handler: (ctx, args): Promise<Doc<"subscriptions"> | null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const subscription = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!subscription || subscription.userId !== user.subject) {
          return null;
        }

        return subscription;
      })
    ),
});

export const create = mutation({
  args: {
    name: v.string(),
    accountId: v.id("accounts"),
    categoryId: v.id("categories"),
    amount: v.number(),
    currency: v.string(),
    frequency: v.union(
      v.literal("daily"),
      v.literal("weekly"),
      v.literal("monthly"),
      v.literal("quarterly"),
      v.literal("yearly")
    ),
    startDate: v.number(),
    description: v.optional(v.string()),
    notifyDaysBefore: v.optional(v.number()),
    autoRenew: v.optional(v.boolean()),
  },
  handler: (ctx, args): Promise<Id<"subscriptions">> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        // Validate account ownership
        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.accountId),
          catch: (error) => new UnknownError({ error }),
        });

        if (!account || account.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.accountId });
        }

        const nextRenewalDate = calculateNextRenewalDate(
          args.startDate,
          args.frequency
        );

        const subscriptionId = yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("subscriptions", {
              userId: user.subject,
              name: args.name,
              accountId: args.accountId,
              categoryId: args.categoryId,
              amount: args.amount,
              currency: args.currency,
              frequency: args.frequency,
              startDate: args.startDate,
              nextRenewalDate,
              status: "active",
              description: args.description,
              notifyDaysBefore: args.notifyDaysBefore ?? 3,
              autoRenew: args.autoRenew ?? true,
            }),
          catch: (error) => new UnknownError({ error }),
        });

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("activities", {
              userId: user.subject,
              type: "create_subscription",
              entityId: subscriptionId,
              entityType: "subscription",
              description: `Created subscription ${args.name}`,
              timestamp: Date.now(),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return subscriptionId;
      })
    ),
});

export const update = mutation({
  args: {
    id: v.id("subscriptions"),
    name: v.optional(v.string()),
    amount: v.optional(v.number()),
    frequency: v.optional(
      v.union(
        v.literal("daily"),
        v.literal("weekly"),
        v.literal("monthly"),
        v.literal("quarterly"),
        v.literal("yearly")
      )
    ),
    description: v.optional(v.string()),
    notifyDaysBefore: v.optional(v.number()),
    autoRenew: v.optional(v.boolean()),
  },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const subscription = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!subscription || subscription.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        const updates: Partial<Doc<"subscriptions">> = {};
        if (args.name !== undefined) {
          updates.name = args.name;
        }
        if (args.amount !== undefined) {
          updates.amount = args.amount;
        }
        if (args.frequency !== undefined) {
          updates.frequency = args.frequency;
          updates.nextRenewalDate = calculateNextRenewalDate(
            subscription.nextRenewalDate,
            args.frequency
          );
        }
        if (args.description !== undefined) {
          updates.description = args.description;
        }
        if (args.notifyDaysBefore !== undefined) {
          updates.notifyDaysBefore = args.notifyDaysBefore;
        }
        if (args.autoRenew !== undefined) {
          updates.autoRenew = args.autoRenew;
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, updates),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const pause = mutation({
  args: { id: v.id("subscriptions") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const subscription = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!subscription || subscription.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, { status: "paused" }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const resume = mutation({
  args: { id: v.id("subscriptions") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const subscription = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!subscription || subscription.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        // Update next renewal date if it's in the past
        let nextRenewalDate = subscription.nextRenewalDate;
        while (nextRenewalDate < Date.now()) {
          nextRenewalDate = calculateNextRenewalDate(
            nextRenewalDate,
            subscription.frequency
          );
        }

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.patch(args.id, { status: "active", nextRenewalDate }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const cancel = mutation({
  args: { id: v.id("subscriptions") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const subscription = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!subscription || subscription.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, { status: "cancelled" }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const remove = mutation({
  args: { id: v.id("subscriptions") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const subscription = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!subscription || subscription.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.delete(args.id),
          catch: (error) => new UnknownError({ error, docId: args.id }),
        });

        return null;
      })
    ),
});

export const getUpcoming = query({
  args: { days: v.optional(v.number()) },
  handler: (ctx, args): Promise<Doc<"subscriptions">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);
        const days = args.days ?? 7;
        const futureDate = Date.now() + days * 24 * 60 * 60 * 1000;

        const subscriptions = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("subscriptions")
              .withIndex("by_userId_status", (q) =>
                q.eq("userId", user.subject).eq("status", "active")
              )
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        return subscriptions
          .filter((s) => s.nextRenewalDate <= futureDate)
          .sort((a, b) => a.nextRenewalDate - b.nextRenewalDate);
      })
    ),
});

export const getTotalMonthly = query({
  args: {
    baseCurrency: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<number> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);
        const baseCurrency = args.baseCurrency ?? "USD";

        const subscriptions = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("subscriptions")
              .withIndex("by_userId_status", (q) =>
                q.eq("userId", user.subject).eq("status", "active")
              )
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        // Convert all to monthly equivalent
        let total = 0;
        for (const sub of subscriptions) {
          let monthlyAmount = sub.amount;
          switch (sub.frequency) {
            case "daily":
              monthlyAmount = sub.amount * 30;
              break;
            case "weekly":
              monthlyAmount = sub.amount * 4.33;
              break;
            case "monthly":
              monthlyAmount = sub.amount;
              break;
            case "quarterly":
              monthlyAmount = sub.amount / 3;
              break;
            case "yearly":
              monthlyAmount = sub.amount / 12;
              break;
            default:
              // Unknown frequency, skip
              monthlyAmount = 0;
              break;
          }

          if (monthlyAmount > 0) {
            const converted = yield* convertCurrency(
              ctx,
              monthlyAmount,
              sub.currency,
              baseCurrency
            );
            total += converted;
          }
        }

        return Math.round(total * 100) / 100;
      })
    ),
});
