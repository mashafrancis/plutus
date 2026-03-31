import { Effect } from "effect";

import { query } from "./_generated/server";
import { runWithEffect } from "./lib/runtime";

export const get = query({
  handler: (ctx) => runWithEffect(ctx, Effect.succeed("OK")),
});
