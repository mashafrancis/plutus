import { Metadata } from 'next';
import AppLayoutHeader from '@/components/app-layout-header';

export const metadata: Metadata = {
	title: 'Subscriptions',
	description: 'Plutus finance tracker.',
};

export default function Subscriptions() {
	return (
		<div className='flex h-full flex-1 flex-col space-y-8 p-1'>
			<AppLayoutHeader
				heading='Subscriptions'
				buttonTitle='Add subscription'
				buttonLink='/task'
			/>
		</div>
	);
}
