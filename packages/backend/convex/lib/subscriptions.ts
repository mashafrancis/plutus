import type { Doc } from "../_generated/dataModel";
import { calculateNextRenewalDate, daysBetween } from "./dates";

export type SubscriptionFrequency =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly";

/**
 * Check if subscription is due for renewal
 */
export const isDueForRenewal = (
  subscription: Doc<"subscriptions">
): boolean => {
  return (
    subscription.status === "active" &&
    subscription.autoRenew &&
    subscription.nextRenewalDate <= Date.now()
  );
};

/**
 * Check if subscription should send notification
 */
export const shouldNotify = (subscription: Doc<"subscriptions">): boolean => {
  if (subscription.status !== "active") {
    return false;
  }

  const daysUntilRenewal = daysBetween(
    Date.now(),
    subscription.nextRenewalDate
  );

  return daysUntilRenewal <= subscription.notifyDaysBefore;
};

/**
 * Get display frequency text
 */
export const getFrequencyText = (frequency: SubscriptionFrequency): string => {
  const texts: Record<SubscriptionFrequency, string> = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  };
  return texts[frequency];
};

/**
 * Calculate annual cost of subscription
 */
export const calculateAnnualCost = (
  amount: number,
  frequency: SubscriptionFrequency
): number => {
  const multipliers: Record<SubscriptionFrequency, number> = {
    daily: 365,
    weekly: 52,
    monthly: 12,
    quarterly: 4,
    yearly: 1,
  };
  return amount * multipliers[frequency];
};

/**
 * Get next N renewal dates
 */
export const getNextRenewalDates = (
  startDate: number,
  frequency: SubscriptionFrequency,
  count: number
): number[] => {
  const dates: number[] = [];
  let currentDate = startDate;

  for (let i = 0; i < count; i++) {
    currentDate = calculateNextRenewalDate(currentDate, frequency);
    dates.push(currentDate);
  }

  return dates;
};
