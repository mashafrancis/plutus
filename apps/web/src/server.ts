import { wrapFetchWithSentry } from "@sentry/tanstackstart-react";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

// `__DEPLOY_CLOUDFLARE__` is a build-time constant (see vite.config.ts) derived from the
// Cloudflare deployment environment. The same value gates whether the Node-only
// instrumentation is bundled and which entry wrapper is used, so the bundling decision
// and the runtime wiring cannot drift apart.
if (!__DEPLOY_CLOUDFLARE__) {
  const { startServerInstrumentation } = await import("./instrument.server.mjs");
  startServerInstrumentation();
}

const serverHandler = {
  fetch(request: Request) {
    return handler.fetch(request);
  },
};

const entry = __DEPLOY_CLOUDFLARE__
  ? (await import("./shared/lib/observability.cf")).instrumentCloudflareHandler(serverHandler)
  : wrapFetchWithSentry(serverHandler);

export default createServerEntry(entry);
