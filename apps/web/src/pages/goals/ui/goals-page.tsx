import { CheckIcon, PlusIcon, TargetIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGoalsList } from "@/entities/goal/api/use-goals-list";
import { CreateGoalDialog } from "@/features/create-goal/ui/create-goal-dialog";
import { formatCurrency } from "@/shared/lib/format/currency";
import { formatPercent } from "@/shared/lib/format/percent";

import { GoalCard } from "./goal-card";

export function GoalsPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-2 w-full" />
          <Skeleton className="mt-1 h-3 w-40" />
        </CardContent>
      </Card>
      <div>
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="grid gap-4 md:grid-cols-2">
          {[...new Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-8 w-8" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="mt-2 h-2 w-full" />
                <Skeleton className="mt-2 h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GoalsPage() {
  const [showCompleted, setShowCompleted] = useState(false);
  const { data: goals } = useGoalsList({ includeCompleted: showCompleted });

  if (!goals) {
    return <GoalsPageSkeleton />;
  }

  const activeGoals = goals.filter((g) => !g.isCompleted);
  const completedGoals = goals.filter((g) => g.isCompleted);

  const totalTarget = activeGoals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalProgress = activeGoals.reduce(
    (sum, g) => sum + g.currentAmount,
    0
  );
  const overallPercent =
    totalTarget > 0 ? (totalProgress / totalTarget) * 100 : 0;

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">Goals</h1>
          <p className="text-muted-foreground text-sm">
            Set and track your savings targets
          </p>
        </div>
        <CreateGoalDialog />
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-medium text-sm">
            Overall Progress
          </CardTitle>
          <TargetIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-2xl">
              {formatCurrency(totalProgress)}
            </span>
            <span className="text-muted-foreground text-sm">
              of {formatCurrency(totalTarget)}
            </span>
          </div>
          <Progress className="mt-2" value={overallPercent} />
          <p className="mt-1 text-muted-foreground text-xs">
            {formatPercent(overallPercent)} complete across {activeGoals.length}{" "}
            goals
          </p>
        </CardContent>
      </Card>

      {/* Active Goals */}
      <div>
        <h2 className="mb-4 font-semibold text-lg">Active Goals</h2>
        {activeGoals.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {activeGoals.map((goal) => (
              <GoalCard goal={goal} key={goal._id} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <TargetIcon className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No active goals</p>
              <CreateGoalDialog>
                <Button className="mt-4" variant="outline">
                  <PlusIcon className="mr-2" data-icon="inline-start" />
                  Create your first goal
                </Button>
              </CreateGoalDialog>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Completed Goals Toggle */}
      {completedGoals.length > 0 && (
        <div>
          <Button
            className="mb-4"
            onClick={() => setShowCompleted(!showCompleted)}
            variant="ghost"
          >
            <CheckIcon className="mr-2" weight="bold" />
            {showCompleted ? "Hide" : "Show"} Completed ({completedGoals.length}
            )
          </Button>
          {showCompleted && (
            <div className="grid gap-4 md:grid-cols-2">
              {completedGoals.map((goal) => (
                <GoalCard goal={goal} isCompleted key={goal._id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
