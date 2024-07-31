import OverviewCard from '@/app/(app)/settings/_components/_components/overview-card'
import { defaultDateValues } from '@/constants/date'
import { formatCurrency } from '@/lib/formatter'
import { getExpenses, getUser } from '@plutus/supabase/cached-queries'

export default async function OverviewCardLayout() {
  const user = await getUser()
  const expenses = await getExpenses({
    from: defaultDateValues.from,
    to: defaultDateValues.to,
  })

  const totalExpenses = expenses?.data?.reduce(
    (acc: any, { price }: any) => Number(price) + acc,
    0,
  )
  const totalIncome = expenses?.data?.reduce(
    (acc: any, { price }: any) => Number(price) + acc,
    0,
  )
  const totalInvestment = expenses?.data?.reduce(
    (acc: any, { price, units }: any) => Number(price) * Number(units) + acc,
    0,
  )
  const totalSubscriptions = expenses?.data?.reduce(
    (acc: any, { price, paid_dates }: any) =>
      Number(price) * paid_dates.length + acc,
    0,
  )
  const totalSpent = totalExpenses + totalInvestment + totalSubscriptions
  const totalBalance = totalIncome - totalSpent

  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      <OverviewCard
        heading="Income"
        icon="income"
        data={formatCurrency({
          value: totalIncome,
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        className="bg-[#EADDFF] text-[#21005D]"
        // caption={caption}
      />
      <OverviewCard
        heading="Spendings"
        icon="expenses"
        data={formatCurrency({
          value: totalSpent,
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        className="bg-[#D5E4EB] text-[#34383B]"
        // caption={caption}
      />
      <OverviewCard
        heading="Balance"
        icon="balance"
        data={formatCurrency({
          value: totalBalance,
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        className="bg-[#B9E3FD] text-[#282B2D]"
        // caption={caption}
      />
      <OverviewCard
        heading="Subscriptions"
        icon="subscriptions"
        data={formatCurrency({
          value: totalSubscriptions,
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        className="bg-[#efebe9] text-[#3e2723]"
        // caption={caption}
      />
    </div>
  )
}
