import { createFileRoute } from "@tanstack/react-router";

import {
  AccountsPage,
  AccountsPageSkeleton,
} from "@/pages/accounts/ui/accounts-page";

export const Route = createFileRoute("/_authenticated/accounts")({
  component: AccountsPage,
  pendingComponent: AccountsPageSkeleton,
});
