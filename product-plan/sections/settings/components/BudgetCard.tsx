import { MoreVertical, Edit, Trash2 } from 'lucide-react'
import { Badge } from '../../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Switch } from '../../ui/switch'
import { Label } from '../../ui/label'
import { cn } from './utils'
import type { Budget } from '../types'

interface BudgetCardProps {
  budget: Budget
  onEdit?: (budgetId: string) => void
  onDelete?: (budgetId: string) => void
  onUpdate?: (budgetId: string, updates: Partial<Budget>) => void
}

export function BudgetCard({
  budget,
  onEdit,
  onDelete,
  onUpdate,
}: BudgetCardProps) {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatPeriod = (period: string) => {
    return period.charAt(0).toUpperCase() + period.slice(1)
  }

  const percentage = (budget.currentSpending / budget.limit) * 100
  const isOver = percentage > 100
  const isWarning = percentage >= budget.alertThreshold

  const progressColor = isOver
    ? 'bg-red-500'
    : isWarning
    ? 'bg-amber-500'
    : 'bg-blue-500'

  return (
    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
              {budget.categoryName}
            </p>
            <Badge variant="outline" className="text-xs font-geist-sans">
              {formatPeriod(budget.period)}
            </Badge>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-geist-mono">
              {formatCurrency(budget.currentSpending)}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-500 font-geist-mono">
              / {formatCurrency(budget.limit)}
            </span>
          </div>
          <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mb-2">
            <div
              className={cn("h-full transition-all", progressColor)}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 font-geist-sans">
            Alert at {budget.alertThreshold}{budget.alertThresholdType === 'percentage' ? '%' : ''}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors">
              <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onEdit?.(budget.id)}
              className="font-geist-sans"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(budget.id)}
              className="text-red-600 dark:text-red-400 font-geist-sans"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <Label htmlFor={`rollover-${budget.id}`} className="text-sm font-geist-sans">
            Rollover
          </Label>
          <Switch
            id={`rollover-${budget.id}`}
            checked={budget.rolloverEnabled}
            onCheckedChange={(checked) => onUpdate?.(budget.id, { rolloverEnabled: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor={`recurring-${budget.id}`} className="text-sm font-geist-sans">
            Recurring
          </Label>
          <Switch
            id={`recurring-${budget.id}`}
            checked={budget.recurringEnabled}
            onCheckedChange={(checked) => onUpdate?.(budget.id, { recurringEnabled: checked })}
          />
        </div>
      </div>
    </div>
  )
}

