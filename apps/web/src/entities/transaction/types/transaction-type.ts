import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";

export type TransactionType = "expense" | "income" | "transfer";
export type TransactionId = Id<"transactions">;
