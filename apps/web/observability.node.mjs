import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { logs } from "@opentelemetry/api-logs";

const SUPERLOG_ENDPOINT = "https://intake.superlog.sh";
const SUPERLOG_PUBLIC_TOKEN =
  "sl_public_uNk-VyQWrcw5A__1Ea3Yo0N5rk_8eU3Whm8Sh-jK02s";
const VCS_REPOSITORY_URL = "https://github.com/mashafrancis/plutus";

function superlogHeaders(token) {
  return { "x-api-key": token };
}

function getDeploymentEnvironment() {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV;
  }
  if (process.env.CLOUDFLARE_ENV) {
    return process.env.CLOUDFLARE_ENV;
  }
  if (process.env.NODE_ENV === "production") {
    return "production";
  }
  if (process.env.NODE_ENV === "development") {
    return "development";
  }
  return "local";
}

function getVcsRevision() {
  return (
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    process.env.CF_PAGES_COMMIT_SHA ??
    process.env.RAILWAY_GIT_COMMIT_SHA ??
    process.env.SOURCE_COMMIT ??
    process.env.GIT_COMMIT
  );
}

function buildResourceAttributes(serviceName) {
  const attributes = {
    "service.name": serviceName,
    "deployment.environment.name": getDeploymentEnvironment(),
    "vcs.repository.url.full": VCS_REPOSITORY_URL,
  };

  const revision = getVcsRevision();
  if (revision) {
    attributes["vcs.ref.head.revision"] = revision;
  }

  return attributes;
}

let sdk;

export function initNodeObservability() {
  if (sdk) {
    return sdk;
  }

  const headers = superlogHeaders(SUPERLOG_PUBLIC_TOKEN);
  const resource = new Resource(buildResourceAttributes("plutus-web-server"));

  const traceExporter = new OTLPTraceExporter({
    url: `${SUPERLOG_ENDPOINT}/v1/traces`,
    headers,
  });

  const logExporter = new OTLPLogExporter({
    url: `${SUPERLOG_ENDPOINT}/v1/logs`,
    headers,
  });

  const metricExporter = new OTLPMetricExporter({
    url: `${SUPERLOG_ENDPOINT}/v1/metrics`,
    headers,
  });

  const loggerProvider = new LoggerProvider({ resource });
  loggerProvider.addLogRecordProcessor(new BatchLogRecordProcessor(logExporter));
  logs.setGlobalLoggerProvider(loggerProvider);

  sdk = new NodeSDK({
    resource,
    traceExporter,
    metricReader: new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 10_000,
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();

  const shutdown = async () => {
    await loggerProvider.shutdown();
    await sdk.shutdown();
  };

  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);

  return sdk;
}
