/**
 * Query staleTime constants for TanStack Query with Convex.
 * These control how long cached data is considered "fresh" before refetching.
 */
export const STALE_TIME = {
  /**
   * Rarely changes - settings, categories, user profile
   * 10 minutes
   */
  STATIC: 10 * 60 * 1000,

  /**
   * Changes occasionally - accounts, goals, subscriptions
   * 5 minutes
   */
  SEMI_STATIC: 5 * 60 * 1000,

  /**
   * Changes frequently - transactions, dashboard summaries, notifications
   * 1 minute
   */
  DYNAMIC: 60 * 1000,

  /**
   * Real-time data - activity feed
   * Always fetch fresh
   */
  REALTIME: 0,
} as const;
