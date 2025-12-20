import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { RuntimeServer } from "@/lib/runtime-server";
import type { InvestmentsData } from "@/lib/types/investments";
import { InvestmentsService } from "@/server/data-access/investments/investments.service";
import { InvestmentsClient } from "./investments-client";

export const metadata: Metadata = {
  title: "Investments",
  description: "Track and manage your investment portfolio",
};

export default async function InvestmentsPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const userId = session.user.id;

  // Fetch initial investments data
  const investmentsService = await InvestmentsService.pipe(
    RuntimeServer.runPromise
  );
  const [investments, summaryMetrics, filterOptions, chartData] =
    await Promise.all([
      investmentsService
        .getInvestmentsWithFilters({ userId })
        .pipe(RuntimeServer.runPromise),
      investmentsService
        .getSummaryMetrics({ userId })
        .pipe(RuntimeServer.runPromise),
      investmentsService
        .getFilterOptions({ userId })
        .pipe(RuntimeServer.runPromise),
      investmentsService
        .getChartData({ userId })
        .pipe(RuntimeServer.runPromise),
    ]);

  const investmentsData: InvestmentsData = {
    summaryMetrics,
    investments,
    filterOptions,
    chartData,
  };

  // Get user currency and locale
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { currency: true, locale: true },
  });

  const currency = user?.currency || "USD";
  const locale = user?.locale || "en-US";

  return (
    <InvestmentsClient
      currency={currency}
      initialData={investmentsData}
      locale={locale}
    />
  );
}
