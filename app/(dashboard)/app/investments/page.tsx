import { Metadata } from 'next';
import DashboardDetails from '@/components/dashboard-details';

export const metadata: Metadata = {
	title: 'Investments',
	description: 'Plutus finance tracker.',
};

export default function Investments() {
	return (
		<div className='flex h-full flex-1 flex-col space-y-8 p-1'>
			<DashboardDetails
				heading='Investments'
				buttonTitle='Add investment'
				buttonLink='/task'
			/>
		</div>
	);
}
