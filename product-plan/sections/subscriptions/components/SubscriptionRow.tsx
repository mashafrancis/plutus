import { Clock, History, MoreVertical, Pause, Play, X } from "lucide-react";
import { Badge } from "../../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import type { Account, Subscription } from "../types";
import { cn } from "./utils";

interface SubscriptionRowProps {
  subscription: Subscription;
  account?: Account;
  isSelected?: boolean;
  onSelect?: (subscriptionId: string, selected: boolean) => void;
  onEdit?: (subscriptionId: string) => void;
  onPause?: (subscriptionId: string) => void;
  onResume?: (subscriptionId: string) => void;
  onCancel?: (subscriptionId: string) => void;
  onViewHistory?: (subscriptionId: string) => void;
}

function getDaysUntil(dateString: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function SubscriptionRow({
  subscription,
  account,
  isSelected = false,
  onSelect,
  onEdit,
  onPause,
  onResume,
  onCancel,
  onViewHistory,
}: SubscriptionRowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatCurrency = (amount: number) =>
    `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const formatBillingCycle = (cycle: string) =>
    cycle.charAt(0).toUpperCase() + cycle.slice(1);

  const daysUntil = getDaysUntil(subscription.nextPaymentDate);
  const isUpcomingSoon =
    subscription.status === "active" && daysUntil >= 0 && daysUntil <= 7;

  const getStatusBadge = () => {
    switch (subscription.status) {
      case "active":
        return (
          <Badge
            className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
            variant="outline"
          >
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge
            className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
            variant="outline"
          >
            <Pause className="mr-1 h-3 w-3" />
            Paused
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            className="border-neutral-300 bg-neutral-100 text-neutral-600 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            variant="outline"
          >
            Cancelled
          </Badge>
        );
    }
  };

  return (
    <tr
      className={cn(
        "border-neutral-200 border-b transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900",
        isUpcomingSoon && "bg-amber-50/50 dark:bg-amber-950/20"
      )}
    >
      {/* Checkbox */}
      <td className="w-12 px-4">
        <input
          checked={isSelected}
          className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-700 dark:focus:ring-blue-400"
          onChange={(e) => onSelect?.(subscription.id, e.target.checked)}
          type="checkbox"
        />
      </td>

      {/* Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-geist-sans font-medium text-neutral-900 dark:text-neutral-100">
            {subscription.name}
          </span>
          {isUpcomingSoon && (
            <Badge
              className="border-amber-300 bg-amber-50 px-1.5 py-0.5 text-amber-700 text-xs dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300"
              variant="outline"
            >
              <Clock className="mr-1 h-3 w-3" />
              {daysUntil === 0
                ? "Today"
                : daysUntil === 1
                  ? "Tomorrow"
                  : `${daysUntil}d`}
            </Badge>
          )}
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        <Badge className="font-geist-sans" variant="outline">
          {subscription.category}
        </Badge>
      </td>

      {/* Amount */}
      <td className="px-4 py-3">
        <span className="font-geist-mono font-semibold text-neutral-900 dark:text-neutral-100">
          {formatCurrency(subscription.amount)}
        </span>
      </td>

      {/* Billing Cycle */}
      <td className="px-4 py-3">
        <span className="font-geist-sans text-neutral-600 text-sm dark:text-neutral-400">
          {formatBillingCycle(subscription.billingCycle)}
        </span>
      </td>

      {/* Next Payment */}
      <td className="px-4 py-3">
        <span
          className={cn(
            "font-geist-sans text-sm",
            isUpcomingSoon
              ? "font-medium text-amber-600 dark:text-amber-400"
              : "text-neutral-600 dark:text-neutral-400"
          )}
        >
          {formatShortDate(subscription.nextPaymentDate)}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">{getStatusBadge()}</td>

      {/* Payment Method */}
      <td className="px-4 py-3">
        <span className="font-geist-sans text-neutral-600 text-sm dark:text-neutral-400">
          {account?.name || subscription.paymentMethodId}
        </span>
      </td>

      {/* Start Date */}
      <td className="px-4 py-3">
        <span className="font-geist-sans text-neutral-500 text-sm dark:text-neutral-500">
          {formatDate(subscription.startDate)}
        </span>
      </td>

      {/* Total Spent */}
      <td className="px-4 py-3">
        <span className="font-geist-mono text-neutral-700 text-sm dark:text-neutral-300">
          {formatCurrency(subscription.totalSpent)}
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
              onClick={() => onEdit?.(subscription.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-geist-sans"
              onClick={() => onViewHistory?.(subscription.id)}
            >
              <History className="mr-2 h-4 w-4" />
              View History
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {subscription.status === "active" && (
              <DropdownMenuItem
                className="font-geist-sans text-amber-600 dark:text-amber-400"
                onClick={() => onPause?.(subscription.id)}
              >
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </DropdownMenuItem>
            )}
            {subscription.status === "paused" && (
              <DropdownMenuItem
                className="font-geist-sans text-emerald-600 dark:text-emerald-400"
                onClick={() => onResume?.(subscription.id)}
              >
                <Play className="mr-2 h-4 w-4" />
                Resume
              </DropdownMenuItem>
            )}
            {subscription.status !== "cancelled" && (
              <DropdownMenuItem
                className="font-geist-sans text-red-600 dark:text-red-400"
                onClick={() => onCancel?.(subscription.id)}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
