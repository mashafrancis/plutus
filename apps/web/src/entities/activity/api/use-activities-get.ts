import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { STALE_TIME } from "@/shared/config/query-config";

interface UseActivitiesGetParams {
  limit?: number;
}

export function useActivitiesGet(params: UseActivitiesGetParams = {}) {
  return useQuery({
    ...convexQuery(api.activities.get, params),
    staleTime: STALE_TIME.REALTIME,
  });
}
