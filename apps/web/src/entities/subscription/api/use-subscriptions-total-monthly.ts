import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { STALE_TIME } from "@/shared/config/query-config";

interface UseSubscriptionsTotalMonthlyParams {
  baseCurrency: string;
}

export function useSubscriptionsTotalMonthly(
  params: UseSubscriptionsTotalMonthlyParams | "skip"
) {
  return useQuery({
    ...convexQuery(
      api.subscriptions.getTotalMonthly,
      params === "skip" ? "skip" : params
    ),
    staleTime: STALE_TIME.SEMI_STATIC,
  });
}
