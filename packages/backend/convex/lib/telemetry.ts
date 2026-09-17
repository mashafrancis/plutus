const SUPERLOG_ENDPOINT = "https://intake.superlog.sh";
const SUPERLOG_PUBLIC_TOKEN =
  "sl_public_uNk-VyQWrcw5A__1Ea3Yo0N5rk_8eU3Whm8Sh-jK02s";
const VCS_REPOSITORY_URL = "https://github.com/mashafrancis/plutus";
const SERVICE_NAME = "plutus-convex";

type AttributeValue = string | number | boolean;

interface ActiveSpan {
  traceId: string;
  spanId: string;
  name: string;
  startTimeUnixNano: string;
  attributes: Record<string, AttributeValue>;
  statusCode: number;
  statusMessage?: string;
  events: Array<{
    name: string;
    timeUnixNano: string;
    attributes: Record<string, AttributeValue>;
  }>;
}

interface PendingLog {
  body: string;
  severityText: string;
  timeUnixNano: string;
  traceId?: string;
  spanId?: string;
  attributes: Record<string, AttributeValue>;
}

interface PendingMetric {
  name: string;
  kind: "counter" | "histogram";
  value: number;
  timeUnixNano: string;
  attributes: Record<string, AttributeValue>;
}

const spanBuffer: ActiveSpan[] = [];
const logBuffer: PendingLog[] = [];
const metricBuffer: PendingMetric[] = [];

const counterTotals = new Map<string, number>();

let activeSpan: ActiveSpan | null = null;

function superlogHeaders(): Record<string, string> {
  return { "x-api-key": SUPERLOG_PUBLIC_TOKEN };
}

