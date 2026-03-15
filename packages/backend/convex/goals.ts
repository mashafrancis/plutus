import { v } from "convex/values";
import { Effect } from "effect";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { NotFoundError, UnknownError } from "./schemas/errors";

export const list = query({
  args: { includeCompleted: v.optional(v.boolean()) },
  handler: (ctx, args): Promise<Doc<"goals">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        if (args.includeCompleted) {
          return yield* Effect.tryPromise({
            try: () =>
              ctx.db
                .query("goals")
                .withIndex("by_userId", (q) => q.eq("userId", user.subject))
                .collect(),
            catch: (error) => new UnknownError({ error }),
          });
        }

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("goals")
              .withIndex("by_userId_completed", (q) =>
                q.eq("userId", user.subject).eq("isCompleted", false)
              )
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });
      })
    ),
});

export const get = query({
  args: { id: v.id("goals") },
  handler: (ctx, args): Promise<Doc<"goals"> | null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const goal = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!goal || goal.userId !== user.subject) {
          return null;
        }

        return goal;
      })
    ),
});

export const create = mutation({
  args: {
    name: v.string(),
    targetAmount: v.number(),
    currentAmount: v.optional(v.number()),
    currency: v.string(),
    targetDate: v.optional(v.number()),
    accountId: v.optional(v.id("accounts")),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<Id<"goals">> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        // Validate account ownership if provided
        if (args.accountId) {
          const accountId = args.accountId;
          const account = yield* Effect.tryPromise({
            try: () => ctx.db.get(accountId),
            catch: (error) => new UnknownError({ error }),
          });

          if (!account || account.userId !== user.subject) {
            return yield* new NotFoundError({ docId: accountId });
          }
        }

        const goalId = yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("goals", {
              userId: user.subject,
              name: args.name,
              targetAmount: args.targetAmount,
              currentAmount: args.currentAmount ?? 0,
              currency: args.currency,
              targetDate: args.targetDate,
              accountId: args.accountId,
              icon: args.icon,
              color: args.color,
              isCompleted: false,
            }),
          catch: (error) => new UnknownError({ error }),
        });

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("activities", {
              userId: user.subject,
              type: "create_goal",
              entityId: goalId,
              entityType: "goal",
              description: `Created goal ${args.name}`,
              timestamp: Date.now(),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return goalId;
      })
    ),
});

export const update = mutation({
  args: {
    id: v.id("goals"),
    name: v.optional(v.string()),
    targetAmount: v.optional(v.number()),
    currentAmount: v.optional(v.number()),
    targetDate: v.optional(v.number()),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const goal = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!goal || goal.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        const updates: Partial<Doc<"goals">> = {};
        if (args.name !== undefined) {
          updates.name = args.name;
        }
        if (args.targetAmount !== undefined) {
          updates.targetAmount = args.targetAmount;
        }
        if (args.currentAmount !== undefined) {
          updates.currentAmount = args.currentAmount;
        }
        if (args.targetDate !== undefined) {
          updates.targetDate = args.targetDate;
        }
        if (args.icon !== undefined) {
          updates.icon = args.icon;
        }
        if (args.color !== undefined) {
          updates.color = args.color;
        }

        // Check if goal is now completed
        const newCurrentAmount = args.currentAmount ?? goal.currentAmount;
        const newTargetAmount = args.targetAmount ?? goal.targetAmount;
        if (newCurrentAmount >= newTargetAmount) {
          updates.isCompleted = true;
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, updates),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const addProgress = mutation({
  args: {
    id: v.id("goals"),
    amount: v.number(),
  },
  handler: (ctx, args): Promise<{ newAmount: number; isCompleted: boolean }> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const goal = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!goal || goal.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        const newAmount = goal.currentAmount + args.amount;
        const isCompleted = newAmount >= goal.targetAmount;

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.patch(args.id, {
              currentAmount: newAmount,
              isCompleted,
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return { newAmount, isCompleted };
      })
    ),
});

export const markComplete = mutation({
  args: { id: v.id("goals") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const goal = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!goal || goal.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, { isCompleted: true }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const remove = mutation({
  args: { id: v.id("goals") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const goal = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!goal || goal.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.delete(args.id),
          catch: (error) => new UnknownError({ error, docId: args.id }),
        });

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("activities", {
              userId: user.subject,
              type: "delete_goal",
              entityId: args.id,
              entityType: "goal",
              description: `Deleted goal ${goal.name}`,
              timestamp: Date.now(),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});
