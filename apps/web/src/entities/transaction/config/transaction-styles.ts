import type { TransactionType } from "../types/transaction-type";

export const TRANSACTION_STYLES: Record<
  TransactionType,
  { bg: string; text: string }
> = {
  income: { bg: "bg-green-500/10 text-green-500", text: "text-green-500" },
  transfer: { bg: "bg-blue-500/10 text-blue-500", text: "text-blue-500" },
  expense: { bg: "bg-red-500/10 text-red-500", text: "text-red-500" },
};
