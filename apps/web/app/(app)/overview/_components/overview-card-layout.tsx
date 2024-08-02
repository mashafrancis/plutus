import OverviewCard from '@/app/(app)/overview/_components/overview-card'
import { defaultDateValues } from '@/constants/date'
import { getCurrencySymbol } from '@/lib/formatter'
import {
  getExpenses,
  getIncome,
  getInvestments,
  getSubscriptions,
  getUser,
} from '@plutus/supabase/cached-queries'

export default async function OverviewCardLayout() {
  const [user, expenses, income, subscriptions, investments] =
    await Promise.all([
      getUser(),
      getExpenses({
        from: defaultDateValues.from,
        to: defaultDateValues.to,
      }),
      getIncome({
        from: defaultDateValues.from,
        to: defaultDateValues.to,
      }),
      getSubscriptions({
        from: defaultDateValues.from,
        to: defaultDateValues.to,
      }),
      getInvestments({
        from: defaultDateValues.from,
        to: defaultDateValues.to,
      }),
    ])

  // const user = await getUser()
  // const expenses = await getExpenses({
  //   from: defaultDateValues.from,
  //   to: defaultDateValues.to,
  // })
  //
  // const income = await getIncome({
  //   from: defaultDateValues.from,
  //   to: defaultDateValues.to,
  // })

  const totalExpenses = expenses?.data?.reduce(
    (acc: any, { price }: any) => Number(price) + acc,
    0,
  )
  const totalIncome = income?.data?.reduce(
    (acc: any, { price }: any) => Number(price) + acc,
    0,
  )
  const totalInvestment = investments?.data?.reduce(
    (acc: any, { price, units }: any) => Number(price) * Number(units) + acc,
    0,
  )
  const totalSubscriptions = subscriptions?.data?.reduce(
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
        valuePrefix={getCurrencySymbol({
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        data={
          totalIncome
            ? { change: 0, current: totalIncome }
            : {
                change: 0,
                current: 0,
              }
        }
      />
      <OverviewCard
        heading="Spending"
        valuePrefix={getCurrencySymbol({
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        data={
          totalSpent
            ? { change: 0, current: totalSpent }
            : {
                change: 0,
                current: 0,
              }
        }
      />
      <OverviewCard
        heading="Balance"
        valuePrefix={getCurrencySymbol({
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        data={
          totalBalance
            ? { change: 0, current: totalBalance }
            : {
                change: 0,
                current: 0,
              }
        }
      />
      <OverviewCard
        heading="Subscriptions"
        valuePrefix={getCurrencySymbol({
          currency: user?.data?.currency,
          locale: user?.data?.locale,
        })}
        data={
          totalSubscriptions
            ? { change: 0, current: totalSubscriptions }
            : {
                change: 0,
                current: 0,
              }
        }
      />
    </div>
  )
}
