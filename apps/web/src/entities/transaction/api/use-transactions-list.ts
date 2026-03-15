import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { STALE_TIME } from "@/shared/config/query-config";
import type { TransactionType } from "../types/transaction-type";

interface UseTransactionsListParams {
  limit?: number;
  type?: TransactionType;
}

export function useTransactionsList(params: UseTransactionsListParams = {}) {
  return useQuery({
    ...convexQuery(api.transactions.list, params),
    staleTime: STALE_TIME.DYNAMIC,
  });
}
