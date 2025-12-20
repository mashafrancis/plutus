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

interface PaymentHistoryModalProps {
  readonly subscriptionId: string;
  readonly currency?: string;
  readonly locale?: string;
}

export default function PaymentHistoryModal({
  subscriptionId,
  currency = "USD",
  locale = "en-US",
}: PaymentHistoryModalProps) {
  const trpc = useTRPC();

  const { data: paymentHistory = [], isLoading } = useQuery(
    trpc.subscriptions.getPaymentHistory.queryOptions({
      subscriptionId,
    })
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge
            className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
            variant="outline"
          >
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge
            className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
            variant="outline"
          >
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge
            className="border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            variant="outline"
          >
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ModalContent>
      <ModalHeader
        className="items-start justify-start"
        text="View payment history for this subscription"
        title="Payment History"
      />
      <div className="flex flex-col gap-4 p-6">
        {isLoading && (
          <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
            Loading payment history...
          </div>
        )}
        {!isLoading && paymentHistory.length === 0 && (
          <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
            No payment history yet. Payments will appear here once recorded.
          </div>
        )}
        {!isLoading && paymentHistory.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <td className="px-4 py-3">
                      <span className="text-neutral-900 dark:text-neutral-100">
                        {formatDate(payment.date)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {formatCurrency({
                          value: payment.amount,
                          currency,
                          locale,
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(payment.status)}
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
