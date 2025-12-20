import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { InvestmentsData } from "@/lib/types/investments";
import { Investments } from "../Investments";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const emptyInvestmentsData: InvestmentsData = {
  summaryMetrics: {
    totalPortfolioValue: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
    },
    totalInvested: {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercent: 0,
    },
    totalGainLoss: {
      dollar: 0,
      percent: 0,
      trend: "neutral",
    },
    todayChange: {
      dollar: 0,
      percent: 0,
      trend: "neutral",
    },
    assetAllocation: {
      stocks: 0,
      etfs: 0,
      crypto: 0,
      retirement: 0,
      bonds: 0,
      savings: 0,
      realEstate: 0,
    },
    topPerformer: {
      name: "",
      ticker: "",
      gainLossPercent: 0,
      gainLossDollar: 0,
    },
    worstPerformer: {
      name: "",
      ticker: "",
      gainLossPercent: 0,
      gainLossDollar: 0,
    },
  },
  investments: [],
  filterOptions: {
    assetTypes: [],
    accounts: [],
    gainLossStatuses: ["all", "winners", "losers"],
  },
  chartData: {
    allocation: [],
    performanceOverTime: [],
    gainLossByInvestment: [],
    sectorBreakdown: [],
  },
};

describe("Investments Empty States", () => {
  it("displays empty state message when no investments", () => {
    render(<Investments data={emptyInvestmentsData} />);

    expect(screen.getByText(/No investments found/i)).toBeInTheDocument();
  });

  it("shows Add Investment button in empty state", () => {
    const onAddInvestment = vi.fn();
    render(
      <Investments
        data={emptyInvestmentsData}
        onAddInvestment={onAddInvestment}
      />
    );

    const button = screen.getByText("Add Investment");
    expect(button).toBeInTheDocument();
  });

  it("calls onAddInvestment when Add Investment button is clicked in empty state", () => {
    const onAddInvestment = vi.fn();
    render(
      <Investments
        data={emptyInvestmentsData}
        onAddInvestment={onAddInvestment}
      />
    );

    const button = screen.getByText("Add Investment");
    button.click();

    expect(onAddInvestment).toHaveBeenCalledTimes(1);
  });

  it("displays metrics with zero values when no investments", () => {
    render(<Investments data={emptyInvestmentsData} />);

    // Metrics should still render with zero values
    expect(screen.getByText("Portfolio Value")).toBeInTheDocument();
    expect(screen.getByText("Total Invested")).toBeInTheDocument();
  });
});
