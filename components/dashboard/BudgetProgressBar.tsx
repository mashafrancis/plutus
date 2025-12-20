import { formatCurrency } from "@/lib/formatter";
import type { BudgetProgress } from "@/lib/types/dashboard";

interface BudgetProgressBarProps {
  budget: BudgetProgress;
  onView?: (category: string) => void;
  currency?: string;
  locale?: string;
}

export function BudgetProgressBar({
  budget,
  onView,
  currency = "USD",
  locale = "en-US",
}: BudgetProgressBarProps) {
  const isOverBudget = budget.spent > budget.target;
  const percentage = Math.min((budget.spent / budget.target) * 100, 100);

  return (
    <button
      className="w-full rounded-lg border border-neutral-200 bg-white p-4 text-left transition-colors hover:border-blue-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-700"
      onClick={() => onView?.(budget.category)}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="font-medium text-neutral-900 dark:text-neutral-100">
          {budget.category}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-neutral-600 text-sm dark:text-neutral-400">
            {formatCurrency({
              value: budget.spent,
              currency,
              locale,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-neutral-400 text-sm dark:text-neutral-500">
            /
          </span>
          <span className="text-neutral-600 text-sm dark:text-neutral-400">
            {formatCurrency({
              value: budget.target,
              currency,
              locale,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div
          className={`h-full transition-all ${
            isOverBudget
              ? "bg-red-500 dark:bg-red-600"
              : percentage > 80
                ? "bg-amber-500 dark:bg-amber-600"
                : "bg-blue-500 dark:bg-blue-600"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-1 text-neutral-500 text-xs dark:text-neutral-400">
        {percentage.toFixed(1)}% used
      </p>
    </button>
  );
}
