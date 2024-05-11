export async function register() {
  // const config: Configuration = {
  //   serviceName: 'plutus',
  //   traceExporter: new OTLPTraceExporter({
  //     url: 'http://localhost:4318/v1/traces',
  //   }),
  //   instrumentationConfig: {
  //     fetch: {
  //       ignoreUrls: [/^https:\/\/telemetry.nextjs.org/],
  //       propagateContextUrls: [/^http:\/\/localhost:\d+/],
  //       dontPropagateContextUrls: [/no-propagation\=1/],
  //     },
  //   },
  // }
  //
  // registerOTel(config)

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // const { OTLPTraceExporter } = await import(
    //   '@opentelemetry/exporter-trace-otlp-grpc'
    // )
    const { BaselimeSDK, VercelPlugin, BetterHttpInstrumentation } =
      await import('@baselime/node-opentelemetry')

    const sdk = new BaselimeSDK({
      serverless: true,
      service: 'plutus',
      instrumentations: [
        new BetterHttpInstrumentation({
          plugins: [
            // Add the Vercel plugin to enable correlation between your logs and traces for projects deployed on Vercel
            new VercelPlugin(),
          ],
        }),
      ],
    })

    sdk.start()

    // const config: Configuration = {
    //   serviceName: 'plutus',
    //   traceExporter: new OTLPTraceExporter({
    //     url: 'http://localhost:4318/v1/traces',
    //   }),
    //   instrumentationConfig: {
    //     fetch: {
    //       ignoreUrls: [/^https:\/\/telemetry.nextjs.org/],
    //       propagateContextUrls: [/^http:\/\/localhost:\d+/],
    //       dontPropagateContextUrls: [/no-propagation\=1/],
    //     },
    //   },
    // }
    //
    // registerOTel(config)
  }
}
