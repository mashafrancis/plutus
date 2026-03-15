import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export function useDeleteTransaction() {
  return useMutation(api.transactions.remove);
}
