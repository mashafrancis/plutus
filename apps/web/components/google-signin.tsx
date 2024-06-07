'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui-elements/button'
import { createClient } from '@plutus/supabase/client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function GoogleSignIn() {
  const [isLoading, setLoading] = useState(false)
  const supabase = createClient()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('return_to')

  const handleSignIn = async () => {
    setLoading(true)

    const redirectTo = new URL('/api/auth/callback', window.location.origin)

    if (returnTo) {
      redirectTo.searchParams.append('return_to', returnTo)
    }

    redirectTo.searchParams.append('provider', 'google')

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo.toString(),
      },
    })
  }

  return (
    <Button
      size="medium"
      type="secondary"
      onClick={handleSignIn}
      className="active:scale-[0.98] rounded-md px-6 py-4 font-medium flex space-x-2 h-[40px] w-full"
      icon={<Icons.google className="h-4 w-4" />}
      disabled={isLoading}
    >
      Continue with Google
    </Button>
  )
}
