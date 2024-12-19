import * as Sentry from '@sentry/nextjs'
import { supabaseIntegration } from '@supabase/sentry-js-integration'
import { SupabaseClient } from '@supabase/supabase-js'

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  tracesSampleRate: 1,
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
  integrations: [
    supabaseIntegration(SupabaseClient, Sentry, {
      tracing: true,
      breadcrumbs: true,
      errors: true,
    }),
    Sentry.nativeNodeFetchIntegration({
      breadcrumbs: true,
      ignoreOutgoingRequests: (url) => {
        return url.startsWith(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest`)
      },
    }),
  ],
})
