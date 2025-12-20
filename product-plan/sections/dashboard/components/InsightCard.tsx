import { X, AlertCircle, CheckCircle2, Info, TrendingUp } from 'lucide-react'
import type { Insight } from '../types'

interface InsightCardProps {
  insight: Insight
  onDismiss?: (id: string) => void
  onAction?: () => void
}

const severityConfig = {
  info: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    textColor: 'text-blue-900 dark:text-blue-100',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
    textColor: 'text-amber-900 dark:text-amber-100',
  },
  success: {
    icon: CheckCircle2,
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    textColor: 'text-green-900 dark:text-green-100',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    textColor: 'text-red-900 dark:text-red-100',
  },
}

export function InsightCard({ insight, onDismiss, onAction }: InsightCardProps) {
  const config = severityConfig[insight.severity]
  const Icon = config.icon

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4 flex items-start gap-3`}
    >
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.iconColor}`} strokeWidth={2} />
      <div className="flex-1 min-w-0">
        <h4 className={`font-semibold text-sm mb-1 ${config.textColor}`}>{insight.title}</h4>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">{insight.message}</p>
        {onAction && (
          <button
            onClick={onAction}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            {insight.actionLabel} →
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(insight.id)}
          className="shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          aria-label="Dismiss insight"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      )}
    </div>
  )
}
