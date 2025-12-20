import {
  ArrowDown,
  ArrowUp,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import type {
  AssetAllocation,
  GainLoss,
  Performer,
  TodayChange,
} from "../types";
import { cn } from "./utils";

interface InvestmentMetricCardProps {
  label: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  changePercent?: number;
  trend?: "up" | "down" | "neutral";
  formatValue?: (value: number) => string;
  gainLoss?: GainLoss;
  todayChange?: TodayChange;
  assetAllocation?: AssetAllocation;
  performer?: Performer;
  isPerformer?: boolean;
}

export function InvestmentMetricCard({
  label,
  value,
  previousValue,
  change,
  changePercent,
  trend,
  formatValue,
  gainLoss,
  todayChange,
  assetAllocation,
  performer,
  isPerformer = false,
}: InvestmentMetricCardProps) {
  const formatCurrency = (val: number) =>
    `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatDefault = formatValue || ((val: number) => formatCurrency(val));

  let displayValue: string;
  let displaySubtext: string | null = null;
  let changeDisplay: React.ReactNode = null;

  if (performer) {
    displayValue = performer.name;
    displaySubtext = `${performer.ticker} • ${formatCurrency(performer.gainLossDollar)}`;
    const isPositive = performer.gainLossPercent > 0;
    const changeColor = isPositive
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-red-600 dark:text-red-400";
    changeDisplay = (
      <div
        className={cn(
          "flex items-center gap-1 font-medium text-xs",
          changeColor
        )}
      >
        {isPositive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        <span>
          {performer.gainLossPercent > 0 ? "+" : ""}
          {performer.gainLossPercent.toFixed(1)}%
        </span>
      </div>
    );
  } else if (assetAllocation) {
    // Show largest allocation
    const entries = Object.entries(assetAllocation) as [
      keyof AssetAllocation,
      number,
    ][];
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    const [topType, topPercent] = sorted[0];
    const typeLabels: Record<keyof AssetAllocation, string> = {
      stocks: "Stocks",
      etfs: "ETFs",
      crypto: "Crypto",
      retirement: "Retirement",
      bonds: "Bonds",
      savings: "Savings",
      realEstate: "Real Estate",
    };
    displayValue = typeLabels[topType] || topType;
    displaySubtext = `${topPercent.toFixed(1)}% of portfolio`;
    changeDisplay = (
      <span className="text-neutral-500 text-xs dark:text-neutral-400">
        {sorted.length} asset types
      </span>
    );
  } else if (gainLoss) {
    displayValue = formatCurrency(gainLoss.dollar);
    displaySubtext = `${gainLoss.percent > 0 ? "+" : ""}${gainLoss.percent.toFixed(1)}%`;
    const isPositive = gainLoss.dollar > 0;
    const changeColor = isPositive
      ? "text-emerald-600 dark:text-emerald-400"
      : gainLoss.dollar < 0
        ? "text-red-600 dark:text-red-400"
        : "text-neutral-600 dark:text-neutral-400";
    const TrendIcon = isPositive
      ? TrendingUp
      : gainLoss.dollar < 0
        ? TrendingDown
        : Minus;
    changeDisplay = (
      <div
        className={cn(
          "flex items-center gap-1 font-medium text-xs",
          changeColor
        )}
      >
        <TrendIcon className="h-3 w-3" />
        <span>
          {gainLoss.percent > 0 ? "+" : ""}
          {gainLoss.percent.toFixed(1)}%
        </span>
      </div>
    );
  } else if (todayChange) {
    displayValue = formatCurrency(todayChange.dollar);
    displaySubtext = `${todayChange.percent > 0 ? "+" : ""}${todayChange.percent.toFixed(2)}%`;
    const isPositive = todayChange.dollar > 0;
    const changeColor = isPositive
      ? "text-emerald-600 dark:text-emerald-400"
      : todayChange.dollar < 0
        ? "text-red-600 dark:text-red-400"
        : "text-neutral-600 dark:text-neutral-400";
    const TrendIcon = isPositive
      ? ArrowUp
      : todayChange.dollar < 0
        ? ArrowDown
        : Minus;
    changeDisplay = (
      <div
        className={cn(
          "flex items-center gap-1 font-medium text-xs",
          changeColor
        )}
      >
        <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
        <span>
          {todayChange.percent > 0 ? "+" : ""}
          {todayChange.percent.toFixed(2)}%
        </span>
      </div>
    );
  } else {
    displayValue = typeof value === "number" ? formatDefault(value) : value;
    if (previousValue !== undefined) {
      displaySubtext =
        typeof previousValue === "number"
          ? formatDefault(previousValue)
          : previousValue.toString();
      displaySubtext += " previous";
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
    <Card
      className={cn(
        "flex flex-col justify-between p-4 transition-colors hover:border-blue-300 dark:hover:border-blue-700",
        isPerformer &&
          "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20"
      )}
    >
      <CardContent className="p-0">
        <div className="mb-2 flex items-start justify-between">
          <p className="font-geist-sans font-medium text-neutral-600 text-sm dark:text-neutral-400">
            {label}
          </p>
          {changeDisplay}
        </div>
        <p className="mb-1 font-bold font-geist-sans text-2xl text-neutral-900 dark:text-neutral-100">
          {displayValue}
        </p>
        {displaySubtext && (
          <p className="font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
            {displaySubtext}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
