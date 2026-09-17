const SUPERLOG_ENDPOINT = "https://intake.superlog.sh";
const SUPERLOG_PUBLIC_TOKEN =
  "sl_public_uNk-VyQWrcw5A__1Ea3Yo0N5rk_8eU3Whm8Sh-jK02s";

function superlogHeaders() {
  return { "x-api-key": SUPERLOG_PUBLIC_TOKEN };
}

function randomHex(bytes) {
  const buffer = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(buffer, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

const now = String(Date.now() * 1_000_000);
const traceId = randomHex(16);
const spanId = randomHex(8);

const resourceAttributes = [
  { key: "service.name", value: { stringValue: "plutus-verify" } },
  {
    key: "deployment.environment.name",
    value: { stringValue: "local" },
  },
  {
    key: "vcs.repository.url.full",
    value: { stringValue: "https://github.com/mashafrancis/plutus" },
  },
];

async function post(path, body) {
  const response = await fetch(`${SUPERLOG_ENDPOINT}${path}`, {
    method: "POST",
    headers: {
      ...superlogHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return { path, status: response.status };
}

const tracesBody = {
  resourceSpans: [
    {
      resource: { attributes: resourceAttributes },
      scopeSpans: [
        {
          scope: { name: "plutus-verify" },
          spans: [
            {
              traceId,
              spanId,
              name: "verify.smoke",
              kind: 1,
              startTimeUnixNano: now,
              endTimeUnixNano: now,
              attributes: [
                { key: "outcome", value: { stringValue: "success" } },
              ],
              status: { code: 1 },
            },
          ],
        },
      ],
    },
  ],
};

const logsBody = {
  resourceLogs: [
    {
      resource: { attributes: resourceAttributes },
      scopeLogs: [
        {
          scope: { name: "plutus-verify" },
          logRecords: [
            {
              timeUnixNano: now,
              severityText: "INFO",
              body: { stringValue: "Superlog smoke test log" },
              traceId,
              spanId,
              attributes: [
                { key: "operation.name", value: { stringValue: "verify.smoke" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const metricsBody = {
  resourceMetrics: [
    {
      resource: { attributes: resourceAttributes },
      scopeMetrics: [
        {
          scope: { name: "plutus-verify" },
          metrics: [
            {
              name: "verify.smoke.count",
              unit: "1",
              sum: {
                dataPoints: [
                  {
                    asInt: "1",
                    timeUnixNano: now,
                    attributes: [
                      { key: "outcome", value: { stringValue: "success" } },
                    ],
                  },
                ],
                aggregationTemporality: 2,
                isMonotonic: true,
              },
            },
          ],
        },
      ],
    },
  ],
};

const results = await Promise.all([
  post("/v1/traces", tracesBody),
  post("/v1/logs", logsBody),
  post("/v1/metrics", metricsBody),
]);

for (const result of results) {
  console.log(`${result.path}: ${result.status}`);
}

const allOk = results.every((result) => result.status >= 200 && result.status < 300);
process.exit(allOk ? 0 : 1);
