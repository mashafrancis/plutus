/**
 * TanStack Start answers any non-document request to a page route with
 * `500 {"error":"Only HTML requests are supported here"}` when the `Accept`
 * header does not include `text/html` or `*​/*`.
 *
 * Returning 5xx for a client-side content negotiation failure is wrong: it
 * reports a healthy server as broken, pollutes error telemetry, and invites
 * retries from crawlers and scanners. Re-label that response as the 406 it is
 * while leaving every other response untouched.
 */
const UNSUPPORTED_ACCEPT_ERROR = "Only HTML requests are supported here";

export async function normalizeUnsupportedAcceptResponse(response: Response): Promise<Response> {
  if (response.status !== 500) {
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

  return new Response(body, {
    status: isUnsupportedAccept ? 406 : response.status,
    statusText: isUnsupportedAccept ? "Not Acceptable" : response.statusText,
    headers: response.headers,
  });
}
