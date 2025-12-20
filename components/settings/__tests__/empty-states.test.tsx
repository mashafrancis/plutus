import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SettingsData } from "@/lib/types/settings";
import { Settings } from "../Settings";

const emptySettingsData: SettingsData = {
  accounts: [],
  categories: [],
  tags: [],
  budgets: [],
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
    enabledInsights: [],
  },
  profile: {
    name: "Demo User",
    email: "demo@plutus.app",
    avatarUrl: null,
  },
};

describe("Settings Empty States", () => {
  it("displays empty state message for accounts", () => {
    render(<Settings data={emptySettingsData} />);

    expect(
      screen.getByText(
        "No accounts yet. Add your first account to get started."
      )
    ).toBeInTheDocument();
  });

  it("displays Add Account button in empty state", () => {
    render(<Settings data={emptySettingsData} />);

    const addButton = screen.getByRole("button", { name: /add account/i });
    expect(addButton).toBeInTheDocument();
  });

  it("displays empty state message for categories", () => {
    render(<Settings data={emptySettingsData} />);

    expect(
      screen.getByText(
        "No categories yet. Add your first category to organize transactions."
      )
    ).toBeInTheDocument();
  });

  it("displays Add Category button in empty state", () => {
    render(<Settings data={emptySettingsData} />);

    const addButton = screen.getByRole("button", { name: /add category/i });
    expect(addButton).toBeInTheDocument();
  });

  it("displays empty state message for tags", () => {
    render(<Settings data={emptySettingsData} />);

    expect(
      screen.getByText(
        "No tags yet. Add tags to better organize your transactions."
      )
    ).toBeInTheDocument();
  });

  it("displays Add Tag button in empty state", () => {
    render(<Settings data={emptySettingsData} />);

    const addButton = screen.getByRole("button", { name: /add tag/i });
    expect(addButton).toBeInTheDocument();
  });

  it("displays empty state message for budgets when on Budgets tab", () => {
    render(<Settings activeTab="budgets" data={emptySettingsData} />);

    expect(
      screen.getByText(
        "No category budgets set. Add budgets to track spending limits."
      )
    ).toBeInTheDocument();
  });

  it("displays Add Budget button in empty state", () => {
    render(<Settings activeTab="budgets" data={emptySettingsData} />);

    const addButton = screen.getByRole("button", { name: /add budget/i });
    expect(addButton).toBeInTheDocument();
  });
});
