import { Metadata } from 'next'

import ExpensesSummary from '@/app/(dashboard)/app/expenses/summary'
import ExpenseTable from '@/app/(dashboard)/app/expenses/table'
import AppHeader from '@/components/app-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'
import SectionContainer from '@/components/layout/section-container'

export const metadata: Metadata = {
  title: 'Expenses',
  description: 'Plutus finance tracker.',
}

export default function Income() {
  return (
    <SectionContainer className="sm:py-12 md:py-8 lg:py-8">
      <AppHeader title="Income" />
      <DataContextProvider name="expenses">
        <ExpensesSummary />
        <ExpenseTable />
      </DataContextProvider>
    </SectionContainer>
  )
}
