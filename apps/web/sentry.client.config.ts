// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { env } from '@/env.mjs'
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
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
