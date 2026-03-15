import type { GenericMutationCtx, GenericQueryCtx } from "convex/server";
import { ConvexError } from "convex/values";
import { Effect, Layer, Logger, LogLevel, ManagedRuntime } from "effect";

import type { DataModel } from "../_generated/dataModel";
import type { ForbiddenError, NotFoundError } from "../schemas/errors";
import { parseCurrentConvexEnvironment } from "./constants";
import { CurrentSession, fetchCurrentSession } from "./currentSession";

const MINIMUM_LOG_LEVEL = (() => {
  const environment = parseCurrentConvexEnvironment();

  if (environment === "test") {
    return LogLevel.None;
  }

  if (process.env.LOG_LEVEL === "DEBUG") {
    return LogLevel.Debug;
  }

  return LogLevel.Info;
})();

const RuntimeServer = (
  ctx: GenericQueryCtx<DataModel> | GenericMutationCtx<DataModel>
) =>
  ManagedRuntime.make(
    Layer.mergeAll(Layer.effect(CurrentSession, fetchCurrentSession(ctx)))
  );

export const runWithEffect = <A, E>(
  ctx: GenericQueryCtx<DataModel> | GenericMutationCtx<DataModel>,
  effect: Effect.Effect<A, E | ForbiddenError | NotFoundError, CurrentSession>
) =>
  RuntimeServer(ctx).runPromise(
    effect.pipe(
      Effect.catchTag("ForbiddenError", () =>
        Effect.die(new ConvexError({ kind: "authorization", status: 401 }))
      ),
      Effect.catchTag("NotFoundError", () =>
        Effect.die(new ConvexError({ kind: "not-found", status: 404 }))
      ),
      // Log unknown error for visibility
      Effect.tapError((error) => Effect.logError(error)),
      Logger.withMinimumLogLevel(MINIMUM_LOG_LEVEL)
    )
  );
