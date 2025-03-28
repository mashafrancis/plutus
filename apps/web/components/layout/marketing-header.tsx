import GetStartedButton from '@/components/layout/get-started-button'
import SectionContainer from '@/components/layout/section-container'
import { Button } from '@/components/ui/button'
import type { CTA } from '@/types/ui.types'
import { getUser } from '@plutus/supabase/cached-queries'
import Link from 'next/link'
import React from 'react'

interface Props {
  h1: string | React.ReactNode
  subheader?: string[] | React.ReactNode[]
  icon?: any
  title?: string
  image?: React.ReactNode
  footer?: React.ReactNode
  ctas?: CTA[]
  logo?: boolean
}

export default async function MarketingHeader(props: Props) {
  const user = await getUser()

  const Icon = props.icon
  return (
    <div className="w-full max-w-full relative mx-auto py-16 lg:py-24 bg-alternative overflow-hidden">
      <SectionContainer className="py-0! grid grid-cols-12">
        <div className="relative grid z-10 col-span-12 gap-2 lg:col-span-5">
          <div>
            {(Icon || props.title) && (
              <div className="mb-4 flex items-center gap-3">
                {Icon && <Icon size={16} strokeWidth={1.3} />}
                {props.title && (
                  <span
                    className="text-brand-600 dark:text-brand font-mono uppercase"
                    key={`platform-${props.title}`}
                  >
                    {props.title}
                  </span>
                )}
              </div>
            )}
            <h1
              className="h1 text-3xl md:text-4xl! lg:text-4xl! 2xl:text-6xl! tracking-[-.15px]"
              key={`h1`}
            >
              {props.h1}
            </h1>
          </div>
          <div>
            {props.subheader &&
              props.subheader.map((subheader, i) => {
                return (
                  <p
                    className="p lg:text-lg text-foreground-lighter max-w-lg lg:max-w-none"
                    key={i}
                  >
                    {subheader}
                  </p>
                )
              })}
          </div>
          <div className="flex flex-row md:flex-row md:items-center gap-2">
            {user?.data?.email ? (
              <Link href="/overview">
                <Button size="large" type="primary">
                  Explore app
                </Button>
              </Link>
            ) : (
              <GetStartedButton />
            )}
          </div>
        </div>
        {props.image && (
          <div className="relative min-h-[300px] col-span-12 mt-8 lg:col-span-7 lg:mt-0 xl:col-span-6 xl:col-start-7">
            {props.image}
          </div>
        )}
        {props.footer && (
          <div className="relative z-10 mt-4 md:mt-8 lg:mt-20 xl:mt-32 col-span-12">
            {props.footer}
          </div>
        )}
      </SectionContainer>
    </div>
  )
}
