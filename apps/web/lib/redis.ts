import 'server-only'

import { env } from '@plutus/env'
import { Redis } from '@upstash/redis'

export const kvClient = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})
