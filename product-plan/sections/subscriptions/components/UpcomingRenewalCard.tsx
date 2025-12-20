import { Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { cn } from './utils'
import type { Subscription, Account } from '../types'

interface UpcomingRenewalCardProps {
  subscriptions: Subscription[]
  accounts: Account[]
  onViewSubscription?: (id: string) => void
}

function getDaysUntil(dateString: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const targetDate = new Date(dateString)
  targetDate.setHours(0, 0, 0, 0)
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function getUrgencyLevel(daysUntil: number): 'urgent' | 'soon' | 'normal' {
  if (daysUntil <= 2) return 'urgent'
  if (daysUntil <= 5) return 'soon'
  return 'normal'
}

export function UpcomingRenewalCard({
  subscriptions,
  accounts,
  onViewSubscription,
}: UpcomingRenewalCardProps) {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getAccount = (accountId: string) => {
    return accounts.find(a => a.id === accountId)
  }

  // Filter to only active subscriptions due within 7 days
  const upcomingRenewals = subscriptions
    .filter(sub => sub.status === 'active')
    .map(sub => ({
      ...sub,
      daysUntil: getDaysUntil(sub.nextPaymentDate),
    }))
    .filter(sub => sub.daysUntil >= 0 && sub.daysUntil <= 7)
    .sort((a, b) => a.daysUntil - b.daysUntil)

  if (upcomingRenewals.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <Clock className="h-8 w-8 mx-auto mb-2 text-neutral-400" />
          <p className="text-neutral-600 dark:text-neutral-400 font-geist-sans">
            No renewals in the next 7 days
          </p>
        </CardContent>
      </Card>
    )
  }

  const totalAmount = upcomingRenewals.reduce((sum, sub) => sum + sub.amount, 0)

  return (
    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Upcoming Renewals
          </CardTitle>
          <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-geist-mono">
            {formatCurrency(totalAmount)} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {upcomingRenewals.map((subscription) => {
            const urgency = getUrgencyLevel(subscription.daysUntil)
            const account = getAccount(subscription.paymentMethodId)

            return (
              <div
                key={subscription.id}
                onClick={() => onViewSubscription?.(subscription.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                  urgency === 'urgent' && "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-950/50",
                  urgency === 'soon' && "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-950/50",
                  urgency === 'normal' && "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    urgency === 'urgent' && "bg-red-500",
                    urgency === 'soon' && "bg-amber-500",
                    urgency === 'normal' && "bg-blue-500"
                  )} />
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
                      {subscription.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-geist-sans">
                      {account?.name || 'Unknown account'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 font-geist-mono">
                    {formatCurrency(subscription.amount)}
                  </p>
                  <p className={cn(
                    "text-xs font-medium",
                    urgency === 'urgent' && "text-red-600 dark:text-red-400",
                    urgency === 'soon' && "text-amber-600 dark:text-amber-400",
                    urgency === 'normal' && "text-neutral-600 dark:text-neutral-400"
                  )}>
                    {subscription.daysUntil === 0 && "Due today"}
                    {subscription.daysUntil === 1 && "Due tomorrow"}
                    {subscription.daysUntil > 1 && `Due in ${subscription.daysUntil} days`}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

