import { type Metadata } from 'next'

import Add from '@/components/add-button'
import AppHeader from '@/components/app-header'
import CardLoader from '@/components/loader/card'
import ExpenseTableView from '@/components/views/expenses/expense-table-view'
import { Loading } from '@/components/views/expenses/loading'
import ExpensesSummary from '@/components/views/expenses/summary'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Expenses',
  description: 'Plutus finance tracker.',
}

export default function Expenses({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? +searchParams.page : 0
  const filter =
    (searchParams?.filter && JSON.parse(searchParams.filter as string)) ?? {}
  // @ts-expect-error
  const sort = searchParams?.sort?.split(':')

  const loadingKey = JSON.stringify({
    page,
    filter,
    sort,
    query: searchParams?.q,
  })

  return (
    <>
      <AppHeader
        title="Expenses"
        description="A glimpse of all your financial data."
        showDatePicker
        addButton={<Add type="expenses" />}
      />
      <Suspense fallback={<CardLoader cards={4} className="mb-6" />}>
        <ExpensesSummary />
      </Suspense>

      <Suspense fallback={<Loading />} key={loadingKey}>
        <ExpenseTableView
          filter={filter}
          page={page}
          sort={sort}
          // @ts-expect-error
          query={searchParams?.q}
        />
      </Suspense>
    </>
  )
}
