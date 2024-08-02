import { UTCDate } from '@date-fns/utc'
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
  // .throwOnError()

  return { data }
}

export type GetExpensesQueryParams = {
  userId: string
  from: string
  to: string
  categories?: string[]
  sort?: {
    column: string
    value: 'asc' | 'desc'
  }
}

export async function getExpensesQuery(
  supabase: Client,
  params: GetExpensesQueryParams,
) {
  const { userId, from, to } = params

  const _fromDate = new UTCDate(from)
  const _toDate = new UTCDate(to)

  const query = await supabase
    .from('expenses')
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
