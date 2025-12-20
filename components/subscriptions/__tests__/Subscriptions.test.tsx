import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { SubscriptionsData } from "@/lib/types/subscriptions";
import { Subscriptions } from "../Subscriptions";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockSubscriptionsData: SubscriptionsData = {
  summaryMetrics: {
    totalMonthlyCost: {
      value: 150.0,
      previousValue: 140.0,
      change: 10.0,
      changePercent: 7.14,
      trend: "up",
    },
    totalYearlyCost: {
      value: 1800.0,
      previousValue: 1680.0,
      change: 120.0,
      changePercent: 7.14,
      trend: "up",
    },
    activeCount: {
      value: 5,
      previousValue: 4,
      change: 1,
    },
    upcomingRenewalsCount: {
      thisWeek: 2,
      thisMonth: 5,
      totalAmount: 45.98,
    },
    topSpendingCategory: {
      category: "Streaming",
      amount: 65.97,
      percentage: 44.0,
    },
    comparisonToLastMonth: {
      change: 10.0,
      changePercent: 7.14,
      trend: "up",
      message: "7.1% more than last month",
    },
  },
  subscriptions: [
    {
      id: "sub-001",
      name: "Netflix Premium",
      category: "Streaming",
      amount: 22.99,
      billingCycle: "monthly",
      nextPaymentDate: "2024-12-22",
      status: "active",
      paymentMethodId: "acc-001",
      startDate: "2022-03-15",
      totalSpent: 643.72,
      paymentHistory: [],
    },
  ],
  filterOptions: {
    categories: ["Streaming", "Utilities"],
    statuses: ["active", "paused", "cancelled"],
    billingCycles: ["monthly", "yearly", "weekly"],
    accounts: [{ id: "acc-001", name: "Chase Checking", type: "checking" }],
  },
};

describe("Subscriptions", () => {
  it("renders subscriptions heading", () => {
    render(<Subscriptions data={mockSubscriptionsData} />);

    expect(screen.getByText("Subscriptions")).toBeInTheDocument();
  });

  it("renders Add Subscription button", () => {
    const onAddSubscription = vi.fn();
    render(
      <Subscriptions
        data={mockSubscriptionsData}
        onAddSubscription={onAddSubscription}
      />
    );

    const button = screen.getByText("Add Subscription");
    expect(button).toBeInTheDocument();
  });

  it("calls onAddSubscription when Add Subscription button is clicked", () => {
    const onAddSubscription = vi.fn();
    render(
      <Subscriptions
        data={mockSubscriptionsData}
        onAddSubscription={onAddSubscription}
      />
    );

    screen.getByText("Add Subscription").click();
    expect(onAddSubscription).toHaveBeenCalledTimes(1);
  });

  it("renders all 6 metric cards", () => {
    render(<Subscriptions data={mockSubscriptionsData} />);

    expect(screen.getByText("Monthly Cost")).toBeInTheDocument();
    expect(screen.getByText("Yearly Cost")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Due This Week")).toBeInTheDocument();
    expect(screen.getByText("Top Category")).toBeInTheDocument();
    expect(screen.getByText("vs Last Month")).toBeInTheDocument();
  });

  it("renders subscription rows in table", () => {
    render(<Subscriptions data={mockSubscriptionsData} />);

    expect(screen.getByText("Netflix Premium")).toBeInTheDocument();
    // Streaming appears in both metric card and table row
    const streamingElements = screen.getAllByText("Streaming");
    expect(streamingElements.length).toBeGreaterThan(0);
  });

  it("shows empty state when no subscriptions", () => {
    const emptyData: SubscriptionsData = {
      ...mockSubscriptionsData,
      subscriptions: [],
    };

    render(<Subscriptions data={emptyData} />);

    expect(screen.getByText(/No subscriptions found/i)).toBeInTheDocument();
  });

  it("renders filter bar", () => {
    render(<Subscriptions data={mockSubscriptionsData} />);

    expect(
      screen.getByPlaceholderText(/Search subscriptions/i)
    ).toBeInTheDocument();
  });
});
