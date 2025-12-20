import { ArrowUp, ArrowDown, Minus } from 'lucide-react'
import type { MetricValue } from '../types'

interface MetricCardProps {
  label: string
  metric: MetricValue
  formatValue: (value: number) => string
}

export function MetricCard({ label, metric, formatValue }: MetricCardProps) {
  const isPositive = metric.trend === 'up'
  const isNegative = metric.trend === 'down'
  const changeColor = isPositive
    ? 'text-green-600 dark:text-green-400'
    : isNegative
      ? 'text-red-600 dark:text-red-400'
      : 'text-neutral-600 dark:text-neutral-400'

  const TrendIcon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{label}</p>
        <div className={`flex items-center gap-1 text-xs font-medium ${changeColor}`}>
          <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
          <span>{metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%</span>
        </div>
      </div>
      <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
        {formatValue(metric.value)}
      </p>
      <p className="text-xs text-neutral-500 dark:text-neutral-500">
        {formatValue(metric.previousValue)} last period
      </p>
    </div>
  )
}
