import { Metadata } from 'next'

import AddData from '@/app/(dashboard)/app/settings/_components/_components/add-data'
import OverviewCardLayout from '@/app/(dashboard)/app/settings/_components/_components/overview-card-layout'
import OverviewCharts from '@/app/(dashboard)/app/settings/_components/_components/overview-charts'
import AppHeader from '@/components/app-header'
import { OverviewContextProvider } from '@/components/client-provider/overview-provider'
import SectionContainer from '@/components/layout/section-container'

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Plutus finance tracker.',
}

export default function Dashboard() {
  return (
    <SectionContainer className="sm:py-12 md:py-8 lg:py-8">
      <OverviewContextProvider>
        <AppHeader
          title="Overview"
          description="A glimpse of all your financial data."
          showDatePicker
          addButton={<AddData />}
        />
        <OverviewCardLayout />
        <OverviewCharts />
      </OverviewContextProvider>
    </SectionContainer>
  )
}
