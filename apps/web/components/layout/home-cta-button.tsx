// import { use } from 'react'
import { auth } from '@/auth'
import GetStartedButton from '@/components/layout/get-started-button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Session } from 'next-auth'
import Link from 'next/link'

export default async function HomeCtaButton() {
  const session = (await auth()) as Session

  return session ? (
    <Link
      href="/overview"
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
