import { TRANSACTION_STYLES } from "../config/transaction-styles";
import type { TransactionType } from "../types/transaction-type";

export function getTransactionBgClass(type: TransactionType): string {
  return TRANSACTION_STYLES[type].bg;
}

export function getTransactionTextClass(type: TransactionType): string {
  return TRANSACTION_STYLES[type].text;
}
