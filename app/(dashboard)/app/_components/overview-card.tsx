import { Icons } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface OverviewCardProps {
	heading: string;
	data: string;
	icon?: keyof typeof Icons;
	caption?: string;
	tooltip?: string;
	className?: string;
}

export default function OverviewCard({
	heading,
	icon = 'chart',
	data,
	caption,
	tooltip = '',
	className,
}: OverviewCardProps) {
	const Icon = Icons[icon];

	const IconWithTooltip = () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Icon className='absolute right-3 top-1 h-4 w-4' />
			</TooltipTrigger>
			<TooltipContent className='normal-case' side='bottom'>
				{tooltip}
			</TooltipContent>
		</Tooltip>
	);

	return (
		<Card className={cn(className, 'relative p-0')}>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 p-4 pb-2'>
				<CardTitle className='text-xl font-bold md:text-2xl'>{data}</CardTitle>
				{icon && tooltip ? (
					<IconWithTooltip />
				) : Icon ? (
					<Icon className='absolute right-3 top-4 h-6 w-6' />
				) : null}
			</CardHeader>
			<CardContent className='px-4'>
				<div className='text-sm'>{heading}</div>
				<p className='text-xs text-muted-foreground'>{caption}</p>
			</CardContent>
		</Card>
	);
}
