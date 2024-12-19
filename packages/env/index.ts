import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const server: Parameters<typeof createEnv>[0]['server'] = {
  SENTRY_DSN: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().min(1),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  // Added by Node
  CI: z.string().optional(),

  // Added by Vercel
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
}

const client: Parameters<typeof createEnv>[0]['client'] = {
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_HEIMDALL_API: z.string().min(1),
  NEXT_PUBLIC_BASELIME_KEY: z.string().min(1),
  NEXT_PUBLIC_SENTRY_DSN: z.string().min(1),
}

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
  },
  client,
  server,
  runtimeEnv: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_HEIMDALL_API: process.env.NEXT_PUBLIC_HEIMDALL_API,
    NEXT_PUBLIC_BASELIME_KEY: process.env.NEXT_PUBLIC_BASELIME_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === 'lint',
})
