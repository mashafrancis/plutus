import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { IncomeData } from "@/lib/types/income";
import { Income } from "../Income";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockIncomeData: IncomeData = {
  summaryMetrics: {
    totalIncomeThisMonth: {
      value: 5200.0,
      previousValue: 5000.0,
      change: 200.0,
      changePercent: 4.0,
      trend: "up",
    },
    averageMonthlyIncome: {
      value: 5200.0,
      previousValue: 5000.0,
      change: 200.0,
      changePercent: 4.0,
      trend: "up",
    },
    topIncomeSource: {
      source: "Salary",
      amount: 5200.0,
      percentage: 100.0,
    },
    comparisonToLastMonth: {
      change: 200.0,
      changePercent: 4.0,
      trend: "up",
      message: "4.0% more than last month",
    },
    totalRecurringIncome: {
      value: 5200.0,
      previousValue: 5000.0,
      change: 200.0,
      changePercent: 4.0,
      trend: "up",
    },
    transactionCount: {
      thisMonth: 1,
      lastMonth: 1,
      change: 0,
    },
  },
  income: [
    {
      id: "inc-001",
      type: "income",
      amount: 5200.0,
      source: "Salary",
      description: "Monthly Salary",
      date: "2024-12-05",
      accountId: "acc-001",
      tags: ["salary"],
      notes: "December salary payment",
      recurring: true,
      recurringFrequency: "monthly",
    },
  ],
  filterOptions: {
    sources: ["Salary", "Freelance"],
    accounts: [{ id: "acc-001", name: "Chase Checking", type: "checking" }],
    tags: ["salary"],
  },
};

describe("Income", () => {
  it("renders income heading", () => {
    render(<Income data={mockIncomeData} />);

    expect(screen.getByText("Income")).toBeInTheDocument();
  });

  it("renders Add Income button", () => {
    const onAddIncome = vi.fn();
    render(<Income data={mockIncomeData} onAddIncome={onAddIncome} />);

    const button = screen.getByText("Add Income");
    expect(button).toBeInTheDocument();
  });

  it("calls onAddIncome when Add Income button is clicked", () => {
    const onAddIncome = vi.fn();
    render(<Income data={mockIncomeData} onAddIncome={onAddIncome} />);

    screen.getByText("Add Income").click();
    expect(onAddIncome).toHaveBeenCalledTimes(1);
  });

  it("renders all 6 metric cards", () => {
    render(<Income data={mockIncomeData} />);

    expect(screen.getByText("Total Income")).toBeInTheDocument();
    expect(screen.getByText("Average Monthly")).toBeInTheDocument();
    expect(screen.getByText("Top Source")).toBeInTheDocument();
    expect(screen.getByText("vs Last Month")).toBeInTheDocument();
    expect(screen.getByText("Recurring Income")).toBeInTheDocument();
    expect(screen.getByText("Entries")).toBeInTheDocument();
  });

  it("renders income rows in table", () => {
    render(<Income data={mockIncomeData} />);

    expect(screen.getByText("Monthly Salary")).toBeInTheDocument();
    // Salary appears in both metric card and table row
    const salaryElements = screen.getAllByText("Salary");
    expect(salaryElements.length).toBeGreaterThan(0);
  });

  it("shows empty state when no income", () => {
    const emptyData: IncomeData = {
      ...mockIncomeData,
      income: [],
    };

    render(<Income data={emptyData} />);

    expect(screen.getByText(/No income entries found/i)).toBeInTheDocument();
  });

  it("renders filter bar", () => {
    render(<Income data={mockIncomeData} />);

    expect(screen.getByPlaceholderText(/Search income/i)).toBeInTheDocument();
  });
});
