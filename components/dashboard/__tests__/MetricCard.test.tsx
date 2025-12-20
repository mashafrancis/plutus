import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { MetricValue } from "@/lib/types/dashboard";
import { MetricCard } from "../MetricCard";

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const formatPercentage = (value: number): string => `${value.toFixed(1)}%`;

describe("MetricCard", () => {
  const upTrendMetric: MetricValue = {
    value: 125_000,
    previousValue: 120_000,
    change: 5000,
    changePercent: 4.2,
    trend: "up",
  };

  const downTrendMetric: MetricValue = {
    value: 3240,
    previousValue: 3580,
    change: -340,
    changePercent: -9.5,
    trend: "down",
  };

  const neutralTrendMetric: MetricValue = {
    value: 1000,
    previousValue: 1000,
    change: 0,
    changePercent: 0,
    trend: "neutral",
  };

  it("displays label text", () => {
    render(
      <MetricCard
        formatValue={formatCurrency}
        label="Net Worth"
        metric={upTrendMetric}
      />
    );

    expect(screen.getByText("Net Worth")).toBeInTheDocument();
  });

  it("displays formatted value", () => {
    render(
      <MetricCard
        formatValue={formatCurrency}
        label="Net Worth"
        metric={upTrendMetric}
      />
    );

    expect(screen.getByText("$125,000.00")).toBeInTheDocument();
  });

  it("displays previous period value", () => {
    render(
      <MetricCard
        formatValue={formatCurrency}
        label="Net Worth"
        metric={upTrendMetric}
      />
    );

    expect(screen.getByText(/last period/)).toBeInTheDocument();
    expect(screen.getByText("$120,000.00 last period")).toBeInTheDocument();
  });

  it("shows up trend with green color and positive percentage", () => {
    render(
      <MetricCard
        formatValue={formatCurrency}
        label="Net Worth"
        metric={upTrendMetric}
      />
    );

    const changeElement = screen.getByText("+4.2%");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement.closest("div")).toHaveClass("text-green-600");
  });

  it("shows down trend with red color and negative percentage", () => {
    render(
      <MetricCard
        formatValue={formatCurrency}
        label="Monthly Spending"
        metric={downTrendMetric}
      />
    );

    const changeElement = screen.getByText("-9.5%");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement.closest("div")).toHaveClass("text-red-600");
  });

  it("shows neutral trend with neutral color", () => {
    render(
      <MetricCard
        formatValue={formatCurrency}
        label="Balance"
        metric={neutralTrendMetric}
      />
    );

    const changeElement = screen.getByText("0.0%");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement.closest("div")).toHaveClass("text-neutral-600");
  });

  it("works with percentage formatter", () => {
    const savingsRateMetric: MetricValue = {
      value: 28.5,
      previousValue: 24.2,
      change: 4.3,
      changePercent: 17.77,
      trend: "up",
    };

    render(
      <MetricCard
        formatValue={formatPercentage}
        label="Savings Rate"
        metric={savingsRateMetric}
      />
    );

    expect(screen.getByText("28.5%")).toBeInTheDocument();
    expect(screen.getByText("24.2% last period")).toBeInTheDocument();
  });
});
