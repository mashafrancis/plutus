import type { CategorySpending } from "../types";

interface SpendingChartProps {
  data: CategorySpending[];
  onViewCategory?: (category: string) => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SpendingChart({ data, onViewCategory }: SpendingChartProps) {
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
                {formatCurrency(item.amount)}
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
