import { createContext } from 'react'
import { createStore } from 'zustand'

type User = {
  currency: string
  locale: string
  billing_start_date: string
  trial_start_date: string
  order_status: string
  usage: number
  email: string
  plan_status: string
  basic_usage_limit_email: boolean
  premium_plan_expired_email: boolean
  premium_usage_limit_email: boolean
  monthly_email_report: boolean
  new_signup_email?: boolean
  isPremium?: boolean
  isPremiumPlanEnded?: boolean
}

export interface UserProps {
  data: User
}

export interface UserState extends UserProps {
  setUser: (user: User) => void
}

export const createUserStore = (initProps: UserProps) => {
  return createStore<UserState>()((set) => ({
    data: initProps?.data,
    setUser: (user: User) => set({ data: user }),
  }))
}

export type UserStore = ReturnType<typeof createUserStore>
export const UserContext = createContext<UserStore | null>(null)
