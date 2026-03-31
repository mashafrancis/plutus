import { TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteAccount } from "@/entities/account/api/use-delete-account";
import type { AccountId } from "@/entities/account/types/account-id";

interface DeleteAccountMenuItemProps {
  accountId: AccountId;
}

export function DeleteAccountMenuItem({ accountId }: DeleteAccountMenuItemProps) {
  const deleteAccount = useDeleteAccount();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteAccount({ id: accountId });
      toast.success("Account deleted");
    } catch {
      toast.error("Failed to delete account");
    }
  };

  return (
    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleDelete}>
      <TrashIcon className="mr-2" weight="bold" />
      Delete
    </DropdownMenuItem>
  );
}
