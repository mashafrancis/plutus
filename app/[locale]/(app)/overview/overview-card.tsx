import type { ReactNode } from "react";
import { PreviousDiffIndicator } from "@/components/previous-diff-indicator";
import { cn } from "@/lib/utils";

interface OverviewCardProps {
  heading: string;
  data: {
    current: number | string;
    change: number;
  };
  negative?: boolean;
  valuePrefix?: string;
  changePrefix?: string;
  isLoading?: boolean;
}

export default function OverviewCard({
  heading,
  data,
  negative,
  changePrefix,
  valuePrefix,
}: OverviewCardProps) {
  const _increase = negative ? data.change <= 0 : data.change >= 0;

  return (
    <div className={cn("group card relative p-4")}>
      <MetricCardNumber
        label={heading}
        value={data.current}
        enhancer={
          <PreviousDiffIndicator
            diff={data.change}
            className="text-muted-foreground text-sm"
          />
        }
      />
    </div>
    // <Card className='relative p-0 shadow-none'>
    // 	<CardHeader
    // 		className='flex flex-row items-center justify-between space-y-0 p-4 pb-2'>
    // 		<CardTitle className='font-light text-base text-foreground-lighter'>
    // 			{heading}
    // 		</CardTitle>
    // 		{data.change ? (
    // 			<div className='flex items-center text-xs xl:text-sm'>
    // 				<PreviousDiffIndicator diff={data.change && data.change} />
    // 				{/*<BadgeDelta*/}
    // 				{/*	deltaType={increase ? 'moderateIncrease' : 'moderateDecrease'}*/}
    // 				{/*	isIncreasePositive={true}*/}
    // 				{/*>*/}
    // 				{/*	{' '}*/}
    // 				{/*	{changePrefix ?? ''}*/}
    // 				{/*	{data.change && `${data.change.toLocaleString()} %`}{' '}*/}
    // 				{/*</BadgeDelta>*/}
    // 			</div>
    // 		) : (
    // 			<div>-</div>
    // 		)}
    // 	</CardHeader>
    // 	{data ? (
    // 		<CardContent className='px-4'>
    // 			<div
    // 				className='flex flex-row items-center justify-between font-semibold text-xl tracking-tight xl:text-2xl'>
    // 				<div className='flex items-baseline gap-1'>
    //           <span className='font-light text-base text-foreground-lighter'>
    //             {valuePrefix ?? ''}
    // 						{data.current
    // 							? data.current.toLocaleString().split(' ')[1]
    // 							: ''}
    //           </span>
    // 					<span className='font-mono'>
    //             {data.current ? data.current.toLocaleString().split(' ')[0] : 0}
    //           </span>
    // 				</div>
    // 			</div>
    // 		</CardContent>
    // 	) : (
    // 		<CardContent className='px-4'>
    // 			<div
    // 				className='flex flex-row items-center justify-between font-semibold text-xl tracking-tight xl:text-2xl'>
    // 				<Skeleton
    // 					className='my-2 h-6 w-20 rounded-md bg-gray-200 dark:bg-muted/50' />
    // 			</div>
    // 		</CardContent>
    // 	)}
    // </Card>
  );
}

function MetricCardNumber({
  label,
  value,
  enhancer,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  enhancer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-4">
        <span className="truncate text-muted-foreground">{label}</span>
        {enhancer}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2 text-left">
          <div className="truncate font-mono font-semibold text-2xl">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
