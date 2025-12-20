import { MoreVertical, Repeat } from 'lucide-react'
import { Badge } from '../../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { cn } from './utils'
import type { Expense, Account } from '../types'

interface ExpenseRowProps {
  expense: Expense
  account?: Account
  isSelected?: boolean
  onSelect?: (expenseId: string, selected: boolean) => void
  onEdit?: (expenseId: string) => void
  onDelete?: (expenseId: string) => void
}

export function ExpenseRow({
  expense,
  account,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
}: ExpenseRowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <tr className="border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
      {/* Checkbox */}
      <td className="w-12 px-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect?.(expense.id, e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
        />
      </td>

      {/* Date */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-600 dark:text-neutral-400 font-geist-sans">
          {formatDate(expense.date)}
        </span>
      </td>

      {/* Description */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
            {expense.description}
          </span>
          {expense.recurring && (
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300">
              <Repeat className="h-3 w-3 mr-1" />
              {expense.recurringFrequency || 'recurring'}
            </Badge>
          )}
        </div>
        {expense.notes && (
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1 font-geist-sans">
            {expense.notes}
          </p>
        )}
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        <Badge variant="outline" className="font-geist-sans">
          {expense.category}
        </Badge>
      </td>

      {/* Amount */}
      <td className="px-4 py-3">
        <span className="font-semibold text-red-600 dark:text-red-400 font-geist-mono">
          {formatCurrency(expense.amount)}
        </span>
      </td>

      {/* Account */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-600 dark:text-neutral-400 font-geist-sans">
          {account?.name || expense.accountId}
        </span>
      </td>

      {/* Tags */}
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {expense.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-1.5 py-0.5 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800 font-geist-sans"
            >
              {tag}
            </Badge>
          ))}
          {expense.tags.length > 2 && (
            <Badge
              variant="secondary"
              className="text-xs px-1.5 py-0.5 font-geist-sans"
            >
              +{expense.tags.length - 2}
            </Badge>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors">
              <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onEdit?.(expense.id)}
              className="font-geist-sans"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(expense.id)}
              className="text-red-600 dark:text-red-400 font-geist-sans"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}
