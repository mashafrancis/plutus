import { UTCDate } from '@date-fns/utc'
import { basicPlan, premiumPlan } from '@plutus/constants'
import { addYears } from 'date-fns'
import type { Client } from '../types'

export async function getUserQuery(supabase: Client, userId: string) {
  const { data } = await supabase
    .from('users')
    .select(
      `
      *
    `,
    )
    .eq('id', userId)
    .single()
    .throwOnError()

  // if (!data){
  // 	return
  // }

  // const {
  //   basic_usage_limit_email,
  //   premium_usage_limit_email,
  //   premium_plan_expired_email,
  // } = data!
  // const { isBasicUsageExceeded, isPremiumUsageExceeded, isPremiumPlanExpired } =
  //   getUserUsageLimit(data)

  return { data }
}

export type GetExpensesQueryParams = {
  userId: string
  to: number
  from: number
  sort?: {
    column: string
    value: 'asc' | 'desc'
  }
  searchQuery?: string
  filter?: {
    categories?: string[]
    accounts?: string[]
    date?: {
      from?: string
      to?: string
    }
  }
}

export async function getExpensesQuery(
  supabase: Client,
  params: GetExpensesQueryParams,
) {
  const { userId, from = 0, to, filter, sort, searchQuery } = params
  const { date = {}, categories } = filter || {}

  const columns = [
    'id',
    'name',
    'price',
    'category',
    'paid_via',
    'notes',
    'created_at',
    'updated_at',
    'user_id',
    'date',
  ]

  const query = supabase
    .from('expenses')
    .select(columns.join(','), { count: 'exact' })
    .eq('user_id', userId)
    .throwOnError()

  if (sort) {
    // @ts-expect-error
    const [column, value] = sort
    const ascending = value === 'asc'

    if (column === 'name') {
      query.order('name', { ascending })
    } else if (column === 'price') {
      query.order('price', { ascending })
    } else if (column === 'paid_via') {
      query.order('paid_via', { ascending })
    } else {
      query.order(column, { ascending })
    }
  } else {
    query
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
  }

  if (date?.from && date?.to) {
    query.gte('date', date.from)
    query.lte('date', date.to)
  }

  if (searchQuery) {
    if (!Number.isNaN(Number.parseInt(searchQuery))) {
      query.like('price', `%${searchQuery}%`)
    } else {
      query.ilike('name', `%${searchQuery}%`)
    }
  }

  if (categories) {
    const matchCategory = categories
      .map((category) => {
        if (category === 'uncategorized') {
          return 'category_slug.is.null'
        }
        return `category_slug.eq.${category}`
      })
      .join(',')

    query.or(matchCategory)
  }

  const { data, count } = await query.range(from, to)

  const totalAmount = data?.reduce(
    (acc: any, { price }: any) => Number(price) + acc,
    0,
  )

  return {
    meta: {
      totalAmount,
      count,
    },
    data,
  }
}

export type GetIncomeQueryParams = {
  userId: string
  from: string
  to: string
  categories?: string[]
  sort?: {
    column: string
    value: 'asc' | 'desc'
  }
}

export async function getIncomeQuery(
  supabase: Client,
  params: GetIncomeQueryParams,
) {
  const { userId, from, to } = params

  const _fromDate = new UTCDate(from)
  const _toDate = new UTCDate(to)

  const query = await supabase
    .from('income')
    .select(
      `
		*
	`,
    )
    .eq('user_id', userId)
    .throwOnError()

  // if (date?.from && date?.to) {
  //   query.gte('date', date.from)
  //   query.lte('date', date.to)
  // }
  //
  // const { data, count } = await query.range(from, to)

  return query
}

export type GetSubscriptionsQueryParams = {
  userId: string
  from: string
  to: string
  categories?: string[]
  sort?: {
    column: string
    value: 'asc' | 'desc'
  }
}

export async function getSubscriptionsQuery(
  supabase: Client,
  params: GetSubscriptionsQueryParams,
) {
  const { userId, from, to } = params

  const _fromDate = new UTCDate(from)
  const _toDate = new UTCDate(to)

  const query = await supabase
    .from('subscriptions')
    .select(
      `
		*
	`,
    )
    .eq('user_id', userId)
    .throwOnError()

  // if (date?.from && date?.to) {
  //   query.gte('date', date.from)
  //   query.lte('date', date.to)
  // }
  //
  // const { data, count } = await query.range(from, to)

  return query
}

export type GetInvestmentsQueryParams = {
  userId: string
  from: string
  to: string
  categories?: string[]
  sort?: {
    column: string
    value: 'asc' | 'desc'
  }
}

export async function getInvestmentsQuery(
  supabase: Client,
  params: GetInvestmentsQueryParams,
) {
  const { userId, from, to } = params

  const _fromDate = new UTCDate(from)
  const _toDate = new UTCDate(to)

  const query = await supabase
    .from('investments')
    .select(
      `
		*
	`,
    )
    .eq('user_id', userId)
    .throwOnError()

  // if (date?.from && date?.to) {
  //   query.gte('date', date.from)
  //   query.lte('date', date.to)
  // }
  //
  // const { data, count } = await query.range(from, to)

  return query
}

const hasPremiumPlanExpired = (billingCycleData: string) => {
  const todayDate = new Date()
  const endDateForBilling = addYears(new Date(billingCycleData), 1)
  return todayDate > endDateForBilling
}

const _getUserUsageLimit = (user: any) => {
  const { billing_start_date, plan_status, usage, order_status } = user

  const isBasicUsageExceeded =
    plan_status === 'basic' && usage + 1 > basicPlan.limit
  const isPremium = plan_status === 'premium' && order_status === 'paid'
  const isPremiumUsageExceeded = isPremium && usage + 1 > premiumPlan.limit
  const isPremiumPlanExpired =
    isPremium && hasPremiumPlanExpired(billing_start_date)

  return { isBasicUsageExceeded, isPremiumUsageExceeded, isPremiumPlanExpired }
}
