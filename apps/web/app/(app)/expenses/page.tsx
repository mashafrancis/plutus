import { Metadata } from 'next'

import ExpensesSummary from '@/app/(app)/expenses/_components/summary'
import AppHeader from '@/components/app-header'
import CardLoader from '@/components/loader/card'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Expenses',
  description: 'Plutus finance tracker.',
}

export default function Income() {
  return (
    <>
      <AppHeader title="Expenses" />
      <Suspense fallback={<CardLoader cards={2} className="mb-6" />}>
        <ExpensesSummary />
      </Suspense>
      {/*<ExpenseTable />*/}
    </>
  )
}
