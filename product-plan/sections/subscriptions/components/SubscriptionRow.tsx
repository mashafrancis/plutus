import { MoreVertical, Clock, Pause, Play, X, History } from 'lucide-react'
import { Badge } from '../../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { cn } from './utils'
import type { Subscription, Account } from '../types'

interface SubscriptionRowProps {
  subscription: Subscription
  account?: Account
  isSelected?: boolean
  onSelect?: (subscriptionId: string, selected: boolean) => void
  onEdit?: (subscriptionId: string) => void
  onPause?: (subscriptionId: string) => void
  onResume?: (subscriptionId: string) => void
  onCancel?: (subscriptionId: string) => void
  onViewHistory?: (subscriptionId: string) => void
}

function getDaysUntil(dateString: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const targetDate = new Date(dateString)
  targetDate.setHours(0, 0, 0, 0)
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function SubscriptionRow({
  subscription,
  account,
  isSelected = false,
  onSelect,
  onEdit,
  onPause,
  onResume,
  onCancel,
  onViewHistory,
}: SubscriptionRowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatBillingCycle = (cycle: string) => {
    return cycle.charAt(0).toUpperCase() + cycle.slice(1)
  }

  const daysUntil = getDaysUntil(subscription.nextPaymentDate)
  const isUpcomingSoon = subscription.status === 'active' && daysUntil >= 0 && daysUntil <= 7

  const getStatusBadge = () => {
    switch (subscription.status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
            Active
          </Badge>
        )
      case 'paused':
        return (
          <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">
            <Pause className="h-3 w-3 mr-1" />
            Paused
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-600">
            Cancelled
          </Badge>
        )
    }
  }

  return (
    <tr className={cn(
      "border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors",
      isUpcomingSoon && "bg-amber-50/50 dark:bg-amber-950/20"
    )}>
      {/* Checkbox */}
      <td className="w-12 px-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect?.(subscription.id, e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
        />
      </td>

      {/* Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
            {subscription.name}
          </span>
          {isUpcomingSoon && (
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950">
              <Clock className="h-3 w-3 mr-1" />
              {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
            </Badge>
          )}
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        <Badge variant="outline" className="font-geist-sans">
          {subscription.category}
        </Badge>
      </td>

      {/* Amount */}
      <td className="px-4 py-3">
        <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-geist-mono">
          {formatCurrency(subscription.amount)}
        </span>
      </td>

      {/* Billing Cycle */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-600 dark:text-neutral-400 font-geist-sans">
          {formatBillingCycle(subscription.billingCycle)}
        </span>
      </td>

      {/* Next Payment */}
      <td className="px-4 py-3">
        <span className={cn(
          "text-sm font-geist-sans",
          isUpcomingSoon ? "text-amber-600 dark:text-amber-400 font-medium" : "text-neutral-600 dark:text-neutral-400"
        )}>
          {formatShortDate(subscription.nextPaymentDate)}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        {getStatusBadge()}
      </td>

      {/* Payment Method */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-600 dark:text-neutral-400 font-geist-sans">
          {account?.name || subscription.paymentMethodId}
        </span>
      </td>

      {/* Start Date */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-500 dark:text-neutral-500 font-geist-sans">
          {formatDate(subscription.startDate)}
        </span>
      </td>

      {/* Total Spent */}
      <td className="px-4 py-3">
        <span className="text-sm text-neutral-700 dark:text-neutral-300 font-geist-mono">
          {formatCurrency(subscription.totalSpent)}
        </span>
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
              onClick={() => onEdit?.(subscription.id)}
              className="font-geist-sans"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onViewHistory?.(subscription.id)}
              className="font-geist-sans"
            >
              <History className="h-4 w-4 mr-2" />
              View History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {subscription.status === 'active' && (
              <DropdownMenuItem
                onClick={() => onPause?.(subscription.id)}
                className="font-geist-sans text-amber-600 dark:text-amber-400"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </DropdownMenuItem>
            )}
            {subscription.status === 'paused' && (
              <DropdownMenuItem
                onClick={() => onResume?.(subscription.id)}
                className="font-geist-sans text-emerald-600 dark:text-emerald-400"
              >
                <Play className="h-4 w-4 mr-2" />
                Resume
              </DropdownMenuItem>
            )}
            {subscription.status !== 'cancelled' && (
              <DropdownMenuItem
                onClick={() => onCancel?.(subscription.id)}
                className="text-red-600 dark:text-red-400 font-geist-sans"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}

