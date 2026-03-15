import { createFileRoute } from "@tanstack/react-router";

import {
  InvestmentsPage,
  InvestmentsPageSkeleton,
} from "@/pages/investments/ui/investments-page";

export const Route = createFileRoute("/_authenticated/investments")({
  component: InvestmentsPage,
  pendingComponent: InvestmentsPageSkeleton,
});
