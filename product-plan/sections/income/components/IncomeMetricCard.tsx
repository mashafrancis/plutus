import { ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { Card, CardContent } from '../../ui/card'
import { cn } from './utils'
import type { MetricValue, TopSource, ComparisonMetric, TransactionCount } from '../types'

interface IncomeMetricCardProps {
  label: string
  value: number | string
  previousValue?: number | string
  change?: number
  changePercent?: number
  trend?: 'up' | 'down' | 'neutral'
  formatValue?: (value: number) => string
  topSource?: TopSource
  comparison?: ComparisonMetric
  transactionCount?: TransactionCount
}

export function IncomeMetricCard({
  label,
  value,
  previousValue,
  change,
  changePercent,
  trend,
  formatValue,
  topSource,
  comparison,
  transactionCount,
}: IncomeMetricCardProps) {
  const formatCurrency = (val: number) => `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const formatDefault = formatValue || ((val: number) => formatCurrency(val))

  let displayValue: string
  let displaySubtext: string | null = null
  let changeDisplay: React.ReactNode = null

  if (topSource) {
    displayValue = topSource.source
    displaySubtext = formatCurrency(topSource.amount)
    changeDisplay = (
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        {topSource.percentage.toFixed(1)}% of total
      </span>
    )
  } else if (comparison) {
    displayValue = typeof value === 'number' ? formatDefault(value) : value
    displaySubtext = comparison.message
    const isPositive = comparison.trend === 'up'
    const isNegative = comparison.trend === 'down'
    const changeColor = isPositive
      ? 'text-emerald-600 dark:text-emerald-400'
      : isNegative
        ? 'text-red-600 dark:text-red-400'
        : 'text-neutral-600 dark:text-neutral-400'
    const TrendIcon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus
    changeDisplay = (
      <div className={cn("flex items-center gap-1 text-xs font-medium", changeColor)}>
        <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
        <span>{comparison.changePercent > 0 ? '+' : ''}{comparison.changePercent.toFixed(1)}%</span>
      </div>
    )
  } else if (transactionCount) {
    displayValue = transactionCount.thisMonth.toString()
    displaySubtext = `${transactionCount.lastMonth} last month`
    const changeColor = transactionCount.change > 0 
      ? 'text-emerald-600 dark:text-emerald-400'
      : transactionCount.change < 0
      ? 'text-red-600 dark:text-red-400'
      : 'text-neutral-600 dark:text-neutral-400'
    changeDisplay = (
      <span className={cn("text-xs font-medium", changeColor)}>
        {transactionCount.change > 0 ? '+' : ''}{transactionCount.change} vs last month
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
      const changeColor = isPositive
        ? 'text-emerald-600 dark:text-emerald-400'
        : isNegative
          ? 'text-red-600 dark:text-red-400'
          : 'text-neutral-600 dark:text-neutral-400'
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

