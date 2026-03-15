import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { STALE_TIME } from "@/shared/config/query-config";

export function useNotificationsUnreadCount() {
  return useQuery({
    ...convexQuery(api.notifications.getUnreadCount, {}),
    staleTime: STALE_TIME.DYNAMIC,
  });
}
