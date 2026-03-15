import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export function useUpdateAccount() {
  return useMutation(api.accounts.update);
}
