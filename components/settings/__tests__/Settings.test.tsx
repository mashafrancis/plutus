import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { SettingsData } from "@/lib/types/settings";
import { Settings } from "../Settings";

const mockSettingsData: SettingsData = {
  accounts: [
    {
      id: "acc-001",
      name: "Chase Checking",
      type: "checking",
      currentBalance: 5420.5,
      isDefault: true,
      isArchived: false,
      notes: "Primary checking account",
    },
    {
      id: "acc-002",
      name: "Amex Platinum",
      type: "credit",
      currentBalance: -1250.0,
      isDefault: false,
      isArchived: false,
    },
  ],
  categories: [
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
  ],
  tags: [
    { id: "tag-001", name: "recurring", usageCount: 12 },
    { id: "tag-002", name: "work", usageCount: 8 },
  ],
  budgets: [
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
  ],
  preferences: {
    theme: "system",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    emailNotifications: {
      enabled: true,
      budgetAlerts: true,
      subscriptionReminders: true,
      weeklySummary: false,
      monthlyReport: true,
    },
    inAppNotifications: {
      enabled: true,
      budgetAlerts: true,
      subscriptionReminders: true,
      insights: true,
    },
    subscriptionReminderDays: 3,
    enabledInsights: ["spendingAnomalies", "topCategories"],
  },
  profile: {
    name: "Demo User",
    email: "demo@plutus.app",
    avatarUrl: null,
  },
};

describe("Settings", () => {
  it("renders Settings component with default Financial tab", () => {
    render(<Settings data={mockSettingsData} />);

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Financial")).toBeInTheDocument();
    expect(screen.getByText("Budgets")).toBeInTheDocument();
    expect(screen.getByText("General")).toBeInTheDocument();
  });

  it("switches tabs when clicking tab triggers", async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();

    render(<Settings data={mockSettingsData} onTabChange={onTabChange} />);

    const budgetsTab = screen.getByRole("tab", { name: "Budgets" });
    await user.click(budgetsTab);

    expect(onTabChange).toHaveBeenCalledWith("budgets");
  });

  it("renders Financial tab content by default", () => {
    render(<Settings data={mockSettingsData} />);

    expect(screen.getByText("Accounts")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
  });

  it("renders Budgets tab content when active", async () => {
    const user = userEvent.setup();
    render(<Settings activeTab="budgets" data={mockSettingsData} />);

    expect(screen.getByText("Category Budgets")).toBeInTheDocument();
  });

  it("renders General tab content when active", async () => {
    const user = userEvent.setup();
    render(<Settings activeTab="general" data={mockSettingsData} />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Preferences")).toBeInTheDocument();
    expect(screen.getByText("Data Management")).toBeInTheDocument();
  });
});
