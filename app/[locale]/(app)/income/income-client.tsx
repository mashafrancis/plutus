"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Income } from "@/components/income";
import type { IncomeData, IncomeFilters } from "@/lib/types/income";
import { pushModal } from "@/modals";
import { useTRPC } from "@/trpc/react";

interface IncomeClientProps {
  initialData: IncomeData;
  currency?: string;
  locale?: string;
}

export function IncomeClient({
  initialData,
  currency = "USD",
  locale = "en-US",
}: IncomeClientProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // Parse filters from URL params
  const filters: IncomeFilters = {
    source: searchParams.get("source") || undefined,
    account: searchParams.get("account") || undefined,
    tags: searchParams.get("tags")
      ? searchParams.get("tags")!.split(",")
      : undefined,
    search: searchParams.get("search") || undefined,
    recurring:
      (searchParams.get("recurring") as IncomeFilters["recurring"]) ||
      undefined,
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

  const { data: incomeData = initialData } = useQuery(
    trpc.income.getData.queryOptions(
      {
        filters,
      },
      {
        initialData,
        refetchOnMount: false,
      }
    )
  );

  const deleteIncome = useMutation(
    trpc.income.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.income.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const bulkDelete = useMutation(
    trpc.income.bulkDelete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.income.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const bulkUpdateSource = useMutation(
    trpc.income.bulkUpdateSource.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.income.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const bulkAddTags = useMutation(
    trpc.income.bulkAddTags.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.income.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const handleFilterChange = (newFilters: IncomeFilters) => {
    const params = new URLSearchParams();
    if (newFilters.source) params.set("source", newFilters.source);
    if (newFilters.account) params.set("account", newFilters.account);
    if (newFilters.tags && newFilters.tags.length > 0)
      params.set("tags", newFilters.tags.join(","));
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.recurring && newFilters.recurring !== "all")
      params.set("recurring", newFilters.recurring);
    if (newFilters.amountRange?.min)
      params.set("min", newFilters.amountRange.min.toString());
    if (newFilters.amountRange?.max)
      params.set("max", newFilters.amountRange.max.toString());

    router.push(`/income?${params.toString()}`);
  };

  const handleBulkAction = (
    action: "delete" | "changeSource" | "addTags",
    incomeIds: string[],
    data?: any
  ) => {
    if (action === "delete") {
      if (
        confirm(
          `Are you sure you want to delete ${incomeIds.length} income entry/entries?`
        )
      ) {
        bulkDelete.mutate({ incomeIds });
      }
    } else if (action === "changeSource" && data?.source) {
      bulkUpdateSource.mutate({
        incomeIds,
        source: data.source,
      });
    } else if (action === "addTags" && data?.tagIds) {
      bulkAddTags.mutate({
        incomeIds,
        tagIds: data.tagIds,
      });
    }
  };

  const handleDeleteIncome = (incomeId: string) => {
    if (confirm("Are you sure you want to delete this income entry?")) {
      deleteIncome.mutate({ id: incomeId });
    }
  };

  return (
    <Income
      currency={currency}
      data={incomeData}
      filters={filters}
      locale={locale}
      onAddIncome={() => pushModal("income", {})}
      onBulkAction={handleBulkAction}
      onDeleteIncome={handleDeleteIncome}
      onEditIncome={(incomeId) => pushModal("income", { incomeId })}
      onFilterChange={handleFilterChange}
      onSelectionChange={(ids) => {
        // Selection state managed internally by Income component
      }}
      onSort={(column, direction) => {
        // Handle sorting - could update URL params or state
        console.log("Sort", column, direction);
      }}
    />
  );
}
