import type { BudgetProgress } from '../types'

interface BudgetProgressBarProps {
  budget: BudgetProgress
  onView?: (category: string) => void
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function BudgetProgressBar({ budget, onView }: BudgetProgressBarProps) {
  const isOverBudget = budget.spent > budget.target
  const percentage = Math.min((budget.spent / budget.target) * 100, 100)

  return (
    <button
      onClick={() => onView?.(budget.category)}
      className="w-full text-left p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-white dark:bg-neutral-900"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-neutral-900 dark:text-neutral-100">{budget.category}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatCurrency(budget.spent)}
          </span>
          <span className="text-sm text-neutral-400 dark:text-neutral-500">/</span>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatCurrency(budget.target)}
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${
            isOverBudget
              ? 'bg-red-500 dark:bg-red-600'
              : percentage > 80
                ? 'bg-amber-500 dark:bg-amber-600'
                : 'bg-blue-500 dark:bg-blue-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
        {percentage.toFixed(1)}% used
      </p>
    </button>
  )
}
