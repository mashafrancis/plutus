export const AUTH_BOOTSTRAP_RETRY_ATTEMPTS = 3;
export const AUTH_BOOTSTRAP_RETRY_DELAY_MS = 400;
// Hard ceiling for the whole auth bootstrap. The Convex token endpoint is called on the
// server render path, so a stalled response must never hang the root route up to the
// platform request limit (which shows up as a site-wide 504).
export const AUTH_BOOTSTRAP_TIMEOUT_MS = 5000;

export class AuthBootstrapTimeoutError extends Error {
  constructor() {
    super("Auth bootstrap timed out before the auth endpoint responded");
    this.name = "AuthBootstrapTimeoutError";
  }
}

export function isAuthBootstrapTimeoutError(error: unknown): boolean {
  return error instanceof AuthBootstrapTimeoutError;
}

export function isAuthBootstrapNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
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

  return isAuthBootstrapNetworkError(error.cause);
}

async function defaultSleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function withDeadline<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new AuthBootstrapTimeoutError()), ms);
  });

  return Promise.race([promise, timeout]).finally(() => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  });
}

export type LoadAuthTokenOptions = {
  getToken: () => Promise<string | null | undefined>;
  attempts?: number;
  retryDelayMs?: number;
  timeoutMs?: number;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
  onTransientFailure?: (error: unknown) => void;
};

/**
 * Loads the auth token without letting a slow or stalled auth endpoint block the caller.
 * Network failures and timeouts fall back to an unauthenticated start within a total
 * deadline. Any other error is rethrown so real defects are not hidden.
 */
export async function loadAuthTokenSafely({
  getToken,
  attempts = AUTH_BOOTSTRAP_RETRY_ATTEMPTS,
  retryDelayMs = AUTH_BOOTSTRAP_RETRY_DELAY_MS,
  timeoutMs = AUTH_BOOTSTRAP_TIMEOUT_MS,
  now = Date.now,
  sleep = defaultSleep,
  onTransientFailure,
}: LoadAuthTokenOptions): Promise<string | null> {
  const deadline = now() + timeoutMs;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const remainingMs = deadline - now();
    if (remainingMs <= 0) {
      break;
    }

    try {
      const token = await withDeadline(getToken(), remainingMs);
      return token ?? null;
    } catch (error) {
      const isTransient = isAuthBootstrapTimeoutError(error) || isAuthBootstrapNetworkError(error);
      if (!isTransient) {
        throw error;
      }

      const budgetMs = deadline - now();
      if (attempt < attempts && budgetMs > 0) {
        await sleep(Math.min(retryDelayMs * attempt, budgetMs));
        continue;
      }

      onTransientFailure?.(error);
      return null;
    }
  }

  return null;
}
