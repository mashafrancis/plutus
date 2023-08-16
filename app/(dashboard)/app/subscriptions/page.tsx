import { Metadata } from 'next';
import AppLayoutHeader from '@/components/app-layout-header';
import { DataContextProvider } from '@/components/client-provider/data-provider';
import SubscriptionSummary from '@/app/(dashboard)/app/subscriptions/summary';
import SubscriptionTable from '@/app/(dashboard)/app/subscriptions/table';
import { Fragment } from 'react';

export const metadata: Metadata = {
	title: 'Subscriptions',
	description: 'Plutus finance tracker.',
};

export default function Subscriptions() {
	return (
		<Fragment>
			<AppLayoutHeader
				heading='Subscriptions'
				buttonTitle='Add subscription'
				buttonLink='/task'
			/>
			<DataContextProvider name='subscriptions' isNotRange={true}>
				<div className='w-full overflow-x-auto'>
					<SubscriptionSummary />
					<SubscriptionTable />
				</div>
			</DataContextProvider>
		</Fragment>
	);
}
