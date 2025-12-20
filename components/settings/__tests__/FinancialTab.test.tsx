import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Account, Category, Tag } from "@/lib/types/settings";
import { FinancialTab } from "../FinancialTab";

const mockAccounts: Account[] = [
  {
    id: "acc-001",
    name: "Chase Checking",
    type: "checking",
    currentBalance: 5420.5,
    isDefault: true,
    isArchived: false,
  },
  {
    id: "acc-002",
    name: "Amex Platinum",
    type: "credit",
    currentBalance: -1250.0,
    isDefault: false,
    isArchived: false,
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
  {
    id: "cat-002",
    name: "Rent",
    icon: "key",
    color: "blue",
    type: "expense",
    parentId: "cat-001",
    isArchived: false,
    isDefault: true,
  },
];

const mockTags: Tag[] = [
  { id: "tag-001", name: "recurring", usageCount: 12 },
  { id: "tag-002", name: "work", usageCount: 8 },
];

describe("FinancialTab", () => {
  it("renders accounts section with empty state when no accounts", () => {
    render(<FinancialTab accounts={[]} categories={[]} tags={[]} />);

    expect(
      screen.getByText(
        "No accounts yet. Add your first account to get started."
      )
    ).toBeInTheDocument();
  });

  it("renders accounts list when accounts exist", () => {
    render(<FinancialTab accounts={mockAccounts} categories={[]} tags={[]} />);

    expect(screen.getByText("Chase Checking")).toBeInTheDocument();
    expect(screen.getByText("Amex Platinum")).toBeInTheDocument();
  });

  it("calls onAddAccount when Add Account button is clicked", async () => {
    const user = userEvent.setup();
    const onAddAccount = vi.fn();

    render(
      <FinancialTab
        accounts={mockAccounts}
        categories={[]}
        onAddAccount={onAddAccount}
        tags={[]}
      />
    );

    const addButton = screen.getByRole("button", { name: /add account/i });
    await user.click(addButton);

    expect(onAddAccount).toHaveBeenCalled();
  });

  it("renders categories section with empty state when no categories", () => {
    render(<FinancialTab accounts={[]} categories={[]} tags={[]} />);

    expect(
      screen.getByText(
        "No categories yet. Add your first category to organize transactions."
      )
    ).toBeInTheDocument();
  });

  it("renders categories with hierarchy", () => {
    render(
      <FinancialTab accounts={[]} categories={mockCategories} tags={[]} />
    );

    expect(screen.getByText("Housing")).toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();
  });

  it("renders tags section with empty state when no tags", () => {
    render(<FinancialTab accounts={[]} categories={[]} tags={[]} />);

    expect(
      screen.getByText(
        "No tags yet. Add tags to better organize your transactions."
      )
    ).toBeInTheDocument();
  });

  it("renders tags list when tags exist", () => {
    render(<FinancialTab accounts={[]} categories={[]} tags={mockTags} />);

    expect(screen.getByText("recurring")).toBeInTheDocument();
    expect(screen.getByText("work")).toBeInTheDocument();
  });

  it("shows archived accounts in separate section", () => {
    const archivedAccount: Account = {
      id: "acc-003",
      name: "Old Account",
      type: "checking",
      currentBalance: 0,
      isDefault: false,
      isArchived: true,
    };

    render(
      <FinancialTab
        accounts={[...mockAccounts, archivedAccount]}
        categories={[]}
        tags={[]}
      />
    );

    expect(screen.getByText("Archived Accounts")).toBeInTheDocument();
    expect(screen.getByText("Old Account")).toBeInTheDocument();
  });
});
