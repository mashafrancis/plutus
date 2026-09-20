/**
 * Bounds and isolates the SSR auth bootstrap.
 *
 * The root route's `beforeLoad` runs on every render, and it fetches an auth
 * token from the Convex auth endpoint. A request that never settles would hold
 * the Vercel Lambda until the platform ceiling (~10s) and the visitor would get
 * a 504. Each attempt is therefore raced against a timeout, and any bootstrap
 * failure degrades to an unauthenticated render instead of throwing into the
 * root error component and replacing every route with an error page. Terminal
 * failures are handed to the caller's `onTerminalError` sink so the degradation
 * stays observable without an error page.
 *
 * Worst case: 3 attempts x 2500ms timeout + 400ms + 800ms backoff = 8700ms,
 * which stays under the Lambda ceiling.
 */
export const AUTH_BOOTSTRAP_TIMEOUT_MS = 2500;
export const AUTH_BOOTSTRAP_RETRY_ATTEMPTS = 3;
export const AUTH_BOOTSTRAP_RETRY_DELAY_MS = 400;

const AUTH_BOOTSTRAP_TIMEOUT_MESSAGE = "auth bootstrap request timed out";

export interface AuthBootstrapOptions {
  timeoutMs?: number;
  attempts?: number;
  retryDelayMs?: number;
  /**
   * Sink for terminal bootstrap failures, so the caller can report them to its
   * observability layer (Sentry/OTel). The module stays dependency-free and
   * unit-testable because reporting is injected rather than imported.
   */
  onTerminalError?: (error: unknown) => void;
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
): Promise<string | null> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<never>((_resolve, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(AUTH_BOOTSTRAP_TIMEOUT_MESSAGE));
    }, timeoutMs);
  });

  try {
    return (await Promise.race([getToken(), timeout])) ?? null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function reportTerminalAuthBootstrapError(
  error: unknown,
  onTerminalError?: (error: unknown) => void,
): void {
  console.warn(
    "[auth] Falling back to unauthenticated startup after auth bootstrap failure.",
    error,
  );
  onTerminalError?.(error);
}

export async function loadAuthTokenSafely(
  getToken: AuthTokenFetcher,
  options: AuthBootstrapOptions = {},
): Promise<string | null> {
  const {
    timeoutMs = AUTH_BOOTSTRAP_TIMEOUT_MS,
    attempts = AUTH_BOOTSTRAP_RETRY_ATTEMPTS,
    retryDelayMs = AUTH_BOOTSTRAP_RETRY_DELAY_MS,
    onTerminalError,
  } = options;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fetchAuthTokenWithTimeout(getToken, timeoutMs);
    } catch (error) {
      const shouldRetry = isRetryableAuthBootstrapError(error) && attempt < attempts;

      if (shouldRetry) {
        await sleep(retryDelayMs * attempt);
        continue;
      }

      reportTerminalAuthBootstrapError(error, onTerminalError);
      return null;
    }
  }

  return null;
}
