import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { ReactNode } from 'react'

import { getSession } from '@/app/supabase-server'

import BottomNavigation from '@/components/bottom-navigation'
import { AuthProvider } from '@/components/client-provider/auth-provider'
import { DatePickerProvider } from '@/components/client-provider/datepicker-provider'
import { appConfig } from '@/config/dashboard'
import url from '@/constants/url'
import { apiUrls } from '@/lib/apiUrls'

interface DashboardLayoutProps {
  children?: ReactNode
}

async function getUser(cookies: any) {
  'use server'
  const res = await fetch(`${url.serverApi}/${apiUrls.user.modify}`, {
    headers: { cookie: cookies },
  })
  if (!res.ok) {
    return {}
  }
  return await res.json()
}

export default async function AppLayout({ children }: DashboardLayoutProps) {
  const session = await getSession()
  const user = await getUser(cookies())

  if (!session) {
    return notFound()
  }

  return (
    <AuthProvider user={user} accessToken={session?.access_token || null}>
      <DatePickerProvider>
        {children}
        <BottomNavigation items={appConfig.sidebarNav} />
      </DatePickerProvider>
    </AuthProvider>
  )
}
