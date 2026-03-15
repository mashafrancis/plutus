import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";

export type AccountId = Id<"accounts">;
export type AccountType =
  | "checking"
  | "savings"
  | "credit"
  | "cash"
  | "investment";
