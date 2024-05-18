'use client'

import { PropsWithChildren, createContext, useContext, useMemo } from 'react'

import fetcher from '@/lib/fetcher'
import { SWRConfig } from 'swr'

interface User {
  currency: string
  locale: string
  billing_start_date: string
  trial_start_date: string
  order_status: string
  usage: number
  email: string
  plan_status: string
  new_signup_email: boolean
  basic_usage_limit_email: boolean
  premium_plan_expired_email: boolean
  premium_usage_limit_email: boolean
  monthly_email_report: boolean
  isPremium: boolean
  isPremiumPlanEnded: boolean
}

interface Props {
  user: User
}

const AuthContext = createContext({})

export const AuthProvider = (props: PropsWithChildren<Props>) => {
  const { children, user } = props

  const value = useMemo(() => {
    return {
      user: user as User,
    }
  }, [user])

  console.log('Class: , Function: AuthProvider, Line 41 value():', value.user)

  return (
    <AuthContext.Provider value={value}>
      <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
    </AuthContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext<any>(AuthContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a AuthContext.`)
  }
  return context?.user ?? null
}
