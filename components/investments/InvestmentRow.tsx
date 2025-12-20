import {
  DollarSign,
  Edit,
  History,
  MoreVertical,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/formatter";
import type { Account, Investment } from "@/lib/types/investments";
import { cn } from "./utils";

interface InvestmentRowProps {
  investment: Investment;
  account?: Account;
  currency?: string;
  locale?: string;
  onEdit?: (investmentId: string) => void;
  onDelete?: (investmentId: string) => void;
  onRecordTransaction?: (investmentId: string) => void;
  onUpdateValue?: (investmentId: string) => void;
  onViewHistory?: (investmentId: string) => void;
}

export function InvestmentRow({
  investment,
  account,
  currency = "USD",
  locale = "en-US",
  onEdit,
  onDelete,
  onRecordTransaction,
  onUpdateValue,
  onViewHistory,
}: InvestmentRowProps) {
  const formatCurrencyValue = (amount: number) =>
    formatCurrency({ value: amount, currency, locale });

  const formatAssetType = (type: string) =>
    type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const isPositive = investment.gainLossDollar > 0;
  const isNegative = investment.gainLossDollar < 0;
  const todayIsPositive = investment.todayChangeDollar > 0;
  const todayIsNegative = investment.todayChangeDollar < 0;

  return (
    <tr className="border-neutral-200 border-b transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900">
      {/* Name/Ticker */}
      <td className="px-4 py-3">
        <div>
          <p className="font-geist-sans font-medium text-neutral-900 dark:text-neutral-100">
            {investment.name}
          </p>
          <p className="font-geist-mono text-neutral-500 text-xs dark:text-neutral-500">
            {investment.ticker}
          </p>
        </div>
      </td>

      {/* Asset Type */}
      <td className="px-4 py-3">
        <Badge className="font-geist-sans" variant="outline">
          {formatAssetType(investment.assetType)}
        </Badge>
      </td>

      {/* Shares/Units */}
      <td className="px-4 py-3">
        <span className="font-geist-mono text-neutral-700 text-sm dark:text-neutral-300">
          {investment.shares.toLocaleString(undefined, {
            maximumFractionDigits: 4,
          })}
        </span>
      </td>

      {/* Cost Basis */}
      <td className="px-4 py-3">
        <span className="font-geist-mono text-neutral-700 text-sm dark:text-neutral-300">
          {formatCurrencyValue(investment.costBasis)}
        </span>
      </td>

      {/* Current Value */}
      <td className="px-4 py-3">
        <span className="font-geist-mono font-semibold text-neutral-900 dark:text-neutral-100">
          {formatCurrencyValue(investment.currentValue)}
        </span>
      </td>

      {/* Gain/Loss */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span
            className={cn(
              "font-geist-mono font-semibold text-sm",
              isPositive && "text-emerald-600 dark:text-emerald-400",
              isNegative && "text-red-600 dark:text-red-400",
              !(isPositive || isNegative) &&
                "text-neutral-600 dark:text-neutral-400"
            )}
          >
            {isPositive ? "+" : ""}
            {formatCurrencyValue(investment.gainLossDollar)}
          </span>
          <span
            className={cn(
              "font-geist-mono text-xs",
              isPositive && "text-emerald-600 dark:text-emerald-400",
              isNegative && "text-red-600 dark:text-red-400",
              !(isPositive || isNegative) &&
                "text-neutral-600 dark:text-neutral-400"
            )}
          >
            {isPositive ? "+" : ""}
            {investment.gainLossPercent.toFixed(1)}%
          </span>
        </div>
      </td>

      {/* Today's Change */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          {todayIsPositive && (
            <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
          )}
          {todayIsNegative && (
            <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
          )}
          <span
            className={cn(
              "font-geist-mono text-sm",
              todayIsPositive && "text-emerald-600 dark:text-emerald-400",
              todayIsNegative && "text-red-600 dark:text-red-400",
              !(todayIsPositive || todayIsNegative) &&
                "text-neutral-600 dark:text-neutral-400"
            )}
          >
            {todayIsPositive ? "+" : ""}
            {formatCurrencyValue(investment.todayChangeDollar)}
          </span>
        </div>
        <span
          className={cn(
            "font-geist-mono text-xs",
            todayIsPositive && "text-emerald-600 dark:text-emerald-400",
            todayIsNegative && "text-red-600 dark:text-red-400",
            !(todayIsPositive || todayIsNegative) &&
              "text-neutral-600 dark:text-neutral-400"
          )}
        >
          {todayIsPositive ? "+" : ""}
          {investment.todayChangePercent.toFixed(2)}%
        </span>
      </td>

      {/* Allocation %} */}
      <td className="px-4 py-3">
        <span className="font-geist-mono text-neutral-600 text-sm dark:text-neutral-400">
          {investment.allocationPercent.toFixed(1)}%
        </span>
      </td>

      {/* Account */}
      <td className="px-4 py-3">
        <span className="font-geist-sans text-neutral-600 text-sm dark:text-neutral-400">
          {account?.name || investment.accountId}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="font-geist-sans"
              onClick={() => onEdit?.(investment.id)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-geist-sans"
              onClick={() => onRecordTransaction?.(investment.id)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Record Transaction
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-geist-sans"
              onClick={() => onUpdateValue?.(investment.id)}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Update Value
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-geist-sans"
              onClick={() => onViewHistory?.(investment.id)}
            >
              <History className="mr-2 h-4 w-4" />
              View History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="font-geist-sans text-red-600 dark:text-red-400"
              onClick={() => onDelete?.(investment.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
