import { wrapFetchWithSentry } from "@sentry/tanstackstart-react";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

const isCloudflareRuntime = Boolean(
  process.env.DEPLOY_CLOUDFLARE === "1" ||
  process.env.CLOUDFLARE_ENV ||
  process.env.CF_PAGES ||
  process.env.CF_ACCOUNT_ID ||
  process.env.WORKERS_CI,
);

// `__DEPLOY_CLOUDFLARE__` is a build-time constant (see vite.config.ts). The dynamic
// import is only present in non-Cloudflare builds, so the Node-only instrumentation is
// never bundled into the Worker. It is kept (rather than a side-effect-only import) so
// the bundler does not drop it.
if (!__DEPLOY_CLOUDFLARE__) {
  const { startServerInstrumentation } = await import("./instrument.server.mjs");
  startServerInstrumentation();
}

const serverHandler = {
  fetch(request: Request) {
    return handler.fetch(request);
  },
};

const entry = isCloudflareRuntime
  ? (await import("./shared/lib/observability.cf")).instrumentCloudflareHandler(serverHandler)
  : wrapFetchWithSentry(serverHandler);

export default createServerEntry(entry);
