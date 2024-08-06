import type { ReactNode } from 'react'

import BottomNavigation from '@/components/bottom-navigation'
import { AuthProvider } from '@/components/client-provider/auth-provider'
import { DatePickerProvider } from '@/components/client-provider/datepicker-provider'
import { appConfig } from '@/config/dashboard'
import { getUser } from '@plutus/supabase/cached-queries'
import { SessionProvider } from 'next-auth/react'

interface DashboardLayoutProps {
  children?: ReactNode
}

export default async function AppLayout({ children }: DashboardLayoutProps) {
  const user = await getUser()

  return (
    <SessionProvider>
      {/* @ts-expect-error */}
      <AuthProvider user={user}>
        <DatePickerProvider>
          {children}
          <BottomNavigation items={appConfig.sidebarNav} />
        </DatePickerProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
