import { v } from "convex/values";
import { Effect } from "effect";
import type { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { UnknownError } from "./schemas/errors";

const DEFAULT_SETTINGS = {
  baseCurrency: "USD",
  notificationsEnabled: true,
  emailNotifications: false,
  dashboardDateRange: 30,
  onboardingCompleted: false,
  onboardingStep: 0,
};

export const get = query({
  handler: (ctx): Promise<Doc<"userSettings"> | null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("userSettings")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .first(),
          catch: (error) => new UnknownError({ error }),
        });
      })
    ),
});

export const getOrCreate = query({
  handler: (ctx): Promise<Doc<"userSettings">> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const existing = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("userSettings")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .first(),
          catch: (error) => new UnknownError({ error }),
        });

        if (existing) {
          return existing;
        }

        // Return default settings (will be created on first update)
        return {
          _id: "" as Id<"userSettings">,
          _creationTime: Date.now(),
          userId: user.subject,
          ...DEFAULT_SETTINGS,
        } as Doc<"userSettings">;
      })
    ),
});

export const update = mutation({
  args: {
    baseCurrency: v.optional(v.string()),
    defaultAccountId: v.optional(v.id("accounts")),
    notificationsEnabled: v.optional(v.boolean()),
    emailNotifications: v.optional(v.boolean()),
    dashboardDateRange: v.optional(v.number()),
    onboardingCompleted: v.optional(v.boolean()),
    onboardingStep: v.optional(v.number()),
  },
  handler: (ctx, args): Promise<Id<"userSettings">> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const existing = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("userSettings")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .first(),
          catch: (error) => new UnknownError({ error }),
        });

        if (existing) {
          // Update existing settings
          yield* Effect.tryPromise({
            try: () =>
              ctx.db.patch(existing._id, {
                ...(args.baseCurrency !== undefined && {
                  baseCurrency: args.baseCurrency,
                }),
                ...(args.defaultAccountId !== undefined && {
                  defaultAccountId: args.defaultAccountId,
                }),
                ...(args.notificationsEnabled !== undefined && {
                  notificationsEnabled: args.notificationsEnabled,
                }),
                ...(args.emailNotifications !== undefined && {
                  emailNotifications: args.emailNotifications,
                }),
                ...(args.dashboardDateRange !== undefined && {
                  dashboardDateRange: args.dashboardDateRange,
                }),
                ...(args.onboardingCompleted !== undefined && {
                  onboardingCompleted: args.onboardingCompleted,
                }),
                ...(args.onboardingStep !== undefined && {
                  onboardingStep: args.onboardingStep,
                }),
              }),
            catch: (error) => new UnknownError({ error }),
          });

          return existing._id;
        }

        // Create new settings
        return yield* Effect.tryPromise({
          try: () =>
            ctx.db.insert("userSettings", {
              userId: user.subject,
              baseCurrency: args.baseCurrency ?? DEFAULT_SETTINGS.baseCurrency,
              defaultAccountId: args.defaultAccountId,
              notificationsEnabled:
                args.notificationsEnabled ??
                DEFAULT_SETTINGS.notificationsEnabled,
              emailNotifications:
                args.emailNotifications ?? DEFAULT_SETTINGS.emailNotifications,
              dashboardDateRange:
                args.dashboardDateRange ?? DEFAULT_SETTINGS.dashboardDateRange,
              onboardingCompleted:
                args.onboardingCompleted ??
                DEFAULT_SETTINGS.onboardingCompleted,
              onboardingStep:
                args.onboardingStep ?? DEFAULT_SETTINGS.onboardingStep,
            }),
          catch: (error) => new UnknownError({ error }),
        });
      })
    ),
});

export const setBaseCurrency = mutation({
  args: { currency: v.string() },
  handler: (ctx, args): Promise<null> =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);

        const existing = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("userSettings")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .first(),
          catch: (error) => new UnknownError({ error }),
        });

        if (existing) {
          yield* Effect.tryPromise({
            try: () =>
              ctx.db.patch(existing._id, { baseCurrency: args.currency }),
            catch: (error) => new UnknownError({ error }),
          });
        } else {
          yield* Effect.tryPromise({
            try: () =>
              ctx.db.insert("userSettings", {
                userId: user.subject,
                baseCurrency: args.currency,
                notificationsEnabled: DEFAULT_SETTINGS.notificationsEnabled,
                emailNotifications: DEFAULT_SETTINGS.emailNotifications,
                dashboardDateRange: DEFAULT_SETTINGS.dashboardDateRange,
                onboardingCompleted: DEFAULT_SETTINGS.onboardingCompleted,
                onboardingStep: DEFAULT_SETTINGS.onboardingStep,
              }),
            catch: (error) => new UnknownError({ error }),
          });
        }

        return null;
      })
    ),
});

export const setDefaultAccount = mutation({
  args: { accountId: v.id("accounts") },
  handler: (ctx, args): Promise<null> =>
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
          return null; // Silently ignore invalid account
        }

        const existing = yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("userSettings")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .first(),
          catch: (error) => new UnknownError({ error }),
        });

        if (existing) {
          yield* Effect.tryPromise({
            try: () =>
              ctx.db.patch(existing._id, { defaultAccountId: args.accountId }),
            catch: (error) => new UnknownError({ error }),
          });
        } else {
          yield* Effect.tryPromise({
            try: () =>
              ctx.db.insert("userSettings", {
                userId: user.subject,
                baseCurrency: DEFAULT_SETTINGS.baseCurrency,
                defaultAccountId: args.accountId,
                notificationsEnabled: DEFAULT_SETTINGS.notificationsEnabled,
                emailNotifications: DEFAULT_SETTINGS.emailNotifications,
                dashboardDateRange: DEFAULT_SETTINGS.dashboardDateRange,
                onboardingCompleted: DEFAULT_SETTINGS.onboardingCompleted,
                onboardingStep: DEFAULT_SETTINGS.onboardingStep,
              }),
            catch: (error) => new UnknownError({ error }),
          });
        }

        return null;
      })
    ),
});
