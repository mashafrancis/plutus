import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";

export type InvestmentId = Id<"investments">;
export type InvestmentType =
  | "stock"
  | "etf"
  | "crypto"
  | "mutual_fund"
  | "bond"
  | "real_estate"
  | "other";
