import { Metadata } from 'next'

import InvestmentSummary from '@/app/(dashboard)/app/investments/_components/summary'
import InvestmentTable from '@/app/(dashboard)/app/investments/_components/table'
import AppHeader from '@/components/app-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'
import SectionContainer from '@/components/layout/section-container'

export const metadata: Metadata = {
  title: 'Investments',
  description: 'Plutus finance tracker.',
}

export default function Investments() {
  return (
    <SectionContainer className="sm:py-12 md:py-8 lg:py-8">
      <AppHeader title="Investments" />
      <DataContextProvider name="investments">
        <InvestmentSummary />
        <InvestmentTable />
      </DataContextProvider>
    </SectionContainer>
  )
}
