import { v } from "convex/values";
import { Effect } from "effect";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { convertCurrency, DEFAULT_BASE_CURRENCY } from "./lib/currency";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { NotFoundError, UnknownError } from "./schemas/errors";

export const list = query({
  args: { includeArchived: v.optional(v.boolean()) },
  handler: (ctx, args): Promise<Doc<"accounts">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        if (args.includeArchived) {
          return yield* Effect.tryPromise({
            try: () =>
              ctx.db
                .query("accounts")
                .withIndex("by_userId", (q) => q.eq("userId", user.subject))
                .collect(),
            catch: (error) => new UnknownError({ error }),
          });
        }

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("accounts")
              .withIndex("by_userId_archived", (q) =>
                q.eq("userId", user.subject).eq("isArchived", false)
              )
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });
      })
    ),
});

export const get = query({
  args: { id: v.id("accounts") },
  handler: (ctx, args): Promise<Doc<"accounts"> | null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!account || account.userId !== user.subject) {
          return null;
        }

        return account;
      })
    ),
});

export const create = mutation({
  args: {
    name: v.string(),
    type: v.union(
      v.literal("checking"),
      v.literal("savings"),
      v.literal("credit"),
      v.literal("cash"),
      v.literal("investment")
    ),
    currency: v.string(),
    balance: v.optional(v.number()),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<Id<"accounts">> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const accountId = yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("accounts", {
              userId: user.subject,
              name: args.name,
              type: args.type,
              currency: args.currency,
              balance: args.balance ?? 0,
              isArchived: false,
              icon: args.icon,
              color: args.color,
            }),
          catch: (error) => new UnknownError({ error }),
        });

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("activities", {
              userId: user.subject,
              type: "create_account",
              entityId: accountId,
              entityType: "account",
              description: `Created account ${args.name}`,
              timestamp: Date.now(),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return accountId;
      })
    ),
});

export const update = mutation({
  args: {
    id: v.id("accounts"),
    name: v.optional(v.string()),
    type: v.optional(
      v.union(
        v.literal("checking"),
        v.literal("savings"),
        v.literal("credit"),
        v.literal("cash"),
        v.literal("investment")
      )
    ),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!account || account.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.patch(args.id, {
              ...(args.name !== undefined && { name: args.name }),
              ...(args.type !== undefined && { type: args.type }),
              ...(args.icon !== undefined && { icon: args.icon }),
              ...(args.color !== undefined && { color: args.color }),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const updateBalance = mutation({
  args: {
    id: v.id("accounts"),
    balance: v.number(),
  },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!account || account.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, { balance: args.balance }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const adjustBalance = mutation({
  args: {
    id: v.id("accounts"),
    amount: v.number(), // Positive to add, negative to subtract
  },
  handler: (ctx, args): Promise<number> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!account || account.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        const newBalance = account.balance + args.amount;

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, { balance: newBalance }),
          catch: (error) => new UnknownError({ error }),
        });

        return newBalance;
      })
    ),
});

export const archive = mutation({
  args: { id: v.id("accounts") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!account || account.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, { isArchived: true }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const unarchive = mutation({
  args: { id: v.id("accounts") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!account || account.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, { isArchived: false }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const remove = mutation({
  args: { id: v.id("accounts") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!account || account.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        // Check for linked transactions
        const hasTransactions = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("transactions")
              .withIndex("by_accountId", (q) => q.eq("accountId", args.id))
              .first(),
          catch: (error) => new UnknownError({ error }),
        });

        if (hasTransactions) {
          // Archive instead of delete if has transactions
          yield* Effect.tryPromise({
            try: () => ctx.db.patch(args.id, { isArchived: true }),
            catch: (error) => new UnknownError({ error }),
          });
        } else {
          yield* Effect.tryPromise({
            try: () => ctx.db.delete(args.id),
            catch: (error) => new UnknownError({ error, docId: args.id }),
          });
        }

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("activities", {
              userId: user.subject,
              type: "delete_account",
              entityId: args.id,
              entityType: "account",
              description: `Deleted account ${account.name}`,
              timestamp: Date.now(),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      })
    ),
});

export const getTotalBalance = query({
  args: { baseCurrency: v.optional(v.string()) },
  handler: (
    ctx,
    args
  ): Promise<{ total: number; byCurrency: Record<string, number> }> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);
        const baseCurrency = args.baseCurrency ?? DEFAULT_BASE_CURRENCY;

        const accounts = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("accounts")
              .withIndex("by_userId_archived", (q) =>
                q.eq("userId", user.subject).eq("isArchived", false)
              )
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        const byCurrency: Record<string, number> = {};
        let total = 0;

        for (const account of accounts) {
          byCurrency[account.currency] =
            (byCurrency[account.currency] || 0) + account.balance;

          const converted = yield* convertCurrency(
            ctx,
            account.balance,
            account.currency,
            baseCurrency
          );
          total += converted;
        }

        return { total, byCurrency };
      })
    ),
});
