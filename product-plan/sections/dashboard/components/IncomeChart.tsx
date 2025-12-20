import type { IncomeBySource } from "../types";

interface IncomeChartProps {
  data: IncomeBySource[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function IncomeChart({ data }: IncomeChartProps) {
  const maxAmount = Math.max(...data.map((d) => d.amount));
  const filteredData = data.filter((d) => d.amount > 0);

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
                {formatCurrency(item.amount)}
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
