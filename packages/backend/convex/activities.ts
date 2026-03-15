import { v } from "convex/values";
// Trigger rebuild
import { Effect } from "effect";
import { query } from "./_generated/server";
import { Policies } from "./lib/policies";
import { runWithEffect } from "./lib/runtime";
import { UnknownError } from "./schemas/errors";

export const get = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: (ctx, args) =>
    runWithEffect(
      ctx,
      Effect.gen(function* () {
        const user = yield* Policies.orFail(Policies.requireSignedIn);
        const limit = args.limit ?? 20;

        return yield* Effect.tryPromise({
          try: () =>
            ctx.db
              .query("activities")
              .withIndex("by_userId", (q) => q.eq("userId", user.subject))
              .order("desc")
              .take(limit),
          catch: (error) => new UnknownError({ error }),
        });
      })
    ),
});
