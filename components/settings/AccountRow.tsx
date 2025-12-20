import {
  Archive,
  ArchiveRestore,
  DollarSign,
  Edit,
  MoreVertical,
  Star,
  Trash2,
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
import type { Account } from "@/lib/types/settings";
import { cn } from "./utils";

interface AccountRowProps {
  account: Account;
  currency?: string;
  locale?: string;
  onEdit?: (accountId: string) => void;
  onDelete?: (accountId: string) => void;
  onArchive?: (accountId: string, archived: boolean) => void;
  onSetDefault?: (accountId: string) => void;
  onUpdateBalance?: (accountId: string, balance: number) => void;
}

export function AccountRow({
  account,
  currency = "USD",
  locale = "en-US",
  onEdit,
  onDelete,
  onArchive,
  onSetDefault,
  onUpdateBalance,
}: AccountRowProps) {
  const formatAccountType = (type: string) =>
    type.charAt(0).toUpperCase() + type.slice(1);

  const isNegative = account.currentBalance < 0;

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900",
        account.isArchived && "opacity-60"
      )}
    >
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <p className="font-geist-sans font-medium text-neutral-900 dark:text-neutral-100">
            {account.name}
          </p>
          {account.isDefault && (
            <Badge
              className="border-blue-200 bg-blue-50 font-geist-sans text-blue-700 text-xs dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
              variant="outline"
            >
              <Star className="mr-1 h-3 w-3" />
              Default
            </Badge>
          )}
          {account.isArchived && (
            <Badge
              className="bg-neutral-100 font-geist-sans text-neutral-600 text-xs dark:bg-neutral-800 dark:text-neutral-400"
              variant="outline"
            >
              Archived
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 font-geist-sans text-neutral-600 text-sm dark:text-neutral-400">
          <span>{formatAccountType(account.type)}</span>
          <span
            className={cn(
              "font-geist-mono",
              isNegative
                ? "text-red-600 dark:text-red-400"
                : "text-neutral-900 dark:text-neutral-100"
            )}
          >
            {formatCurrency({
              value: Math.abs(account.currentBalance),
              currency,
              locale,
            })}
          </span>
        </div>
        {account.notes && (
          <p className="mt-1 font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
            {account.notes}
          </p>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!account.isDefault && (
            <DropdownMenuItem
              className="font-geist-sans"
              onClick={() => onSetDefault?.(account.id)}
            >
              <Star className="mr-2 h-4 w-4" />
              Set as Default
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="font-geist-sans"
            onClick={() =>
              onUpdateBalance?.(account.id, account.currentBalance)
            }
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Update Balance
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-geist-sans"
            onClick={() => onEdit?.(account.id)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="font-geist-sans"
            onClick={() => onArchive?.(account.id, !account.isArchived)}
          >
            {account.isArchived ? (
              <>
                <ArchiveRestore className="mr-2 h-4 w-4" />
                Unarchive
              </>
            ) : (
              <>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-geist-sans text-red-600 dark:text-red-400"
            onClick={() => onDelete?.(account.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
