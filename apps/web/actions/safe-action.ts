import { logger } from '@/lib/logger'
import { kvClient as RedisClient } from '@/lib/redis'
import { setupAnalytics } from '@plutus/events/server'
import { getUser } from '@plutus/supabase/cached-queries'
import { createClient } from '@plutus/supabase/server'
import * as Sentry from '@sentry/nextjs'
import { Ratelimit } from '@upstash/ratelimit'
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from 'next-safe-action'
import { headers } from 'next/headers'
import { z } from 'zod'

const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(10, '10s'),
  redis: RedisClient,
})

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})

export const actionClientWithMeta = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),
    })
  },
})

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: undefined })

    if (process.env.NODE_ENV === 'development') {
      logger('Input ->', clientInput)
      logger('Result ->', result.data)
      logger('Metadata ->', metadata)

      return result
    }

    return result
  })
  .use(async ({ next, metadata }) => {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')

    const { success, remaining } = await ratelimit.limit(
      `${ip}-${metadata.name}`,
    )

    if (!success) {
      throw new Error('Too many requests')
    }

    return next({
      ctx: {
        ratelimit: {
          remaining,
        },
      },
    })
  })
  .use(async ({ next, metadata }) => {
    const user = await getUser()
    const supabase = await createClient()

    if (!user?.data) {
      throw new Error('Unauthorized')
    }

    const analytics = await setupAnalytics({
      userId: user.data.id,
      fullName: user.data.email,
    })

    if (metadata?.track) {
      analytics.track(metadata.track)
    }

    return Sentry.withServerActionInstrumentation(metadata.name, async () => {
      return next({
        ctx: {
          supabase,
          analytics,
          user: user.data,
        },
      })
    })
  })
