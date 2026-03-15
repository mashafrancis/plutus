import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { STALE_TIME } from "@/shared/config/query-config";

interface UseNotificationsListParams {
  unreadOnly?: boolean;
}

export function useNotificationsList(params: UseNotificationsListParams = {}) {
  return useQuery({
    ...convexQuery(api.notifications.list, params),
    staleTime: STALE_TIME.DYNAMIC,
  });
}
