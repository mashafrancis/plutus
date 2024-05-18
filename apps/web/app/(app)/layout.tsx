import { ReactNode } from 'react'

import { getUser } from '@/app/(app)/actions'
import BottomNavigation from '@/components/bottom-navigation'
import { AuthProvider } from '@/components/client-provider/auth-provider'
import { DatePickerProvider } from '@/components/client-provider/datepicker-provider'
import { appConfig } from '@/config/dashboard'
import { SessionProvider } from 'next-auth/react'

interface DashboardLayoutProps {
  children?: ReactNode
}

// async function getUser(cookies: any) {
//   const res = await fetch(`${url.serverApi}/${apiUrls.user.modify}`, {
//     headers: { cookie: cookies },
//   })
//   if (!res.ok) {
//     return {}
//   }
//   return await res.json()
// }

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
