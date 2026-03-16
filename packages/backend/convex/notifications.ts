import { v } from "convex/values";
import { Effect } from "effect";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { NotFoundError, UnknownError } from "./schemas/errors";

export const list = query({
  args: { unreadOnly: v.optional(v.boolean()) },
  handler: (ctx, args): Promise<Doc<"notifications">[]> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        if (args.unreadOnly) {
          return yield* Effect.tryPromise({
            try: () =>
              ctx.db
                .query("notifications")
                .withIndex("by_userId_unread", (q) =>
                  q.eq("userId", user.subject).eq("isRead", false),
                )
                .order("desc")
                .collect(),
            catch: (error) => new UnknownError({ error }),
          });
        }

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("notifications")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .order("desc")
              .take(50),
          catch: (error) => new UnknownError({ error }),
        });
      }),
    ),
});

export const getUnreadCount = query({
  handler: (ctx): Promise<number> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const unread = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("notifications")
              .withIndex("by_userId_unread", (q) =>
                q.eq("userId", user.subject).eq("isRead", false),
              )
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        return unread.length;
      }),
    ),
});

export const create = mutation({
  args: {
    type: v.union(
      v.literal("subscription_renewal"),
      v.literal("goal_reached"),
      v.literal("budget_exceeded"),
      v.literal("general"),
    ),
    title: v.string(),
    message: v.string(),
    relatedId: v.optional(v.string()),
  },
  handler: (ctx, args): Promise<Id<"notifications">> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("notifications", {
              userId: user.subject,
              type: args.type,
              title: args.title,
              message: args.message,
              isRead: false,
              createdAt: Date.now(),
              relatedId: args.relatedId,
            }),
          catch: (error) => new UnknownError({ error }),
        });
      }),
    ),
});

export const markAsRead = mutation({
  args: { id: v.id("notifications") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const notification = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!notification || notification.userId !== user.subject) {
          return yield* new NotFoundError({ docId: args.id });
        }

        yield* Effect.tryPromise({
          try: () => ctx.db.patch(args.id, { isRead: true }),
          catch: (error) => new UnknownError({ error }),
        });

        return null;
      }),
    ),
});

export const markAllAsRead = mutation({
  handler: (ctx): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const unread = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("notifications")
              .withIndex("by_userId_unread", (q) =>
                q.eq("userId", user.subject).eq("isRead", false),
              )
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        yield* Effect.forEach(unread, (notification) =>
          Effect.tryPromise({
            try: () => ctx.db.patch(notification._id, { isRead: true }),
            catch: (error) => new UnknownError({ error }),
          }),
        );

        return null;
      }),
    ),
});

export const remove = mutation({
  args: { id: v.id("notifications") },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const notification = yield* Effect.tryPromise({
          try: () => ctx.db.get(args.id),
          catch: (error) => new UnknownError({ error }),
        });

        if (!notification || notification.userId !== user.subject) {
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

export const clearAll = mutation({
  handler: (ctx): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const notifications = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("notifications")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .collect(),
          catch: (error) => new UnknownError({ error }),
        });

        yield* Effect.forEach(notifications, (notification) =>
          Effect.tryPromise({
            try: () => ctx.db.delete(notification._id),
            catch: (error) => new UnknownError({ error }),
          }),
        );

        return null;
      }),
    ),
});