function randomHex(bytes: number): string {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function nowUnixNano(): string {
  return String(Date.now() * 1_000_000);
}

function getDeploymentEnvironment(): string {
  if (process.env.CONVEX_CLOUD_URL) {
    return "production";
  }
  if (process.env.LOG_LEVEL === "DEBUG") {
    return "development";
  }
  return "local";
}

function resourceAttributes(): Array<{ key: string; value: { stringValue: string } }> {
  const attributes = [
    { key: "service.name", value: { stringValue: SERVICE_NAME } },
    {
      key: "deployment.environment.name",
      value: { stringValue: getDeploymentEnvironment() },
    },
    { key: "vcs.repository.url.full", value: { stringValue: VCS_REPOSITORY_URL } },
  ];

  const revision =
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    process.env.RAILWAY_GIT_COMMIT_SHA;

  if (revision) {
    attributes.push({
      key: "vcs.ref.head.revision",
      value: { stringValue: revision },
    });
  }

  return attributes;
}

function toOtelAttributes(
  attributes: Record<string, AttributeValue>,
): Array<{ key: string; value: { stringValue?: string; intValue?: string; boolValue?: boolean } }> {
  return Object.entries(attributes).map(([key, value]) => {
    if (typeof value === "boolean") {
      return { key, value: { boolValue: value } };
    }
    if (typeof value === "number") {
      return { key, value: { intValue: String(value) } };
    }
    return { key, value: { stringValue: value } };
  });
}

async function postOtlp(path: string, body: unknown): Promise<number> {
  const response = await fetch(`${SUPERLOG_ENDPOINT}${path}`, {
    method: "POST",
    headers: {
      ...superlogHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.status;
}

function enqueueSpan(span: ActiveSpan): void {
  spanBuffer.push(span);
}

function enqueueLog(log: PendingLog): void {
  logBuffer.push(log);
}

function enqueueMetric(metric: PendingMetric): void {
  metricBuffer.push(metric);
}

export function recordLog(
  body: string,
  severityText: "INFO" | "ERROR" | "DEBUG" = "INFO",
  attributes: Record<string, AttributeValue> = {},
): void {
  enqueueLog({
    body,
    severityText,
    timeUnixNano: nowUnixNano(),
    traceId: activeSpan?.traceId,
    spanId: activeSpan?.spanId,
    attributes,
  });
}

export function incrementCounter(
  name: string,
  value = 1,
  attributes: Record<string, AttributeValue> = {},
): void {
  const key = `${name}:${JSON.stringify(attributes)}`;
  counterTotals.set(key, (counterTotals.get(key) ?? 0) + value);

  enqueueMetric({
    name,
    kind: "counter",
    value,
    timeUnixNano: nowUnixNano(),
    attributes,
  });
}

export function recordHistogram(
  name: string,
  value: number,
  attributes: Record<string, AttributeValue> = {},
): void {
  enqueueMetric({
    name,
    kind: "histogram",
    value,
    timeUnixNano: nowUnixNano(),
    attributes,
  });
}

export async function withSpan<T>(
  name: string,
  attributes: Record<string, AttributeValue>,
  fn: () => Promise<T>,
): Promise<T> {
  const span: ActiveSpan = {
    traceId: randomHex(16),
    spanId: randomHex(8),
    name,
    startTimeUnixNano: nowUnixNano(),
    attributes: { ...attributes, outcome: "success" },
    statusCode: 1,
    events: [],
  };

  const previousSpan = activeSpan;
  activeSpan = span;
  const startedAt = Date.now();

  try {
    const result = await fn();
    span.attributes.outcome = "success";
    return result;
  } catch (error) {
    span.statusCode = 2;
    span.statusMessage = error instanceof Error ? error.message : "error";
    span.attributes.outcome = "error";
    span.attributes["error.type"] =
      error instanceof Error ? error.name.toLowerCase() : "unknown_error";
    span.events.push({
      name: "exception",
      timeUnixNano: nowUnixNano(),
      attributes: {
        "exception.message":
          error instanceof Error ? error.message : "Unknown error",
      },
    });
    recordLog(`Operation failed: ${name}`, "ERROR", {
      "operation.name": name,
      outcome: "error",
    });
    throw error;
  } finally {
    recordHistogram(`${name}.duration`, Date.now() - startedAt, {
      outcome: String(span.attributes.outcome),
    });
    span.attributes["operation.duration_ms"] = Date.now() - startedAt;
    enqueueSpan(span);
    activeSpan = previousSpan;
    await flush();
  }
}

export async function flush(): Promise<{
  traces: number;
  logs: number;
  metrics: number;
}> {
  const results = { traces: 0, logs: 0, metrics: 0 };

  if (spanBuffer.length > 0) {
    const spans = spanBuffer.splice(0, spanBuffer.length);
    results.traces = await postOtlp("/v1/traces", {
      resourceSpans: [
        {
          resource: { attributes: resourceAttributes() },
          scopeSpans: [
            {
              scope: { name: SERVICE_NAME },
              spans: spans.map((span) => ({
                traceId: span.traceId,
                spanId: span.spanId,
                name: span.name,
                kind: 1,
                startTimeUnixNano: span.startTimeUnixNano,
                endTimeUnixNano: nowUnixNano(),
                attributes: toOtelAttributes(span.attributes),
                status: {
                  code: span.statusCode,
                  message: span.statusMessage,
                },
                events: span.events.map((event) => ({
                  name: event.name,
                  timeUnixNano: event.timeUnixNano,
                  attributes: toOtelAttributes(event.attributes),
                })),
              })),
            },
          ],
        },
      ],
    });
  }

  if (logBuffer.length > 0) {
    const logs = logBuffer.splice(0, logBuffer.length);
    results.logs = await postOtlp("/v1/logs", {
      resourceLogs: [
        {
          resource: { attributes: resourceAttributes() },
          scopeLogs: [
            {
              scope: { name: SERVICE_NAME },
              logRecords: logs.map((log) => ({
                timeUnixNano: log.timeUnixNano,
                severityText: log.severityText,
                body: { stringValue: log.body },
                attributes: toOtelAttributes(log.attributes),
                traceId: log.traceId,
                spanId: log.spanId,
              })),
            },
          ],
        },
      ],
    });
  }

  if (metricBuffer.length > 0) {
    const metrics = metricBuffer.splice(0, metricBuffer.length);
    results.metrics = await postOtlp("/v1/metrics", {
      resourceMetrics: [
        {
          resource: { attributes: resourceAttributes() },
          scopeMetrics: [
            {
              scope: { name: SERVICE_NAME },
              metrics: metrics.map((metric) => ({
                name: metric.name,
                unit: metric.kind === "histogram" ? "ms" : "1",
                sum:
                  metric.kind === "counter"
                    ? {
                        dataPoints: [
                          {
                            asInt: String(metric.value),
                            timeUnixNano: metric.timeUnixNano,
                            attributes: toOtelAttributes(metric.attributes),
                          },
                        ],
                        aggregationTemporality: 2,
                        isMonotonic: true,
                      }
                    : undefined,
                histogram:
                  metric.kind === "histogram"
                    ? {
                        dataPoints: [
                          {
                            count: "1",
                            sum: metric.value,
                            min: metric.value,
                            max: metric.value,
                            timeUnixNano: metric.timeUnixNano,
                            attributes: toOtelAttributes(metric.attributes),
                          },
                        ],
                        aggregationTemporality: 2,
                      }
                    : undefined,
              })),
            },
          ],
        },
      ],
    });
  }

  return results;
}
