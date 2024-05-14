'use client'

import { useRouter } from 'next/navigation'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import fetcher from '@/lib/fetcher'
import { getStatusRedirect } from '@/lib/helpers'
import { createClient } from '@/lib/supabase/client'
import { SWRConfig } from 'swr' // biome-ignore lint/correctness/noUnusedVariables: <explanation>

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
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

interface Session {}

const AuthContext = createContext(null)

export const AuthProvider = (props: any) => {
  const [initial, setInitial] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const supabase = createClient()
  const { children, user, ...others } = props

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession()
      setSession(activeSession ?? null)
      setInitial(false)
    }

    getActiveSession()

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.refresh()
      }

      if (event === 'SIGNED_OUT') {
        getStatusRedirect(`${origin}/`, 'Success!', 'You are now signed out.')
      }
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      signOut: () => supabase.auth.signOut(),
    }
  }, [session, user])

  return (
    <AuthContext.Provider value={value} {...others}>
      <SWRConfig value={{ fetcher }}>{session ? children : null}</SWRConfig>
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
