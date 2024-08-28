import { Metadata } from 'next'

import InvestmentSummary from '@/app/[locale]/(app)/investments/components/summary'
import InvestmentTable from '@/app/[locale]/(app)/investments/components/table'
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
