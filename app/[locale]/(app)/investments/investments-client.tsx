"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Investments } from "@/components/investments";
import type {
  InvestmentsData,
  InvestmentsFilters,
} from "@/lib/types/investments";
import { pushModal, showConfirm } from "@/modals";
import { useTRPC } from "@/trpc/react";

interface InvestmentsClientProps {
  initialData: InvestmentsData;
  currency?: string;
  locale?: string;
}

export function InvestmentsClient({
  initialData,
  currency = "USD",
  locale = "en-US",
}: InvestmentsClientProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // Parse filters from URL params
  const filters: InvestmentsFilters = {
    assetType:
      (searchParams.get("assetType") as InvestmentsFilters["assetType"]) ||
      undefined,
    account: searchParams.get("account") || undefined,
    gainLossStatus:
      (searchParams.get(
        "gainLossStatus"
      ) as InvestmentsFilters["gainLossStatus"]) || undefined,
    search: searchParams.get("search") || undefined,
  };

  const { data: investmentsData = initialData } = useQuery(
    trpc.investments.getData.queryOptions(
      {
        filters,
      },
      {
        initialData,
        refetchOnMount: false,
      }
    )
  );

  const deleteInvestment = useMutation(
    trpc.investments.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.investments.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const updateValue = useMutation(
    trpc.investments.updateValue.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.investments.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const recordTransaction = useMutation(
    trpc.investments.recordTransaction.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.investments.getData.pathFilter());
        queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
      },
    })
  );

  const addPriceHistory = useMutation(
    trpc.investments.addPriceHistory.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.investments.getData.pathFilter());
      },
    })
  );

  const handleFilterChange = (newFilters: InvestmentsFilters) => {
    const params = new URLSearchParams();
    if (newFilters.assetType) params.set("assetType", newFilters.assetType);
    if (newFilters.account) params.set("account", newFilters.account);
    if (newFilters.gainLossStatus)
      params.set("gainLossStatus", newFilters.gainLossStatus);
    if (newFilters.search) params.set("search", newFilters.search);

    router.push(`/investments?${params.toString()}`);
  };

  const handleDeleteInvestment = (investmentId: string) => {
    showConfirm({
      title: "Delete Investment",
      description:
        "Are you sure you want to delete this investment? This action cannot be undone.",
      onConfirm: () => {
        deleteInvestment.mutate({ id: investmentId });
      },
    });
  };

  const handleUpdateValue = (investmentId: string) => {
    pushModal("investment-value", { investmentId });
  };

  const handleRecordTransaction = (investmentId: string) => {
    pushModal("investment-transaction", { investmentId });
  };

  const handleViewHistory = (investmentId: string) => {
    pushModal("investment-history", { investmentId });
  };

  return (
    <Investments
      currency={currency}
      data={investmentsData}
      filters={filters}
      locale={locale}
      onAddInvestment={() => pushModal("investments", {})}
      onDeleteInvestment={handleDeleteInvestment}
      onEditInvestment={(investmentId) =>
        pushModal("investments", { investmentId })
      }
      onFilterChange={handleFilterChange}
      onRecordTransaction={handleRecordTransaction}
      onSort={(column, direction) => {
        // Handle sorting - could update URL params or state
        console.log("Sort", column, direction);
      }}
      onUpdateValue={handleUpdateValue}
      onViewHistory={handleViewHistory}
    />
  );
}
