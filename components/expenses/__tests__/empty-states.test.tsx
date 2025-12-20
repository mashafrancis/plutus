import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ExpensesData } from "@/lib/types/expenses";
import { Expenses } from "../Expenses";

const emptyExpensesData: ExpensesData = {
  summaryMetrics: {
    totalSpendingThisMonth: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    averageDailySpending: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    topSpendingCategory: {
      category: "None",
      amount: 0,
      percentage: 0,
    },
    budgetProgress: {
      totalSpent: 0,
      totalBudget: 0,
      percentage: 0,
      status: "good",
    },
    comparisonToLastMonth: {
      change: 0,
      changePercent: 0,
      trend: "neutral",
      message: "No change",
    },
    transactionCount: {
      thisMonth: 0,
      lastMonth: 0,
      change: 0,
    },
  },
  expenses: [],
  filterOptions: {
    categories: [],
    accounts: [],
    tags: [],
  },
  budgetProgress: [],
};

describe("Expenses Empty States", () => {
  it("renders empty state when no expenses", () => {
    render(<Expenses data={emptyExpensesData} />);

    expect(screen.getByText(/No expenses found/i)).toBeInTheDocument();
  });

  it("renders metric cards even when empty", () => {
    render(<Expenses data={emptyExpensesData} />);

    expect(screen.getByText("Total Spending")).toBeInTheDocument();
    expect(screen.getByText("Daily Average")).toBeInTheDocument();
  });

  it("shows Add Expense button in empty state", () => {
    const onAddExpense = vi.fn();
    render(<Expenses data={emptyExpensesData} onAddExpense={onAddExpense} />);

    expect(screen.getByText("Add Expense")).toBeInTheDocument();
  });
});
