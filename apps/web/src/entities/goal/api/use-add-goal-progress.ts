import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export function useAddGoalProgress() {
  return useMutation(api.goals.addProgress);
}
