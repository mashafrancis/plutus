import Link from 'next/link'

import { auth } from '@/auth'
import SectionContainer from '@/components/layout/section-container'
import { UserMenu } from '@/components/user/user-menu'
import navigation from '@/data/navigation'
import { Session } from '@/lib/types'
import { cn } from '@/lib/utils'
import { NAVIGATION_NAMES } from '@/types/navigation'
import { Suspense } from 'react'

interface Props {
  activePage: NAVIGATION_NAMES
}

async function User() {
  const session = (await auth()) as Session

  return session ? <UserMenu user={session.user} /> : null
}

export default function AppNav({ activePage }: Props) {
  return (
    <nav className="relative z-20 hidden md:flex items-center w-full border-b">
      <SectionContainer className="flex !py-0 justify-between">
        <div className="flex gap-3 items-center">
          {Object.entries(navigation).map((obj: any) => {
            const site = obj[1]

            return (
              <Link
                key={site.name}
                className={cn(
                  'flex items-center gap-1.5 px-2 first:-ml-2 py-4 border-b border-transparent text-sm text-muted-foreground hover:text-foreground',
                  'focus-visible:ring-2 focus-visible:ring-muted-foreground focus-visible:text-foreground focus-visible:outline-primary/60',
                  site.name === activePage &&
                    'border-muted-foreground text-foreground',
                )}
                href={`/${site.name.toLowerCase().replace(' ', '-')}`}
              >
                <p>{site.name}</p>
              </Link>
            )
          })}
        </div>
        <Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <User />
        </Suspense>
      </SectionContainer>
    </nav>
  )
}
