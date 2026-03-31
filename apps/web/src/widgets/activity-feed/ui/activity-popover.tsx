import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsClockwiseIcon,
  ArrowUpRightIcon,
  LightningIcon,
  TargetIcon,
  TrashIcon,
  TrendUpIcon,
  WalletIcon,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useActivitiesGet } from "@/entities/activity/api/use-activities-get";
import { formatRelativeDate } from "@/shared/lib/format/date";

function getActivityIcon(type: string, entityType: string): Icon {
  if (type.startsWith("delete_")) {
    return TrashIcon;
  }

  switch (entityType) {
    case "account":
      return WalletIcon;
    case "transaction":
      return ArrowUpRightIcon; // Default, logic can be refined if we had transaction type in metadata
    case "investment":
      return TrendUpIcon;
    case "goal":
      return TargetIcon;
    case "subscription":
      return ArrowsClockwiseIcon;
    default:
      return LightningIcon;
  }
}

function getActivityColor(type: string, entityType: string): string {
  if (type.startsWith("delete_")) {
    return "text-destructive bg-destructive/10";
  }

  switch (entityType) {
    case "account":
      return "text-primary bg-primary/10";
    case "transaction":
      return "text-chart-2 bg-chart-2/10";
    case "investment":
      return "text-chart-4 bg-chart-4/10";
    case "goal":
      return "text-chart-3 bg-chart-3/10";
    case "subscription":
      return "text-chart-5 bg-chart-5/10";
    default:
      return "text-primary bg-primary/10";
  }
}

function formatActivityDescription(description: string) {
  // Simple heuristic to bold the entity name if it's at the end
  // "Created account Main Checking" -> "Created account **Main Checking**"
  const parts = description.split(" ");
  if (parts.length > 2) {
    const action = parts.slice(0, 2).join(" ");
    const rest = parts.slice(2).join(" ");
    return (
      <span>
        {action} <span className="font-medium text-foreground">{rest}</span>
      </span>
    );
  }
  return description;
}

export function ActivityPopover() {
  const { data: activities } = useActivitiesGet({ limit: 20 });

  return (
    <Popover>
      <PopoverTrigger>
        <Button aria-label="Toggle activity feed" size="icon" variant="outline">
          <LightningIcon aria-hidden data-icon="inline-start" weight="bold" />
          <span className="sr-only">Toggle activity feed</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="font-semibold text-sm">Activity</h4>
          <span className="text-muted-foreground text-xs">Recent actions</span>
        </div>
        <ScrollArea className="h-[320px]">
          {(() => {
            if (!activities) {
              return (
                <div className="flex h-[100px] items-center justify-center text-muted-foreground text-sm">
                  Loading…
                </div>
              );
            }

            if (activities.length === 0) {
              return (
                <div className="flex h-[100px] items-center justify-center text-muted-foreground text-sm">
                  No recent activity
                </div>
              );
            }

            return (
              <div className="flex flex-col">
                {activities.map((activity) => {
                  const Icon = getActivityIcon(activity.type, activity.entityType);
                  const colorClass = getActivityColor(activity.type, activity.entityType);

                  return (
                    <div
                      className="flex gap-3 border-b px-4 py-3 transition-colors last:border-0 hover:bg-muted/50"
                      key={activity._id}
                    >
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorClass}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <p className="text-muted-foreground text-sm leading-snug">
                          {formatActivityDescription(activity.description)}
                        </p>
                        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
                          {formatRelativeDate(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
