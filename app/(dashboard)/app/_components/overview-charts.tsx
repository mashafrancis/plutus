import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import TopSpentExpenses from '@/components/chart/bar-list';
import DonutChart from '@/components/chart/donut';

export default function OverviewCharts() {
	return (
		<div className='grid gap-2 md:grid-cols-7'>
			<Card className='col-span-4'>
				<CardHeader>
					<CardTitle>Expenses</CardTitle>
				</CardHeader>
				<CardContent className='pl-2'>
					<TopSpentExpenses />
				</CardContent>
			</Card>

			<Card className='col-span-4 md:col-span-3'>
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
		</div>
	);
}
