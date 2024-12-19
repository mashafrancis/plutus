import { env } from '@plutus/env'
import { createClient } from '@plutus/supabase/client'
import * as Sentry from '@sentry/nextjs'
import { supabaseIntegration } from '@supabase/sentry-js-integration'

const client = createClient()

Sentry.init({
  dsn: env.SENTRY_DSN,

  tracesSampleRate: 1,
  debug: false,
  enabled: process.env.NODE_ENV === 'production',
  integrations: [
    supabaseIntegration(client, Sentry, {
      tracing: true,
      breadcrumbs: true,
      errors: true,
    }),
  ],
})
