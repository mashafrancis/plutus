import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export function usePauseSubscription() {
  return useMutation(api.subscriptions.pause);
}

export function useResumeSubscription() {
  return useMutation(api.subscriptions.resume);
}

export function useCancelSubscription() {
  return useMutation(api.subscriptions.cancel);
}
