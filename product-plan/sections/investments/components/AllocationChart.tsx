import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { cn } from './utils'
import type { AllocationData } from '../types'

interface AllocationChartProps {
  data: AllocationData[]
}

export function AllocationChart({ data }: AllocationChartProps) {
  // Placeholder for pie/donut chart - would use a chart library like recharts or chart.js in production
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const colors = [
    'bg-blue-500',
    'bg-sky-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
          Asset Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            return (
              <div key={item.type} className="space-y-1">
                <div className="flex items-center justify-between text-sm font-geist-sans">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full", colors[index % colors.length])} />
                    <span className="font-medium text-neutral-900 dark:text-neutral-100 capitalize">
                      {item.type.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600 dark:text-neutral-400 font-geist-mono">
                      ${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-500 font-geist-mono w-12 text-right">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full transition-all", colors[index % colors.length])}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-4 text-center font-geist-sans">
          Chart placeholder - integrate chart library for pie/donut visualization
        </p>
      </CardContent>
    </Card>
  )
}

