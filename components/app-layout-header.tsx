import { DashboardShell } from '@/components/shell';
import DatePicker from '@/components/date-range-picker';
import { Icons } from '@/components/icons';

interface DashboardHeaderProps {
	buttonLink?: any;
	buttonTitle?: string;
	heading: string;
	subHeading?: string;
	showDatePicker?: boolean;
}

export default function AppLayoutHeader({
	heading,
	subHeading,
	buttonTitle,
	buttonLink,
	showDatePicker = false,
}: DashboardHeaderProps) {
	return (
		<DashboardShell>
			<div className='flex flex-col items-start justify-between gap-2 md:flex-row'>
				<div className='grid gap-1'>
					<div className='flex items-center space-x-2'>
						<div className='block md:hidden'>
							<Icons.logo height={36} width={36} />
						</div>
						<h1 className='bg-clip-text font-semibold leading-none md:text-xl'>
							{heading}
						</h1>
					</div>
					{subHeading && <p className='text-muted-foreground'>{subHeading}</p>}
				</div>
				{showDatePicker ? <DatePicker /> : null}
			</div>
		</DashboardShell>
	);
}
