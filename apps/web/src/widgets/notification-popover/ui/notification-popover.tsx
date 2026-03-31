import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsClockwiseIcon,
  BellIcon,
  CheckCircleIcon,
  CheckIcon,
  InfoIcon,
  TargetIcon,
  TrashIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import type { Doc } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationsList } from "@/entities/notification/api/use-notifications-list";
import { useNotificationsUnreadCount } from "@/entities/notification/api/use-notifications-unread-count";
import { formatRelativeDate } from "@/shared/lib/format/date";

type NotificationType = Doc<"notifications">["type"];

function getNotificationIcon(type: NotificationType): Icon {
  switch (type) {
    case "subscription_renewal":
      return ArrowsClockwiseIcon;
    case "goal_reached":
      return TargetIcon;
    case "budget_exceeded":
      return WalletIcon;
    default:
      return InfoIcon;
  }
}

function getNotificationColor(type: NotificationType): string {
  switch (type) {
    case "subscription_renewal":
      return "text-chart-5 bg-chart-5/10";
    case "goal_reached":
      return "text-chart-2 bg-chart-2/10";
    case "budget_exceeded":
      return "text-destructive bg-destructive/10";
    default:
      return "text-primary bg-primary/10";
  }
}

export function NotificationPopover() {
  const { data: notifications } = useNotificationsList();
  const { data: unreadCount } = useNotificationsUnreadCount();
  const markAsRead = useMutation(api.notifications.markAsRead);
  const markAllAsRead = useMutation(api.notifications.markAllAsRead);
  const removeNotification = useMutation(api.notifications.remove);

  const hasUnread = (unreadCount ?? 0) > 0;

  return (
    <Popover>
      <PopoverTrigger>
        <Button aria-label="Notifications" className="relative" size="icon" variant="outline">
          <BellIcon aria-hidden data-icon="inline-start" weight="bold" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-medium text-[10px] text-primary-foreground">
              {unreadCount && unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="font-semibold text-sm">Notifications</h4>
          {hasUnread && (
            <Button
              className="h-7 gap-1 text-xs"
              onClick={() => markAllAsRead()}
              size="sm"
              variant="ghost"
            >
              <CheckCircleIcon data-icon="inline-start" weight="fill" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[320px]">
          {(() => {
            if (!notifications) {
              return (
                <div className="flex h-[100px] items-center justify-center text-muted-foreground text-sm">
                  Loading…
                </div>
              );
            }

            if (notifications.length === 0) {
              return (
                <div className="flex h-[100px] flex-col items-center justify-center gap-2 text-muted-foreground text-sm">
                  <BellIcon className="h-8 w-8 opacity-40" />
                  No notifications
                </div>
              );
            }

            return (
              <div className="flex flex-col">
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colorClass = getNotificationColor(notification.type);

                  return (
                    <div
                      className={`group relative flex gap-3 border-b px-4 py-3 transition-colors last:border-0 hover:bg-muted/50 ${
                        notification.isRead ? "" : "bg-muted/30"
                      }`}
                      key={notification._id}
                    >
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorClass}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <p className="font-medium text-sm leading-snug">{notification.title}</p>
                        <p className="text-muted-foreground text-xs leading-snug">
                          {notification.message}
                        </p>
                        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
                          {formatRelativeDate(notification.createdAt)}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {!notification.isRead && (
                          <Button
                            aria-label="Mark notification as read"
                            onClick={() => markAsRead({ id: notification._id })}
                            size="icon-sm"
                            variant="ghost"
                          >
                            <CheckIcon aria-hidden weight="bold" />
                          </Button>
                        )}
                        <Button
                          aria-label="Delete notification"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeNotification({ id: notification._id })}
                          size="icon-sm"
                          variant="ghost"
                        >
                          <TrashIcon aria-hidden weight="bold" />
                        </Button>
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
