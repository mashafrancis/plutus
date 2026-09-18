import { afterEach, describe, expect, it, vi } from "vite-plus/test";

import { flush, recordLog, withSpan } from "./telemetry";

describe("convex telemetry export", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("resolves the wrapped operation when the collector is unreachable", async () => {
    vi.stubGlobal("fetch", () => Promise.reject(new TypeError("fetch failed")));

    const result = await withSpan(
      "convex.handler",
      { "convex.operation": "accounts.list" },
      async () => "OK",
    );

    expect(result).toBe("OK");
  });

  it("still propagates the handler error when the collector is unreachable", async () => {
    vi.stubGlobal("fetch", () => Promise.reject(new TypeError("fetch failed")));

    await expect(
      withSpan("convex.handler", { "convex.operation": "accounts.list" }, async () => {
        throw new Error("handler failed");
      }),
    ).rejects.toThrow("handler failed");
  });

  it("reports no exported telemetry when the collector is unreachable", async () => {
    vi.stubGlobal("fetch", () => Promise.reject(new TypeError("fetch failed")));
    recordLog("telemetry export check", "INFO", { "operation.name": "test" });

    const result = await flush();

    expect(result).toEqual({ traces: 0, logs: 0, metrics: 0 });
  });
});
