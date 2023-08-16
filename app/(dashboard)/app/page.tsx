import { Metadata } from 'next';
import AppLayoutHeader from '@/components/app-layout-header';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Overview } from '@/app/(dashboard)/app/_components/overview';
import OverviewCardLayout from '@/app/(dashboard)/app/_components/overview-card-layout';
import SubscriptionCard from '@/app/(dashboard)/app/_components/subscription-card';
import { Fragment } from 'react';

export const metadata: Metadata = {
	title: 'Overview',
	description: 'Plutus finance tracker.',
};

const items = [
	{
		title: 'Total Income',
		icon: 'income',
		subTitle: 'Ksh 120,000',
		caption: '+20.1% from last month',
	},
	{
		title: 'Available Balance',
		icon: 'expenses',
		subTitle: 'Ksh 120,000',
		caption: '+20.1% from last month',
	},
	{
		title: 'Total Expenses',
		icon: 'chart',
		subTitle: 'Ksh 120,000',
		caption: '+20.1% from last month',
	},
	{
		title: 'Total Investments',
		icon: 'investments',
		subTitle: 'Ksh 120,000',
		caption: '+20.1% from last month',
	},
];

export default function Dashboard() {
	return (
		<Fragment>
			<AppLayoutHeader
				heading='Account Overview'
				buttonTitle='ADD EXPENSE'
				buttonLink='/task'
				showDatePicker
			/>
			<OverviewCardLayout items={items} />
			<div className='grid gap-2 md:grid-cols-7'>
				<Card className='col-span-4'>
					<CardHeader>
						<CardTitle>Expenses</CardTitle>
					</CardHeader>
					<CardContent className='pl-2'>
						<Overview />
					</CardContent>
				</Card>

				<Card className='col-span-4 md:col-span-3'>
					<CardHeader>
						<CardTitle>Subscriptions</CardTitle>
						<CardDescription>
							You made 265 subscription this month.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<SubscriptionCard />
					</CardContent>
				</Card>
			</div>
		</Fragment>
	);
}
