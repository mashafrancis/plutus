import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import type { MetricValue } from "@/lib/types/dashboard";

interface MetricCardProps {
  label: string;
  metric: MetricValue;
  formatValue: (value: number) => string;
}

export function MetricCard({ label, metric, formatValue }: MetricCardProps) {
  const isPositive = metric.trend === "up";
  const isNegative = metric.trend === "down";
  const changeColor = isPositive
    ? "text-green-600 dark:text-green-400"
    : isNegative
      ? "text-red-600 dark:text-red-400"
      : "text-neutral-600 dark:text-neutral-400";

  const TrendIcon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-blue-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-700">
      <div className="mb-2 flex items-start justify-between">
        <p className="font-medium text-neutral-600 text-sm dark:text-neutral-400">
          {label}
        </p>
        <div
          className={`flex items-center gap-1 font-medium text-xs ${changeColor}`}
        >
          <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
          <span>
            {metric.changePercent > 0 ? "+" : ""}
            {metric.changePercent.toFixed(1)}%
          </span>
        </div>
      </div>
      <p className="mb-1 font-bold text-2xl text-neutral-900 dark:text-neutral-100">
        {formatValue(metric.value)}
      </p>
      <p className="text-neutral-500 text-xs dark:text-neutral-500">
        {formatValue(metric.previousValue)} last period
      </p>
    </div>
  );
}
