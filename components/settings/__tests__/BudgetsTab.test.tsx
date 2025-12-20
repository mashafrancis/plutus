import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Budget, Category } from "@/lib/types/settings";
import { BudgetsTab } from "../BudgetsTab";

const mockBudgets: Budget[] = [
  {
    id: "budget-001",
    categoryId: "cat-001",
    categoryName: "Housing",
    limit: 2000.0,
    currentSpending: 1850.0,
    period: "monthly",
    rolloverEnabled: false,
    recurringEnabled: true,
    alertThreshold: 80,
    alertThresholdType: "percentage",
  },
  {
    id: "budget-002",
    categoryId: null,
    categoryName: "Overall",
    limit: 4000.0,
    currentSpending: 3240.0,
    period: "monthly",
    rolloverEnabled: false,
    recurringEnabled: true,
    alertThreshold: 80,
    alertThresholdType: "percentage",
  },
];

const mockCategories: Category[] = [
  {
    id: "cat-001",
    name: "Housing",
    icon: "home",
    color: "blue",
    type: "expense",
    parentId: null,
    isArchived: false,
    isDefault: true,
  },
];

describe("BudgetsTab", () => {
  it("renders empty state when no budgets", () => {
    render(<BudgetsTab budgets={[]} categories={mockCategories} />);

    expect(
      screen.getByText(
        "No category budgets set. Add budgets to track spending limits."
      )
    ).toBeInTheDocument();
  });

  it("renders overall budget when present", () => {
    render(<BudgetsTab budgets={mockBudgets} categories={mockCategories} />);

    expect(screen.getByText("Overall Budget")).toBeInTheDocument();
    expect(screen.getByText("Overall")).toBeInTheDocument();
  });

  it("renders category budgets", () => {
    render(<BudgetsTab budgets={mockBudgets} categories={mockCategories} />);

    expect(screen.getByText("Category Budgets")).toBeInTheDocument();
    expect(screen.getByText("Housing")).toBeInTheDocument();
  });

  it("calls onAddBudget when Add Budget button is clicked", async () => {
    const user = userEvent.setup();
    const onAddBudget = vi.fn();

    render(
      <BudgetsTab
        budgets={mockBudgets}
        categories={mockCategories}
        onAddBudget={onAddBudget}
      />
    );

    const addButton = screen.getByRole("button", { name: /add budget/i });
    await user.click(addButton);

    expect(onAddBudget).toHaveBeenCalled();
  });

  it("calls onUpdateBudget when rollover toggle is changed", async () => {
    const user = userEvent.setup();
    const onUpdateBudget = vi.fn();

    render(
      <BudgetsTab
        budgets={mockBudgets}
        categories={mockCategories}
        onUpdateBudget={onUpdateBudget}
      />
    );

    const rolloverSwitches = screen.getAllByLabelText("Rollover");
    await user.click(rolloverSwitches[0]!);

    expect(onUpdateBudget).toHaveBeenCalledWith("budget-001", {
      rolloverEnabled: true,
    });
  });

  it("calls onUpdateBudget when recurring toggle is changed", async () => {
    const user = userEvent.setup();
    const onUpdateBudget = vi.fn();

    render(
      <BudgetsTab
        budgets={mockBudgets}
        categories={mockCategories}
        onUpdateBudget={onUpdateBudget}
      />
    );

    const recurringSwitches = screen.getAllByLabelText("Recurring");
    await user.click(recurringSwitches[0]!);

    expect(onUpdateBudget).toHaveBeenCalledWith("budget-001", {
      recurringEnabled: false,
    });
  });
});
