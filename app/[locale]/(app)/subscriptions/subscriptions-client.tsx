"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Subscriptions } from "@/components/subscriptions";
import type {
  SubscriptionsData,
  SubscriptionsFilters,
} from "@/lib/types/subscriptions";
import { pushModal } from "@/modals";
import { useTRPC } from "@/trpc/react";

interface SubscriptionsClientProps {
  initialData: SubscriptionsData;
  currency?: string;
  locale?: string;
}

export function SubscriptionsClient({
  initialData,
  currency = "USD",
  locale = "en-US",
}: SubscriptionsClientProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // Parse filters from URL params
  const filters: SubscriptionsFilters = {
    category: searchParams.get("category") || undefined,
    status:
      (searchParams.get("status") as SubscriptionsFilters["status"]) ||
      undefined,
    billingCycle:
      (searchParams.get(
        "billingCycle"
      ) as SubscriptionsFilters["billingCycle"]) || undefined,
    search: searchParams.get("search") || undefined,
    amountRange:
      searchParams.get("min") || searchParams.get("max")
        ? {
            min: searchParams.get("min")
              ? Number.parseFloat(searchParams.get("min")!)
              : undefined,
            max: searchParams.get("max")
              ? Number.parseFloat(searchParams.get("max")!)
              : undefined,
          }
        : undefined,
  };

  const { data: subscriptionsData = initialData } = useQuery(
    trpc.subscriptions.getData.queryOptions(
      {
        filters,
      },
      {
        initialData,
        refetchOnMount: false,
      }
    )
  );

  const pauseSubscription = useMutation(
    trpc.subscriptions.pause.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.subscriptions.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const resumeSubscription = useMutation(
    trpc.subscriptions.resume.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.subscriptions.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const cancelSubscription = useMutation(
    trpc.subscriptions.cancel.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.subscriptions.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const bulkPause = useMutation(
    trpc.subscriptions.bulkPause.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.subscriptions.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const bulkCancel = useMutation(
    trpc.subscriptions.bulkCancel.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.subscriptions.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const bulkChangeCategory = useMutation(
    trpc.subscriptions.bulkChangeCategory.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.subscriptions.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const handleFilterChange = (newFilters: SubscriptionsFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.status) params.set("status", newFilters.status);
    if (newFilters.billingCycle)
      params.set("billingCycle", newFilters.billingCycle);
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.amountRange?.min)
      params.set("min", newFilters.amountRange.min.toString());
    if (newFilters.amountRange?.max)
      params.set("max", newFilters.amountRange.max.toString());

    router.push(`/subscriptions?${params.toString()}`);
  };

  const handleBulkAction = (
    action: "pause" | "cancel" | "changeCategory",
    subscriptionIds: string[],
    data?: any
  ) => {
    if (action === "pause") {
      bulkPause.mutate({ subscriptionIds });
    } else if (action === "cancel") {
      if (
        confirm(
          `Are you sure you want to cancel ${subscriptionIds.length} subscription/subscriptions?`
        )
      ) {
        bulkCancel.mutate({ subscriptionIds });
      }
    } else if (action === "changeCategory" && data?.category) {
      bulkChangeCategory.mutate({
        subscriptionIds,
        category: data.category,
      });
    }
  };

  const handlePauseSubscription = (subscriptionId: string) => {
    pauseSubscription.mutate({ id: subscriptionId });
  };

  const handleResumeSubscription = (subscriptionId: string) => {
    resumeSubscription.mutate({ id: subscriptionId });
  };

  const handleCancelSubscription = (subscriptionId: string) => {
    if (confirm("Are you sure you want to cancel this subscription?")) {
      cancelSubscription.mutate({ id: subscriptionId });
    }
  };

  return (
    <Subscriptions
      currency={currency}
      data={subscriptionsData}
      filters={filters}
      locale={locale}
      onAddSubscription={() => pushModal("subscriptions", {})}
      onBulkAction={handleBulkAction}
      onCancelSubscription={handleCancelSubscription}
      onEditSubscription={(subscriptionId) =>
        pushModal("subscriptions", { subscriptionId })
      }
      onFilterChange={handleFilterChange}
      onPauseSubscription={handlePauseSubscription}
      onResumeSubscription={handleResumeSubscription}
      onSelectionChange={(ids) => {
        // Selection state managed internally by Subscriptions component
      }}
      onSort={(column, direction) => {
        // Handle sorting - could update URL params or state
        console.log("Sort", column, direction);
      }}
      onViewHistory={(subscriptionId) =>
        pushModal("payment-history", { subscriptionId })
      }
    />
  );
}
