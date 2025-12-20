import { formatCurrency } from "@/lib/formatter";
import type { CategorySpending } from "@/lib/types/dashboard";

interface SpendingChartProps {
  data: CategorySpending[];
  onViewCategory?: (category: string) => void;
  currency?: string;
  locale?: string;
}

export function SpendingChart({
  data,
  onViewCategory,
  currency = "USD",
  locale = "en-US",
}: SpendingChartProps) {
  if (data.length === 0) {
    return (
      <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
        No spending data available
      </div>
    );
  }

  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const percentage = (item.amount / maxAmount) * 100;
        return (
          <button
            className="group w-full"
            key={item.category}
            onClick={() => onViewCategory?.(item.category)}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-medium text-neutral-700 text-sm dark:text-neutral-300">
                {item.category}
              </span>
              <span className="font-semibold text-neutral-900 text-sm dark:text-neutral-100">
                {formatCurrency({
                  value: item.amount,
                  currency,
                  locale,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
              <div
                className="h-full transition-all group-hover:opacity-80"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
