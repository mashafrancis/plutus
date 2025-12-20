"use client";;
import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/dashboard";
import type { DashboardData, Timeframe } from "@/lib/types/dashboard";
import { pushModal } from "@/modals";
import { useTRPC } from "@/trpc/react";

import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface DashboardClientProps {
  initialData: DashboardData;
  currency?: string;
  locale?: string;
  timeframe?: Timeframe;
}

export function DashboardClient({
  initialData,
  currency = "USD",
  locale = "en-US",
  timeframe = "month",
}: DashboardClientProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: dashboardData = initialData } = useQuery(trpc.dashboard.getData.queryOptions(
    { timeframe },
    {
      initialData,
      refetchOnMount: false,
    }
  ));

  const dismissInsight = useMutation(trpc.dashboard.dismissInsight.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.dashboard.getData.pathFilter());
    },
  }));

  return (
    <Dashboard
      currency={currency}
      data={dashboardData}
      locale={locale}
      onAddExpense={() => pushModal("expenses", {})}
      onAddIncome={() => pushModal("income", {})}
      onDismissInsight={(insightId) => {
        dismissInsight.mutate({ insightId });
      }}
      onTimeframeChange={(newTimeframe) => {
        router.push(`/overview?timeframe=${newTimeframe}`);
      }}
      onViewBudget={(category) => {
        router.push(`/settings?tab=budgets&category=${category}`);
      }}
      onViewCategory={(category) => {
        router.push(`/expenses?category=${encodeURIComponent(category)}`);
      }}
      onViewReports={() => {
        router.push("/reports");
      }}
      onViewSubscription={(subscriptionId) => {
        router.push(`/subscriptions?id=${subscriptionId}`);
      }}
      onViewTransaction={(transactionId) => {
        router.push(`/expenses?id=${transactionId}`);
      }}
      timeframe={timeframe}
    />
  );
}
