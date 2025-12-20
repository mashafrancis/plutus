import { MoreVertical, Repeat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/formatter";
import type { Account, Income } from "@/lib/types/income";

interface IncomeRowProps {
  income: Income;
  account?: Account;
  isSelected?: boolean;
  onSelect?: (incomeId: string, selected: boolean) => void;
  onEdit?: (incomeId: string) => void;
  onDelete?: (incomeId: string) => void;
  currency?: string;
  locale?: string;
}

export function IncomeRow({
  income,
  account,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  currency = "USD",
  locale = "en-US",
}: IncomeRowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale || "en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <tr className="border-neutral-200 border-b transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900">
      {/* Checkbox */}
      <td className="w-12 px-4">
        <input
          checked={isSelected}
          className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-700 dark:focus:ring-blue-400"
          onChange={(e) => onSelect?.(income.id, e.target.checked)}
          type="checkbox"
        />
      </td>

      {/* Date */}
      <td className="px-4 py-3">
        <span className="text-neutral-600 text-sm dark:text-neutral-400">
          {formatDate(income.date)}
        </span>
      </td>

      {/* Description */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {income.description}
          </span>
          {income.recurring && (
            <Badge
              className="border-sky-300 px-1.5 py-0.5 text-sky-700 text-xs dark:border-sky-700 dark:text-sky-300"
              variant="outline"
            >
              <Repeat className="mr-1 h-3 w-3" />
              {income.recurringFrequency || "recurring"}
            </Badge>
          )}
        </div>
        {income.notes && (
          <p className="mt-1 text-neutral-500 text-xs dark:text-neutral-500">
            {income.notes}
          </p>
        )}
      </td>

      {/* Source */}
      <td className="px-4 py-3">
        <Badge variant="outline">{income.source}</Badge>
      </td>

      {/* Amount - Green for income */}
      <td className="px-4 py-3">
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {formatCurrency({
            value: income.amount,
            currency,
            locale,
            minimumFractionDigits: 2,
          })}
        </span>
      </td>

      {/* Account */}
      <td className="px-4 py-3">
        <span className="text-neutral-600 text-sm dark:text-neutral-400">
          {account?.name || income.accountId}
        </span>
      </td>

      {/* Tags */}
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {income.tags.slice(0, 2).map((tag) => (
            <Badge
              className="border-sky-200 bg-sky-50 px-1.5 py-0.5 text-sky-700 text-xs dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300"
              key={tag}
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
          {income.tags.length > 2 && (
            <Badge className="px-1.5 py-0.5 text-xs" variant="secondary">
              +{income.tags.length - 2}
            </Badge>
          )}
        </div>
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
            <DropdownMenuItem onClick={() => onEdit?.(income.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 dark:text-red-400"
              onClick={() => onDelete?.(income.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
