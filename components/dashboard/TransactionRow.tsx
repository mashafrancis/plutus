import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";
import type { Transaction } from "@/lib/types/dashboard";

interface TransactionRowProps {
  transaction: Transaction;
  onView?: (id: string) => void;
  currency?: string;
  locale?: string;
}

function formatDate(dateString: string, locale?: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale || "en-US", {
    month: "short",
    day: "numeric",
  });
}

export function TransactionRow({
  transaction,
  onView,
  currency = "USD",
  locale = "en-US",
}: TransactionRowProps) {
  const isIncome = transaction.type === "income";
  const Icon = isIncome ? ArrowUpCircle : ArrowDownCircle;
  const amountColor = isIncome
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

  return (
    <button
      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
      onClick={() => onView?.(transaction.id)}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isIncome
            ? "bg-green-100 dark:bg-green-900/30"
            : "bg-red-100 dark:bg-red-900/30"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            isIncome
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
          strokeWidth={2}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-neutral-900 dark:text-neutral-100">
          {transaction.description}
        </p>
        <p className="text-neutral-500 text-sm dark:text-neutral-400">
          {transaction.category}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`font-semibold ${amountColor}`}>
          {formatCurrency({
            value: transaction.amount,
            currency,
            locale,
            minimumFractionDigits: 2,
          })}
        </p>
        <p className="text-neutral-500 text-xs dark:text-neutral-400">
          {formatDate(transaction.date, locale)}
        </p>
      </div>
    </button>
  );
}
