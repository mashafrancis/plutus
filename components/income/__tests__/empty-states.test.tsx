import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { IncomeData } from "@/lib/types/income";
import { Income } from "../Income";

const emptyIncomeData: IncomeData = {
  summaryMetrics: {
    totalIncomeThisMonth: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    averageMonthlyIncome: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    topIncomeSource: {
      source: "None",
      amount: 0,
      percentage: 0,
    },
    comparisonToLastMonth: {
      change: 0,
      changePercent: 0,
      trend: "neutral",
      message: "No change",
    },
    totalRecurringIncome: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    transactionCount: {
      thisMonth: 0,
      lastMonth: 0,
      change: 0,
    },
  },
  income: [],
  filterOptions: {
    sources: [],
    accounts: [],
    tags: [],
  },
};

describe("Income Empty States", () => {
  it("renders empty state when no income", () => {
    render(<Income data={emptyIncomeData} />);

    expect(screen.getByText(/No income entries found/i)).toBeInTheDocument();
  });

  it("renders metric cards even when empty", () => {
    render(<Income data={emptyIncomeData} />);

    expect(screen.getByText("Total Income")).toBeInTheDocument();
    expect(screen.getByText("Average Monthly")).toBeInTheDocument();
  });

  it("shows Add Income button in empty state", () => {
    const onAddIncome = vi.fn();
    render(<Income data={emptyIncomeData} onAddIncome={onAddIncome} />);

    expect(screen.getByText("Add Income")).toBeInTheDocument();
  });
});
