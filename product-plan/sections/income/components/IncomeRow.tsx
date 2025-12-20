import { MoreVertical, Repeat } from "lucide-react";
import { Badge } from "../../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import type { Account, Income } from "../types";

interface IncomeRowProps {
  income: Income;
  account?: Account;
  isSelected?: boolean;
  onSelect?: (incomeId: string, selected: boolean) => void;
  onEdit?: (incomeId: string) => void;
  onDelete?: (incomeId: string) => void;
}

export function IncomeRow({
  income,
  account,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
}: IncomeRowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatCurrency = (amount: number) =>
    `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
        <span className="font-geist-sans text-neutral-600 text-sm dark:text-neutral-400">
          {formatDate(income.date)}
        </span>
      </td>

      {/* Description */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-geist-sans font-medium text-neutral-900 dark:text-neutral-100">
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
          <p className="mt-1 font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
            {income.notes}
          </p>
        )}
      </td>

      {/* Source */}
      <td className="px-4 py-3">
        <Badge className="font-geist-sans" variant="outline">
          {income.source}
        </Badge>
      </td>

      {/* Amount */}
      <td className="px-4 py-3">
        <span className="font-geist-mono font-semibold text-emerald-600 dark:text-emerald-400">
          {formatCurrency(income.amount)}
        </span>
      </td>

      {/* Account */}
      <td className="px-4 py-3">
        <span className="font-geist-sans text-neutral-600 text-sm dark:text-neutral-400">
          {account?.name || income.accountId}
        </span>
      </td>

      {/* Tags */}
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {income.tags.slice(0, 2).map((tag) => (
            <Badge
              className="border-sky-200 bg-sky-50 px-1.5 py-0.5 font-geist-sans text-sky-700 text-xs dark:border-sky-800 dark:bg-sky-950 dark:text-sky-300"
              key={tag}
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
          {income.tags.length > 2 && (
            <Badge
              className="px-1.5 py-0.5 font-geist-sans text-xs"
              variant="secondary"
            >
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
            <DropdownMenuItem
              className="font-geist-sans"
              onClick={() => onEdit?.(income.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-geist-sans text-red-600 dark:text-red-400"
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
