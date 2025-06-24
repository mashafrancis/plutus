import type { Metadata } from 'next';
import type { SearchParams } from 'nuqs';
import { loadMetricsParams } from '@/hooks/use-metrics-params';
import { getCurrencySymbol } from '@/lib/formatter';
import { getQueryClient, trpc } from '@/trpc/server';
import OverviewCard from './overview-card';

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Plutus finance tracker.',
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: Props) {
  const queryClient = getQueryClient();
  const searchParams = await props.searchParams;
  const { from, to } = loadMetricsParams(searchParams);

  const [user, expenses, income, investments, subscriptions] =
    await Promise.all([
      queryClient.fetchQuery(trpc.users.me.queryOptions()),
      queryClient.fetchQuery(trpc.expenses.get.queryOptions({ from, to })),
      queryClient.fetchQuery(trpc.income.get.queryOptions({ from, to })),
      queryClient.fetchQuery(trpc.investments.get.queryOptions({ from, to })),
      queryClient.fetchQuery(trpc.subscriptions.get.queryOptions({ from, to })),
    ]);

  const totalExpenses = expenses.reduce(
    (acc: any, { price }: any) => Number(price) + acc,
    0
  );
  const totalIncome = income.reduce(
    (acc: any, { price }: any) => Number(price) + acc,
    0
  );
  const totalInvestments = investments.reduce(
    (acc: any, { price, units }: any) => Number(price) * Number(units) + acc,
    0
  );
  const totalSubscriptions = subscriptions.reduce(
    (acc: any, { price, paid_dates }: any) =>
      Number(price) * paid_dates.length + acc,
    0
  );
  const totalSpent = totalExpenses + totalInvestments + totalSubscriptions;
  const totalBalance = totalIncome - totalSpent;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        <OverviewCard
          data={
            totalIncome
              ? { change: 0, current: totalIncome }
              : {
                  change: 0,
                  current: 0,
                }
          }
          heading="Total income"
          valuePrefix={getCurrencySymbol({
            currency: user?.currency,
            locale: user?.locale,
          })}
        />
        <OverviewCard
          data={
            totalBalance
              ? { change: 0, current: totalBalance }
              : {
                  change: 0,
                  current: 0,
                }
          }
          heading="Available balance"
          valuePrefix={getCurrencySymbol({
            currency: user?.currency,
            locale: user?.locale,
          })}
        />
        <OverviewCard
          data={
            totalSpent
              ? { change: 0, current: totalSpent }
              : {
                  change: 0,
                  current: 0,
                }
          }
          heading="Total spent"
          valuePrefix={getCurrencySymbol({
            currency: user?.currency,
            locale: user?.locale,
          })}
        />
        <OverviewCard
          data={
            totalInvestments
              ? { change: 0, current: totalInvestments }
              : {
                  change: 0,
                  current: 0,
                }
          }
          heading="Total investment"
          valuePrefix={getCurrencySymbol({
            currency: user?.currency,
            locale: user?.locale,
          })}
        />
        <OverviewCard
          data={
            totalSubscriptions
              ? { change: 0, current: totalSubscriptions }
              : {
                  change: 0,
                  current: 0,
                }
          }
          heading="Total subscriptions"
          valuePrefix={getCurrencySymbol({
            currency: user?.currency,
            locale: user?.locale,
          })}
        />
        {/*<div className='aspect-video rounded-xl bg-muted/50' />*/}
        {/*<div className='aspect-video rounded-xl bg-muted/50' />*/}
        {/*<div className='aspect-video rounded-xl bg-muted/50' />*/}
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  );
}
