import { PauseIcon, PlayIcon, XIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  useCancelSubscription,
  usePauseSubscription,
  useResumeSubscription,
} from "@/entities/subscription/api/use-manage-status";
import type {
  SubscriptionId,
  SubscriptionStatus,
} from "@/entities/subscription/types/subscription-id";

interface ManageSubscriptionStatusMenuItemsProps {
  subscriptionId: SubscriptionId;
  status: SubscriptionStatus;
}

export function ManageSubscriptionStatusMenuItems({
  subscriptionId,
  status,
}: ManageSubscriptionStatusMenuItemsProps) {
  const pauseSub = usePauseSubscription();
  const resumeSub = useResumeSubscription();
  const cancelSub = useCancelSubscription();

  const handlePause = async () => {
    try {
      await pauseSub({ id: subscriptionId });
      toast.success("Subscription paused");
    } catch {
      toast.error("Failed to pause subscription");
    }
  };

  const handleResume = async () => {
    try {
      await resumeSub({ id: subscriptionId });
      toast.success("Subscription resumed");
    } catch {
      toast.error("Failed to resume subscription");
    }
  };

  const handleCancel = async () => {
    try {
      await cancelSub({ id: subscriptionId });
      toast.success("Subscription cancelled");
    } catch {
      toast.error("Failed to cancel subscription");
    }
  };

  return (
    <>
      {status === "active" && (
        <DropdownMenuItem onClick={handlePause}>
          <PauseIcon className="mr-2 h-4 w-4" />
          Pause
        </DropdownMenuItem>
      )}
      {status === "paused" && (
        <DropdownMenuItem onClick={handleResume}>
          <PlayIcon className="mr-2 h-4 w-4" />
          Resume
        </DropdownMenuItem>
      )}
      {status !== "cancelled" && (
        <DropdownMenuItem onClick={handleCancel}>
          <XIcon className="mr-2 h-4 w-4" />
          Cancel
        </DropdownMenuItem>
      )}
    </>
  );
}
