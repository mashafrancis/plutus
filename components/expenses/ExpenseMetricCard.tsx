import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatter";
import type {
  BudgetProgressMetric,
  ComparisonMetric,
  TopCategory,
  TransactionCount,
} from "@/lib/types/expenses";
import { cn } from "./utils";

interface ExpenseMetricCardProps {
  label: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  changePercent?: number;
  trend?: "up" | "down" | "neutral";
  formatValue?: (value: number) => string;
  topCategory?: TopCategory;
  budgetProgress?: BudgetProgressMetric;
  comparison?: ComparisonMetric;
  transactionCount?: TransactionCount;
  currency?: string;
  locale?: string;
}

export function ExpenseMetricCard({
  label,
  value,
  previousValue,
  change,
  changePercent,
  trend,
  formatValue,
  topCategory,
  budgetProgress,
  comparison,
  transactionCount,
  currency = "USD",
  locale = "en-US",
}: ExpenseMetricCardProps) {
  const formatCurrencyValue = (val: number) =>
    formatCurrency({
      value: val,
      currency,
      locale,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formatDefault = formatValue || formatCurrencyValue;

  let displayValue: string;
  let displaySubtext: string | null = null;
  let changeDisplay: React.ReactNode = null;

  if (topCategory) {
    displayValue = topCategory.category;
    displaySubtext = formatCurrencyValue(topCategory.amount);
    changeDisplay = (
      <span className="text-neutral-500 text-xs dark:text-neutral-400">
        {topCategory.percentage.toFixed(1)}% of total
      </span>
    );
  } else if (budgetProgress) {
    displayValue = `${budgetProgress.percentage.toFixed(0)}%`;
    displaySubtext = `${formatCurrencyValue(budgetProgress.totalSpent)} / ${formatCurrencyValue(budgetProgress.totalBudget)}`;
    const statusColor =
      budgetProgress.status === "over"
        ? "text-red-600 dark:text-red-400"
        : budgetProgress.status === "warning"
          ? "text-amber-600 dark:text-amber-400"
          : "text-emerald-600 dark:text-emerald-400";
    changeDisplay = (
      <span className={cn("font-medium text-xs", statusColor)}>
        {budgetProgress.status === "over"
          ? "Over budget"
          : budgetProgress.status === "warning"
            ? "Near limit"
            : "On track"}
      </span>
    );
  } else if (comparison) {
    displayValue = typeof value === "number" ? formatDefault(value) : value;
    displaySubtext = comparison.message;
    const isPositive = comparison.trend === "up";
    const isNegative = comparison.trend === "down";
    const changeColor = isPositive
      ? "text-emerald-600 dark:text-emerald-400"
      : isNegative
        ? "text-red-600 dark:text-red-400"
        : "text-neutral-600 dark:text-neutral-400";
    const TrendIcon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus;
    changeDisplay = (
      <div
        className={cn(
          "flex items-center gap-1 font-medium text-xs",
          changeColor
        )}
      >
        <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
        <span>
          {comparison.changePercent > 0 ? "+" : ""}
          {comparison.changePercent.toFixed(1)}%
        </span>
      </div>
    );
  } else if (transactionCount) {
    displayValue = transactionCount.thisMonth.toString();
    displaySubtext = `${transactionCount.lastMonth} last month`;
    const changeColor =
      transactionCount.change > 0
        ? "text-emerald-600 dark:text-emerald-400"
        : transactionCount.change < 0
          ? "text-red-600 dark:text-red-400"
          : "text-neutral-600 dark:text-neutral-400";
    changeDisplay = (
      <span className={cn("font-medium text-xs", changeColor)}>
        {transactionCount.change > 0 ? "+" : ""}
        {transactionCount.change} vs last month
      </span>
    );
  } else {
    displayValue = typeof value === "number" ? formatDefault(value) : value;
    if (previousValue !== undefined) {
      displaySubtext =
        typeof previousValue === "number"
          ? formatDefault(previousValue)
          : previousValue.toString();
      displaySubtext += " last period";
    }
    if (changePercent !== undefined && trend) {
      const isPositive = trend === "up";
      const isNegative = trend === "down";
      const changeColor = isPositive
        ? "text-emerald-600 dark:text-emerald-400"
        : isNegative
          ? "text-red-600 dark:text-red-400"
          : "text-neutral-600 dark:text-neutral-400";
      const TrendIcon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus;
      changeDisplay = (
        <div
          className={cn(
            "flex items-center gap-1 font-medium text-xs",
            changeColor
          )}
        >
          <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
          <span>
            {changePercent > 0 ? "+" : ""}
            {changePercent.toFixed(1)}%
          </span>
        </div>
      );
    }
  }

  return (
    <Card className="flex flex-col justify-between p-4 transition-colors hover:border-blue-300 dark:hover:border-blue-700">
      <CardContent className="p-0">
        <div className="mb-2 flex items-start justify-between">
          <p className="font-medium text-neutral-600 text-sm dark:text-neutral-400">
            {label}
          </p>
          {changeDisplay}
        </div>
        <p className="mb-1 font-bold text-2xl text-neutral-900 dark:text-neutral-100">
          {displayValue}
        </p>
        {displaySubtext && (
          <p className="text-neutral-500 text-xs dark:text-neutral-500">
            {displaySubtext}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
