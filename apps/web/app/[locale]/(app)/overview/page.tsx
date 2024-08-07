import Add from '@/components/add-button'
import AppHeader from '@/components/app-header'
import CardLoader from '@/components/loader/card'
import { type Metadata } from 'next'
import { Suspense } from 'react'
import OverviewCardLayout from './_components/overview-card-layout'

export const experimental_ppr = true

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Plutus finance tracker.',
}

export default function OverviewPage() {
  return (
    <>
      <AppHeader
        title="Overview"
        description="A glimpse of all your financial data."
        showDatePicker
        addButton={<Add type="expenses" />}
      />
      <Suspense fallback={<CardLoader cards={4} />}>
        <OverviewCardLayout />
      </Suspense>
      {/*<OverviewCharts />*/}
    </>
  )
}
