import { v } from "convex/values";
import { Effect } from "effect";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { convertCurrency, DEFAULT_BASE_CURRENCY } from "./lib/currency";
import { startOfDay } from "./lib/dates";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { NotFoundError, UnknownError } from "./schemas/errors";

export const list = query({
  handler: (ctx): Promise<Doc<"investments">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("investments")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });
      }),
    ),
});

export const get = query({
  args: { id: v.id("investments") },
  handler: (ctx, args): Promise<Doc<"investments"> | null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const investment = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!investment || investment.userId !== user.subject) {
          return null;
        }

        return investment;
      }),
    ),
});

export const create = mutation({
  args: {
    name: v.string(),
    type: v.union(
      v.literal("stock"),
      v.literal("etf"),
      v.literal("crypto"),
      v.literal("mutual_fund"),
      v.literal("bond"),
      v.literal("real_estate"),
      v.literal("other"),
    ),
    symbol: v.optional(v.string()),
    quantity: v.number(),
    purchasePrice: v.number(),
    currentPrice: v.optional(v.number()),
    currency: v.string(),
    purchaseDate: v.number(),
    accountId: v.optional(v.id("accounts")),
    notes: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<Id<"investments">> =>
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

        const investmentId = yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("investments", {
              userId: user.subject,
              name: args.name,
              type: args.type,
              symbol: args.symbol,
              quantity: args.quantity,
              purchasePrice: args.purchasePrice,
              currentPrice: args.currentPrice ?? args.purchasePrice,
              currency: args.currency,
              purchaseDate: args.purchaseDate,
              accountId: args.accountId,
              notes: args.notes,
            }),
          catch: (error) => new UnknownError({ error }),
        });

        // Create initial snapshot
        const now = startOfDay(Date.now());
        const currentPrice = args.currentPrice ?? args.purchasePrice;

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("investmentSnapshots", {
              investmentId,
              userId: user.subject,
              price: currentPrice,
              totalValue: currentPrice * args.quantity,
              date: now,
            }),
          catch: (error) => new UnknownError({ error }),
        });

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("activities", {
              userId: user.subject,
              type: "create_investment",
              entityId: investmentId,
              entityType: "investment",
              description: `Created investment ${args.name}`,
              timestamp: Date.now(),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return investmentId;
      }),
    ),
});

export const update = mutation({
  args: {
    id: v.id("investments"),
    name: v.optional(v.string()),
    quantity: v.optional(v.number()),
    currentPrice: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const investment = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!investment || investment.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        const updates: Partial<Doc<"investments">> = {};
        if (args.name !== undefined) {
          updates.name = args.name;
        }
        if (args.quantity !== undefined) {
          updates.quantity = args.quantity;
        }
        if (args.currentPrice !== undefined) {
          updates.currentPrice = args.currentPrice;
        }
        if (args.notes !== undefined) {
          updates.notes = args.notes;
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, updates),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      }),
    ),
});

export const updatePrice = mutation({
  args: {
    id: v.id("investments"),
    currentPrice: v.number(),
  },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const investment = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!investment || investment.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, { currentPrice: args.currentPrice }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      }),
    ),
});

export const remove = mutation({
  args: { id: v.id("investments") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const investment = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!investment || investment.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        // Delete all snapshots
        const snapshots = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("investmentSnapshots")
              .withIndex("by_investmentId", (q) => q.eq("investmentId", args.id))
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        yield* Effect.forEach(snapshots, (snapshot) =>
          Effect.tryPromise({
            try: () => ctx.db.delete(snapshot._id),
            catch: (error) => new UnknownError({ error }),
          }),
        );

        yield* Effect.tryPromise({
          try: () => ctx.db.delete(args.id),
          catch: (error) => new UnknownError({ error, docId: args.id }),
        });

        yield* Effect.tryPromise({
          try: () => ctx.db.delete(args.id),
          catch: (error) => new UnknownError({ error, docId: args.id }),
        });

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("activities", {
              userId: user.subject,
              type: "delete_investment",
              entityId: args.id,
              entityType: "investment",
              description: `Deleted investment ${investment.name}`,
              timestamp: Date.now(),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      }),
    ),
});

export const getSnapshots = query({
  args: {
    investmentId: v.id("investments"),
    days: v.optional(v.number()),
  },
  handler: (ctx, args): Promise<Doc<"investmentSnapshots">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);
        const days = args.days ?? 30;
        const startDate = startOfDay(Date.now() - days * 24 * 60 * 60 * 1000);

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("investmentSnapshots")
              .withIndex("by_userId_date", (q) =>
                q.eq("userId", user.subject).gte("date", startDate),
              )
              .filter((q) => q.eq(q.field("investmentId"), args.investmentId))
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });
      }),
    ),
});

export const getPortfolioSummary = query({
  args: {
    baseCurrency: v.optional(v.string()),
  },
  handler: (
    ctx,
    args,
  ): Promise<{
    totalValue: number;
    totalCost: number;
    totalGain: number;
    gainPercent: number;
    investments: Array<{
      id: Id<"investments">;
      name: string;
      type: string;
      value: number;
      gain: number;
      gainPercent: number;
      currency: string;
    }>;
  }> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);
        const baseCurrency = args.baseCurrency ?? DEFAULT_BASE_CURRENCY;

        const investments = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("investments")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        let totalValue = 0;
        let totalCost = 0;

        const details = yield* Effect.forEach(investments, (inv) =>
          Effect.gen(function* () {
            // Raw values in investment's currency
            const valueRaw = inv.currentPrice * inv.quantity;
            const costRaw = inv.purchasePrice * inv.quantity;
            const gainRaw = valueRaw - costRaw;
            const gainPercentRaw = costRaw > 0 ? (gainRaw / costRaw) * 100 : 0;

            // Converted values for total portfolio calculation
            const valueConverted = yield* convertCurrency(
              ctx,
              valueRaw,
              inv.currency,
              baseCurrency,
            );
            const costConverted = yield* convertCurrency(ctx, costRaw, inv.currency, baseCurrency);

            // Accumulate totals
            totalValue += valueConverted;
            totalCost += costConverted;

            return {
              id: inv._id,
              name: inv.name,
              type: inv.type,
              value: valueRaw, // Return raw value
              gain: gainRaw, // Return raw gain
              gainPercent: Math.round(gainPercentRaw * 100) / 100,
              currency: inv.currency,
              convertedValue: valueConverted, // Used for sorting
            };
          }),
        );

        const totalGain = totalValue - totalCost;
        const gainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;

        return {
          totalValue: Math.round(totalValue * 100) / 100,
          totalCost: Math.round(totalCost * 100) / 100,
          totalGain: Math.round(totalGain * 100) / 100,
          gainPercent: Math.round(gainPercent * 100) / 100,
          investments: details
            .map(({ convertedValue, ...rest }) => rest)
            .sort((a, b) => {
              // Sort by converted value to keep meaningful order across currencies
              const aConverted = details.find((d) => d.id === a.id)?.convertedValue;
              const bConverted = details.find((d) => d.id === b.id)?.convertedValue;
              return (bConverted ?? 0) - (aConverted ?? 0);
            }),
        };
      }),
    ),
});
