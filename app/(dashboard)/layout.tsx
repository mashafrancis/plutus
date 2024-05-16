import { ReactNode } from 'react'

import { getUser } from '@/app/(dashboard)/actions'
import BottomNavigation from '@/components/bottom-navigation'
import { AuthProvider } from '@/components/client-provider/auth-provider'
import { DatePickerProvider } from '@/components/client-provider/datepicker-provider'
import { appConfig } from '@/config/dashboard'

interface DashboardLayoutProps {
  children?: ReactNode
}

export default async function AppLayout({ children }: DashboardLayoutProps) {
  const user = await getUser()
  return (
    <AuthProvider user={user}>
      <DatePickerProvider>
        {children}
        <BottomNavigation items={appConfig.sidebarNav} />
      </DatePickerProvider>
    </AuthProvider>
  )
}
