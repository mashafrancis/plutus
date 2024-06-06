import { Configuration, registerOTel } from '@vercel/otel'

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
    const { BaselimeSDK, VercelPlugin, BetterHttpInstrumentation } =
      await import('@baselime/node-opentelemetry')

    const sdk = new BaselimeSDK({
      serverless: true,
      service: 'plutus',
      instrumentations: [
        new BetterHttpInstrumentation({
          plugins: [new VercelPlugin()],
        }),
      ],
    })

    sdk.start()
  }

  const config: Configuration = {
    serviceName: 'plutus',
    instrumentationConfig: {
      fetch: {
        ignoreUrls: [/^https:\/\/telemetry.nextjs.org/],
        propagateContextUrls: [/^http:\/\/localhost:\d+/],
        dontPropagateContextUrls: [/no-propagation\=1/],
      },
    },
  }

  registerOTel(config)

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}
