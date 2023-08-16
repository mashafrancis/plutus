'use client';

import OverviewCard from '@/app/(dashboard)/app/_components/overview-card';
import { useUser } from '@/components/client-provider/auth-provider';
import { useOverview } from '@/components/client-provider/overview-provider';
import { formatCurrency } from '@/lib/formatter';

export default function OverviewCardLayout() {
	const user = useUser();
	const { data, loading } = useOverview();

	const totalExpenses = data.expenses.reduce(
		(acc: any, { price }: any) => Number(price) + acc,
		0
	);
	const totalIncome = data.income.reduce(
		(acc: any, { price }: any) => Number(price) + acc,
		0
	);
	const totalInvestment = data.investments.reduce(
		(acc: any, { price, units }: any) => Number(price) * Number(units) + acc,
		0
	);
	const totalSubscriptions = data.subscriptions.reduce(
		(acc: any, { price, paid_dates }: any) =>
			Number(price) * paid_dates.length + acc,
		0
	);
	const totalSpent = totalExpenses + totalInvestment + totalSubscriptions;
	const totalBalance = totalIncome - totalSpent;

	return (
		<div className='grid grid-cols-2 gap-2 lg:grid-cols-4'>
			<OverviewCard
				heading='Total Income'
				icon='income'
				data={formatCurrency({
					value: totalIncome,
					currency: user.currency,
					locale: user.locale,
				})}
				// caption={caption}
			/>
			<OverviewCard
				heading='Total Spent'
				icon='expenses'
				data={formatCurrency({
					value: totalSpent,
					currency: user.currency,
					locale: user.locale,
				})}
				// caption={caption}
			/>
			<OverviewCard
				heading='Available Balance'
				icon='chart'
				data={formatCurrency({
					value: totalBalance,
					currency: user.currency,
					locale: user.locale,
				})}
				// caption={caption}
			/>
			<OverviewCard
				heading='Total Subscriptions'
				icon='subscriptions'
				data={formatCurrency({
					value: totalSubscriptions,
					currency: user.currency,
					locale: user.locale,
				})}
				// caption={caption}
			/>
		</div>
	);
}
