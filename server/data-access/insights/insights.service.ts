import { Effect } from "effect";
import type { Insight } from "@/lib/types/dashboard";

export class InsightsService extends Effect.Service<InsightsService>()(
  "InsightsService",
  {
    effect: Effect.gen(function* () {
      return {
        generateInsights: ({
          userId,
          budgetProgress,
          spendingByCategory,
          savingsRate,
          previousSavingsRate,
        }: {
          userId: string;
          budgetProgress: Array<{
            category: string;
            spent: number;
            target: number;
            percentage: number;
          }>;
          spendingByCategory: Array<{ category: string; amount: number }>;
          savingsRate: number;
          previousSavingsRate: number;
        }) =>
          Effect.gen(function* () {
            const insights: Insight[] = [];

            // Budget warnings - when spending > 80% of budget
            for (const budget of budgetProgress) {
              if (budget.percentage >= 80 && budget.percentage < 100) {
                insights.push({
                  id: `budget-warning-${budget.category}`,
                  type: "budget_warning",
                  title: "Budget warning",
                  message: `You've spent ${budget.percentage.toFixed(1)}% of your ${budget.category} budget.`,
                  severity: "warning",
                  category: budget.category,
                  actionLabel: "View budget",
                  dismissed: false,
                });
              } else if (budget.percentage >= 100) {
                insights.push({
                  id: `budget-exceeded-${budget.category}`,
                  type: "budget_warning",
                  title: "Budget exceeded",
                  message: `You've exceeded your ${budget.category} budget by ${formatCurrency(Math.abs(budget.spent - budget.target))}.`,
                  severity: "error",
                  category: budget.category,
                  actionLabel: "View budget",
                  dismissed: false,
                });
              }
            }

            // Savings trend - when savings rate improves significantly
            if (
              savingsRate > previousSavingsRate &&
              savingsRate - previousSavingsRate >= 5
            ) {
              insights.push({
                id: "savings-trend-improved",
                type: "savings_trend",
                title: "Savings rate improved",
                message: `Your savings rate increased from ${previousSavingsRate.toFixed(1)}% to ${savingsRate.toFixed(1)}%. Great progress!`,
                severity: "success",
                actionLabel: "View details",
                dismissed: false,
              });
            } else if (
              savingsRate < previousSavingsRate &&
              previousSavingsRate - savingsRate >= 5
            ) {
              insights.push({
                id: "savings-trend-declined",
                type: "savings_trend",
                title: "Savings rate declined",
                message: `Your savings rate decreased from ${previousSavingsRate.toFixed(1)}% to ${savingsRate.toFixed(1)}%. Consider reviewing your spending.`,
                severity: "warning",
                actionLabel: "View details",
                dismissed: false,
              });
            }

            return insights;
          }),
      };
    }),
  }
) {}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
