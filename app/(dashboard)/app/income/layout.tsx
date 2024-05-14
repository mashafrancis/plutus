import AppNav from '@/components/layout/app-nav'
import SectionContainer from '@/components/layout/section-container'
import { NAVIGATION_NAMES } from '@/types/navigation'
import { ReactNode } from 'react'

interface OverviewLayoutProps {
  children?: ReactNode
}

export default function IncomeLayout({ children }: OverviewLayoutProps) {
  return (
    <>
      <AppNav activePage={NAVIGATION_NAMES.INCOME} />
      <SectionContainer className="sm:py-12 md:py-8 lg:py-8">
        {children}
      </SectionContainer>
    </>
  )
}
