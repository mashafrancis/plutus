import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

interface OverviewCardProps {
	heading: string;
	icon: keyof typeof Icons;
	value: string;
	caption?: string;
}

export default function OverviewCard({
	heading,
	icon,
	value,
	caption,
}: OverviewCardProps) {
	const Icon = Icons[icon || 'arrowRight'];

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-normal'>{heading}</CardTitle>
				<Icon className='h-5 w-5' />
			</CardHeader>
			<CardContent>
				<div className='text-xl font-bold md:text-2xl'>{value}</div>
				<p className='text-xs text-muted-foreground'>{caption}</p>
			</CardContent>
		</Card>
	);
}
