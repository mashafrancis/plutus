import { wrapFetchWithSentry } from "@sentry/tanstackstart-react";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

const isCloudflareRuntime = Boolean(
  process.env.DEPLOY_CLOUDFLARE === "1" ||
    process.env.CLOUDFLARE_ENV ||
    process.env.CF_PAGES ||
    process.env.CF_ACCOUNT_ID ||
    process.env.WORKERS_CI,
);

if (!isCloudflareRuntime) {
  await import("../instrument.server.mjs");
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
