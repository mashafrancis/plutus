import DatePicker from '@/components/date-range-picker';
import { Icons } from '@/components/icons';
import { DashboardShell } from '@/components/shell';

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
			<div className='flex flex-col justify-between gap-2 md:flex-row'>
				<div className='grid gap-1'>
					<div className='flex items-center space-x-2'>
						<div className='block md:hidden'>
							<Icons.logo height={36} width={36} />
						</div>
						<h1 className='bg-clip-text font-semibold text-primary leading-none md:text-xl'>
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
