'use client';

import CardLoader from '@/components/loader/card';
import { useData } from '@/components/client-provider/data-provider';
import { useUser } from '@/components/client-provider/auth-provider';

import { formatCurrency } from '@/lib/formatter';
import OverviewCard from '@/app/(dashboard)/app/_components/overview-card';

export default function IncomeSummary() {
	const user = useUser();
	const { data = [], loading = true } = useData();

	return (
		<>
			{loading ? (
				<CardLoader cards={2} className='mb-6' />
			) : (
				<div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'>
					<OverviewCard heading='total income' data={data.length} />
					<OverviewCard
						heading='total amount'
						data={formatCurrency({
							value: data.reduce(
								(acc: any, datum: any) => Number(datum.price) + acc,
								0
							),
							currency: user?.currency,
							locale: user?.locale,
						})}
					/>
					{/* <SummaryCard title="top spent category" data={formatCurrency({ value: 1 })} /> */}
				</div>
			)}
		</>
	);
}
