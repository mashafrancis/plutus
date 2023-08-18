import { Icons } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface OverviewCardProps {
	heading: string;
	data: string;
	icon?: keyof typeof Icons;
	caption?: string;
	tooltip?: string;
}

export default function OverviewCard({
	heading,
	icon = 'chart',
	data,
	caption,
	tooltip = '',
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
		<Card className='relative'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-xs text-muted-foreground'>
					{heading}
				</CardTitle>
				{icon && tooltip ? (
					<IconWithTooltip />
				) : Icon ? (
					<Icon className='absolute right-3 top-1 h-4 w-4' />
				) : null}
			</CardHeader>
			<CardContent>
				<div className='text-xl font-bold md:text-2xl'>{data}</div>
				<p className='text-xs text-muted-foreground'>{caption}</p>
			</CardContent>
		</Card>
	);
}
