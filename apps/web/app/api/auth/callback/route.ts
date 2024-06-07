import { getErrorRedirect, getStatusRedirect } from '@/lib/helpers'
import { LogEvents } from '@plutus/events/events'
import { setupAnalytics } from '@plutus/events/server'
import { getSession } from '@plutus/supabase/cached-queries'
import { createClient } from '@plutus/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = cookies()
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    // @ts-expect-error
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return NextResponse.redirect(
        getErrorRedirect(
          `${origin}/`,
          error.name,
          "Sorry, we weren't able to log you in. Please try again.",
        ),
      )
    }
  }

  const {
    data: { session },
  } = await getSession()

  if (session) {
    const userId = session.user.id

    const analytics = await setupAnalytics({
      userId,
      fullName: session?.user?.user_metadata?.full_name,
    })

    analytics.track({
      event: LogEvents.SignIn.name,
      channel: LogEvents.SignIn.channel,
    })
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(
    getStatusRedirect(
      `${origin}/overview`,
      'Success!',
      'You are now signed in.',
    ),
  )
}
