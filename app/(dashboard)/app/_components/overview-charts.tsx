'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import TopSpentExpenses from '@/components/chart/bar-list';
import DonutChart from '@/components/chart/donut';
import { useUser } from '@/components/client-provider/auth-provider';
import RecentActivitiesTable from '@/components/recent-activities/table';
import ExpenseChart from '@/components/chart/bar';

export default function OverviewCharts() {
	const user = useUser();

	return (
		<div className='grid gap-2 md:grid-cols-6'>
			<Card className='col-span-3'>
				<CardHeader>
					<CardTitle>Expenses</CardTitle>
				</CardHeader>
				<CardContent className='pl-2'>
					<ExpenseChart />
				</CardContent>
			</Card>

			<Card className='col-span-3'>
				<CardHeader>
					<CardTitle>Subscriptions</CardTitle>
					<CardDescription>
						Estimated total amount spent for selected date range.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DonutChart />
				</CardContent>
			</Card>

			{!user.isPremium ? (
				<>
					<Card className='col-span-3'>
						<CardHeader>
							<h3 className='pb-0 font-medium'>Recent Activities</h3>
						</CardHeader>
						<CardContent>
							<RecentActivitiesTable />
						</CardContent>
					</Card>

					<Card className='col-span-3'>
						<CardHeader>
							<h3 className='pb-0 font-medium'>Top Spent Expenses</h3>
						</CardHeader>
						<CardContent>
							<TopSpentExpenses />
						</CardContent>
					</Card>
				</>
			) : null}
		</div>
	);
}
