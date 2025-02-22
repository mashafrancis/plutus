import type { ReactNode } from 'react'

import BottomNavigation from '@/components/bottom-navigation'
import { DatePickerProvider } from '@/components/client-provider/datepicker-provider'
import { appConfig } from '@/config/dashboard'
import { UserProvider } from '@/store/user/provider'
import { setupAnalytics } from '@plutus/events/server'
import { getUser } from '@plutus/supabase/cached-queries'
import { redirect } from 'next/navigation'

interface DashboardLayoutProps {
  children?: ReactNode
}

export default async function AppLayout({ children }: DashboardLayoutProps) {
  const user = await getUser()

  if (!user?.data) {
    redirect('/')
  }

  if (user) {
    await setupAnalytics({ userId: user.data.id })
  }

  return (
    <UserProvider data={user.data}>
      <DatePickerProvider>
        {children}
        <BottomNavigation items={appConfig.sidebarNav} />
      </DatePickerProvider>
    </UserProvider>
  )
}
