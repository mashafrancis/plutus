import { DashboardHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
	buttonLink?: any;
	buttonTitle?: string;
	heading: string;
	subHeading?: string;
}

export default function DashboardDetails({
	heading,
	subHeading,
	buttonTitle,
	buttonLink,
}: DashboardHeaderProps) {
	return (
		<DashboardShell>
			<DashboardHeader heading={heading} text={subHeading}>
				<div className='flex items-center justify-between space-x-2'>
					<Link
						href={buttonLink as any}
						className={cn(
							buttonVariants({ variant: 'default', size: 'lg' }),
							'hidden px-4 lg:flex'
						)}
					>
						<Plus className='mr-2 h-4 w-4' />
						{buttonTitle}
					</Link>
					<Link
						href={buttonLink as any}
						className={cn(
							buttonVariants({ variant: 'default', size: 'lg' }),
							'fixed bottom-20 right-4 flex rounded-xl px-4 shadow-lg lg:hidden'
						)}
					>
						<Plus className='mr-2 h-4 w-4' />
						{buttonTitle}
					</Link>
				</div>
			</DashboardHeader>
		</DashboardShell>
	);
}
