import { ArrowUp, ArrowDown, Minus, Calendar, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '../../ui/card'
import { cn } from './utils'
import type { MetricValue, CountMetric, UpcomingRenewalsCount, TopCategory, ComparisonMetric } from '../types'

interface SubscriptionMetricCardProps {
  label: string
  value: number | string
  previousValue?: number | string
  change?: number
  changePercent?: number
  trend?: 'up' | 'down' | 'neutral'
  formatValue?: (value: number) => string
  countMetric?: CountMetric
  upcomingRenewals?: UpcomingRenewalsCount
  topCategory?: TopCategory
  comparison?: ComparisonMetric
  invertTrend?: boolean
}

export function SubscriptionMetricCard({
  label,
  value,
  previousValue,
  change,
  changePercent,
  trend,
  formatValue,
  countMetric,
  upcomingRenewals,
  topCategory,
  comparison,
  invertTrend = false,
}: SubscriptionMetricCardProps) {
  const formatCurrency = (val: number) => `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const formatDefault = formatValue || ((val: number) => formatCurrency(val))

  let displayValue: string
  let displaySubtext: string | null = null
  let changeDisplay: React.ReactNode = null

  if (upcomingRenewals) {
    displayValue = upcomingRenewals.thisWeek.toString()
    displaySubtext = `${upcomingRenewals.thisMonth} this month • ${formatCurrency(upcomingRenewals.totalAmount)}`
    changeDisplay = (
      <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
        <Calendar className="h-3 w-3" />
        <span>Due soon</span>
      </div>
    )
  } else if (topCategory) {
    displayValue = topCategory.category
    displaySubtext = formatCurrency(topCategory.amount)
    changeDisplay = (
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        {topCategory.percentage.toFixed(1)}% of total
      </span>
    )
  } else if (comparison) {
    displayValue = typeof value === 'number' ? formatDefault(value) : value
    displaySubtext = comparison.message
    const isPositive = comparison.trend === 'up'
    const isNegative = comparison.trend === 'down'
    const changeColor = invertTrend
      ? (isPositive ? 'text-red-600 dark:text-red-400' : isNegative ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400')
      : (isPositive ? 'text-emerald-600 dark:text-emerald-400' : isNegative ? 'text-red-600 dark:text-red-400' : 'text-neutral-600 dark:text-neutral-400')
    const TrendIcon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus
    changeDisplay = (
      <div className={cn("flex items-center gap-1 text-xs font-medium", changeColor)}>
        <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
        <span>{comparison.changePercent > 0 ? '+' : ''}{comparison.changePercent.toFixed(1)}%</span>
      </div>
    )
  } else if (countMetric) {
    displayValue = countMetric.value.toString()
    displaySubtext = `${countMetric.previousValue} last month`
    const changeColor = countMetric.change > 0 
      ? 'text-emerald-600 dark:text-emerald-400'
      : countMetric.change < 0
      ? 'text-red-600 dark:text-red-400'
      : 'text-neutral-600 dark:text-neutral-400'
    changeDisplay = (
      <span className={cn("text-xs font-medium", changeColor)}>
        {countMetric.change > 0 ? '+' : ''}{countMetric.change} vs last month
      </span>
    )
  } else {
    displayValue = typeof value === 'number' ? formatDefault(value) : value
    if (previousValue !== undefined) {
      displaySubtext = typeof previousValue === 'number' ? formatDefault(previousValue) : previousValue.toString()
      displaySubtext += ' last period'
    }
    if (changePercent !== undefined && trend) {
      const isPositive = trend === 'up'
      const isNegative = trend === 'down'
      const changeColor = invertTrend
        ? (isPositive ? 'text-red-600 dark:text-red-400' : isNegative ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-600 dark:text-neutral-400')
        : (isPositive ? 'text-emerald-600 dark:text-emerald-400' : isNegative ? 'text-red-600 dark:text-red-400' : 'text-neutral-600 dark:text-neutral-400')
      const TrendIcon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus
      changeDisplay = (
        <div className={cn("flex items-center gap-1 text-xs font-medium", changeColor)}>
          <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
          <span>{changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%</span>
        </div>
      )
    }
  }

  return (
    <Card className="flex flex-col justify-between p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-2">
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 font-geist-sans">
            {label}
          </p>
          {changeDisplay}
        </div>
        <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 font-geist-sans">
          {displayValue}
        </p>
        {displaySubtext && (
          <p className="text-xs text-neutral-500 dark:text-neutral-500 font-geist-sans">
            {displaySubtext}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

