/**
 * Bounds and isolates the SSR auth bootstrap.
 *
 * The root route's `beforeLoad` runs on every render, and it fetches an auth
 * token from the Convex auth endpoint. A request that never settles would hold
 * the Vercel Lambda until the platform ceiling (~10s) and the visitor would get
 * a 504. Each attempt is therefore raced against a timeout, and any bootstrap
 * failure degrades to an unauthenticated render instead of throwing into the
 * root error component and replacing every route with an error page.
 *
 * Worst case: 3 attempts x 2500ms timeout + 400ms + 800ms backoff = 8700ms,
 * which stays under the Lambda ceiling.
 */
import { trace } from "@opentelemetry/api";

export const AUTH_BOOTSTRAP_TIMEOUT_MS = 2500;
export const AUTH_BOOTSTRAP_RETRY_ATTEMPTS = 3;
export const AUTH_BOOTSTRAP_RETRY_DELAY_MS = 400;

const AUTH_BOOTSTRAP_TIMEOUT_MESSAGE = "auth bootstrap request timed out";
const AUTH_BOOTSTRAP_ATTEMPT_TIMEOUT_EVENT = "auth.bootstrap.attempt_timeout";

export type AuthBootstrapOutcome = "success" | "unauthenticated" | "failed";

export interface AuthBootstrapOptions {
  timeoutMs?: number;
  attempts?: number;
  retryDelayMs?: number;
}

type AuthTokenFetcher = () => Promise<string | null | undefined>;

export function isRetryableAuthBootstrapError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  // A per-attempt timeout is treated as a transient failure so the next
  // attempt still gets a chance to reach the auth endpoint.
  if (error.message === AUTH_BOOTSTRAP_TIMEOUT_MESSAGE) {
    return true;
  }

  const errorCode = "code" in error ? String((error as { code?: string }).code ?? "") : "";
  const message = error.message.toLowerCase();

  if (
    message.includes("fetch failed") ||
    message.includes("failed to fetch") ||
    message.includes("networkerror") ||
    errorCode === "ECONNREFUSED" ||
    errorCode === "ECONNRESET" ||
    errorCode === "ENOTFOUND" ||
    errorCode === "ETIMEDOUT"
  ) {
    return true;
  }

  return isRetryableAuthBootstrapError(error.cause);
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAuthTokenWithTimeout(
  getToken: AuthTokenFetcher,
  timeoutMs: number,
  attempt: number,
): Promise<string | null> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const startedAt = Date.now();

  const timeout = new Promise<never>((_resolve, reject) => {
    timeoutId = setTimeout(() => {
      // A single attempt that times out and is then retried successfully is the
      // earliest visible sign of a degrading auth endpoint. Record it on the
      // request span so it is queryable even when the bootstrap recovers.
      trace.getActiveSpan()?.addEvent(AUTH_BOOTSTRAP_ATTEMPT_TIMEOUT_EVENT, {
        "auth.bootstrap.attempt": attempt,
        "auth.bootstrap.attempt_elapsed_ms": Date.now() - startedAt,
        "auth.bootstrap.timed_out": true,
      });
      reject(new Error(AUTH_BOOTSTRAP_TIMEOUT_MESSAGE));
    }, timeoutMs);
  });

  try {
    return (await Promise.race([getToken(), timeout])) ?? null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function loadAuthTokenSafely(
  getToken: AuthTokenFetcher,
  options: AuthBootstrapOptions = {},
): Promise<string | null> {
  const {
    timeoutMs = AUTH_BOOTSTRAP_TIMEOUT_MS,
    attempts = AUTH_BOOTSTRAP_RETRY_ATTEMPTS,
    retryDelayMs = AUTH_BOOTSTRAP_RETRY_DELAY_MS,
  } = options;

  const startedAt = Date.now();
  let attemptsUsed = 0;
  let timedOutAttempts = 0;
  let outcome: AuthBootstrapOutcome = "failed";

  try {
    for (let attempt = 1; attempt <= attempts; attempt++) {
      attemptsUsed = attempt;

      try {
        const token = await fetchAuthTokenWithTimeout(getToken, timeoutMs, attempt);
        outcome = token ? "success" : "unauthenticated";
        return token;
      } catch (error) {
        if (error instanceof Error && error.message === AUTH_BOOTSTRAP_TIMEOUT_MESSAGE) {
          timedOutAttempts += 1;
        }

        const shouldRetry = isRetryableAuthBootstrapError(error) && attempt < attempts;

        if (shouldRetry) {
          await sleep(retryDelayMs * attempt);
          continue;
        }

        console.warn(
          "[auth] Falling back to unauthenticated startup after auth bootstrap failure.",
          error,
        );
        return null;
      }
    }

    return null;
  } finally {
    // Summarise the whole bootstrap on the request span: an operator can filter
    // on `auth.bootstrap.timed_out_attempts > 0` to quantify a degrading Convex
    // auth endpoint before it takes every attempt down.
    trace.getActiveSpan()?.setAttributes({
      "auth.bootstrap.outcome": outcome,
      "auth.bootstrap.attempts": attemptsUsed,
      "auth.bootstrap.timed_out_attempts": timedOutAttempts,
      "auth.bootstrap.total_elapsed_ms": Date.now() - startedAt,
    });
  }
}
