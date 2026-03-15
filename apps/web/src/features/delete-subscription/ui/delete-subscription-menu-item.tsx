import { TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteSubscription } from "@/entities/subscription/api/use-delete-subscription";
import type { SubscriptionId } from "@/entities/subscription/types/subscription-id";

interface DeleteSubscriptionMenuItemProps {
  subscriptionId: SubscriptionId;
}

export function DeleteSubscriptionMenuItem({
  subscriptionId,
}: DeleteSubscriptionMenuItemProps) {
  const deleteSubscription = useDeleteSubscription();

  const handleDelete = async () => {
    try {
      await deleteSubscription({ id: subscriptionId });
      toast.success("Subscription deleted");
    } catch {
      toast.error("Failed to delete subscription");
    }
  };

  return (
    <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
      <TrashIcon className="mr-2" weight="bold" />
      Delete
    </DropdownMenuItem>
  );
}
