'use client';

import ExpenseChart from '@/components/chart/bar';
import TopSpentExpenses from '@/components/chart/bar-list';
import DonutChart from '@/components/chart/donut';
import { useUser } from '@/components/client-provider/auth-provider';
import RecentActivitiesTable from '@/components/recent-activities/table';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function OverviewCharts() {
	const user = useUser();

	return (
		<div className='grid gap-2 md:grid-cols-6'>
			<Card className='col-span-3'>
				<CardHeader>
					<CardTitle>Expenses</CardTitle>
				</CardHeader>
				<CardContent className='md:pl-0 pl-1'>
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
							<CardTitle>Recent Activities</CardTitle>
						</CardHeader>
						<CardContent>
							<RecentActivitiesTable />
						</CardContent>
					</Card>

					<Card className='col-span-3'>
						<CardHeader>
							<CardTitle>Top Spent Expenses</CardTitle>
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
