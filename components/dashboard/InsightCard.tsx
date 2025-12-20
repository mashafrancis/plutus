import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import type { Insight } from "@/lib/types/dashboard";

interface InsightCardProps {
  insight: Insight;
  onDismiss?: (id: string) => void;
  onAction?: () => void;
}

const severityConfig = {
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    textColor: "text-blue-900 dark:text-blue-100",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    iconColor: "text-amber-600 dark:text-amber-400",
    textColor: "text-amber-900 dark:text-amber-100",
  },
  success: {
    icon: CheckCircle2,
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
    textColor: "text-green-900 dark:text-green-100",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    textColor: "text-red-900 dark:text-red-100",
  },
};

export function InsightCard({
  insight,
  onDismiss,
  onAction,
}: InsightCardProps) {
  const config = severityConfig[insight.severity];
  const Icon = config.icon;

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} flex items-start gap-3 rounded-lg border p-4`}
    >
      <Icon
        className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconColor}`}
        strokeWidth={2}
      />
      <div className="min-w-0 flex-1">
        <h4 className={`mb-1 font-semibold text-sm ${config.textColor}`}>
          {insight.title}
        </h4>
        <p className="mb-3 text-neutral-700 text-sm dark:text-neutral-300">
          {insight.message}
        </p>
        {onAction && insight.actionLabel && (
          <button
            className="font-medium text-blue-600 text-sm hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={onAction}
          >
            {insight.actionLabel} →
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          aria-label="Dismiss insight"
          className="shrink-0 text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300"
          onClick={() => onDismiss(insight.id)}
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
