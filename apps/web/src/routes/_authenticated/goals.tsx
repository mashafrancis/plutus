import { createFileRoute } from "@tanstack/react-router";

import { GoalsPage, GoalsPageSkeleton } from "@/pages/goals/ui/goals-page";

export const Route = createFileRoute("/_authenticated/goals")({
  component: GoalsPage,
  pendingComponent: GoalsPageSkeleton,
});
