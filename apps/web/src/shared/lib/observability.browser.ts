import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchSpanProcessor, WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { registerInstrumentations } from "@opentelemetry/instrumentation";

import {
  SUPERLOG_ENDPOINT,
  SUPERLOG_PUBLIC_TOKEN,
  buildResourceAttributes,
  superlogHeaders,
} from "./observability";

let initialized = false;

export function initBrowserObservability(): void {
  if (initialized || typeof window === "undefined") {
    return;
  }

  initialized = true;

  const exporter = new OTLPTraceExporter({
    url: `${SUPERLOG_ENDPOINT}/v1/traces`,
    headers: superlogHeaders(SUPERLOG_PUBLIC_TOKEN),
  });

  const provider = new WebTracerProvider({
    resource: resourceFromAttributes(buildResourceAttributes("plutus-web-browser")),
    spanProcessors: [new BatchSpanProcessor(exporter)],
  });

  provider.register();

  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [/.*/],
        clearTimingResources: true,
      }),
    ],
  });
}
