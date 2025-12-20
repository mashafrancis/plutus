# Dashboard

## Overview

The Dashboard is the central hub of Plutus, providing a comprehensive financial snapshot at a glance. It displays key metrics like net worth and cash flow, visualizes spending patterns and investment performance through charts, surfaces smart insights, and shows recent activity and upcoming payments. Users can quickly add transactions and navigate to detailed reports.

## User Flows

- View financial summary with key metrics (net worth, cash flow, savings rate, balances)
- Switch between timeframes (week, month, quarter, year, custom range)
- Review spending by category and income by source through interactive charts
- Check budget progress against monthly targets
- See upcoming subscription payments for the month
- Review 5 most recent transactions
- Read and act on smart insights (spending anomalies, trends, recommendations)
- Quickly add an expense or income entry via quick action buttons
- Navigate to detailed reports

## Design Decisions

- **Refined Utility aesthetic** — Clean, data-dense layout optimized for quick scanning
- **Metric cards** — Prominent display of key financial indicators with trend indicators
- **Interactive charts** — Clickable charts that navigate to detailed views
- **Smart insights** — Contextual alerts surfaced prominently but dismissible
- **Quick actions** — Prominent buttons for common actions (add expense/income)

## Data Used

**Entities:**
- `Metrics` — Aggregated financial metrics (net worth, cash flow, savings rate, etc.)
- `CashFlowDataPoint` — Monthly income vs expenses data
- `NetWorthDataPoint` — Net worth over time
- `CategorySpending` — Spending breakdown by category
- `IncomeBySource` — Income breakdown by source
- `BudgetProgress` — Budget status per category
- `InvestmentPerformance` — Portfolio metrics and holdings
- `Subscription` — Upcoming subscription payments
- `Transaction` — Recent transaction activity
- `Insight` — Smart insights and alerts

**From global model:** Metrics aggregate data from Transactions, Subscriptions, Investments, and Accounts

## Visual Reference

See `dashboard.png` for the target UI design.

## Components Provided

- `Dashboard` — Main dashboard component orchestrating all sections
- `MetricCard` — Displays a single financial metric with trend indicator
- `InsightCard` — Displays a smart insight with severity styling
- `TransactionRow` — Displays a single recent transaction
- `SubscriptionItem` — Displays an upcoming subscription payment
- `BudgetProgressBar` — Displays budget progress for a category
- `SpendingChart` — Horizontal bar chart for spending by category
- `IncomeChart` — Horizontal bar chart for income by source

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddExpense` | Called when user clicks "Add Expense" button |
| `onAddIncome` | Called when user clicks "Add Income" button |
| `onViewReports` | Called when user clicks "View Reports" button |
| `onDismissInsight` | Called when user dismisses an insight card |
| `onTimeframeChange` | Called when user changes the timeframe selector |
| `onViewTransaction` | Called when user clicks on a transaction row |
| `onViewSubscription` | Called when user clicks on a subscription item |
| `onViewCategory` | Called when user clicks on a category in spending chart |
| `onViewBudget` | Called when user clicks on a budget progress bar |

