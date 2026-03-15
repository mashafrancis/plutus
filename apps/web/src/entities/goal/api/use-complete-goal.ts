import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export function useCompleteGoal() {
  return useMutation(api.goals.markComplete);
}
