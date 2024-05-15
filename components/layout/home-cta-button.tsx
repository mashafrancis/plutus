import { buttonVariants } from '@/components/ui-elements/button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
// import { use } from 'react'
import GetStartedButton from './get-started-button'

export default async function HomeCtaButton() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log('Class: default, Function: HomeCtaButton, Line 13 user():', user)

  return user ? (
    <Link
      href="/app/overview"
      className={cn(
        buttonVariants({
          size: 'large',
          type: 'primary',
        }),
      )}
    >
      Go to app
    </Link>
  ) : (
    <GetStartedButton />
  )
}
