import { redirect } from 'next/navigation'

import { ReactNode } from 'react'

import BottomNavigation from '@/components/bottom-navigation'
import { AuthProvider } from '@/components/client-provider/auth-provider'
import { DatePickerProvider } from '@/components/client-provider/datepicker-provider'
import { appConfig } from '@/config/dashboard'
import { createClient } from '@/lib/supabase/server'

interface DashboardLayoutProps {
  children?: ReactNode
}

export default async function AppLayout({ children }: DashboardLayoutProps) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <AuthProvider user={data.user}>
      <DatePickerProvider>
        {children}
        <BottomNavigation items={appConfig.sidebarNav} />
      </DatePickerProvider>
    </AuthProvider>
  )
}
