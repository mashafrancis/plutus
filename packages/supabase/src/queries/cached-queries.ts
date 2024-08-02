import 'server-only'

import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { createClient } from '../client/server'
import {
  type GetExpensesQueryParams,
  type GetIncomeQueryParams,
  type GetInvestmentsQueryParams,
  type GetSubscriptionsQueryParams,
  getExpensesQuery,
  getIncomeQuery,
  getUserQuery,
} from './index'

export const getSession = cache(async () => {
  const supabase = createClient()

  return supabase.auth.getSession()
})

export const getUser = async () => {
  const {
    data: { session },
  } = await getSession()
  const userId = session?.user?.id

  if (!userId) {
    return null
  }

  const supabase = createClient()

  return unstable_cache(
    async () => {
      return getUserQuery(supabase, userId)
    },
    ['user', userId],
    {
      tags: [`user_${userId}`],
      revalidate: 180,
    },
    // @ts-expect-error
  )(userId)
}

export const getExpenses = async (
  params: Omit<GetExpensesQueryParams, 'userId'>,
) => {
  const {
    data: { session },
  } = await getSession()
  const userId = session?.user?.id

  if (!userId) {
    return null
  }

  const supabase = createClient()

  return unstable_cache(
    async () => {
      return getExpensesQuery(supabase, { ...params, userId })
    },
    ['expenses', userId],
    {
      tags: [`expenses_${userId}`],
      revalidate: 180,
    },
    // @ts-expect-error
  )(params)
}

export const getIncome = async (
  params: Omit<GetIncomeQueryParams, 'userId'>,
) => {
  const {
    data: { session },
  } = await getSession()
  const userId = session?.user?.id

  if (!userId) {
    return null
  }

  const supabase = createClient()

  return unstable_cache(
    async () => {
      return getIncomeQuery(supabase, { ...params, userId })
    },
    ['income', userId],
    {
      tags: [`income_${userId}`],
      revalidate: 180,
    },
    // @ts-expect-error
  )(params)
}

export const getSubscriptions = async (
  params: Omit<GetSubscriptionsQueryParams, 'userId'>,
) => {
  const {
    data: { session },
  } = await getSession()
  const userId = session?.user?.id

  if (!userId) {
    return null
  }

  const supabase = createClient()

  return unstable_cache(
    async () => {
      return getIncomeQuery(supabase, { ...params, userId })
    },
    ['subscriptions', userId],
    {
      tags: [`subscriptions_${userId}`],
      revalidate: 180,
    },
    // @ts-expect-error
  )(params)
}

export const getInvestments = async (
  params: Omit<GetInvestmentsQueryParams, 'userId'>,
) => {
  const {
    data: { session },
  } = await getSession()
  const userId = session?.user?.id

  if (!userId) {
    return null
  }

  const supabase = createClient()

  return unstable_cache(
    async () => {
      return getIncomeQuery(supabase, { ...params, userId })
    },
    ['investments', userId],
    {
      tags: [`investments_${userId}`],
      revalidate: 180,
    },
    // @ts-expect-error
  )(params)
}
