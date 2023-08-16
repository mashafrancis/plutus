'use client';

import { useMemo } from 'react';

import CardLoader from '@/components/loader/card';

import { formatCurrency } from '@/lib/formatter';
import OverviewCard from '@/app/(dashboard)/app/_components/overview-card';
import { useData } from '@/components/client-provider/data-provider';
import { useUser } from '@/components/client-provider/auth-provider';

export default function SubscriptionSummary() {
	const user = useUser();
	const { data = [], loading = true } = useData();
	const monthlyData = useMemo(
		() => data.filter((datum: any) => datum.active && datum.paid === 'monthly'),
		[data]
	);
	const yearlyData = useMemo(
		() => data.filter((datum: any) => datum.active && datum.paid === 'yearly'),
		[data]
	);

	return (
		<>
			{loading ? (
				<CardLoader cards={4} className='mb-6' />
			) : (
				<div className='grid grid-cols-2 gap-2 lg:grid-cols-4'>
					<OverviewCard heading='Total Subscriptions' data={data.length} />
					<OverviewCard
						heading='Active - Cancelled'
						data={`${data.filter((datum: any) => datum.active).length} - ${
							data.filter((datum: any) => !datum.active).length
						}`}
					/>
					<OverviewCard
						heading='Total Active - Monthly'
						data={formatCurrency({
							value: monthlyData.reduce(
								(acc: any, datum: any) => Number(datum.price) + acc,
								0
							),
							currency: user.currency,
							locale: user.locale,
						})}
					/>

					<OverviewCard
						heading='Total Active - Yearly'
						data={formatCurrency({
							value: yearlyData.reduce(
								(acc: any, datum: any) => Number(datum.price) + acc,
								0
							),
							currency: user.currency,
							locale: user.locale,
						})}
					/>
				</div>
			)}
		</>
	);
}
