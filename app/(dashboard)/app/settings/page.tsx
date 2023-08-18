import { Metadata } from 'next';

import AppLayoutHeader from '@/components/app-layout-header';

export const metadata: Metadata = {
	title: 'Investments',
	description: 'Plutus finance tracker.',
};

export default function Investments() {
	return (
		<div className='flex h-full flex-1 flex-col space-y-8 p-1'>
			<AppLayoutHeader
				heading='Investments'
				buttonTitle='Add investment'
				buttonLink='/task'
			/>
		</div>
	);
}
