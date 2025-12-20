import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Preferences, Profile } from "@/lib/types/settings";
import { GeneralTab } from "../GeneralTab";

const mockPreferences: Preferences = {
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
};

const mockProfile: Profile = {
  name: "Demo User",
  email: "demo@plutus.app",
  avatarUrl: null,
};

describe("GeneralTab", () => {
  it("renders Profile section", () => {
    render(<GeneralTab preferences={mockPreferences} profile={mockProfile} />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Demo User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("demo@plutus.app")).toBeInTheDocument();
  });

  it("renders Preferences section", () => {
    render(<GeneralTab preferences={mockPreferences} profile={mockProfile} />);

    expect(screen.getByText("Preferences")).toBeInTheDocument();
  });

  it("renders Data Management section", () => {
    render(<GeneralTab preferences={mockPreferences} profile={mockProfile} />);

    expect(screen.getByText("Data Management")).toBeInTheDocument();
    expect(screen.getByText("Export CSV")).toBeInTheDocument();
    expect(screen.getByText("Export JSON")).toBeInTheDocument();
    expect(screen.getByText("Export PDF")).toBeInTheDocument();
  });

  it("calls onExportData when export button is clicked", async () => {
    const user = userEvent.setup();
    const onExportData = vi.fn();

    render(
      <GeneralTab
        onExportData={onExportData}
        preferences={mockPreferences}
        profile={mockProfile}
      />
    );

    const csvButton = screen.getByText("Export CSV");
    await user.click(csvButton);

    expect(onExportData).toHaveBeenCalledWith("csv", undefined);
  });

  it("calls onDeleteAllData when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDeleteAllData = vi.fn();

    render(
      <GeneralTab
        onDeleteAllData={onDeleteAllData}
        preferences={mockPreferences}
        profile={mockProfile}
      />
    );

    const deleteButton = screen.getByText("Delete All Data");
    await user.click(deleteButton);

    expect(onDeleteAllData).toHaveBeenCalled();
  });

  it("calls onUpdatePreferences when theme is changed", async () => {
    const user = userEvent.setup();
    const onUpdatePreferences = vi.fn();

    render(
      <GeneralTab
        onUpdatePreferences={onUpdatePreferences}
        preferences={mockPreferences}
        profile={mockProfile}
      />
    );

    const themeSelect = screen.getByLabelText("Theme");
    await user.click(themeSelect);
    const darkOption = screen.getByText("Dark");
    await user.click(darkOption);

    expect(onUpdatePreferences).toHaveBeenCalledWith({ theme: "dark" });
  });
});
