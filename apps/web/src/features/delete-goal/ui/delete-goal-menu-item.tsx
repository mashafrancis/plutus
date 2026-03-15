import { TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteGoal } from "@/entities/goal/api/use-delete-goal";
import type { GoalId } from "@/entities/goal/types/goal-id";

interface DeleteGoalMenuItemProps {
  goalId: GoalId;
}

export function DeleteGoalMenuItem({ goalId }: DeleteGoalMenuItemProps) {
  const deleteGoal = useDeleteGoal();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteGoal({ id: goalId });
      toast.success("Goal deleted");
    } catch {
      toast.error("Failed to delete goal");
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
