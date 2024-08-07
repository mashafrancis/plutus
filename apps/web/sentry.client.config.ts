// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { env } from '@/env'
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/plutus\.francismasha\.com\/api/,
  ],
  // Set profilesSampleRate to 1.0 to profile every transaction.
  // Since profilesSampleRate is relative to tracesSampleRate,
  // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
  // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
  // results in 25% of transactions being profiled (0.5*0.5=0.25)
  profilesSampleRate: 1.0,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
    //   supabaseIntegration(SupabaseClient, Sentry, {
    //     tracing: true,
    //     breadcrumbs: true,
    //     errors: true,
    //   }),
    //   Sentry.nativeNodeFetchIntegration({
    //     // @ts-expect-error
    //     shouldCreateSpanForRequest: (url: string) => {
    //       console.log('server', `${env.NEXT_PUBLIC_SUPABASE_URL}/rest`, url)
    //       return !url.startsWith(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest`)
    //     },
    //   }),
  ],
})
