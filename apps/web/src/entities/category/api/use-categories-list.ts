import { convexQuery } from "@convex-dev/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "@/shared/config/query-config";

export function useCategoriesList() {
  return useQuery({
    ...convexQuery(api.categories.list),
    staleTime: STALE_TIME.STATIC,
  });
}
