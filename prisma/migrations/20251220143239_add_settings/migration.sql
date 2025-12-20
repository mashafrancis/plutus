-- AlterTable
ALTER TABLE "budget" ADD COLUMN     "recurringEnabled" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'system',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "dateFormat" TEXT NOT NULL DEFAULT 'MM/DD/YYYY',
    "emailNotificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "emailBudgetAlerts" BOOLEAN NOT NULL DEFAULT true,
    "emailSubscriptionReminders" BOOLEAN NOT NULL DEFAULT true,
    "emailWeeklySummary" BOOLEAN NOT NULL DEFAULT false,
    "emailMonthlyReport" BOOLEAN NOT NULL DEFAULT true,
    "inAppNotificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "inAppBudgetAlerts" BOOLEAN NOT NULL DEFAULT true,
    "inAppSubscriptionReminders" BOOLEAN NOT NULL DEFAULT true,
    "inAppInsights" BOOLEAN NOT NULL DEFAULT true,
    "subscriptionReminderDays" INTEGER NOT NULL DEFAULT 3,
    "enabledInsights" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "preferences_userId_key" ON "preferences"("userId");

-- AddForeignKey
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
