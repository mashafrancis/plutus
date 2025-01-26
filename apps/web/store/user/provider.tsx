'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { UserContext, type UserProps, createUserStore } from './store'

type UserProviderProps = PropsWithChildren<UserProps>

export function UserProvider({ children, data }: UserProviderProps) {
  const store = createUserStore({ data })

  useEffect(() => {
    if (data) {
      store.setState({ data })
    } else {
      store.setState({
        data: {
          locale: window.navigator.language || 'en-US',
          currency: '',
          billing_start_date: '',
          trial_start_date: '',
          order_status: '',
          usage: 0,
          email: '',
          plan_status: '',
          new_signup_email: false,
          basic_usage_limit_email: false,
          premium_plan_expired_email: false,
          premium_usage_limit_email: false,
          monthly_email_report: false,
          isPremium: false,
          isPremiumPlanEnded: false,
        },
      })
    }
  }, [data, store])

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}
