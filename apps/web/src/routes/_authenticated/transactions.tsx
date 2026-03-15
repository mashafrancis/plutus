import { createFileRoute } from "@tanstack/react-router";

import {
  TransactionsPage,
  TransactionsPageSkeleton,
} from "@/pages/transactions/ui/transactions-page";

export const Route = createFileRoute("/_authenticated/transactions")({
  component: TransactionsPage,
  pendingComponent: TransactionsPageSkeleton,
});
