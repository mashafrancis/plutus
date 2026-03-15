/**
 * Get start of day timestamp (midnight UTC)
 */
export const startOfDay = (timestamp: number): number => {
  const date = new Date(timestamp);
  date.setUTCHours(0, 0, 0, 0);
  return date.getTime();
};

/**
 * Get end of day timestamp (23:59:59.999 UTC)
 */
export const endOfDay = (timestamp: number): number => {
  const date = new Date(timestamp);
  date.setUTCHours(23, 59, 59, 999);
  return date.getTime();
};

/**
 * Get timestamp for N days ago
 */
export const daysAgo = (days: number, from: number = Date.now()): number => {
  return from - days * 24 * 60 * 60 * 1000;
};

/**
 * Get timestamp for N days in the future
 */
export const daysFromNow = (
  days: number,
  from: number = Date.now()
): number => {
  return from + days * 24 * 60 * 60 * 1000;
};

/**
 * Calculate next renewal date based on frequency
 */
export const calculateNextRenewalDate = (
  currentDate: number,
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
): number => {
  const date = new Date(currentDate);

  switch (frequency) {
    case "daily":
      date.setDate(date.getDate() + 1);
      break;
    case "weekly":
      date.setDate(date.getDate() + 7);
      break;
    case "monthly":
      date.setMonth(date.getMonth() + 1);
      break;
    case "quarterly":
      date.setMonth(date.getMonth() + 3);
      break;
    case "yearly":
      date.setFullYear(date.getFullYear() + 1);
      break;
    default: {
      const _exhaustive: never = frequency;
      throw new Error(`Unknown frequency: ${_exhaustive}`);
    }
  }

  return date.getTime();
};

/**
 * Check if a date is within range
 */
export const isWithinRange = (
  date: number,
  startDate: number,
  endDate: number
): boolean => {
  return date >= startDate && date <= endDate;
};

/**
 * Get date range for last N days
 */
export const getLastNDaysRange = (
  days: number
): { start: number; end: number } => {
  const now = Date.now();
  return {
    start: startOfDay(daysAgo(days - 1, now)),
    end: endOfDay(now),
  };
};

/**
 * Format date as YYYY-MM-DD
 */
export const formatDateISO = (timestamp: number): string => {
  const isoStr = new Date(timestamp).toISOString();
  return isoStr.substring(0, isoStr.indexOf("T"));
};

/**
 * Format date for display
 */
export const formatDate = (
  timestamp: number,
  options?: Intl.DateTimeFormatOptions
): string => {
  return new Date(timestamp).toLocaleDateString(
    "en-US",
    options ?? {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
};

/**
 * Get day difference between two dates
 */
export const daysBetween = (date1: number, date2: number): number => {
  const diff = Math.abs(date2 - date1);
  return Math.floor(diff / (24 * 60 * 60 * 1000));
};
