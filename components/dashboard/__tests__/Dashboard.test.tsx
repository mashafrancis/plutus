import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { DashboardData } from "@/lib/types/dashboard";
import { Dashboard } from "../Dashboard";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockDashboardData: DashboardData = {
  metrics: {
    netWorth: {
      value: 125_430.5,
      previousValue: 118_920.0,
      change: 6510.5,
      changePercent: 5.48,
      trend: "up",
    },
    monthlyCashFlow: {
      value: 2840.0,
      previousValue: 2150.0,
      change: 690.0,
      changePercent: 32.09,
      trend: "up",
    },
    totalBalance: {
      value: 45_620.0,
      previousValue: 42_800.0,
      change: 2820.0,
      changePercent: 6.59,
      trend: "up",
    },
    savingsRate: {
      value: 28.5,
      previousValue: 24.2,
      change: 4.3,
      changePercent: 17.77,
      trend: "up",
    },
    monthlySpending: {
      value: 3240.0,
      previousValue: 3580.0,
      change: -340.0,
      changePercent: -9.5,
      trend: "down",
    },
    monthlyIncome: {
      value: 6080.0,
      previousValue: 5730.0,
      change: 350.0,
      changePercent: 6.11,
      trend: "up",
    },
  },
  cashFlowData: [],
  netWorthData: [],
  spendingByCategory: [
    { category: "Housing", amount: 1850.0, color: "#3b82f6" },
    { category: "Food & Dining", amount: 680.0, color: "#10b981" },
  ],
  incomeBySource: [
    { source: "Salary", amount: 5200.0 },
    { source: "Freelance", amount: 680.0 },
  ],
  budgetProgress: [
    {
      category: "Housing",
      spent: 1850.0,
      target: 2000.0,
      percentage: 92.5,
    },
  ],
  investmentPerformance: {
    totalValue: 79_810.5,
    totalCostBasis: 72_000.0,
    totalGain: 7810.5,
    gainPercent: 10.85,
    monthlyChange: 1250.0,
    monthlyChangePercent: 1.59,
    holdings: [],
  },
  upcomingSubscriptions: [
    {
      id: "sub-001",
      name: "Netflix",
      amount: 15.99,
      nextPaymentDate: "2024-12-15",
      frequency: "monthly",
      accountId: "acc-001",
    },
  ],
  recentTransactions: [
    {
      id: "txn-001",
      type: "expense",
      amount: 45.5,
      category: "Food & Dining",
      description: "Coffee & Breakfast",
      date: "2024-12-10",
      accountId: "acc-001",
      tags: [],
    },
  ],
  insights: [],
  accounts: [],
};

describe("Dashboard", () => {
  it("renders dashboard heading and subtitle", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Your financial overview at a glance")
    ).toBeInTheDocument();
  });

  it("renders all 6 metric cards", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.getByText("Net Worth")).toBeInTheDocument();
    expect(screen.getByText("Monthly Cash Flow")).toBeInTheDocument();
    expect(screen.getByText("Total Balance")).toBeInTheDocument();
    expect(screen.getByText("Savings Rate")).toBeInTheDocument();
    expect(screen.getByText("Monthly Spending")).toBeInTheDocument();
    expect(screen.getByText("Monthly Income")).toBeInTheDocument();
  });

  it("renders timeframe selector with month selected by default", () => {
    render(<Dashboard data={mockDashboardData} />);

    const monthButton = screen.getByRole("button", { name: "month" });
    expect(monthButton).toBeInTheDocument();
    expect(monthButton).toHaveClass("bg-blue-600");
  });

  it("renders quick action buttons", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.getByText("Add Expense")).toBeInTheDocument();
    expect(screen.getByText("Add Income")).toBeInTheDocument();
    expect(screen.getByText("View Reports")).toBeInTheDocument();
  });

  it("calls onAddExpense when Add Expense button is clicked", () => {
    const onAddExpense = vi.fn();
    render(<Dashboard data={mockDashboardData} onAddExpense={onAddExpense} />);

    screen.getByText("Add Expense").click();
    expect(onAddExpense).toHaveBeenCalledTimes(1);
  });

  it("calls onAddIncome when Add Income button is clicked", () => {
    const onAddIncome = vi.fn();
    render(<Dashboard data={mockDashboardData} onAddIncome={onAddIncome} />);

    screen.getByText("Add Income").click();
    expect(onAddIncome).toHaveBeenCalledTimes(1);
  });

  it("calls onTimeframeChange when timeframe is changed", () => {
    const onTimeframeChange = vi.fn();
    render(
      <Dashboard
        data={mockDashboardData}
        onTimeframeChange={onTimeframeChange}
      />
    );

    const quarterButton = screen.getByRole("button", { name: "quarter" });
    quarterButton.click();
    expect(onTimeframeChange).toHaveBeenCalledWith("quarter");
  });

  it("renders spending by category chart", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
    const housingElements = screen.getAllByText("Housing");
    expect(housingElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Food & Dining")).toBeInTheDocument();
  });

  it("renders income by source chart", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.getByText("Income by Source")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Freelance")).toBeInTheDocument();
  });

  it("renders budget progress section", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.getByText("Budget Progress")).toBeInTheDocument();
    const housingElements = screen.getAllByText("Housing");
    expect(housingElements.length).toBeGreaterThan(0);
  });

  it("renders investment performance section", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.getByText("Investment Performance")).toBeInTheDocument();
  });

  it("renders upcoming payments section", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.getByText("Upcoming Payments")).toBeInTheDocument();
    expect(screen.getByText("Netflix")).toBeInTheDocument();
  });

  it("renders recent activity section", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.getByText("Recent Activity")).toBeInTheDocument();
    expect(screen.getByText("Coffee & Breakfast")).toBeInTheDocument();
  });

  it("hides insights section when no insights", () => {
    render(<Dashboard data={mockDashboardData} />);

    expect(screen.queryByText("Insights")).not.toBeInTheDocument();
  });

  it("renders insights section when insights exist", () => {
    const dataWithInsights: DashboardData = {
      ...mockDashboardData,
      insights: [
        {
          id: "insight-001",
          type: "spending_anomaly",
          title: "Higher than usual spending",
          message: "You spent 15% more on Food & Dining this month",
          severity: "warning",
          actionLabel: "Review spending",
          dismissed: false,
        },
      ],
    };

    render(<Dashboard data={dataWithInsights} />);

    expect(screen.getByText("Insights")).toBeInTheDocument();
    expect(screen.getByText("Higher than usual spending")).toBeInTheDocument();
  });
});
