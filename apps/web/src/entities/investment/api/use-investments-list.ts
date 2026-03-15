import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { STALE_TIME } from "@/shared/config/query-config";

export function useInvestmentsList() {
  return useQuery({
    ...convexQuery(api.investments.list),
    staleTime: STALE_TIME.SEMI_STATIC,
  });
}
