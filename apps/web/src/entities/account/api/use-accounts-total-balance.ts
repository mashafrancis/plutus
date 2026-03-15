import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { STALE_TIME } from "@/shared/config/query-config";

interface UseAccountsTotalBalanceParams {
  baseCurrency: string;
}

export function useAccountsTotalBalance(
  params: UseAccountsTotalBalanceParams | "skip"
) {
  return useQuery({
    ...convexQuery(
      api.accounts.getTotalBalance,
      params === "skip" ? "skip" : params
    ),
    staleTime: STALE_TIME.SEMI_STATIC,
  });
}
