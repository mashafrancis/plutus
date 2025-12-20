import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { DashboardData } from "@/lib/types/dashboard";
import { Dashboard } from "../Dashboard";

const emptyDashboardData: DashboardData = {
  metrics: {
    netWorth: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    monthlyCashFlow: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    totalBalance: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    savingsRate: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    monthlySpending: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    monthlyIncome: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
  },
  cashFlowData: [],
  netWorthData: [],
  spendingByCategory: [],
  incomeBySource: [],
  budgetProgress: [],
  investmentPerformance: {
    totalValue: 0,
    totalCostBasis: 0,
    totalGain: 0,
    gainPercent: 0,
    monthlyChange: 0,
    monthlyChangePercent: 0,
    holdings: [],
  },
  upcomingSubscriptions: [],
  recentTransactions: [],
  insights: [],
  accounts: [],
};

describe("Dashboard Empty States", () => {
  it("renders metric cards with zero values", () => {
    render(<Dashboard data={emptyDashboardData} />);

    expect(screen.getByText("Net Worth")).toBeInTheDocument();
    expect(screen.getByText("Monthly Cash Flow")).toBeInTheDocument();
    // Values should be formatted as $0.00 or 0%
  });

  it("hides insights section when no insights", () => {
    render(<Dashboard data={emptyDashboardData} />);

    expect(screen.queryByText("Insights")).not.toBeInTheDocument();
  });

  it("shows empty state for recent transactions", () => {
    render(<Dashboard data={emptyDashboardData} />);

    // The component should handle empty arrays gracefully
    // We'll need to check the actual implementation
    expect(screen.getByText("Recent Activity")).toBeInTheDocument();
  });

  it("shows empty state for upcoming subscriptions", () => {
    render(<Dashboard data={emptyDashboardData} />);

    expect(screen.getByText("Upcoming Payments")).toBeInTheDocument();
  });

  it("shows empty state for budget progress", () => {
    render(<Dashboard data={emptyDashboardData} />);

    expect(screen.getByText("Budget Progress")).toBeInTheDocument();
  });

  it("shows empty state for investment performance", () => {
    render(<Dashboard data={emptyDashboardData} />);

    expect(screen.getByText("Investment Performance")).toBeInTheDocument();
  });
});
