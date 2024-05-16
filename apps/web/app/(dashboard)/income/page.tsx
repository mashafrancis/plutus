import { Metadata } from 'next'

import IncomeSummary from '@/app/(dashboard)/income/_components/summary'
import IncomeTable from '@/app/(dashboard)/income/_components/table'
import AppHeader from '@/components/app-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'

export const metadata: Metadata = {
  title: 'Income',
  description: 'Plutus finance tracker.',
}

export default function Income() {
  return (
    <DataContextProvider name="income">
      <AppHeader title="Income" />
      <IncomeSummary />
      <IncomeTable />
    </DataContextProvider>
  )
}
