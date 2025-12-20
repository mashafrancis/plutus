import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Budget, Category } from "@/lib/types/settings";
import { BudgetCard } from "./BudgetCard";

interface BudgetsTabProps {
  budgets: Budget[];
  categories: Category[];
  onAddBudget?: () => void;
  onEditBudget?: (budgetId: string) => void;
  onDeleteBudget?: (budgetId: string) => void;
  onUpdateBudget?: (budgetId: string, updates: Partial<Budget>) => void;
}

export function BudgetsTab({
  budgets,
  categories,
  onAddBudget,
  onEditBudget,
  onDeleteBudget,
  onUpdateBudget,
}: BudgetsTabProps) {
  const categoryBudgets = budgets.filter((b) => b.categoryId !== null);
  const overallBudget = budgets.find((b) => b.categoryId === null);

  return (
    <div className="space-y-6">
      {/* Overall Budget */}
      {overallBudget && (
        <Card>
          <CardHeader>
            <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Overall Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetCard
              budget={overallBudget}
              onDelete={onDeleteBudget}
              onEdit={onEditBudget}
              onUpdate={onUpdateBudget}
            />
          </CardContent>
        </Card>
      )}

      {/* Category Budgets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Category Budgets
            </CardTitle>
            <Button
              className="bg-blue-600 font-geist-sans text-white hover:bg-blue-700"
              onClick={onAddBudget}
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {categoryBudgets.length === 0 ? (
            <p className="py-4 text-center font-geist-sans text-neutral-500 text-sm dark:text-neutral-400">
              No category budgets set. Add budgets to track spending limits.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {categoryBudgets.map((budget) => (
                <BudgetCard
                  budget={budget}
                  key={budget.id}
                  onDelete={onDeleteBudget}
                  onEdit={onEditBudget}
                  onUpdate={onUpdateBudget}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
