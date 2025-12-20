import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { SubscriptionsData } from "@/lib/types/subscriptions";
import { Subscriptions } from "../Subscriptions";

const emptySubscriptionsData: SubscriptionsData = {
  summaryMetrics: {
    totalMonthlyCost: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    totalYearlyCost: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
      trend: "neutral",
    },
    activeCount: {
      value: 0,
      previousValue: 0,
      change: 0,
    },
    upcomingRenewalsCount: {
      thisWeek: 0,
      thisMonth: 0,
      totalAmount: 0,
    },
    topSpendingCategory: {
      category: "None",
      amount: 0,
      percentage: 0,
    },
    comparisonToLastMonth: {
      change: 0,
      changePercent: 0,
      trend: "neutral",
      message: "No change",
    },
  },
  subscriptions: [],
  filterOptions: {
    categories: [],
    statuses: [],
    billingCycles: [],
    accounts: [],
  },
};

describe("Subscriptions Empty States", () => {
  it("renders empty state when no subscriptions", () => {
    render(<Subscriptions data={emptySubscriptionsData} />);

    expect(screen.getByText(/No subscriptions found/i)).toBeInTheDocument();
  });

  it("renders metric cards even when empty", () => {
    render(<Subscriptions data={emptySubscriptionsData} />);

    expect(screen.getByText("Monthly Cost")).toBeInTheDocument();
    expect(screen.getByText("Yearly Cost")).toBeInTheDocument();
  });

  it("shows Add Subscription button in empty state", () => {
    const onAddSubscription = vi.fn();
    render(
      <Subscriptions
        data={emptySubscriptionsData}
        onAddSubscription={onAddSubscription}
      />
    );

    expect(screen.getByText("Add Subscription")).toBeInTheDocument();
  });
});
