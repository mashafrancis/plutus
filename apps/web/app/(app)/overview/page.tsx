import OverviewCardLayout from '@/app/(app)/settings/_components/_components/overview-card-layout'
import AppHeader from '@/components/app-header'
import CardLoader from '@/components/loader/card'
import { Metadata } from 'next'
import { Suspense } from 'react'

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
        // addButton={<AddData />}
      />
      <Suspense fallback={<CardLoader cards={2} />}>
        <OverviewCardLayout />
      </Suspense>
      {/*<OverviewCharts />*/}
    </>
  )
}
