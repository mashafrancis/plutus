import { v } from "convex/values";
import { Effect } from "effect";

import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { NotFoundError, UnknownError } from "./schemas/errors";

// Default categories to seed for new users
const DEFAULT_CATEGORIES = [
  { name: "Food", icon: "🍔", color: "#ef4444", type: "expense" as const },
  { name: "Transport", icon: "🚗", color: "#f97316", type: "expense" as const },
  { name: "Bills", icon: "📄", color: "#eab308", type: "expense" as const },
  {
    name: "Entertainment",
    icon: "🎮",
    color: "#22c55e",
    type: "expense" as const,
  },
  { name: "Shopping", icon: "🛍️", color: "#06b6d4", type: "expense" as const },
  { name: "Health", icon: "💊", color: "#3b82f6", type: "expense" as const },
  { name: "Utilities", icon: "💡", color: "#8b5cf6", type: "expense" as const },
  { name: "Income", icon: "💰", color: "#10b981", type: "income" as const },
];

export const list = query({
  handler: (ctx): Promise<Doc<"categories">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("categories")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });
      }),
    ),
});

export const listByType = query({
  args: { type: v.union(v.literal("expense"), v.literal("income")) },
  handler: (ctx, args): Promise<Doc<"categories">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("categories")
              .withIndex("by_userId_type", (q) =>
                q.eq("userId", user.subject).eq("type", args.type),
              )
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });
      }),
    ),
});

export const get = query({
  args: { id: v.id("categories") },
  handler: (ctx, args): Promise<Doc<"categories"> | null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const category = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!category || category.userId !== user.subject) {
          return null;
        }

        return category;
      }),
    ),
});

export const create = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
    color: v.string(),
    type: v.union(v.literal("expense"), v.literal("income")),
  },
  handler: (ctx, args): Promise<Id<"categories">> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("categories", {
              userId: user.subject,
              name: args.name,
              icon: args.icon,
              color: args.color,
              type: args.type,
              isDefault: false,
            }),
          catch: (error) => new UnknownError({ error }),
        });
      }),
    ),
});

export const update = mutation({
  args: {
    id: v.id("categories"),
    name: v.optional(v.string()),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const category = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!category || category.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () =>
            ctx.db.patch(args.id, {
              ...(args.name !== undefined && { name: args.name }),
              ...(args.icon !== undefined && { icon: args.icon }),
              ...(args.color !== undefined && { color: args.color }),
            }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      }),
    ),
});

export const remove = mutation({
  args: { id: v.id("categories") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const category = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!category || category.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.delete(args.id),
          catch: (error) => new UnknownError({ error, docId: args.id }),
        });

        return null;
      }),
    ),
});

export const seedDefaultCategories = mutation({
  handler: (ctx): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        // Check if user already has categories
        const existing = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("categories")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .first(),
          catch: (error) => new UnknownError({ error }),
        });

        if (existing) {
          return null; // Already seeded
        }

        // Insert all default categories
        yield* Effect.forEach(DEFAULT_CATEGORIES, (cat) =>
          Effect.tryPromise({
            try: () =>
              ctx.db.insert("categories", {
                userId: user.subject,
                name: cat.name,
                icon: cat.icon,
                color: cat.color,
                type: cat.type,
                isDefault: true,
              }),
            catch: (error) => new UnknownError({ error }),
          }),
        );

        return null;
      }),
    ),
});
