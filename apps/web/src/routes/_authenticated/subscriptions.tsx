import { createFileRoute } from "@tanstack/react-router";

import {
  SubscriptionsPage,
  SubscriptionsPageSkeleton,
} from "@/pages/subscriptions/ui/subscriptions-page";

export const Route = createFileRoute("/_authenticated/subscriptions")({
  component: SubscriptionsPage,
  pendingComponent: SubscriptionsPageSkeleton,
});
