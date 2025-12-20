import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import type { PerformanceDataPoint } from '../types'

interface PerformanceChartProps {
  data: PerformanceDataPoint[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  // Placeholder for line chart - would use a chart library like recharts or chart.js in production
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
          Portfolio Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between gap-1">
          {data.map((point, index) => {
            const height = range > 0 ? ((point.value - minValue) / range) * 100 : 50
            return (
              <div
                key={point.date}
                className="flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors group relative"
                style={{ height: `${height}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-2 py-1 rounded whitespace-nowrap font-geist-mono">
                  {new Date(point.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  <br />
                  ${point.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-4 text-center font-geist-sans">
          Chart placeholder - integrate chart library for line chart visualization
        </p>
      </CardContent>
    </Card>
  )
}

