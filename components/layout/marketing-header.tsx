import React from 'react'

import { ArrowIcon } from '@/components/icons'
import GetStartedButton from '@/components/layout/get-started-button'
import SectionContainer from '@/components/layout/section-container'
import { Button } from '@/components/ui/button'
import { CTA } from '@/types/ui.types'
import Link from 'next/link'

interface Props {
  h1: string | React.ReactNode
  subheader?: string[] | React.ReactNode[]
  icon?: any
  title?: string
  image?: React.ReactNode
  footer?: React.ReactNode
  ctas?: CTA[]
  logo?: boolean
  session?: any
}

export default function MarketingHeader(props: Props) {
  const Icon = props.icon
  return (
    <div className="w-full max-w-full relative mx-auto py-16 lg:py-24 bg-alternative overflow-hidden">
      <SectionContainer className="!py-0 grid grid-cols-12">
        <div className="relative grid z-10 col-span-12 gap-2 lg:col-span-5">
          <div>
            {(Icon || props.title) && (
              <div className="mb-4 flex items-center gap-3">
                {Icon && <Icon size={16} strokeWidth={1.3} />}
                {props.title && (
                  <span
                    className="text-primary font-mono uppercase"
                    key={`platform-${props.title}`}
                  >
                    {props.title}
                  </span>
                )}
              </div>
            )}
            <h1
              className="h1 text-3xl md:!text-4xl lg:!text-4xl 2xl:!text-6xl tracking-[-.15px]"
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
                    className="p lg:text-lg text-muted-foreground max-w-lg lg:max-w-none"
                    key={i}
                  >
                    {subheader}
                  </p>
                )
              })}
          </div>
          <div className="flex flex-row md:flex-row md:items-center gap-2">
            {props.session ? (
              <Link href="/app">
                <Button size="lg">
                  Go to app
                  <ArrowIcon direction="right" />
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
