import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import { useMutation } from "convex/react";

export function useCreateGoal() {
  return useMutation(api.goals.create);
}
