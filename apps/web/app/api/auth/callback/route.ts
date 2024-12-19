import { emails } from '@/constants/messages'
import { Cookies } from '@/lib/constants'
import { getErrorRedirect, getStatusRedirect } from '@/lib/helpers'
import { WelcomeEmail, sendEmail } from '@plutus/emails'
import { LogEvents } from '@plutus/events/events'
import { setupAnalytics } from '@plutus/events/server'
import { getSession, getUser } from '@plutus/supabase/cached-queries'
import { createUser } from '@plutus/supabase/mutations'
import { createClient } from '@plutus/supabase/server'
import { addYears } from 'date-fns'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')
  const returnTo = requestUrl.searchParams.get('return_to')
  const mfaSetupVisited = cookieStore.has(Cookies.MfaSetupVisited)

  if (code) {
    // @ts-expect-error
    const supabase = createClient(cookieStore)
    await supabase.auth.exchangeCodeForSession(code)

    const {
      data: { session },
    } = await getSession()

    if (session) {
      const userId = session.user.id
      const user = (await getUser()) as any

      if (user?.count === 0) {
        const newData = await createUser(supabase)

        if (newData?.error) {
          return NextResponse.redirect(
            getErrorRedirect(
              `${requestUrl.origin}/`,
              newData?.error.message,
              "Sorry, we weren't able to log you in. Please try again.",
            ),
          )
        }

        await sendEmail({
          from: emails.from,
          subject: emails.register.subject,
          to: [newData?.data?.email as string],
          react: WelcomeEmail(),
        })
      }

      const analytics = await setupAnalytics({
        userId,
        fullName: session?.user?.user_metadata?.full_name,
      })

      analytics.track({
        event: LogEvents.SignIn.name,
        channel: LogEvents.SignIn.channel,
      })
    }
  }

  if (!mfaSetupVisited) {
    cookieStore.set(Cookies.MfaSetupVisited, 'true', {
      expires: addYears(new Date(), 1),
    })

    return NextResponse.redirect(`${requestUrl.origin}/mfa/setup`)
  }

  if (returnTo) {
    return NextResponse.redirect(`${requestUrl.origin}/${returnTo}`)
  }

  // return the user page
  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/overview`,
      'Success!',
      'You are now signed in.',
    ),
  )
}
