import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { BadgeDelta } from '@tremor/react'

interface OverviewCardProps {
  heading: string
  data: {
    current: number | string
    change: number
  }
  negative?: boolean
  valuePrefix?: string
  changePrefix?: string
  isLoading?: boolean
}

export default function OverviewCard({
  heading,
  data,
  negative,
  changePrefix,
  valuePrefix,
}: OverviewCardProps) {
  const increase = negative ? data.change <= 0 : data.change >= 0

  return (
    <Card className="relative p-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-base font-light text-muted-foreground">
          {heading}
        </CardTitle>
        {data.change ? (
          <div className="flex items-center text-xs xl:text-sm">
            <BadgeDelta
              deltaType={increase ? 'moderateIncrease' : 'moderateDecrease'}
              isIncreasePositive={true}
            >
              {' '}
              {changePrefix ?? ''}
              {data.change && `${data.change.toLocaleString()} %`}{' '}
            </BadgeDelta>
          </div>
        ) : (
          <div>-</div>
        )}
      </CardHeader>
      {data ? (
        <CardContent className="px-4">
          <div className="text-xl font-semibold tracking-tight xl:text-2xl flex flex-row items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-base text-muted-foreground font-light">
                {valuePrefix ?? ''}
                {data.current
                  ? data.current.toLocaleString().split(' ')[1]
                  : ''}
              </span>
              <span className="font-mono">
                {data.current ? data.current.toLocaleString().split(' ')[0] : 0}
              </span>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="px-4">
          <div
            className="text-xl font-semibold tracking-tight xl:text-2xl
              flex flex-row items-center justify-between"
          >
            <Skeleton className="h-6 w-20 my-2 rounded-md bg-gray-200 dark:bg-muted/50" />
          </div>
        </CardContent>
      )}
    </Card>
  )
}
