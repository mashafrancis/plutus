import { Metadata } from 'next'

import ExpensesSummary from '@/app/(app)/expenses/_components/summary'
import ExpenseTable from '@/app/(app)/expenses/_components/table'
import AppHeader from '@/components/app-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'

export const metadata: Metadata = {
  title: 'Expenses',
  description: 'Plutus finance tracker.',
}

export default function Income() {
  return (
    <DataContextProvider name="expenses">
      <AppHeader title="Income" />
      <ExpensesSummary />
      <ExpenseTable />
    </DataContextProvider>
  )
}
