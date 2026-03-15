import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";

export type SubscriptionId = Id<"subscriptions">;
export type SubscriptionStatus = "active" | "paused" | "cancelled";
export type SubscriptionFrequency =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly";
