'use client'

import { createClient } from '@/lib/supabase/client'
import { getURL } from '@/lib/utils'
import { Provider } from '@supabase/supabase-js'

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  // Prevent default form submission refresh
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const provider = String(formData.get('provider')).trim() as Provider

  // Create a client-side supabase client and call signInWithOAuth
  const supabase = createClient()
  const redirectURL = getURL('/auth/callback')
  console.log(
    'Class: signInWithOAuth, Function: signInWithOAuth, Line 16 redirectURL():',
    redirectURL,
  )
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL,
    },
  })
}
