import OverviewCard from '@/app/[locale]/(app)/overview/components/overview-card'
import { TABLE_MAX_ITEMS } from '@/lib/constants'
// import { useUser } from '@/components/client-provider/auth-provider'
// import { useData } from '@/components/client-provider/data-provider'
import { getCurrencySymbol } from '@/lib/formatter'
import { getExpenses, getUser } from '@plutus/supabase/cached-queries'

export default async function ExpensesSummary() {
  const [user, expenses] = await Promise.all([
    getUser(),
    getExpenses({
      to: TABLE_MAX_ITEMS,
      from: 0,
    }),
  ])

  const totalAmount = expenses?.meta?.totalAmount

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
      <OverviewCard
        heading="Total expenses"
        data={
          expenses?.meta?.count
            ? { change: 0, current: expenses?.meta?.count?.toString() }
            : {
                change: 0,
                current: 0,
              }
        }
      />
      <OverviewCard
        heading="Total amount"
        valuePrefix={getCurrencySymbol({
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        data={
          totalAmount
            ? { change: 0, current: totalAmount }
            : {
                change: 0,
                current: 0,
              }
        }
      />
      {/* <SummaryCard title="top spent category" data={formatCurrency({ value: 1 })} /> */}
    </div>
  )
}
