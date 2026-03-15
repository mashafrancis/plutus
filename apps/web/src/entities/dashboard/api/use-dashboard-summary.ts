import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { STALE_TIME } from "@/shared/config/query-config";

interface UseDashboardSummaryParams {
  days: number;
  baseCurrency: string;
}

export function useDashboardSummary(
  params: UseDashboardSummaryParams | "skip"
) {
  return useQuery({
    ...convexQuery(
      api.dashboard.getSummary,
      params === "skip" ? "skip" : params
    ),
    staleTime: STALE_TIME.DYNAMIC,
  });
}
