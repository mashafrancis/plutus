import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddGoalProgress } from "@/entities/goal/api/use-add-goal-progress";
import type { GoalId } from "@/entities/goal/types/goal-id";

interface AddGoalProgressFormProps {
  goalId: GoalId;
  onCancel: () => void;
}

export function AddGoalProgressForm({ goalId, onCancel }: AddGoalProgressFormProps) {
  const [progressAmount, setProgressAmount] = useState("");
  const addProgress = useAddGoalProgress();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!progressAmount) {
      return;
    }

    try {
      const result = await addProgress({
        id: goalId,
        amount: Number.parseFloat(progressAmount),
      });
      if (result.isCompleted) {
        toast.success("Congratulations! Goal completed!");
      } else {
        toast.success("Progress added");
      }
      setProgressAmount("");
      onCancel();
    } catch {
      toast.error("Failed to add progress");
    }
  };

  return (
    <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
      <Input
        className="flex-1"
        min="0"
        onChange={(e) => setProgressAmount(e.target.value)}
        placeholder="Amount"
        step="0.01"
        type="number"
        value={progressAmount}
      />
      <Button size="sm" type="submit">
        Add
      </Button>
      <Button onClick={onCancel} size="sm" type="button" variant="ghost">
        Cancel
      </Button>
    </form>
  );
}
