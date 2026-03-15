import { TrashIcon } from "@phosphor-icons/react";
import { api } from "@tanstack-effect-convex/backend/convex/_generated/api";
import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface DeleteTransactionButtonProps {
  transactionId: Id<"transactions">;
}

export function DeleteTransactionButton({
  transactionId,
}: DeleteTransactionButtonProps) {
  const removeTransaction = useMutation(api.transactions.remove);

  const handleDelete = async () => {
    try {
      await removeTransaction({ id: transactionId });
      toast.success("Transaction deleted");
    } catch {
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <DropdownMenuItem
      className="text-destructive focus:text-destructive"
      onClick={handleDelete}
    >
      <TrashIcon className="mr-2" weight="bold" />
      Delete
    </DropdownMenuItem>
  );
}
