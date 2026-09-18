import type { Attributes } from "@opentelemetry/api";
import { withSpan } from "@superlog/otel-helpers";

/**
 * TanStack Start answers any non-document request to a page route with
 * `500 {"error":"Only HTML requests are supported here"}` when the `Accept`
 * header is not an HTML document request (it includes neither `text/html`
 * nor a wildcard media range).
 *
 * Returning 5xx for a client-side content negotiation failure is wrong: it
 * reports a healthy server as broken, pollutes error telemetry, and invites
 * retries from crawlers and scanners. Re-label that response as the 406 it is
 * while leaving every other response untouched.
 */
const UNSUPPORTED_ACCEPT_ERROR = "Only HTML requests are supported here";

/**
 * Relabeling to 406 also removes the response from the error-level Worker
 * events that used to carry this traffic, so the span is the remaining record
 * of non-HTML `Accept` volume on the Cloudflare surface. It answers "who is
 * sending `Accept: application/json`-style probes at page routes, and what
 * paths do they hit" after the merge.
 */
const UNSUPPORTED_ACCEPT_SPAN_NAME = "http.accept.unsupported";

const unsupportedAcceptAttributes = (request: Request): Attributes => {
  const attributes: Attributes = {
    "url.path": new URL(request.url).pathname,
    "http.request.method": request.method,
    "http.response.status_code": 406,
  };

  const accept = request.headers.get("accept");
  if (accept) {
    attributes["http.request.header.accept"] = accept;
  }

  const userAgent = request.headers.get("user-agent");
  if (userAgent) {
    attributes["user_agent.original"] = userAgent;
  }

  // Cloudflare Workers expose the client ASN on `request.cf`; other runtimes
  // simply omit it.
  const asn = (request as Request & { cf?: { asn?: unknown } }).cf?.asn;
  if (typeof asn === "number") {
    attributes["client.asn"] = asn;
  }

  return attributes;
};

export async function normalizeUnsupportedAcceptResponse(
  response: Response,
  request: Request,
): Promise<Response> {
  // The framework builds this response with `Response.json`, so it always
  // carries an `application/json` content type. Checking it before reading the
  // body keeps streamed 500s (for example HTML render-error pages) untouched
  // rather than buffering them into a new response.
  if (
    response.status !== 500 ||
    !response.headers.get("content-type")?.includes("application/json")
  ) {
    return response;
  }

  const body = await response.text();
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    payload = undefined;
  }

  const isUnsupportedAccept =
    typeof payload === "object" &&
    payload !== null &&
    (payload as { error?: unknown }).error === UNSUPPORTED_ACCEPT_ERROR;

  if (isUnsupportedAccept) {
    await withSpan(UNSUPPORTED_ACCEPT_SPAN_NAME, (span) => {
      span.setAttributes(unsupportedAcceptAttributes(request));
    });
  }

  return new Response(body, {
    status: isUnsupportedAccept ? 406 : response.status,
    statusText: isUnsupportedAccept ? "Not Acceptable" : response.statusText,
    headers: response.headers,
  });
}
