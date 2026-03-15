import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { CalendarIcon, DotsThreeIcon } from "@phosphor-icons/react";

import { DeleteSubscriptionMenuItem } from "@/features/delete-subscription/ui/delete-subscription-menu-item";
import { ManageSubscriptionStatusMenuItems } from "@/features/manage-subscription-status/ui/manage-subscription-status-menu-items";
import { formatCurrency } from "@/shared/lib/format/currency";
import { formatDate } from "@/shared/lib/format/date";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SubscriptionStatus = "active" | "paused" | "cancelled";

function getStatusBadgeVariant(
  status: SubscriptionStatus
): "default" | "secondary" | "outline" {
  if (status === "active") {
    return "default";
  }
  if (status === "paused") {
    return "secondary";
  }
  return "outline";
}

interface SubscriptionItemProps {
  subscription: {
    _id: Id<"subscriptions">;
    name: string;
    amount: number;
    currency: string;
    frequency: string;
    status: SubscriptionStatus;
    nextRenewalDate: number;
  };
}

export function SubscriptionItem({ subscription }: SubscriptionItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md border p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <CalendarIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{subscription.name}</p>
            <Badge variant={getStatusBadgeVariant(subscription.status)}>
              {subscription.status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {formatCurrency(subscription.amount, subscription.currency)} /{" "}
            {subscription.frequency}
          </p>
          {subscription.status === "active" && (
            <p className="text-muted-foreground text-xs">
              Next: {formatDate(subscription.nextRenewalDate)}
            </p>
          )}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Subscription options" size="icon" variant="ghost">
            <DotsThreeIcon weight="bold" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <ManageSubscriptionStatusMenuItems
            status={subscription.status}
            subscriptionId={subscription._id}
          />
          <DeleteSubscriptionMenuItem subscriptionId={subscription._id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
