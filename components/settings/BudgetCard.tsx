import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/lib/formatter";
import type { Budget } from "@/lib/types/settings";
import { cn } from "./utils";

interface BudgetCardProps {
  budget: Budget;
  currency?: string;
  locale?: string;
  onEdit?: (budgetId: string) => void;
  onDelete?: (budgetId: string) => void;
  onUpdate?: (budgetId: string, updates: Partial<Budget>) => void;
}

export function BudgetCard({
  budget,
  currency = "USD",
  locale = "en-US",
  onEdit,
  onDelete,
  onUpdate,
}: BudgetCardProps) {
  const formatPeriod = (period: string) =>
    period.charAt(0).toUpperCase() + period.slice(1);

  const percentage = (budget.currentSpending / budget.limit) * 100;
  const isOver = percentage > 100;
  const isWarning = percentage >= budget.alertThreshold;

  const progressColor = isOver
    ? "bg-red-500"
    : isWarning
      ? "bg-amber-500"
      : "bg-blue-500";

  return (
    <div className="rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <p className="font-geist-sans font-semibold text-neutral-900 dark:text-neutral-100">
              {budget.categoryName}
            </p>
            <Badge className="font-geist-sans text-xs" variant="outline">
              {formatPeriod(budget.period)}
            </Badge>
          </div>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="font-bold font-geist-mono text-lg text-neutral-900 dark:text-neutral-100">
              {formatCurrency({
                value: budget.currentSpending,
                currency,
                locale,
              })}
            </span>
            <span className="font-geist-mono text-neutral-500 text-sm dark:text-neutral-500">
              / {formatCurrency({ value: budget.limit, currency, locale })}
            </span>
          </div>
          <div className="mb-2 h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className={cn("h-full transition-all", progressColor)}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="font-geist-sans text-neutral-500 text-xs dark:text-neutral-500">
            Alert at {budget.alertThreshold}
            {budget.alertThresholdType === "percentage" ? "%" : ""}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded p-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <MoreVertical className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="font-geist-sans"
              onClick={() => onEdit?.(budget.id)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-geist-sans text-red-600 dark:text-red-400"
              onClick={() => onDelete?.(budget.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-2 border-neutral-200 border-t pt-3 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <Label
            className="font-geist-sans text-sm"
            htmlFor={`rollover-${budget.id}`}
          >
            Rollover
          </Label>
          <Switch
            checked={budget.rolloverEnabled}
            id={`rollover-${budget.id}`}
            onCheckedChange={(checked) =>
              onUpdate?.(budget.id, { rolloverEnabled: checked })
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <Label
            className="font-geist-sans text-sm"
            htmlFor={`recurring-${budget.id}`}
          >
            Recurring
          </Label>
          <Switch
            checked={budget.recurringEnabled}
            id={`recurring-${budget.id}`}
            onCheckedChange={(checked) =>
              onUpdate?.(budget.id, { recurringEnabled: checked })
            }
          />
        </div>
      </div>
    </div>
  );
}
