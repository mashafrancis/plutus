import { Metadata } from 'next';
import DashboardDetails from '@/components/dashboard-details';

export const metadata: Metadata = {
	title: 'Overview',
	description: 'Plutus finance tracker.',
};

export default function Dashboard() {
	return (
		<div className='flex h-full flex-1 flex-col space-y-8 p-1'>
			<DashboardDetails
				heading='Account Overview'
				buttonTitle='Add expense'
				buttonLink='/task'
			/>
		</div>
	);
}
