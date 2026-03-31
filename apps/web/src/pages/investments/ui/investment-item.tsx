import { CaretDownIcon, CaretUpIcon, DotsThreeIcon } from "@phosphor-icons/react";
import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteInvestmentMenuItem } from "@/features/delete-investment/ui/delete-investment-menu-item";
import { formatCurrency } from "@/shared/lib/format/currency";
import { formatPercent } from "@/shared/lib/format/percent";

interface InvestmentItemProps {
  investment: {
    id: Id<"investments">;
    name: string;
    type: string;
    value: number;
    gain: number;
    gainPercent: number;
    currency: string;
  };
}

export function InvestmentItem({ investment }: InvestmentItemProps) {
  const isPositive = investment.gain >= 0;

  return (
    <div className="flex items-center justify-between rounded-md border p-4">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isPositive ? "bg-chart-2/10" : "bg-destructive/10"
          }`}
        >
          {isPositive ? (
            <CaretUpIcon className="h-5 w-5 text-chart-2" weight="bold" />
          ) : (
            <CaretDownIcon className="h-5 w-5 text-destructive" weight="bold" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{investment.name}</p>
            <Badge className="capitalize" variant="outline">
              {investment.type.replace("_", " ")}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {formatCurrency(investment.value, investment.currency)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={`font-medium ${isPositive ? "text-chart-2" : "text-destructive"}`}>
            {isPositive ? "+" : ""}
            {formatCurrency(investment.gain, investment.currency)}
          </p>
          <p className={`text-sm ${isPositive ? "text-chart-2" : "text-destructive"}`}>
            {isPositive ? "+" : ""}
            {formatPercent(investment.gainPercent)}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button aria-label="Investment options" size="icon" variant="ghost">
                <DotsThreeIcon aria-hidden weight="bold" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DeleteInvestmentMenuItem investmentId={investment.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
