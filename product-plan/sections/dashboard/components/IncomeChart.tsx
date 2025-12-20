import type { IncomeBySource } from '../types'

interface IncomeChartProps {
  data: IncomeBySource[]
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function IncomeChart({ data }: IncomeChartProps) {
  const maxAmount = Math.max(...data.map((d) => d.amount))
  const filteredData = data.filter((d) => d.amount > 0)

  return (
    <div className="space-y-3">
      {filteredData.map((item) => {
        const percentage = (item.amount / maxAmount) * 100
        return (
          <div key={item.source} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {item.source}
              </span>
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {formatCurrency(item.amount)}
              </span>
            </div>
            <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 dark:bg-blue-600 transition-all group-hover:opacity-80"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
