import { getErrorRedirect, getStatusRedirect } from '@/lib/helpers'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  console.log('Class: GET, Function: GET, Line 9 code():', code)

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('Class: GET, Function: GET, Line 12 error():', error)
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

  // return the user to an error page with instructions
  return NextResponse.redirect(
    getStatusRedirect(
      `${origin}/overview`,
      'Success!',
      'You are now signed in.',
    ),
  )
}
