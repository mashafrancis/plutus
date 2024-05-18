import { Metadata } from 'next'

import InvestmentSummary from '@/app/(app)/investments/_components/summary'
import InvestmentTable from '@/app/(app)/investments/_components/table'
import AppHeader from '@/components/app-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'

export const metadata: Metadata = {
  title: 'Investments',
  description: 'Plutus finance tracker.',
}

export default function Investments() {
  return (
    <DataContextProvider name="investments">
      <AppHeader title="Investments" />
      <InvestmentSummary />
      <InvestmentTable />
    </DataContextProvider>
  )
}
