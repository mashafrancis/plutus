import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { RuntimeServer } from "@/lib/runtime-server";
import type { SubscriptionsData } from "@/lib/types/subscriptions";
import { SubscriptionsService } from "@/server/data-access/subscriptions/subscriptions.service";
import { SubscriptionsClient } from "./subscriptions-client";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Track and manage your subscriptions",
};

export default async function SubscriptionsPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const userId = session.user.id;

  // Fetch initial subscriptions data
  const subscriptionsService = await SubscriptionsService.pipe(
    RuntimeServer.runPromise
  );
  const [subscriptions, summaryMetrics, filterOptions] = await Promise.all([
    subscriptionsService
      .getSubscriptionsWithFilters({ userId, dateRange: undefined })
      .pipe(RuntimeServer.runPromise),
    subscriptionsService
      .getSummaryMetrics({ userId, dateRange: undefined })
      .pipe(RuntimeServer.runPromise),
    subscriptionsService
      .getFilterOptions({ userId })
      .pipe(RuntimeServer.runPromise),
  ]);

  const subscriptionsData: SubscriptionsData = {
    summaryMetrics,
    subscriptions,
    filterOptions,
  };

  // Get user currency and locale
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { currency: true, locale: true },
  });

  const currency = user?.currency || "USD";
  const locale = user?.locale || "en-US";

  return (
    <SubscriptionsClient
      currency={currency}
      initialData={subscriptionsData}
      locale={locale}
    />
  );
}
