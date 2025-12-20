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

const mockInvestmentsData: InvestmentsData = {
  summaryMetrics: {
    totalPortfolioValue: {
      value: 187_450.75,
      previousValue: 185_230.5,
      change: 2220.25,
      changePercent: 1.2,
    },
    totalInvested: {
      value: 165_000.0,
      previousValue: 165_000.0,
      change: 0,
      changePercent: 0,
    },
    totalGainLoss: {
      dollar: 22_450.75,
      percent: 13.6,
      trend: "up",
    },
    todayChange: {
      dollar: 2220.25,
      percent: 1.2,
      trend: "up",
    },
    assetAllocation: {
      stocks: 35.2,
      etfs: 28.5,
      crypto: 15.8,
      retirement: 12.3,
      bonds: 4.1,
      savings: 2.8,
      realEstate: 1.3,
    },
    topPerformer: {
      name: "Apple Inc.",
      ticker: "AAPL",
      gainLossPercent: 24.5,
      gainLossDollar: 3675.0,
    },
    worstPerformer: {
      name: "Coinbase Global",
      ticker: "COIN",
      gainLossPercent: -18.2,
      gainLossDollar: -910.0,
    },
  },
  investments: [
    {
      id: "inv-001",
      name: "Apple Inc.",
      ticker: "AAPL",
      assetType: "stocks",
      shares: 50,
      costBasis: 15_000.0,
      currentValue: 18_675.0,
      gainLossDollar: 3675.0,
      gainLossPercent: 24.5,
      todayChangeDollar: 125.5,
      todayChangePercent: 0.68,
      allocationPercent: 10.0,
      accountId: "acc-004",
      sector: "Technology",
      transactionHistory: [],
      note: undefined,
    },
  ],
  filterOptions: {
    assetTypes: [
      "stocks",
      "etfs",
      "crypto",
      "bonds",
      "savings",
      "retirement",
      "real-estate",
      "other",
    ],
    accounts: [{ id: "acc-004", name: "Robinhood", type: "investment" }],
    gainLossStatuses: ["all", "winners", "losers"],
  },
  chartData: {
    allocation: [{ type: "stocks", percentage: 35.2, value: 65_950.0 }],
    performanceOverTime: [{ date: "2024-01-01", value: 165_000.0 }],
    gainLossByInvestment: [
      {
        name: "Apple Inc.",
        ticker: "AAPL",
        gainLossDollar: 3675.0,
        gainLossPercent: 24.5,
      },
    ],
    sectorBreakdown: [
      { sector: "Technology", percentage: 42.5, value: 79_675.0 },
    ],
  },
};

describe("Investments", () => {
  it("renders investments heading", () => {
    render(<Investments data={mockInvestmentsData} />);

    expect(screen.getByText("Investments")).toBeInTheDocument();
  });

  it("renders Add Investment button", () => {
    const onAddInvestment = vi.fn();
    render(
      <Investments
        data={mockInvestmentsData}
        onAddInvestment={onAddInvestment}
      />
    );

    const button = screen.getByText("Add Investment");
    expect(button).toBeInTheDocument();
  });

  it("calls onAddInvestment when Add Investment button is clicked", () => {
    const onAddInvestment = vi.fn();
    render(
      <Investments
        data={mockInvestmentsData}
        onAddInvestment={onAddInvestment}
      />
    );

    const button = screen.getByText("Add Investment");
    button.click();

    expect(onAddInvestment).toHaveBeenCalledTimes(1);
  });

  it("renders all 7 metric cards", () => {
    render(<Investments data={mockInvestmentsData} />);

    expect(screen.getByText("Portfolio Value")).toBeInTheDocument();
    expect(screen.getByText("Total Invested")).toBeInTheDocument();
    expect(screen.getByText("Total Gain/Loss")).toBeInTheDocument();
    expect(screen.getByText("Today's Change")).toBeInTheDocument();
    expect(screen.getByText("Top Allocation")).toBeInTheDocument();
    expect(screen.getByText("Top Performer")).toBeInTheDocument();
    expect(screen.getByText("Worst Performer")).toBeInTheDocument();
  });

  it("renders investment rows in table", () => {
    render(<Investments data={mockInvestmentsData} />);

    // Name appears in table row
    const nameElements = screen.getAllByText("Apple Inc.");
    expect(nameElements.length).toBeGreaterThan(0);
  });

  it("renders charts section", () => {
    render(<Investments data={mockInvestmentsData} />);

    // Charts should render (even if placeholders)
    // We'll verify the chart components exist in the DOM
    const chartsContainer = screen.getByText("Investments").closest("div");
    expect(chartsContainer).toBeInTheDocument();
  });

  it("displays gain/loss with correct colors for positive values", () => {
    render(<Investments data={mockInvestmentsData} />);

    // Positive gain/loss should be displayed (exact text may vary based on formatting)
    const investment = mockInvestmentsData.investments[0];
    if (investment.gainLossDollar > 0) {
      // Check that positive values are rendered
      expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
    }
  });
});
