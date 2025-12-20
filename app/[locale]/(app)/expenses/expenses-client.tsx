"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Expenses } from "@/components/expenses";
import type { ExpensesData, ExpensesFilters } from "@/lib/types/expenses";
import { pushModal } from "@/modals";
import { useTRPC } from "@/trpc/react";

interface ExpensesClientProps {
  initialData: ExpensesData;
  currency?: string;
  locale?: string;
}

export function ExpensesClient({
  initialData,
  currency = "USD",
  locale = "en-US",
}: ExpensesClientProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // Parse filters from URL params
  const filters: ExpensesFilters = {
    category: searchParams.get("category") || undefined,
    account: searchParams.get("account") || undefined,
    tags: searchParams.get("tags")
      ? searchParams.get("tags")!.split(",")
      : undefined,
    search: searchParams.get("search") || undefined,
    recurring:
      (searchParams.get("recurring") as ExpensesFilters["recurring"]) ||
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

  const { data: expensesData = initialData } = useQuery(
    trpc.expenses.getData.queryOptions(
      {
        filters,
      },
      {
        initialData,
        refetchOnMount: false,
      }
    )
  );

  const deleteExpense = useMutation(
    trpc.expenses.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.expenses.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const bulkDelete = useMutation(
    trpc.expenses.bulkDelete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.expenses.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const bulkUpdateCategory = useMutation(
    trpc.expenses.bulkUpdateCategory.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.expenses.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const bulkAddTags = useMutation(
    trpc.expenses.bulkAddTags.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.expenses.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const handleFilterChange = (newFilters: ExpensesFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set("category", newFilters.category);
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

    router.push(`/expenses?${params.toString()}`);
  };

  const handleBulkAction = (
    action: "delete" | "changeCategory" | "addTags",
    expenseIds: string[],
    data?: any
  ) => {
    if (action === "delete") {
      if (
        confirm(
          `Are you sure you want to delete ${expenseIds.length} expense(s)?`
        )
      ) {
        bulkDelete.mutate({ expenseIds });
      }
    } else if (action === "changeCategory" && data?.category) {
      bulkUpdateCategory.mutate({
        expenseIds,
        category: data.category,
      });
    } else if (action === "addTags" && data?.tagIds) {
      bulkAddTags.mutate({
        expenseIds,
        tagIds: data.tagIds,
      });
    }
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      deleteExpense.mutate({ id: expenseId });
    }
  };

  return (
    <Expenses
      currency={currency}
      data={expensesData}
      filters={filters}
      locale={locale}
      onAddExpense={() => pushModal("expenses", {})}
      onBulkAction={handleBulkAction}
      onDeleteExpense={handleDeleteExpense}
      onEditExpense={(expenseId) => pushModal("expenses", { expenseId })}
      onFilterChange={handleFilterChange}
      onSelectionChange={(ids) => {
        // Selection state managed internally by Expenses component
      }}
      onSort={(column, direction) => {
        // Handle sorting - could update URL params or state
        console.log("Sort", column, direction);
      }}
    />
  );
}
