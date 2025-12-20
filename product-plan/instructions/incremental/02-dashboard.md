# Milestone 2: Dashboard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Dashboard feature — the central hub showing cash flow, net worth trend, top categories, investment performance, and smart insights.

## Overview

The Dashboard provides a comprehensive financial snapshot at a glance. Users can view key metrics like net worth and cash flow, visualize spending patterns and investment performance through charts, surface smart insights, and see recent activity and upcoming payments. Users can quickly add transactions and navigate to detailed reports.

**Key Functionality:**
- View financial summary with 6 key metrics (net worth, cash flow, savings rate, balances)
- Switch between timeframes (week, month, quarter, year, custom range)
- Review spending by category and income by source through interactive charts
- Check budget progress against monthly targets
- See upcoming subscription payments for the month
- Review 5 most recent transactions
- Read and act on smart insights (spending anomalies, trends, recommendations)
- Quickly add an expense or income entry via quick action buttons
- Navigate to detailed reports

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/dashboard/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

The test instructions are framework-agnostic — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/dashboard/components/`:

- `Dashboard.tsx` — Main dashboard component
- `MetricCard.tsx` — Displays a single financial metric
- `InsightCard.tsx` — Displays a smart insight
- `TransactionRow.tsx` — Displays a recent transaction
- `SubscriptionItem.tsx` — Displays an upcoming subscription
- `BudgetProgressBar.tsx` — Displays budget progress
- `SpendingChart.tsx` — Spending by category chart
- `IncomeChart.tsx` — Income by source chart

### Data Layer

The components expect these data shapes (see `product-plan/sections/dashboard/types.ts`):

```typescript
interface DashboardData {
  metrics: Metrics
  cashFlowData: CashFlowDataPoint[]
  netWorthData: NetWorthDataPoint[]
  spendingByCategory: CategorySpending[]
  incomeBySource: IncomeBySource[]
  budgetProgress: BudgetProgress[]
  investmentPerformance: InvestmentPerformance
  upcomingSubscriptions: Subscription[]
  recentTransactions: Transaction[]
  insights: Insight[]
  accounts: Account[]
}
```

You'll need to:
- Create API endpoints to fetch dashboard data
- Aggregate metrics from transactions, subscriptions, investments
- Calculate cash flow, net worth trends, spending by category
- Generate smart insights based on spending patterns
- Connect real data to the components

### Callbacks

Wire up these user actions:

- `onAddExpense` — Navigate to expenses page or open add expense modal
- `onAddIncome` — Navigate to income page or open add income modal
- `onViewReports` — Navigate to reports page
- `onDismissInsight` — Mark insight as dismissed in database
- `onTimeframeChange` — Fetch data for new timeframe
- `onViewTransaction` — Navigate to transaction details or expenses filtered by transaction
- `onViewSubscription` — Navigate to subscriptions page filtered by subscription
- `onViewCategory` — Navigate to expenses filtered by category
- `onViewBudget` — Navigate to settings budgets tab or budget details

### Empty States

Implement empty state UI for when no records exist yet:

- **No transactions yet:** Show "No recent transactions" message
- **No subscriptions:** Show "No upcoming payments" message
- **No budgets:** Show "No budgets set" message with link to settings
- **No investments:** Show "No investments yet" message
- **No insights:** Hide insights section entirely (don't show empty state)

The provided components include empty state designs — make sure to render them when data is empty rather than showing blank screens.

## Files to Reference

- `product-plan/sections/dashboard/README.md` — Feature overview and design intent
- `product-plan/sections/dashboard/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/dashboard/components/` — React components
- `product-plan/sections/dashboard/types.ts` — TypeScript interfaces
- `product-plan/sections/dashboard/sample-data.json` — Test data
- `product-plan/sections/dashboard/dashboard.png` — Visual reference

## Expected User Flows

### Flow 1: View Financial Overview

1. User navigates to `/` (dashboard route)
2. User sees heading "Dashboard" with subtitle "Your financial overview at a glance"
3. User sees 6 metric cards displaying financial metrics
4. User sees timeframe selector with "month" selected by default
5. User sees charts, budget progress, investment performance, insights, upcoming payments, and recent activity
6. **Outcome:** User has a complete view of their financial status

### Flow 2: Add Expense from Dashboard

1. User clicks "Add Expense" button in dashboard header
2. User is navigated to expenses page or add expense modal opens
3. User fills in expense details and saves
4. **Outcome:** New expense appears in recent activity, metrics update

### Flow 3: Navigate to Category Details

1. User clicks on a category in the "Spending by Category" chart
2. User is navigated to expenses page filtered by that category
3. **Outcome:** User sees all expenses for that category

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly when no records exist
- [ ] All user actions work (add expense/income, navigate to details)
- [ ] Timeframe selector updates data correctly
- [ ] Insights can be dismissed
- [ ] Charts render correctly (may need chart library integration)
- [ ] Matches the visual design
- [ ] Responsive on mobile

