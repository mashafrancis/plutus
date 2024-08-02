import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'
import { env } from '../../env'
import type { Database } from '../types'

const conWarn = console.warn
const conLog = console.log

const IGNORE_WARNINGS = [
  'Using the user object as returned from supabase.auth.getSession()',
]

console.warn = (...args) => {
  const match = args.find((arg) =>
    typeof arg === 'string'
      ? IGNORE_WARNINGS.find((warning) => arg.includes(warning))
      : false,
  )
  if (!match) {
    conWarn(...args)
  }
}

console.log = (...args) => {
  const match = args.find((arg) =>
    typeof arg === 'string'
      ? IGNORE_WARNINGS.find((warning) => arg.includes(warning))
      : false,
  )
  if (!match) {
    conLog(...args)
  }
}

type CreateClientOptions = {
  admin?: boolean
  schema?: 'public' | 'storage'
}

export const createClient = (options?: CreateClientOptions) => {
  const { admin = false, ...rest } = options ?? {}

  const cookieStore = cookies()

  const key = admin
    ? env.SUPABASE_SERVICE_ROLE_KEY
    : env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const auth = admin
    ? {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      }
    : {}

  return createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, key, {
    ...rest,
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(
        cookiesToSet: { name: string; value: string; options: CookieOptions }[],
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
    auth,
    global: {
      headers: {
        // Pass user agent from browser
        'user-agent': headers().get('user-agent') as string,
      },
    },
  })
}
