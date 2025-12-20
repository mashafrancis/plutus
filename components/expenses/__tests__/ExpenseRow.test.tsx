import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Account, Expense } from "@/lib/types/expenses";
import { ExpenseRow } from "../ExpenseRow";

const mockExpense: Expense = {
  id: "exp-001",
  type: "expense",
  amount: 45.5,
  category: "Food & Dining",
  description: "Coffee & Breakfast",
  date: "2024-12-10",
  accountId: "acc-001",
  tags: ["coffee", "morning"],
  notes: "Morning coffee",
  recurring: false,
};

const mockAccount: Account = {
  id: "acc-001",
  name: "Chase Checking",
  type: "checking",
};

describe("ExpenseRow", () => {
  it("displays expense description", () => {
    render(
      <table>
        <tbody>
          <ExpenseRow account={mockAccount} expense={mockExpense} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Coffee & Breakfast")).toBeInTheDocument();
  });

  it("displays expense category", () => {
    render(
      <table>
        <tbody>
          <ExpenseRow account={mockAccount} expense={mockExpense} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Food & Dining")).toBeInTheDocument();
  });

  it("displays formatted amount", () => {
    render(
      <table>
        <tbody>
          <ExpenseRow account={mockAccount} expense={mockExpense} />
        </tbody>
      </table>
    );

    expect(screen.getByText("$45.50")).toBeInTheDocument();
  });

  it("displays account name", () => {
    render(
      <table>
        <tbody>
          <ExpenseRow account={mockAccount} expense={mockExpense} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Chase Checking")).toBeInTheDocument();
  });

  it("displays tags", () => {
    render(
      <table>
        <tbody>
          <ExpenseRow account={mockAccount} expense={mockExpense} />
        </tbody>
      </table>
    );

    expect(screen.getByText("coffee")).toBeInTheDocument();
    expect(screen.getByText("morning")).toBeInTheDocument();
  });

  it("shows recurring badge when expense is recurring", () => {
    const recurringExpense: Expense = {
      ...mockExpense,
      recurring: true,
      recurringFrequency: "monthly",
    };

    render(
      <table>
        <tbody>
          <ExpenseRow account={mockAccount} expense={recurringExpense} />
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
          <ExpenseRow
            account={mockAccount}
            expense={mockExpense}
            onSelect={onSelect}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(onSelect).toHaveBeenCalledWith("exp-001", true);
  });

  it("calls onEdit when Edit is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <table>
        <tbody>
          <ExpenseRow
            account={mockAccount}
            expense={mockExpense}
            onEdit={onEdit}
          />
        </tbody>
      </table>
    );

    const menuButtons = screen.getAllByRole("button");
    const menuButton = menuButtons[menuButtons.length - 1]; // Last button is the menu trigger
    await user.click(menuButton);

    const editOption = await screen.findByText("Edit");
    await user.click(editOption);
    expect(onEdit).toHaveBeenCalledWith("exp-001");
  });

  it("calls onDelete when Delete is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <table>
        <tbody>
          <ExpenseRow
            account={mockAccount}
            expense={mockExpense}
            onDelete={onDelete}
          />
        </tbody>
      </table>
    );

    const menuButtons = screen.getAllByRole("button");
    const menuButton = menuButtons[menuButtons.length - 1]; // Last button is the menu trigger
    await user.click(menuButton);

    const deleteOption = await screen.findByText("Delete");
    await user.click(deleteOption);
    expect(onDelete).toHaveBeenCalledWith("exp-001");
  });

  it("displays notes when present", () => {
    render(
      <table>
        <tbody>
          <ExpenseRow account={mockAccount} expense={mockExpense} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Morning coffee")).toBeInTheDocument();
  });
});
