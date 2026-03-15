import {
  ArrowDownRightIcon,
  ArrowsClockwiseIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import type { TransactionType } from "../types/transaction-type";

export function TransactionIcon({ type }: { type: TransactionType }) {
  switch (type) {
    case "income":
      return <ArrowUpRightIcon className="h-4 w-4" />;
    case "transfer":
      return <ArrowsClockwiseIcon className="h-4 w-4" weight="bold" />;
    default:
      return <ArrowDownRightIcon className="h-4 w-4" />;
  }
}
