# Investments

## Overview

The Investments section provides a comprehensive view of the user's portfolio with summary metrics, visual breakdowns, and a detailed holdings table. Users can track stocks, ETFs, crypto, bonds, savings, retirement accounts, real estate, and custom assets with cost basis, current value, and gain/loss performance.

## User Flows

- View portfolio summary metrics (total value, invested, gain/loss, today's change, top/worst performers)
- Browse asset allocation via pie chart and sector breakdown
- View portfolio performance over time (line chart) and gain/loss by investment (bar chart)
- Browse all holdings in a sortable, filterable table
- Add a new investment via modal form (name, type, shares, cost basis, current value, account)
- Edit investment details via row action menu opening a modal
- Delete/remove an investment
- Record buy/sell transactions for an investment
- Manually update current value for non-tracked assets
- View transaction history for a specific investment
- Filter investments by asset type, account, gain/loss status, or search

## Design Decisions

- **Chart-heavy layout** — Multiple visualizations for portfolio understanding
- **Performance focus** — Prominent display of gains/losses and today's changes
- **Asset diversity** — Support for multiple asset types (stocks, crypto, real estate, etc.)
- **Transaction tracking** — Record buy/sell history for each investment

## Data Used

**Entities:**
- `SummaryMetrics` — Aggregated portfolio metrics (total value, invested, gain/loss, allocation, performers)
- `Investment` — Individual investment holdings with transaction history
- `ChartData` — Data structured for charts (performance over time, gain/loss by investment, sector breakdown)
- `FilterOptions` — Available filter options (asset types, accounts, gain/loss statuses)

**From global model:** Investments are linked to Accounts

## Visual Reference

See `investments.png` for the target UI design.

## Components Provided

- `Investments` — Main investments component with metrics, charts, filters, and table
- `InvestmentMetricCard` — Displays a single investment metric
- `AllocationChart` — Asset allocation visualization (placeholder for chart library)
- `PerformanceChart` — Portfolio performance over time (placeholder for chart library)
- `GainLossChart` — Gain/loss by investment visualization (placeholder for chart library)
- `SectorBreakdownChart` — Sector breakdown visualization (placeholder for chart library)
- `InvestmentFilterBar` — Filter controls for investments
- `InvestmentRow` — Displays a single investment row in the table

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddInvestment` | Called when user clicks "Add Investment" button |
| `onEditInvestment` | Called when user clicks edit action on an investment row |
| `onDeleteInvestment` | Called when user clicks delete action on an investment row |
| `onRecordTransaction` | Called when user wants to record a transaction for an investment |
| `onUpdateValue` | Called when user wants to manually update current value |
| `onViewHistory` | Called when user views transaction history for an investment |
| `onFilterChange` | Called when user changes any filter |
| `onSort` | Called when user sorts the table by a column |

