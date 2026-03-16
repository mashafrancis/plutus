import { DotsThreeIcon, PlusIcon } from "@phosphor-icons/react";
import type { Id } from "@tanstack-effect-convex/backend/convex/_generated/dataModel";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { CompleteGoalMenuItem } from "@/features/complete-goal/ui/complete-goal-menu-item";
import { DeleteGoalMenuItem } from "@/features/delete-goal/ui/delete-goal-menu-item";
import { AddGoalProgressForm } from "@/features/update-goal-progress/ui/add-goal-progress-form";
import { formatCurrency } from "@/shared/lib/format/currency";
import { formatDate } from "@/shared/lib/format/date";
import { formatPercent } from "@/shared/lib/format/percent";

interface GoalCardProps {
  goal: {
    _id: Id<"goals">;
    name: string;
    targetAmount: number;
    currentAmount: number;
    currency: string;
    targetDate?: number;
    icon?: string;
    color?: string;
  };
  isCompleted?: boolean;
}

export function GoalCard({ goal, isCompleted = false }: GoalCardProps) {
  const [showAddProgress, setShowAddProgress] = useState(false);

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <Card className={isCompleted ? "opacity-60" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{goal.icon || "🎯"}</span>
          <div>
            <CardTitle className="text-base">{goal.name}</CardTitle>
            {goal.targetDate && (
              <CardDescription>Target: {formatDate(goal.targetDate)}</CardDescription>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button aria-label="Goal options" size="icon" variant="ghost">
                <DotsThreeIcon aria-hidden weight="bold" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            {!isCompleted && (
              <>
                <DropdownMenuItem onClick={() => setShowAddProgress(true)}>
                  <PlusIcon className="mr-2" data-icon="inline-start" />
                  Add Progress
                </DropdownMenuItem>
                <CompleteGoalMenuItem goalId={goal._id} />
              </>
            )}
            <DeleteGoalMenuItem goalId={goal._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <span className="font-bold text-xl">
            {formatCurrency(goal.currentAmount, goal.currency)}
          </span>
          <span className="text-muted-foreground text-sm">
            of {formatCurrency(goal.targetAmount, goal.currency)}
          </span>
        </div>
        <Progress className="mt-2" value={Math.min(progress, 100)} />
        <div className="mt-2 flex items-center justify-between text-muted-foreground text-xs">
          <span>{formatPercent(progress)} complete</span>
          {!isCompleted && remaining > 0 && (
            <span>{formatCurrency(remaining, goal.currency)} to go</span>
          )}
          {isCompleted && <Badge variant="default">Completed</Badge>}
        </div>

        {/* Add Progress Form */}
        {showAddProgress && (
          <AddGoalProgressForm goalId={goal._id} onCancel={() => setShowAddProgress(false)} />
        )}
      </CardContent>
    </Card>
  );
}
