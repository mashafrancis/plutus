import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { RuntimeServer } from "@/lib/runtime-server";
import type { ExpensesData } from "@/lib/types/expenses";
import { ExpensesService } from "@/server/data-access/expenses/expenses.service";
import { ExpensesClient } from "./expenses-client";

export const metadata: Metadata = {
  title: "Expenses",
  description: "Track and manage your expenses",
};

export default async function ExpensesPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const userId = session.user.id;

  // Fetch initial expenses data
  const expensesService = await ExpensesService.pipe(RuntimeServer.runPromise);
  const expensesData: ExpensesData = await expensesService
    .getData({ userId, filters: {}, dateRange: undefined })
    .pipe(RuntimeServer.runPromise);

  // Get user currency and locale
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { currency: true, locale: true },
  });

  const currency = user?.currency || "USD";
  const locale = user?.locale || "en-US";

  return (
    <ExpensesClient
      currency={currency}
      initialData={expensesData}
      locale={locale}
    />
  );
}
