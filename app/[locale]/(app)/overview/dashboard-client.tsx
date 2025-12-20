"use client";

import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/dashboard";
import type { DashboardData, Timeframe } from "@/lib/types/dashboard";
import { pushModal } from "@/modals";
import { trpc } from "@/trpc/react";

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
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data: dashboardData = initialData } = trpc.dashboard.getData.useQuery(
    { timeframe },
    {
      initialData,
      refetchOnMount: false,
    }
  );

  const dismissInsight = trpc.dashboard.dismissInsight.useMutation({
    onSuccess: () => {
      utils.dashboard.getData.invalidate();
    },
  });

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
