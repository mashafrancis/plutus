import { Metadata } from 'next'

import IncomeSummary from '@/app/(dashboard)/app/income/summary'
import IncomeTable from '@/app/(dashboard)/app/income/table'
import AppHeader from '@/components/app-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'
import SectionContainer from '@/components/layout/section-container'

export const metadata: Metadata = {
  title: 'Income',
  description: 'Plutus finance tracker.',
}

export default function Income() {
  return (
    <SectionContainer className="sm:py-12 md:py-8 lg:py-8">
      <AppHeader title="Income" />
      <DataContextProvider name="income">
        <IncomeSummary />
        <IncomeTable />
      </DataContextProvider>
    </SectionContainer>
  )
}
