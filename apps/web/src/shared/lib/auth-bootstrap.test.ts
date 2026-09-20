import { afterEach, describe, expect, it, vi } from "vite-plus/test";

import {
  AUTH_BOOTSTRAP_RETRY_ATTEMPTS,
  AUTH_BOOTSTRAP_RETRY_DELAY_MS,
  AUTH_BOOTSTRAP_TIMEOUT_MS,
  loadAuthTokenSafely,
} from "./auth-bootstrap";

const activeSpan = vi.hoisted(() => ({
  addEvent: vi.fn(),
  setAttributes: vi.fn(),
}));

vi.mock("@opentelemetry/api", () => ({
  trace: {
    getActiveSpan: () => activeSpan,
  },
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe("loadAuthTokenSafely", () => {
  it("returns the token when the auth endpoint responds", async () => {
    await expect(loadAuthTokenSafely(async () => "token-123")).resolves.toBe("token-123");
  });

  it("returns null when the auth endpoint reports no session", async () => {
    await expect(loadAuthTokenSafely(async () => null)).resolves.toBeNull();
  });

  it("bounds a stalled auth request instead of waiting for it to settle", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const startedAt = Date.now();

    const token = await loadAuthTokenSafely(() => new Promise<never>(() => {}), {
      attempts: 2,
      timeoutMs: 20,
      retryDelayMs: 1,
    });

    expect(token).toBeNull();
    // Two bounded attempts plus one backoff; the stalling promise is never awaited.
    expect(Date.now() - startedAt).toBeLessThan(1000);
  });

  it("retries a transient network failure and succeeds on a later attempt", async () => {
    let calls = 0;

    const token = await loadAuthTokenSafely(
      async () => {
        calls += 1;
        if (calls < 3) {
          throw new Error("fetch failed");
        }
        return "token-after-retry";
      },
      { attempts: 3, timeoutMs: 100, retryDelayMs: 1 },
    );

    expect(calls).toBe(3);
    expect(token).toBe("token-after-retry");
  });

  it("records the per-attempt timeout on the span when a later attempt succeeds", async () => {
    activeSpan.addEvent.mockClear();
    activeSpan.setAttributes.mockClear();

    let calls = 0;

    const token = await loadAuthTokenSafely(
      async () => {
        calls += 1;
        if (calls === 1) {
          return new Promise<never>(() => {});
        }
        return "token-after-timeout";
      },
      { attempts: 3, timeoutMs: 20, retryDelayMs: 1 },
    );

    expect(token).toBe("token-after-timeout");
    expect(activeSpan.addEvent).toHaveBeenCalledWith(
      "auth.bootstrap.attempt_timeout",
      expect.objectContaining({
        "auth.bootstrap.attempt": 1,
        "auth.bootstrap.attempt_elapsed_ms": expect.any(Number),
        "auth.bootstrap.timed_out": true,
      }),
    );
    expect(activeSpan.setAttributes).toHaveBeenCalledWith(
      expect.objectContaining({
        "auth.bootstrap.outcome": "success",
        "auth.bootstrap.attempts": 2,
        "auth.bootstrap.timed_out_attempts": 1,
        "auth.bootstrap.total_elapsed_ms": expect.any(Number),
      }),
    );
  });

  it("degrades to unauthenticated startup on a non-network auth failure", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const token = await loadAuthTokenSafely(
      async () => {
        throw new Error("Convex auth endpoint responded 500");
      },
      { attempts: 3, timeoutMs: 100, retryDelayMs: 1 },
    );

    expect(token).toBeNull();
    expect(warn).toHaveBeenCalledOnce();
  });

  it("keeps the worst-case retry budget under the Lambda ceiling", () => {
    const backoffMs =
      (AUTH_BOOTSTRAP_RETRY_DELAY_MS *
        (AUTH_BOOTSTRAP_RETRY_ATTEMPTS - 1) *
        AUTH_BOOTSTRAP_RETRY_ATTEMPTS) /
      2;
    const worstCaseMs = AUTH_BOOTSTRAP_RETRY_ATTEMPTS * AUTH_BOOTSTRAP_TIMEOUT_MS + backoffMs;

    expect(worstCaseMs).toBe(8700);
    expect(worstCaseMs).toBeLessThan(10_000);
  });
});
