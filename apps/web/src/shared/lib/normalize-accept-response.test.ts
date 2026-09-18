import { describe, expect, it } from "vite-plus/test";

import { normalizeUnsupportedAcceptResponse } from "./normalize-accept-response";

const unsupportedAcceptResponse = () =>
  Response.json({ error: "Only HTML requests are supported here" }, { status: 500 });

describe("normalizeUnsupportedAcceptResponse", () => {
  it("relabels the framework's non-HTML Accept 500 as 406 Not Acceptable", async () => {
    const response = await normalizeUnsupportedAcceptResponse(unsupportedAcceptResponse());

    expect(response.status).toBe(406);
    expect(response.statusText).toBe("Not Acceptable");
    await expect(response.json()).resolves.toEqual({
      error: "Only HTML requests are supported here",
    });
  });

  it("leaves a real server error untouched", async () => {
    const response = await normalizeUnsupportedAcceptResponse(
      Response.json({ error: "boom" }, { status: 500 }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: "boom" });
  });

  it("leaves successful responses untouched", async () => {
    const original = new Response("<html></html>", {
      status: 200,
      headers: { "content-type": "text/html" },
    });
    const response = await normalizeUnsupportedAcceptResponse(original);

    expect(response).toBe(original);
    expect(response.status).toBe(200);
  });

  it("returns a streamed non-JSON 500 untouched instead of buffering it", async () => {
    const original = new Response("<html>render error</html>", {
      status: 500,
      headers: { "content-type": "text/html" },
    });
    const response = await normalizeUnsupportedAcceptResponse(original);

    expect(response).toBe(original);
    expect(response.status).toBe(500);
    await expect(response.text()).resolves.toBe("<html>render error</html>");
  });
});
