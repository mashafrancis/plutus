import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Account, Subscription } from "@/lib/types/subscriptions";
import { SubscriptionRow } from "../SubscriptionRow";

const mockSubscription: Subscription = {
  id: "sub-001",
  name: "Netflix Premium",
  category: "Streaming",
  amount: 22.99,
  billingCycle: "monthly",
  nextPaymentDate: "2024-12-22",
  status: "active",
  paymentMethodId: "acc-001",
  startDate: "2022-03-15",
  totalSpent: 643.72,
  paymentHistory: [],
};

const mockAccount: Account = {
  id: "acc-001",
  name: "Chase Checking",
  type: "checking",
};

describe("SubscriptionRow", () => {
  it("displays subscription name", () => {
    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            subscription={mockSubscription}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("Netflix Premium")).toBeInTheDocument();
  });

  it("displays subscription category", () => {
    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            subscription={mockSubscription}
          />
        </tbody>
      </table>
    );

    // Category appears as badge text
    const categoryElements = screen.getAllByText("Streaming");
    expect(categoryElements.length).toBeGreaterThan(0);
  });

  it("displays formatted amount", () => {
    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            subscription={mockSubscription}
          />
        </tbody>
      </table>
    );

    const amountElement = screen.getByText("$22.99");
    expect(amountElement).toBeInTheDocument();
  });

  it("displays billing cycle", () => {
    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            subscription={mockSubscription}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("monthly")).toBeInTheDocument();
  });

  it("displays status badge for active subscription", () => {
    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            subscription={mockSubscription}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("active")).toBeInTheDocument();
  });

  it("displays status badge for paused subscription", () => {
    const pausedSubscription: Subscription = {
      ...mockSubscription,
      status: "paused",
    };

    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            subscription={pausedSubscription}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("paused")).toBeInTheDocument();
  });

  it("calls onSelect when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            onSelect={onSelect}
            subscription={mockSubscription}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(onSelect).toHaveBeenCalledWith("sub-001", true);
  });

  it("calls onEdit when Edit is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            onEdit={onEdit}
            subscription={mockSubscription}
          />
        </tbody>
      </table>
    );

    const menuButtons = screen.getAllByRole("button");
    const menuButton = menuButtons[menuButtons.length - 1];
    await user.click(menuButton);

    const editOption = await screen.findByText("Edit");
    await user.click(editOption);
    expect(onEdit).toHaveBeenCalledWith("sub-001");
  });

  it("calls onPause when Pause is clicked", async () => {
    const user = userEvent.setup();
    const onPause = vi.fn();

    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            onPause={onPause}
            subscription={mockSubscription}
          />
        </tbody>
      </table>
    );

    const menuButtons = screen.getAllByRole("button");
    const menuButton = menuButtons[menuButtons.length - 1];
    await user.click(menuButton);

    const pauseOption = await screen.findByText("Pause");
    await user.click(pauseOption);
    expect(onPause).toHaveBeenCalledWith("sub-001");
  });

  it("calls onViewHistory when View History is clicked", async () => {
    const user = userEvent.setup();
    const onViewHistory = vi.fn();

    render(
      <table>
        <tbody>
          <SubscriptionRow
            account={mockAccount}
            onViewHistory={onViewHistory}
            subscription={mockSubscription}
          />
        </tbody>
      </table>
    );

    const menuButtons = screen.getAllByRole("button");
    const menuButton = menuButtons[menuButtons.length - 1];
    await user.click(menuButton);

    const historyOption = await screen.findByText("View History");
    await user.click(historyOption);
    expect(onViewHistory).toHaveBeenCalledWith("sub-001");
  });
});
