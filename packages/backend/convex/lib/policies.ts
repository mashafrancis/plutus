import type { UserIdentity } from "convex/server";
import { Effect, Either } from "effect";
import type { UserSession } from "../schemas/auth";
import { ForbiddenError } from "../schemas/errors";
import { CurrentSession } from "./currentSession";

/**
 * Represents an access policy that can be evaluated against the current user.
 * Returns Either<O, ForbiddenError> - Right(data) if allowed, Left(error) if forbidden.
 * This allows policies to be used both as throwing operations (via orFail) and
 * as safe conditional checks (via Either.isRight).
 */
type Policy<O = UserSession, E = ForbiddenError, R = never> = Effect.Effect<
  Either.Either<O, ForbiddenError>,
  E,
  CurrentSession | R
>;

/**
 * Creates a policy from a predicate function that evaluates the current user.
 * The predicate can return Either directly or an Effect that yields Either.
 */
const policy = <O, E = never, R = never>(
  predicate: (
    session: CurrentSession["Type"]
  ) =>
    | Either.Either<O, ForbiddenError>
    | Effect.Effect<Either.Either<O, ForbiddenError>, E, R>
): Policy<O, E, R> =>
  Effect.flatMap(CurrentSession, (session) => {
    const result = predicate(session);

    // If it's an Either, wrap it in Effect.succeed
    if (Either.isEither(result)) {
      return Effect.succeed(result);
    }

    return result.pipe(
      // Never throw if `ForbiddenError` is raised inside a policy.
      // This happens often when policies use `orFail` inside them,
      // but only the top-level usage of `orFail()` should in fact fail
      Effect.catchAll((error) => {
        if (error instanceof ForbiddenError) {
          return Effect.succeed(Either.left(error));
        }
        return Effect.fail(error);
      }),
      Effect.map((either) => either)
    );
  });

/**
 * Explicitly allow access with a value.
 * Use this in policy implementations to indicate successful authorization.
 *
 * @example
 * // Simple policies (outside Effect.gen):
 * policy(() => session.isAdmin ? allow(session) : deny())
 *
 * // Inside Effect.gen (no yield* needed!):
 * if (session.userId === obj.creatorUserId) {
 *   return allow(obj)
 * }
 */
const allow = <T>(value: T) => Either.right(value);

/**
 * Explicitly deny access with an optional reason.
 * Use this in policy implementations to indicate forbidden access.
 *
 * @example
 * // Simple policies (outside Effect.gen):
 * policy(() => hasAccess ? allow(data) : deny('No access'))
 *
 * // Inside Effect.gen (no yield* needed!):
 * if (!calendar) {
 *   return deny('Calendar not found')
 * }
 */
const deny = (reason?: string) =>
  Either.left(new ForbiddenError({ message: reason }));

/**
 * Converts a policy Either into a throwing Effect.
 * Use this in mutations/actions where you want to fail the operation on forbidden access.
 *
 * @example
 * yield* Policies.orFail(requirePlatformAdmin)
 * const session = yield* Policies.orFail(requireRegularUser)
 */
const orFail = <O, E, R>(
  policy: Policy<O, E, R>
): Effect.Effect<O, ForbiddenError | E, CurrentSession | R> =>
  Effect.flatMap(
    policy,
    Either.match({
      onLeft: (error) => Effect.fail(error),
      onRight: (value) => Effect.succeed(value),
    })
  );

// CUSTOM POLICIES

const require = <T extends UserSession>(
  guard: (session: UserSession) => session is T
) => policy((session) => (guard(session) ? allow(session) : deny()));

function isSignedOut(session: UserSession): session is null {
  return session === null;
}

function isSignedIn(session: UserSession): session is UserIdentity {
  return session !== null;
}

const requireSignedOut = require(isSignedOut);
const requireSignedIn = require(isSignedIn);

export const Policies = {
  allow,
  deny,
  orFail,
  policy,
  require,
  requireSignedIn,
  requireSignedOut,
};
