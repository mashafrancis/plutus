import { Plus } from 'lucide-react'
import { Button } from '../../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { BudgetCard } from './BudgetCard'
import type { Budget, Category } from '../types'

interface BudgetsTabProps {
  budgets: Budget[]
  categories: Category[]
  onAddBudget?: () => void
  onEditBudget?: (budgetId: string) => void
  onDeleteBudget?: (budgetId: string) => void
  onUpdateBudget?: (budgetId: string, updates: Partial<Budget>) => void
}

export function BudgetsTab({
  budgets,
  categories,
  onAddBudget,
  onEditBudget,
  onDeleteBudget,
  onUpdateBudget,
}: BudgetsTabProps) {
  const categoryBudgets = budgets.filter(b => b.categoryId !== null)
  const overallBudget = budgets.find(b => b.categoryId === null)

  return (
    <div className="space-y-6">
      {/* Overall Budget */}
      {overallBudget && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
              Overall Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetCard
              budget={overallBudget}
              onEdit={onEditBudget}
              onDelete={onDeleteBudget}
              onUpdate={onUpdateBudget}
            />
          </CardContent>
        </Card>
      )}

      {/* Category Budgets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
              Category Budgets
            </CardTitle>
            <Button
              onClick={onAddBudget}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-geist-sans"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {categoryBudgets.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-4 font-geist-sans">
              No category budgets set. Add budgets to track spending limits.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryBudgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onEdit={onEditBudget}
                  onDelete={onDeleteBudget}
                  onUpdate={onUpdateBudget}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

