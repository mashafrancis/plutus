import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Account, Income } from "@/lib/types/income";
import { IncomeRow } from "../IncomeRow";

const mockIncome: Income = {
  id: "inc-001",
  type: "income",
  amount: 5200.0,
  source: "Salary",
  description: "Monthly Salary",
  date: "2024-12-05",
  accountId: "acc-001",
  tags: ["salary"],
  notes: "December salary payment",
  recurring: false,
};

const mockAccount: Account = {
  id: "acc-001",
  name: "Chase Checking",
  type: "checking",
};

describe("IncomeRow", () => {
  it("displays income description", () => {
    render(
      <table>
        <tbody>
          <IncomeRow account={mockAccount} income={mockIncome} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Monthly Salary")).toBeInTheDocument();
  });

  it("displays income source", () => {
    render(
      <table>
        <tbody>
          <IncomeRow account={mockAccount} income={mockIncome} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Salary")).toBeInTheDocument();
  });

  it("displays formatted amount in green", () => {
    render(
      <table>
        <tbody>
          <IncomeRow account={mockAccount} income={mockIncome} />
        </tbody>
      </table>
    );

    const amountElement = screen.getByText("$5,200.00");
    expect(amountElement).toBeInTheDocument();
    expect(amountElement).toHaveClass("text-emerald-600");
  });

  it("displays account name", () => {
    render(
      <table>
        <tbody>
          <IncomeRow account={mockAccount} income={mockIncome} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Chase Checking")).toBeInTheDocument();
  });

  it("displays tags", () => {
    render(
      <table>
        <tbody>
          <IncomeRow account={mockAccount} income={mockIncome} />
        </tbody>
      </table>
    );

    expect(screen.getByText("salary")).toBeInTheDocument();
  });

  it("shows recurring badge when income is recurring", () => {
    const recurringIncome: Income = {
      ...mockIncome,
      recurring: true,
      recurringFrequency: "monthly",
    };

    render(
      <table>
        <tbody>
          <IncomeRow account={mockAccount} income={recurringIncome} />
        </tbody>
      </table>
    );

    expect(screen.getByText("monthly")).toBeInTheDocument();
  });

  it("calls onSelect when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <table>
        <tbody>
          <IncomeRow
            account={mockAccount}
            income={mockIncome}
            onSelect={onSelect}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(onSelect).toHaveBeenCalledWith("inc-001", true);
  });

  it("calls onEdit when Edit is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <table>
        <tbody>
          <IncomeRow
            account={mockAccount}
            income={mockIncome}
            onEdit={onEdit}
          />
        </tbody>
      </table>
    );

    const menuButtons = screen.getAllByRole("button");
    const menuButton = menuButtons[menuButtons.length - 1];
    await user.click(menuButton);

    const editOption = await screen.findByText("Edit");
    await user.click(editOption);
    expect(onEdit).toHaveBeenCalledWith("inc-001");
  });

  it("calls onDelete when Delete is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <table>
        <tbody>
          <IncomeRow
            account={mockAccount}
            income={mockIncome}
            onDelete={onDelete}
          />
        </tbody>
      </table>
    );

    const menuButtons = screen.getAllByRole("button");
    const menuButton = menuButtons[menuButtons.length - 1];
    await user.click(menuButton);

    const deleteOption = await screen.findByText("Delete");
    await user.click(deleteOption);
    expect(onDelete).toHaveBeenCalledWith("inc-001");
  });

  it("displays notes when present", () => {
    render(
      <table>
        <tbody>
          <IncomeRow account={mockAccount} income={mockIncome} />
        </tbody>
      </table>
    );

    expect(screen.getByText("December salary payment")).toBeInTheDocument();
  });
});
