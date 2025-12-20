import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Account, Investment } from "@/lib/types/investments";
import { InvestmentRow } from "../InvestmentRow";

const mockInvestment: Investment = {
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
};

const mockAccount: Account = {
  id: "acc-004",
  name: "Robinhood",
  type: "investment",
};

describe("InvestmentRow", () => {
  it("displays investment name", () => {
    render(
      <table>
        <tbody>
          <InvestmentRow account={mockAccount} investment={mockInvestment} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
  });

  it("displays investment ticker", () => {
    render(
      <table>
        <tbody>
          <InvestmentRow account={mockAccount} investment={mockInvestment} />
        </tbody>
      </table>
    );

    expect(screen.getByText("AAPL")).toBeInTheDocument();
  });

  it("displays asset type", () => {
    render(
      <table>
        <tbody>
          <InvestmentRow account={mockAccount} investment={mockInvestment} />
        </tbody>
      </table>
    );

    // Asset type appears as badge text
    const assetTypeElements = screen.getAllByText("Stocks");
    expect(assetTypeElements.length).toBeGreaterThan(0);
  });

  it("displays shares", () => {
    render(
      <table>
        <tbody>
          <InvestmentRow account={mockAccount} investment={mockInvestment} />
        </tbody>
      </table>
    );

    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("displays cost basis", () => {
    render(
      <table>
        <tbody>
          <InvestmentRow account={mockAccount} investment={mockInvestment} />
        </tbody>
      </table>
    );

    // Cost basis formatted as currency
    expect(screen.getByText(/15,000/)).toBeInTheDocument();
  });

  it("displays current value", () => {
    render(
      <table>
        <tbody>
          <InvestmentRow account={mockAccount} investment={mockInvestment} />
        </tbody>
      </table>
    );

    // Current value formatted as currency
    expect(screen.getByText(/18,675/)).toBeInTheDocument();
  });

  it("displays gain/loss for positive values", () => {
    render(
      <table>
        <tbody>
          <InvestmentRow account={mockAccount} investment={mockInvestment} />
        </tbody>
      </table>
    );

    // Positive gain/loss should be displayed
    expect(screen.getByText(/3,675/)).toBeInTheDocument();
    expect(screen.getByText(/24.5%/)).toBeInTheDocument();
  });

  it("displays gain/loss for negative values", () => {
    const negativeInvestment: Investment = {
      ...mockInvestment,
      gainLossDollar: -910.0,
      gainLossPercent: -18.2,
    };

    render(
      <table>
        <tbody>
          <InvestmentRow
            account={mockAccount}
            investment={negativeInvestment}
          />
        </tbody>
      </table>
    );

    // Negative gain/loss should be displayed
    expect(screen.getByText(/-910/)).toBeInTheDocument();
    expect(screen.getByText(/-18.2%/)).toBeInTheDocument();
  });

  it("calls onEdit when edit action is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <table>
        <tbody>
          <InvestmentRow
            account={mockAccount}
            investment={mockInvestment}
            onEdit={onEdit}
          />
        </tbody>
      </table>
    );

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    const editOption = screen.getByText("Edit");
    await user.click(editOption);

    expect(onEdit).toHaveBeenCalledWith("inv-001");
  });

  it("calls onRecordTransaction when Record Transaction action is clicked", async () => {
    const user = userEvent.setup();
    const onRecordTransaction = vi.fn();

    render(
      <table>
        <tbody>
          <InvestmentRow
            account={mockAccount}
            investment={mockInvestment}
            onRecordTransaction={onRecordTransaction}
          />
        </tbody>
      </table>
    );

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    const recordTransactionOption = screen.getByText("Record Transaction");
    await user.click(recordTransactionOption);

    expect(onRecordTransaction).toHaveBeenCalledWith("inv-001");
  });

  it("calls onUpdateValue when Update Value action is clicked", async () => {
    const user = userEvent.setup();
    const onUpdateValue = vi.fn();

    render(
      <table>
        <tbody>
          <InvestmentRow
            account={mockAccount}
            investment={mockInvestment}
            onUpdateValue={onUpdateValue}
          />
        </tbody>
      </table>
    );

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    const updateValueOption = screen.getByText("Update Value");
    await user.click(updateValueOption);

    expect(onUpdateValue).toHaveBeenCalledWith("inv-001");
  });

  it("calls onViewHistory when View History action is clicked", async () => {
    const user = userEvent.setup();
    const onViewHistory = vi.fn();

    render(
      <table>
        <tbody>
          <InvestmentRow
            account={mockAccount}
            investment={mockInvestment}
            onViewHistory={onViewHistory}
          />
        </tbody>
      </table>
    );

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    const viewHistoryOption = screen.getByText("View History");
    await user.click(viewHistoryOption);

    expect(onViewHistory).toHaveBeenCalledWith("inv-001");
  });

  it("calls onDelete when Delete action is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <table>
        <tbody>
          <InvestmentRow
            account={mockAccount}
            investment={mockInvestment}
            onDelete={onDelete}
          />
        </tbody>
      </table>
    );

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    const deleteOption = screen.getByText("Delete");
    await user.click(deleteOption);

    expect(onDelete).toHaveBeenCalledWith("inv-001");
  });
});
