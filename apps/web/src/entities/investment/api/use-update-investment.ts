import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export function useUpdateInvestment() {
  return useMutation(api.investments.update);
}
