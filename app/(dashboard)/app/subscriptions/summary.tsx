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
			<h2 className='mb-4 font-semibold text-primary dark:text-white'>
				Summary
			</h2>
			{loading ? (
				<CardLoader cards={4} className='mb-6' />
			) : (
				<div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'>
					<OverviewCard heading='total subscriptions' data={data.length} />
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
