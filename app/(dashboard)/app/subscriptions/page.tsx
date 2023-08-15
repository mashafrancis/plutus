import { Metadata } from 'next';
import DashboardDetails from '@/components/dashboard-details';

export const metadata: Metadata = {
	title: 'Subscriptions',
	description: 'Plutus finance tracker.',
};

export default function Subscriptions() {
	return (
		<div className='flex h-full flex-1 flex-col space-y-8 p-1'>
			<DashboardDetails
				heading='Subscriptions'
				buttonTitle='Add subscription'
				buttonLink='/task'
			/>
		</div>
	);
}
