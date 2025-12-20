import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ExpensesData } from "@/lib/types/expenses";
import { Expenses } from "../Expenses";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockExpensesData: ExpensesData = {
  summaryMetrics: {
    totalSpendingThisMonth: {
      value: 3240.0,
      previousValue: 3580.0,
      change: -340.0,
      changePercent: -9.5,
      trend: "down",
    },
    averageDailySpending: {
      value: 108.0,
      previousValue: 115.48,
      change: -7.48,
      changePercent: -6.48,
      trend: "down",
    },
    topSpendingCategory: {
      category: "Housing",
      amount: 1850.0,
      percentage: 57.1,
    },
    budgetProgress: {
      totalSpent: 3240.0,
      totalBudget: 4000.0,
      percentage: 81.0,
      status: "warning",
    },
    comparisonToLastMonth: {
      change: -340.0,
      changePercent: -9.5,
      trend: "down",
      message: "9.5% less than last month",
    },
    transactionCount: {
      thisMonth: 18,
      lastMonth: 22,
      change: -4,
    },
  },
  expenses: [
    {
      id: "exp-001",
      type: "expense",
      amount: 45.5,
      category: "Food & Dining",
      description: "Coffee & Breakfast",
      date: "2024-12-10",
      accountId: "acc-001",
      tags: ["coffee", "morning"],
      notes: "",
      recurring: false,
    },
  ],
  filterOptions: {
    categories: ["Food & Dining", "Housing"],
    accounts: [{ id: "acc-001", name: "Chase Checking", type: "checking" }],
    tags: ["coffee", "morning"],
  },
  budgetProgress: [],
};

describe("Expenses", () => {
  it("renders expenses heading", () => {
    render(<Expenses data={mockExpensesData} />);

    expect(screen.getByText("Expenses")).toBeInTheDocument();
  });

  it("renders Add Expense button", () => {
    const onAddExpense = vi.fn();
    render(<Expenses data={mockExpensesData} onAddExpense={onAddExpense} />);

    const button = screen.getByText("Add Expense");
    expect(button).toBeInTheDocument();
  });

  it("calls onAddExpense when Add Expense button is clicked", () => {
    const onAddExpense = vi.fn();
    render(<Expenses data={mockExpensesData} onAddExpense={onAddExpense} />);

    screen.getByText("Add Expense").click();
    expect(onAddExpense).toHaveBeenCalledTimes(1);
  });

  it("renders all 6 metric cards", () => {
    render(<Expenses data={mockExpensesData} />);

    expect(screen.getByText("Total Spending")).toBeInTheDocument();
    expect(screen.getByText("Daily Average")).toBeInTheDocument();
    expect(screen.getByText("Top Category")).toBeInTheDocument();
    expect(screen.getByText("Budget Progress")).toBeInTheDocument();
    expect(screen.getByText("vs Last Month")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });

  it("renders expense rows in table", () => {
    render(<Expenses data={mockExpensesData} />);

    expect(screen.getByText("Coffee & Breakfast")).toBeInTheDocument();
    expect(screen.getByText("Food & Dining")).toBeInTheDocument();
  });

  it("shows empty state when no expenses", () => {
    const emptyData: ExpensesData = {
      ...mockExpensesData,
      expenses: [],
    };

    render(<Expenses data={emptyData} />);

    expect(screen.getByText(/No expenses found/i)).toBeInTheDocument();
  });

  it("renders filter bar", () => {
    render(<Expenses data={mockExpensesData} />);

    expect(screen.getByPlaceholderText(/Search expenses/i)).toBeInTheDocument();
  });
});
