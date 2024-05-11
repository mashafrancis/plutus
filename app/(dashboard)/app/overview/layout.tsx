import AppNav from '@/components/layout/app-nav'
import { NAVIGATION_NAMES } from '@/types/navigation'
import { ReactNode } from 'react'

interface OverviewLayoutProps {
  children?: ReactNode
}

export default function OverviewLayout({ children }: OverviewLayoutProps) {
  return (
    <>
      <AppNav activePage={NAVIGATION_NAMES.OVERVIEW} />
      {children}
    </>
  )
}
