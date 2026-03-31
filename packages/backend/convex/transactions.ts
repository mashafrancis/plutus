import { v } from "convex/values";
import { Effect } from "effect";

import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { convertCurrency } from "./lib/currency";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { NotFoundError, UnknownError } from "./schemas/errors";

export const list = query({
  args: {
    limit: v.optional(v.number()),
    accountId: v.optional(v.id("accounts")),
    categoryId: v.optional(v.id("categories")),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    type: v.optional(v.union(v.literal("expense"), v.literal("income"), v.literal("transfer"))),
  },
  handler: (ctx, args): Promise<Doc<"transactions">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        let transactions = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("transactions")
              .withIndex("by_userId_date", (q) => {
                const range = q.eq("userId", user.subject);
                if (args.startDate !== undefined && args.endDate !== undefined) {
                  return range.gte("date", args.startDate).lte("date", args.endDate);
                }
                if (args.startDate !== undefined) {
                  return range.gte("date", args.startDate);
                }
                if (args.endDate !== undefined) {
                  return range.lte("date", args.endDate);
                }
                return range;
              })
              .order("desc")
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        // Apply additional filters
        if (args.accountId) {
          transactions = transactions.filter((t) => t.accountId === args.accountId);
        }
        if (args.categoryId) {
          transactions = transactions.filter((t) => t.categoryId === args.categoryId);
        }
        if (args.type) {
          transactions = transactions.filter((t) => t.type === args.type);
        }

        if (args.limit) {
          transactions = transactions.slice(0, args.limit);
        }

        return transactions;
      }),
    ),
});

export const get = query({
  args: { id: v.id("transactions") },
  handler: (ctx, args): Promise<Doc<"transactions"> | null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const transaction = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!transaction || transaction.userId !== user.subject) {
          return null;
        }

        return transaction;
      }),
    ),
});

export const create = mutation({
  args: {
    accountId: v.id("accounts"),
    categoryId: v.id("categories"),
    type: v.union(v.literal("expense"), v.literal("income"), v.literal("transfer")),
    amount: v.number(),
    currency: v.string(),
    description: v.string(),
    date: v.number(),
    toAccountId: v.optional(v.id("accounts")),
    subscriptionId: v.optional(v.id("subscriptions")),
    notes: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<Id<"transactions">> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        // Get account to validate ownership and get currency
        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.accountId),
          catch: (error) => new UnknownError({ error }),
        });

        if (!account || account.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.accountId });
        }

        // Convert currency if needed
        const convertedAmount = yield* convertCurrency(
          ctx,
          args.amount,
          args.currency,
          account.currency,
        );

        // Insert transaction
        const transactionId = yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("transactions", {
              userId: user.subject,
              accountId: args.accountId,
              categoryId: args.categoryId,
              type: args.type,
              amount: args.amount,
              currency: args.currency,
              convertedAmount,
              description: args.description,
              date: args.date,
              toAccountId: args.toAccountId,
              subscriptionId: args.subscriptionId,
              notes: args.notes,
            }),
          catch: (error) => new UnknownError({ error }),
        });

        // Update account balance
        const balanceAdjustment = args.type === "income" ? convertedAmount : -convertedAmount;

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.patch(args.accountId, {
              balance: account.balance + balanceAdjustment,
            }),
          catch: (error) => new UnknownError({ error }),
        });

        // Handle transfer to destination account
        if (args.type === "transfer" && args.toAccountId) {
          const toAccountId = args.toAccountId;
          const toAccount = yield* Effect.tryPromise({
            try: () => ctx.db.get(toAccountId),
            catch: (error) => new UnknownError({ error }),
          });

          if (toAccount && toAccount.userId === user.subject) {
            const toConvertedAmount = yield* convertCurrency(
              ctx,
              args.amount,
              args.currency,
              toAccount.currency,
            );

            yield* Effect.tryPromise({
              try: () =>
                ctx.db.patch(toAccountId, {
                  balance: toAccount.balance + toConvertedAmount,
                }),
              catch: (error) => new UnknownError({ error }),
            });
          }
        }

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("activities", {
              userId: user.subject,
              type: "create_transaction",
              entityId: transactionId,
              entityType: "transaction",
              description: `Created transaction for ${args.amount} ${args.currency}`,
              timestamp: Date.now(),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return transactionId;
      }),
    ),
});

export const update = mutation({
  args: {
    id: v.id("transactions"),
    categoryId: v.optional(v.id("categories")),
    description: v.optional(v.string()),
    date: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const transaction = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!transaction || transaction.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.patch(args.id, {
              ...(args.categoryId !== undefined && {
                categoryId: args.categoryId,
              }),
              ...(args.description !== undefined && {
                description: args.description,
              }),
              ...(args.date !== undefined && { date: args.date }),
              ...(args.notes !== undefined && { notes: args.notes }),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      }),
    ),
});

export const remove = mutation({
  args: { id: v.id("transactions") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const transaction = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!transaction || transaction.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        // Reverse balance change on account
        const account = yield* Effect.tryPromise({
          try: () => ctx.db.get(transaction.accountId),
          catch: (error) => new UnknownError({ error }),
        });

        if (account) {
          const reverseAdjustment =
            transaction.type === "income"
              ? -transaction.convertedAmount
              : transaction.convertedAmount;

          yield* Effect.tryPromise({
            try: () =>
              ctx.db.patch(transaction.accountId, {
                balance: account.balance + reverseAdjustment,
              }),
            catch: (error) => new UnknownError({ error }),
          });
        }

        // Reverse transfer destination if applicable
        if (transaction.type === "transfer" && transaction.toAccountId) {
          const toAccountId = transaction.toAccountId;
          const toAccount = yield* Effect.tryPromise({
            try: () => ctx.db.get(toAccountId),
            catch: (error) => new UnknownError({ error }),
          });

          if (toAccount) {
            // Calculate what was added to destination
            const toConvertedAmount = yield* convertCurrency(
              ctx,
              transaction.amount,
              transaction.currency,
              toAccount.currency,
            );

            yield* Effect.tryPromise({
              try: () =>
                ctx.db.patch(toAccountId, {
                  balance: toAccount.balance - toConvertedAmount,
                }),
              catch: (error) => new UnknownError({ error }),
            });
          }
        }

        // Delete transaction
        yield* Effect.tryPromise({
          try: () => ctx.db.delete(args.id),
          catch: (error) => new UnknownError({ error, docId: args.id }),
        });

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("activities", {
              userId: user.subject,
              type: "delete_transaction",
              entityId: args.id,
              entityType: "transaction",
              description: "Deleted transaction",
              timestamp: Date.now(),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      }),
    ),
});

export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: (ctx, args): Promise<Doc<"transactions">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("transactions")
              .withIndex("by_userId_date", (q) => q.eq("userId", user.subject))
              .order("desc")
              .take(args.limit ?? 10),
          catch: (error) => new UnknownError({ error }),
        });
      }),
    ),
});
