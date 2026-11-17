import { describe, expect, it, vi } from "vite-plus/test";

import {
  AuthBootstrapTimeoutError,
  isAuthBootstrapNetworkError,
  isAuthBootstrapTimeoutError,
  loadAuthTokenSafely,
} from "./auth-bootstrap";

function networkError(message = "fetch failed"): Error {
  return new Error(message);
}

describe("loadAuthTokenSafely", () => {
  it("returns the token when the auth endpoint answers", async () => {
    const token = await loadAuthTokenSafely({ getToken: async () => "token-123" });

    expect(token).toBe("token-123");
  });

  it("returns null when the auth endpoint answers without a session", async () => {
    const token = await loadAuthTokenSafely({ getToken: async () => null });

    expect(token).toBeNull();
  });

  it("bounds a stalled auth endpoint and falls back to unauthenticated", async () => {
    const onTransientFailure = vi.fn();
    const startedAt = Date.now();

    const token = await loadAuthTokenSafely({
      getToken: () => new Promise<string>(() => {}),
      attempts: 3,
      timeoutMs: 60,
      sleep: async () => {},
      onTransientFailure,
    });

    expect(token).toBeNull();
    expect(Date.now() - startedAt).toBeLessThan(1000);
    expect(onTransientFailure).toHaveBeenCalledTimes(1);
    expect(isAuthBootstrapTimeoutError(onTransientFailure.mock.calls[0]?.[0])).toBe(true);
  });

  it("retries a transient network failure and succeeds on a later attempt", async () => {
    const getToken = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(networkError())
      .mockResolvedValueOnce("token-after-retry");

    const token = await loadAuthTokenSafely({ getToken, sleep: async () => {} });

    expect(token).toBe("token-after-retry");
    expect(getToken).toHaveBeenCalledTimes(2);
  });

  it("falls back to unauthenticated after retries are exhausted", async () => {
    const onTransientFailure = vi.fn();
    const getToken = vi.fn<() => Promise<string>>().mockRejectedValue(networkError());

    const token = await loadAuthTokenSafely({
      getToken,
      attempts: 3,
      sleep: async () => {},
      onTransientFailure,
    });

    expect(token).toBeNull();
    expect(getToken).toHaveBeenCalledTimes(3);
    expect(onTransientFailure).toHaveBeenCalledTimes(1);
  });

  it("does not retry a non-transient error", async () => {
    const getToken = vi.fn<() => Promise<string>>().mockRejectedValue(new Error("bad config"));

    await expect(loadAuthTokenSafely({ getToken, sleep: async () => {} })).rejects.toThrow(
      "bad config",
    );
    expect(getToken).toHaveBeenCalledTimes(1);
  });

  it("stops retrying once the total deadline is spent", async () => {
    const getToken = vi.fn<() => Promise<string>>().mockRejectedValue(networkError());
    let clock = 0;

    const token = await loadAuthTokenSafely({
      getToken,
      attempts: 10,
      retryDelayMs: 10_000,
      timeoutMs: 5_000,
      now: () => clock,
      sleep: async (ms) => {
        clock += ms;
      },
    });

    expect(token).toBeNull();
    expect(clock).toBeLessThanOrEqual(5_000);
    expect(getToken.mock.calls.length).toBeLessThan(10);
  });
});

describe("auth bootstrap error classification", () => {
  it("recognises the bootstrap timeout error", () => {
    expect(isAuthBootstrapTimeoutError(new AuthBootstrapTimeoutError())).toBe(true);
    expect(isAuthBootstrapTimeoutError(new Error("other"))).toBe(false);
  });

  it("recognises transient network errors, including a wrapped cause", () => {
    expect(isAuthBootstrapNetworkError(networkError())).toBe(true);
    expect(
      isAuthBootstrapNetworkError(Object.assign(new Error("boom"), { code: "ECONNRESET" })),
    ).toBe(true);
    expect(isAuthBootstrapNetworkError(new Error("bad config"))).toBe(false);
  });
});
