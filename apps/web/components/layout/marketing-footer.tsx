import SectionContainer from '@/components/layout/section-container'
import { ThemeToggle } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { Icons } from '../icons'

export function MarketingFooter({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo className="h-10 w-10" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Francis Masha
            </a>
          </p>
        </div>
        <ThemeToggle />
      </div>
      <SectionContainer className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20">
        <h5 className="text-muted-foreground/20 text-[500px] leading-none text-center pointer-events-none">
          plutus
        </h5>
      </SectionContainer>
    </footer>
  )
}
