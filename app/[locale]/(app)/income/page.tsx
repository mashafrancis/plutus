import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { RuntimeServer } from "@/lib/runtime-server";
import type { IncomeData } from "@/lib/types/income";
import { IncomeService } from "@/server/data-access/income/income.service";
import { IncomeClient } from "./income-client";

export const metadata: Metadata = {
  title: "Income",
  description: "Track and manage your income",
};

export default async function IncomePage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const userId = session.user.id;

  // Fetch initial income data
  const incomeService = await IncomeService.pipe(RuntimeServer.runPromise);
  const [income, summaryMetrics, filterOptions] = await Promise.all([
    incomeService
      .getIncomeWithFilters({ userId, dateRange: undefined })
      .pipe(RuntimeServer.runPromise),
    incomeService
      .getSummaryMetrics({ userId, dateRange: undefined })
      .pipe(RuntimeServer.runPromise),
    incomeService.getFilterOptions({ userId }).pipe(RuntimeServer.runPromise),
  ]);

  const incomeData: IncomeData = {
    summaryMetrics,
    income,
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
    <IncomeClient
      currency={currency}
      initialData={incomeData}
      locale={locale}
    />
  );
}
