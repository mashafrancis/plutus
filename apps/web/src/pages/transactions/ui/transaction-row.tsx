import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { DotsThreeIcon, PencilSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";

import {
  getTransactionBgClass,
  getTransactionTextClass,
} from "@/entities/transaction/lib/get-transaction-style";
import { TransactionIcon } from "@/entities/transaction/ui/transaction-icon";
import { DeleteTransactionButton } from "@/features/delete-transaction/ui/delete-transaction-button";
import { EditTransactionDialog } from "@/features/edit-transaction/ui/edit-transaction-dialog";
import { formatCurrency } from "@/shared/lib/format/currency";
import { formatDate } from "@/shared/lib/format/date";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";

interface TransactionRowProps {
  transaction: {
    _id: Id<"transactions">;
    type: "expense" | "income" | "transfer";
    description: string;
    amount: number;
    currency: string;
    date: number;
    categoryId: Id<"categories">;
  };
  account?: { name: string };
  category?: { name: string; icon: string; color: string };
  categories: Array<{
    _id: Id<"categories">;
    name: string;
    icon: string;
    type: "expense" | "income";
  }>;
}

export function TransactionRow({
  transaction,
  account,
  category,
  categories,
}: TransactionRowProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${getTransactionBgClass(transaction.type)}`}
            >
              <TransactionIcon type={transaction.type} />
            </div>
            <span className="font-medium">{transaction.description}</span>
          </div>
        </TableCell>
        <TableCell>
          {category && (
            <div className="flex items-center gap-2">
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </div>
          )}
        </TableCell>
        <TableCell>{account?.name || "Unknown"}</TableCell>
        <TableCell>{formatDate(transaction.date)}</TableCell>
        <TableCell className="text-right">
          <span className={getTransactionTextClass(transaction.type)}>
            {transaction.type === "income" ? "+" : "-"}
            {formatCurrency(transaction.amount, transaction.currency)}
          </span>
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Transaction options" size="icon" variant="ghost">
                <DotsThreeIcon weight="bold" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                <PencilSimpleIcon weight="bold" className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DeleteTransactionButton transactionId={transaction._id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <EditTransactionDialog
        categories={categories}
        onOpenChange={setEditDialogOpen}
        open={editDialogOpen}
        transaction={transaction}
      />
    </>
  );
}
