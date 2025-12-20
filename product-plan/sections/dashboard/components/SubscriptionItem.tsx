import { Calendar } from 'lucide-react'
import type { Subscription } from '../types'

interface SubscriptionItemProps {
  subscription: Subscription
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
  const today = new Date()
  const daysUntil = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (daysUntil === 0) return 'Today'
  if (daysUntil === 1) return 'Tomorrow'
  if (daysUntil < 7) return `In ${daysUntil} days`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function SubscriptionItem({ subscription, onView }: SubscriptionItemProps) {
  return (
    <button
      onClick={() => onView?.(subscription.id)}
      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors text-left"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
            {subscription.name}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" strokeWidth={2} />
            {formatDate(subscription.nextPaymentDate)}
          </p>
        </div>
      </div>
      <p className="font-semibold text-neutral-900 dark:text-neutral-100 shrink-0 ml-4">
        {formatCurrency(subscription.amount)}
      </p>
    </button>
  )
}
