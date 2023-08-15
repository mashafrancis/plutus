import { Metadata } from 'next';
import DashboardDetails from '@/components/dashboard-details';

export const metadata: Metadata = {
	title: 'Income',
	description: 'Plutus finance tracker.',
};

export default function Income() {
	return (
		<div className='flex h-full flex-1 flex-col space-y-8 p-1'>
			<DashboardDetails
				heading='Income'
				buttonTitle='Add income'
				buttonLink='/task'
			/>
		</div>
	);
}
