import { instrument, type ResolveConfigFn } from "@microlabs/otel-cf-workers";

import {
  SUPERLOG_ENDPOINT,
  SUPERLOG_PUBLIC_TOKEN,
  buildResourceAttributes,
  superlogHeaders,
} from "./observability";

export const cloudflareTelemetryConfig: ResolveConfigFn = () => {
  const resourceAttrs = buildResourceAttributes("plutus-web-cf");

  return {
    exporter: {
      url: `${SUPERLOG_ENDPOINT}/v1/traces`,
      headers: superlogHeaders(SUPERLOG_PUBLIC_TOKEN),
    },
    service: {
      name: resourceAttrs["service.name"],
      version: resourceAttrs["vcs.ref.head.revision"],
    },
  };
};

type CloudflareHandler = {
  fetch: (
    request: Request,
    env?: Record<string, unknown>,
    ctx?: ExecutionContext,
  ) => Response | Promise<Response>;
};

export function instrumentCloudflareHandler(handler: CloudflareHandler): CloudflareHandler {
  return instrument(handler, cloudflareTelemetryConfig);
}
