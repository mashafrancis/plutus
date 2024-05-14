import { Metadata } from 'next'

import AddData from '@/app/(dashboard)/app/settings/_components/_components/add-data'
import OverviewCardLayout from '@/app/(dashboard)/app/settings/_components/_components/overview-card-layout'
import OverviewCharts from '@/app/(dashboard)/app/settings/_components/_components/overview-charts'
import AppHeader from '@/components/app-header'
import { OverviewContextProvider } from '@/components/client-provider/overview-provider'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Plutus finance tracker.',
}

export default async function Dashboard() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/')

  return (
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
  )
}
