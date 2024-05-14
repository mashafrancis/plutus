'use client'
import { buttonVariants } from '@/components/ui-elements/button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { use } from 'react'
import GetStartedButton from './get-started-button'

export default function HomeCtaButton() {
  const supabase = createClient()
  const session = use(supabase.auth.getSession())
  const user = session.data.session?.user

  return !!user ? (
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
