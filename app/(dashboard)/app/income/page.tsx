import { Metadata } from 'next';
import AppLayoutHeader from '@/components/app-layout-header';

export const metadata: Metadata = {
	title: 'Income',
	description: 'Plutus finance tracker.',
};

export default function Income() {
	return (
		<div className='flex h-full flex-1 flex-col space-y-8 p-1'>
			<AppLayoutHeader
				heading='Income'
				buttonTitle='Add income'
				buttonLink='/task'
			/>
		</div>
	);
}
