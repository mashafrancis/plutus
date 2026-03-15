import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export function useCreateSubscription() {
  return useMutation(api.subscriptions.create);
}
