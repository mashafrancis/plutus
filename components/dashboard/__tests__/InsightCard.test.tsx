import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Insight } from "@/lib/types/dashboard";
import { InsightCard } from "../InsightCard";

describe("InsightCard", () => {
  const mockInsight: Insight = {
    id: "insight-001",
    type: "spending_anomaly",
    title: "Higher than usual spending",
    message: "You spent 15% more on Food & Dining this month",
    severity: "warning",
    actionLabel: "Review spending",
    dismissed: false,
  };

  it("displays insight title", () => {
    render(<InsightCard insight={mockInsight} />);

    expect(screen.getByText("Higher than usual spending")).toBeInTheDocument();
  });

  it("displays insight message", () => {
    render(<InsightCard insight={mockInsight} />);

    expect(
      screen.getByText("You spent 15% more on Food & Dining this month")
    ).toBeInTheDocument();
  });

  it("shows action button when actionLabel exists and onAction is provided", () => {
    const onAction = vi.fn();
    render(<InsightCard insight={mockInsight} onAction={onAction} />);

    expect(screen.getByText("Review spending →")).toBeInTheDocument();
  });

  it("calls onAction when action button is clicked", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(<InsightCard insight={mockInsight} onAction={onAction} />);

    await user.click(screen.getByText("Review spending →"));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    render(<InsightCard insight={mockInsight} onDismiss={onDismiss} />);

    const dismissButton = screen.getByLabelText("Dismiss insight");
    await user.click(dismissButton);
    expect(onDismiss).toHaveBeenCalledWith("insight-001");
  });

  it("applies warning severity styling", () => {
    const { container } = render(<InsightCard insight={mockInsight} />);

    const card = container.querySelector(".bg-amber-50");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("border-amber-200");
  });

  it("applies info severity styling", () => {
    const infoInsight: Insight = {
      ...mockInsight,
      severity: "info",
    };

    const { container } = render(<InsightCard insight={infoInsight} />);

    const card = container.querySelector(".bg-blue-50");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("border-blue-200");
  });

  it("applies success severity styling", () => {
    const successInsight: Insight = {
      ...mockInsight,
      severity: "success",
    };

    const { container } = render(<InsightCard insight={successInsight} />);

    const card = container.querySelector(".bg-green-50");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("border-green-200");
  });

  it("applies error severity styling", () => {
    const errorInsight: Insight = {
      ...mockInsight,
      severity: "error",
    };

    const { container } = render(<InsightCard insight={errorInsight} />);

    const card = container.querySelector(".bg-red-50");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("border-red-200");
  });

  it("does not show action button when actionLabel is empty", () => {
    const insightWithoutAction: Insight = {
      ...mockInsight,
      actionLabel: "",
    };

    render(<InsightCard insight={insightWithoutAction} />);

    expect(screen.queryByText(/→/)).not.toBeInTheDocument();
  });
});
