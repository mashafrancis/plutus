import { DataTable } from '@/components/views/expenses/data-table'
import { NoResults } from '@/components/views/expenses/empty-states'
import { expensesCategory } from '@/constants/categories'
import { Cookies, TABLE_MAX_ITEMS, TABLE_PAGE_SIZE } from '@/lib/constants'
import { getExpenses, getUser } from '@plutus/supabase/cached-queries'
import { cookies } from 'next/headers'
import { columns } from './columns'

interface Props {
  filter: any
  page: number
  sort: any
  query?: string
}

const categories = Object.keys(expensesCategory)
  .filter(Boolean)
  .map((categoryKey) => ({
    label: expensesCategory[categoryKey]?.name,
    value: categoryKey,
  }))

export default async function ExpenseTable({
  filter,
  page,
  sort,
  query,
}: Props) {
  const hasFilters = Object.keys(filter).length > 0
  const initialColumnVisibility = JSON.parse(
    cookies().get(Cookies.ExpensesColumns)?.value || '[]',
  )

  const [user, expenses] = await Promise.all([
    getUser(),
    getExpenses({
      to: hasFilters ? TABLE_MAX_ITEMS : TABLE_PAGE_SIZE,
      from: 0,
      filter,
      sort,
      searchQuery: query,
    }),
  ])

  const { data, meta } = expenses ?? {}

  async function loadMore({ from, to }: { from: number; to: number }) {
    'use server'

    return getExpenses({
      to,
      from: from + 1,
      filter,
      sort,
      searchQuery: query,
    })
  }

  if (!data?.length) {
    if (query?.length) {
      return <NoResults hasFilters />
    }

    return <NoResults hasFilters={hasFilters} />
  }

  const hasNextPage = Boolean(
    meta?.count && meta.count / (page + 1) > TABLE_PAGE_SIZE,
  )

  return (
    <DataTable
      initialColumnVisibility={initialColumnVisibility}
      options={{ user }}
      filter={filter}
      columns={columns}
      data={data}
      // @ts-expect-error
      loadMore={loadMore}
      filename="Expenses"
      // @ts-expect-error
      categories={categories}
      hasNextPage={hasNextPage}
      // @ts-expect-error
      meta={meta}
    />
  )
}
