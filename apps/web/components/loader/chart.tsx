import { Skeleton } from '@/components/ui/skeleton'

export default function ChartLoader({
  className,
  type,
}: {
  className?: string
  type: string
}) {
  if (type === 'bar') {
    return (
      <div
        className={`relative mb-7 rounded-lg bg-background p-2 text-left ${className} `}
      >
        <Skeleton className="float-right h-[20px] w-[40%] rounded-xs" />
        <div className="mt-[45px] rounded-xs border-b border-dashed border-gray-200 dark:border-border"></div>
        <div className="mt-[60px] rounded-xs border-b border-dashed border-gray-200 dark:border-border"></div>
        <Skeleton className="mt-[20px] h-[200px] rounded-xs " />
      </div>
    )
  } else if (type === 'donut') {
    return (
      <div
        className={`relative mb-7 rounded-lg bg-background p-2 text-left ${className} `}
      >
        <Skeleton className="float-right mt-[-24px] h-[20px] w-[40%] rounded-xs" />
        <Skeleton className="m-auto mt-[35px]! h-full max-h-[298px] w-full max-w-[310px] rounded-full" />
      </div>
    )
  } else if (type === 'barlist') {
    return (
      <div
        className={`relative mb-6 rounded-lg bg-background p-4 text-left ${className}`}
      >
        <Skeleton className="my-[10px] h-[35px] w-full" />
        <Skeleton className="mb-[9px] h-[35px] w-[60%]" />
        <Skeleton className="mb-[9px] h-[35px] w-[40%]" />
        <Skeleton className="mb-[9px] h-[35px] w-[30%]" />
        <Skeleton className="mb-[9px] h-[35px] w-[20%]" />
        <Skeleton className="mb-[9px] h-[35px] w-[10%]" />
      </div>
    )
  }
}
