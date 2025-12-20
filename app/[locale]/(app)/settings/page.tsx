import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { RuntimeServer } from "@/lib/runtime-server";
import type { SettingsData } from "@/lib/types/settings";
import { SettingsService } from "@/server/data-access/settings/settings.service";
import { SettingsClient } from "./settings-client";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings, preferences, and data",
};

export default async function SettingsPage() {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  const userId = session.user.id;

  // Fetch initial settings data
  const settingsService = await SettingsService.pipe(RuntimeServer.runPromise);
  const [accounts, categories, tags, budgets, preferences, profile] =
    await Promise.all([
      settingsService.getAccounts({ userId }).pipe(RuntimeServer.runPromise),
      settingsService.getCategories({ userId }).pipe(RuntimeServer.runPromise),
      settingsService.getTags({ userId }).pipe(RuntimeServer.runPromise),
      settingsService.getBudgets({ userId }).pipe(RuntimeServer.runPromise),
      settingsService.getPreferences({ userId }).pipe(RuntimeServer.runPromise),
      settingsService.getProfile({ userId }).pipe(RuntimeServer.runPromise),
    ]);

  const settingsData: SettingsData = {
    accounts,
    categories,
    tags,
    budgets,
    preferences,
    profile,
  };

  // Get user currency and locale
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { currency: true, locale: true },
  });

  const currency = user?.currency || "USD";
  const locale = user?.locale || "en-US";

  return (
    <SettingsClient
      currency={currency}
      initialData={settingsData}
      locale={locale}
    />
  );
}
