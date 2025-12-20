import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { cn } from './utils'
import type { GainLossData } from '../types'

interface GainLossChartProps {
  data: GainLossData[]
}

export function GainLossChart({ data }: GainLossChartProps) {
  // Placeholder for bar chart - would use a chart library like recharts or chart.js in production
  const maxGain = Math.max(...data.map(d => Math.abs(d.gainLossDollar)))
  const sortedData = [...data].sort((a, b) => b.gainLossDollar - a.gainLossDollar)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
          Gain/Loss by Investment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sortedData.slice(0, 10).map((item) => {
            const width = maxGain > 0 ? (Math.abs(item.gainLossDollar) / maxGain) * 100 : 0
            const isPositive = item.gainLossDollar > 0
            return (
              <div key={item.ticker} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-geist-sans">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100 truncate flex-1">
                    {item.name}
                  </span>
                  <span className={cn(
                    "font-geist-mono ml-2",
                    isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {isPositive ? '+' : ''}${item.gainLossDollar.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all",
                      isPositive ? "bg-emerald-500" : "bg-red-500"
                    )}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-4 text-center font-geist-sans">
          Chart placeholder - integrate chart library for bar chart visualization
        </p>
      </CardContent>
    </Card>
  )
}

