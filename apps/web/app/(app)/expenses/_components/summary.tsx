import OverviewCard from '@/app/(app)/settings/_components/_components/overview-card'
// import { useUser } from '@/components/client-provider/auth-provider'
// import { useData } from '@/components/client-provider/data-provider'
import { formatCurrency } from '@/lib/formatter'
import { getExpenses, getUser } from '@plutus/supabase/cached-queries'

export default async function ExpensesSummary() {
  const [user, expenses] = await Promise.all([
    getUser(),
    getExpenses({
      from: '2023-01-01',
      to: '2023-01-31',
    }),
  ])

  console.log(
    'Class: default, Function: ExpensesSummary, Line 14 expenses():',
    expenses,
  )

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
      <OverviewCard
        heading="Total expenses"
        data={expenses?.count?.toString() ?? '0'}
        className="bg-[#EADDFF] text-[#21005D]"
      />
      <OverviewCard
        heading="Total amount"
        data={formatCurrency({
          value: expenses?.data?.reduce(
            (acc: any, datum: any) => Number(datum.price) + acc,
            0,
          ),
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        className="bg-[#B9E3FD] text-[#282B2D]"
      />
      {/* <SummaryCard title="top spent category" data={formatCurrency({ value: 1 })} /> */}
    </div>
  )
}
