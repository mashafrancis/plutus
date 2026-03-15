import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Process subscription renewals daily at midnight UTC
crons.daily(
  "process-subscription-renewals",
  { hourUTC: 0, minuteUTC: 0 },
  internal.cronHandlers.processSubscriptionRenewals
);

// Update exchange rates daily at 6 AM UTC
crons.daily(
  "update-exchange-rates",
  { hourUTC: 6, minuteUTC: 0 },
  internal.cronHandlers.updateExchangeRates
);

// Create investment snapshots daily at 11 PM UTC (end of trading day)
crons.daily(
  "create-investment-snapshots",
  { hourUTC: 23, minuteUTC: 0 },
  internal.cronHandlers.createInvestmentSnapshots
);

// Clean up old notifications weekly on Sunday at 3 AM UTC
crons.weekly(
  "cleanup-old-notifications",
  { dayOfWeek: "sunday", hourUTC: 3, minuteUTC: 0 },
  internal.cronHandlers.cleanupOldNotifications
);

export default crons;
