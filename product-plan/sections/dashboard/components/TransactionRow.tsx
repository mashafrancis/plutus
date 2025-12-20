import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import type { Transaction } from '../types'

interface TransactionRowProps {
  transaction: Transaction
  onView?: (id: string) => void
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function TransactionRow({ transaction, onView }: TransactionRowProps) {
  const isIncome = transaction.type === 'income'
  const Icon = isIncome ? ArrowUpCircle : ArrowDownCircle
  const amountColor = isIncome
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400'

  return (
    <button
      onClick={() => onView?.(transaction.id)}
      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors text-left"
    >
      <div
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isIncome
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-red-100 dark:bg-red-900/30'
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
          strokeWidth={2}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
          {transaction.description}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{transaction.category}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={`font-semibold ${amountColor}`}>{formatCurrency(transaction.amount)}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {formatDate(transaction.date)}
        </p>
      </div>
    </button>
  )
}
