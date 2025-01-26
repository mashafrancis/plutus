import Link from 'next/link'

import SectionContainer from '@/components/layout/section-container'
import { Skeleton } from '@/components/ui/skeleton'
import { UserMenu } from '@/components/user/user-menu'
import navigation from '@/data/navigation'
import { cn } from '@/lib/utils'
import type { NAVIGATION_NAMES } from '@/types/navigation'
import { Suspense } from 'react'

interface Props {
  activePage: NAVIGATION_NAMES
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
                  'flex items-center gap-1.5 px-2 first:-ml-2 py-4 border-b border-transparent text-sm text-foreground-lighter hover:text-foreground',
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
        <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
          <UserMenu />
        </Suspense>
      </SectionContainer>
    </nav>
  )
}
