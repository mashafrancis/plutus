import { formatCurrency } from "@/lib/formatter";
import type { IncomeBySource } from "@/lib/types/dashboard";

interface IncomeChartProps {
  data: IncomeBySource[];
  currency?: string;
  locale?: string;
}

export function IncomeChart({
  data,
  currency = "USD",
  locale = "en-US",
}: IncomeChartProps) {
  const filteredData = data.filter((d) => d.amount > 0);

  if (filteredData.length === 0) {
    return (
      <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
        No income data available
      </div>
    );
  }

  const maxAmount = Math.max(...filteredData.map((d) => d.amount));

  return (
    <div className="space-y-3">
      {filteredData.map((item) => {
        const percentage = (item.amount / maxAmount) * 100;
        return (
          <div className="group" key={item.source}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-medium text-neutral-700 text-sm dark:text-neutral-300">
                {item.source}
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
                className="h-full bg-blue-500 transition-all group-hover:opacity-80 dark:bg-blue-600"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
