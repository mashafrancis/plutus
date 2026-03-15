import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { STALE_TIME } from "@/shared/config/query-config";

interface UseInvestmentsPortfolioParams {
  baseCurrency: string;
}

export function useInvestmentsPortfolio(
  params: UseInvestmentsPortfolioParams | "skip"
) {
  return useQuery({
    ...convexQuery(
      api.investments.getPortfolioSummary,
      params === "skip" ? "skip" : params
    ),
    staleTime: STALE_TIME.DYNAMIC,
  });
}
