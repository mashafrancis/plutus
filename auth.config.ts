import { getUser } from '@/app/actions'
import { env } from '@/env.mjs'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const authConfig = {
  adapter: SupabaseAdapter({
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    secret: env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  providers: [GitHub({ allowDangerousEmailAccountLinking: true })],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const _user = await getUser(auth?.user?.email as string)
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        return isLoggedIn
        // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/overview', nextUrl))
      }
      return true
    },
  },
  trustHost: true,
} satisfies NextAuthConfig
