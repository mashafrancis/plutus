"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatter";
import { popModal } from "@/modals";
import { ModalContent, ModalHeader } from "@/modals/common/container";
import { useTRPC } from "@/trpc/react";

interface InvestmentHistoryModalProps {
  readonly investmentId: string;
  readonly currency?: string;
  readonly locale?: string;
}

export default function InvestmentHistoryModal({
  investmentId,
  currency = "USD",
  locale = "en-US",
}: InvestmentHistoryModalProps) {
  const trpc = useTRPC();

  const { data: transactionHistory = [], isLoading } = useQuery(
    trpc.investments.getTransactionHistory.queryOptions({
      investmentId,
    })
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  const getTypeBadge = (type: string) => {
    if (type === "buy") {
      return (
        <Badge
          className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
          variant="outline"
        >
          Buy
        </Badge>
      );
    }
    if (type === "sell") {
      return (
        <Badge
          className="border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
          variant="outline"
        >
          Sell
        </Badge>
      );
    }
    return <Badge variant="outline">{type}</Badge>;
  };

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text="View transaction history for this investment"
        title="Transaction History"
      />
      <div className="flex flex-col gap-4 p-6">
        {isLoading && (
          <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
            Loading transaction history...
          </div>
        )}
        {!isLoading && transactionHistory.length === 0 && (
          <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
            No transaction history yet. Transactions will appear here once
            recorded.
          </div>
        )}
        {!isLoading && transactionHistory.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <td className="px-4 py-3">
                      <span className="text-neutral-900 dark:text-neutral-100">
                        {formatDate(transaction.date)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {getTypeBadge(transaction.type)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-neutral-900 dark:text-neutral-100">
                        {transaction.shares.toLocaleString(undefined, {
                          maximumFractionDigits: 4,
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-neutral-900 dark:text-neutral-100">
                        {formatCurrency({
                          value: transaction.price,
                          currency,
                          locale,
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {formatCurrency({
                          value: transaction.total,
                          currency,
                          locale,
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={() => popModal()} type="button" variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </ModalContent>
  );
}
