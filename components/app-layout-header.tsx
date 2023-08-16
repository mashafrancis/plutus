import { DashboardShell } from '@/components/shell';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
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
				<div className='flex items-center justify-between space-x-2'>
					{showDatePicker ? <DatePicker /> : null}
					<Link
						href={buttonLink as any}
						className={cn(
							buttonVariants({ variant: 'default' }),
							'hidden items-center px-4 text-center lg:flex'
						)}
					>
						<Plus className='mr-2 h-4 w-4' />
						{buttonTitle}
					</Link>
					{/*<Link*/}
					{/*	href={buttonLink as any}*/}
					{/*	className={cn(*/}
					{/*		buttonVariants({ variant: 'default', size: 'lg' }),*/}
					{/*		'z-96 fixed bottom-20 right-4 flex rounded-xl px-4 py-6 shadow-lg lg:hidden'*/}
					{/*	)}*/}
					{/*>*/}
					{/*	<Plus className='mr-2 h-4 w-4' />*/}
					{/*	{buttonTitle}*/}
					{/*</Link>*/}
				</div>
			</div>
		</DashboardShell>
	);
}
