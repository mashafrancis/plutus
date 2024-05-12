import { Metadata } from 'next'

import SubscriptionSummary from '@/app/(dashboard)/app/subscriptions/_components/summary'
import SubscriptionTable from '@/app/(dashboard)/app/subscriptions/_components/table'
import AppHeader from '@/components/app-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'
import SectionContainer from '@/components/layout/section-container'

export const metadata: Metadata = {
  title: 'Subscriptions',
  description: 'Plutus finance tracker.',
}

export default function Subscriptions() {
  return (
    <SectionContainer className="sm:py-12 md:py-8 lg:py-8">
      <AppHeader title="Subscriptions" />
      <DataContextProvider name="subscriptions" isNotRange={true}>
        <SubscriptionSummary />
        <SubscriptionTable />
      </DataContextProvider>
    </SectionContainer>
  )
}
