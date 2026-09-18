import {
  trace,
  type Attributes,
  type Span,
  type Tracer,
  type TracerProvider,
} from "@opentelemetry/api";
import { beforeEach, describe, expect, it } from "vite-plus/test";

import { normalizeUnsupportedAcceptResponse } from "./normalize-accept-response";

const recordedAttributes: Attributes[] = [];

const recordingTracerProvider = (recorded: Attributes[]): TracerProvider => {
  const span = {
    setAttributes: (values: Attributes) => {
      recorded.push(values);
    },
    end: () => undefined,
  } as unknown as Span;
  const tracer = {
    startSpan: () => span,
    startActiveSpan: (...args: unknown[]) => {
      const callback = args.at(-1);
      return typeof callback === "function" ? callback(span) : undefined;
    },
  } as unknown as Tracer;

  return { getTracer: () => tracer };
};

trace.setGlobalTracerProvider(recordingTracerProvider(recordedAttributes));

const unsupportedAcceptResponse = () =>
  Response.json({ error: "Only HTML requests are supported here" }, { status: 500 });

const request = (path = "/") =>
  new Request(`https://plutus.francismasha.com${path}`, {
    headers: { accept: "application/json", "user-agent": "probe/1.0" },
  });

describe("normalizeUnsupportedAcceptResponse", () => {
  beforeEach(() => {
    recordedAttributes.length = 0;
  });

  it("relabels the framework's non-HTML Accept 500 as 406 Not Acceptable", async () => {
    const response = await normalizeUnsupportedAcceptResponse(
      unsupportedAcceptResponse(),
      request(),
    );

    expect(response.status).toBe(406);
    expect(response.statusText).toBe("Not Acceptable");
    await expect(response.json()).resolves.toEqual({
      error: "Only HTML requests are supported here",
    });
  });

  it("records the relabeled request on a content-negotiation span", async () => {
    await normalizeUnsupportedAcceptResponse(unsupportedAcceptResponse(), request("/dashboard"));

    expect(recordedAttributes).toEqual([
      {
        "url.path": "/dashboard",
        "http.request.method": "GET",
        "http.response.status_code": 406,
        "http.request.header.accept": "application/json",
        "user_agent.original": "probe/1.0",
      },
    ]);
  });

  it("leaves a real server error untouched and records no span", async () => {
    const response = await normalizeUnsupportedAcceptResponse(
      Response.json({ error: "boom" }, { status: 500 }),
      request(),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: "boom" });
    expect(recordedAttributes).toEqual([]);
  });

  it("leaves successful responses untouched", async () => {
    const original = new Response("<html></html>", {
      status: 200,
      headers: { "content-type": "text/html" },
    });
    const response = await normalizeUnsupportedAcceptResponse(original, request());

    expect(response).toBe(original);
    expect(response.status).toBe(200);
  });

  it("returns a streamed non-JSON 500 untouched instead of buffering it", async () => {
    const original = new Response("<html>render error</html>", {
      status: 500,
      headers: { "content-type": "text/html" },
    });
    const response = await normalizeUnsupportedAcceptResponse(original, request());

    expect(response).toBe(original);
    expect(response.status).toBe(500);
    await expect(response.text()).resolves.toBe("<html>render error</html>");
  });
});
