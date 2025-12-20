# Plutus — Complete Implementation Instructions

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

# Plutus — Product Overview

## Summary

Plutus is a privacy-first personal finance app that helps individuals track, understand, and improve their financial life in one place — covering expenses, income, subscriptions, investments, and net worth. Unlike traditional finance apps, Plutus puts users in control with no mandatory bank connections, full data ownership, and smart insights that surface meaningful patterns.

## Planned Sections

1. **Dashboard** — Central hub showing cash flow, net worth trend, top categories, investment performance, and smart insights.
2. **Expenses** — Track spending with categories, tags, dates, payment methods, recurring entries, and filtering.
3. **Income** — Record earnings from multiple sources (salary, freelance, passive) with recurring and one-time entries.
4. **Subscriptions** — Manage recurring payments with billing frequency, next payment dates, spend history, and renewal alerts.
5. **Investments** — Track stocks, ETFs, crypto, savings, and retirement with cost basis, current value, and gains/losses.
6. **Settings** — Manage accounts, categories, budgets, data export, and privacy preferences.

## Data Model

**Core Entities:**
- **Account** — Wallets, bank accounts, cards, and investment accounts
- **Transaction** — Individual expenses and income entries
- **Category** — Groups for organizing expenses and income
- **Subscription** — Recurring payments with billing frequency and renewal alerts
- **Investment** — Holdings with cost basis, current value, and gains/losses
- **Liability** — Debts, loans, and credit cards
- **Budget** — Monthly spending targets per category or overall
- **Tag** — Optional labels for filtering and organizing transactions
- **Insight** — Smart alerts and patterns surfaced by the system

**Relationships:**
- Transaction belongs to Account and Category
- Transaction can have many Tags
- Subscription, Investment, and Liability are linked to Accounts
- Budget is set per Category (or overall)
- Insight references Transactions, Subscriptions, or Investments for context

## Design System

**Colors:**
- Primary: `blue` — Used for buttons, links, key accents
- Secondary: `sky` — Used for tags, highlights, secondary elements
- Neutral: `neutral` — Used for backgrounds, text, borders

**Typography:**
- Heading: `Geist Sans` — Used for headings and titles
- Body: `Geist Sans` — Used for body text
- Mono: `Geist Mono` — Used for code, numbers, and technical content

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing structure, and application shell
2. **Dashboard** — Implement the central hub with metrics, charts, and insights
3. **Expenses** — Build expense tracking with filtering, categories, and bulk actions
4. **Income** — Implement income tracking with multiple sources and recurring entries
5. **Subscriptions** — Build subscription management with renewal alerts and payment history
6. **Investments** — Implement investment tracking with portfolio metrics and charts
7. **Settings** — Build settings for accounts, categories, budgets, preferences, and data management

Each milestone has a dedicated instruction document in `product-plan/instructions/`.

---

# Milestone 1: Foundation

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:**
- Primary: `blue` — Used for buttons, links, key accents
- Secondary: `sky` — Used for tags, highlights, secondary elements
- Neutral: `neutral` — Used for backgrounds, text, borders

**Typography:**
- Heading: `Geist Sans` — Used for headings and titles
- Body: `Geist Sans` — Used for body text
- Mono: `Geist Mono` — Used for code, numbers, and technical content

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:**
- `Account` — Financial accounts (checking, savings, credit, cash, investment)
- `Transaction` — Expenses and income entries
- `Category` — Expense and income categories
- `Subscription` — Recurring payments
- `Investment` — Investment holdings
- `Liability` — Debts and loans
- `Budget` — Spending limits and targets
- `Tag` — Transaction tags
- `Insight` — Smart insights and alerts

### 3. Routing Structure

Create placeholder routes for each section:

- `/` — Dashboard (default/home)
- `/expenses` — Expenses section
- `/income` — Income section
- `/subscriptions` — Subscriptions section
- `/investments` — Investments section
- `/settings` — Settings section

Routes can be placeholder pages initially — you'll implement each section in subsequent milestones.

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu with avatar

**Wire Up Navigation:**

Connect navigation to your routing. The navigation expects these items:

```typescript
const navigationItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard, isActive: currentRoute === '/' },
  { label: 'Expenses', href: '/expenses', icon: ArrowDownCircle, isActive: currentRoute === '/expenses' },
  { label: 'Income', href: '/income', icon: ArrowUpCircle, isActive: currentRoute === '/income' },
  { label: 'Subscriptions', href: '/subscriptions', icon: RefreshCw, isActive: currentRoute === '/subscriptions' },
  { label: 'Investments', href: '/investments', icon: TrendingUp, isActive: currentRoute === '/investments' },
  { label: 'Settings', href: '/settings', icon: Settings, isActive: currentRoute === '/settings' },
]
```

**User Menu:**

The user menu expects:
- User name
- Avatar URL (optional)
- Logout callback

**Note on UI Components:**

The shell components reference UI components at `../../ui/button`, `../../ui/avatar`, etc. You'll need to:
- Create these UI components in your project, OR
- Adjust the import paths to match your UI component library location

Common UI components needed:
- `Button` — Standard button component
- `Avatar` — Avatar component with fallback initials
- `Card` — Card container component
- `Table` — Table components (Table, TableBody, TableHead, TableHeader, TableRow)
- `Tabs` — Tab navigation components
- `Checkbox` — Checkbox component
- `Switch` — Toggle switch component
- `Select` — Dropdown select component
- `DropdownMenu` — Dropdown menu component

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components
- `product-plan/shell/spec.md` — Shell specification

## Done When

- [ ] Design tokens are configured (colors, fonts)
- [ ] Data model types are defined (TypeScript interfaces)
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Logout functionality works
- [ ] Responsive on mobile (sidebar collapses/hamburger menu)
- [ ] Dark mode support works (if implementing dark mode)

---

# Milestone 2: Dashboard

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

---

# Milestone 3: Expenses

## Goal

Implement the Expenses feature — comprehensive expense tracking with filtering, categories, and bulk operations.

## Overview

The Expenses section provides a comprehensive view of all spending activity. It features summary metrics at the top showing key spending insights, followed by a powerful filterable table of all expenses with support for bulk operations and recurring expense tracking.

**Key Functionality:**
- View summary metrics for the current spending period
- Browse all expenses in a sortable, filterable table
- Add a new expense via modal form (category, amount, date, account, tags, notes, recurring flag)
- Edit an expense via row action menu opening a modal
- Delete individual expenses or bulk delete selected items
- Filter expenses by date range, category, account, tags, amount range, or recurring status
- Search expenses by description or notes
- Select multiple expenses for bulk actions (delete, re-categorize, add tags)

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/expenses/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/expenses/components/`:

- `Expenses.tsx` — Main expenses component
- `ExpenseMetricCard.tsx` — Displays a single expense metric
- `ExpenseFilterBar.tsx` — Filter controls
- `ExpenseRow.tsx` — Displays a single expense row
- `BulkActionBar.tsx` — Sticky toolbar for bulk actions

### Data Layer

The components expect these data shapes (see `product-plan/sections/expenses/types.ts`):

```typescript
interface ExpensesData {
  summaryMetrics: SummaryMetrics
  expenses: Expense[]
  filterOptions: FilterOptions
  budgetProgress: BudgetProgress[]
}
```

You'll need to:
- Create API endpoints for CRUD operations on expenses
- Implement filtering logic (date range, category, account, tags, amount range, recurring, search)
- Calculate summary metrics (total spending, daily average, top category, etc.)
- Implement bulk operations (delete, change category, add tags)
- Handle recurring expenses

### Callbacks

Wire up these user actions:

- `onAddExpense` — Open add expense modal/form
- `onEditExpense` — Open edit expense modal/form with expense data
- `onDeleteExpense` — Delete expense (with confirmation)
- `onFilterChange` — Apply filters and refresh expense list
- `onSelectionChange` — Track selected expenses for bulk actions
- `onBulkAction` — Perform bulk action (delete, changeCategory, addTags)
- `onSort` — Sort table by column

### Empty States

Implement empty state UI:

- **No expenses yet:** Show "No expenses yet. Add your first expense to get started." with "Add Expense" button
- **Filtered empty:** Show "No expenses found. Try adjusting your filters." with "Clear filters" link

## Files to Reference

- `product-plan/sections/expenses/README.md` — Feature overview
- `product-plan/sections/expenses/tests.md` — Test-writing instructions
- `product-plan/sections/expenses/components/` — React components
- `product-plan/sections/expenses/types.ts` — TypeScript interfaces
- `product-plan/sections/expenses/sample-data.json` — Test data
- `product-plan/sections/expenses/expenses.png` — Visual reference

## Expected User Flows

### Flow 1: Add New Expense

1. User clicks "Add Expense" button
2. Modal/form opens
3. User fills in expense details (category, amount, date, account, tags, notes, recurring)
4. User clicks "Save"
5. **Outcome:** New expense appears in table, metrics update, success message shown

### Flow 2: Filter Expenses

1. User selects category "Food & Dining" from filter dropdown
2. User enters search term "coffee"
3. Table updates to show only matching expenses
4. **Outcome:** User sees filtered results, can clear filters to see all again

### Flow 3: Bulk Delete Expenses

1. User selects 3 expenses via checkboxes
2. Bulk action toolbar appears
3. User clicks "Delete Selected"
4. Confirmation dialog appears
5. User confirms
6. **Outcome:** Selected expenses are deleted, table updates, if last expense deleted empty state appears

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] Add/edit/delete expense works
- [ ] Filtering works correctly (all filter types)
- [ ] Search works correctly
- [ ] Bulk operations work correctly
- [ ] Recurring expenses display correctly
- [ ] Table sorting works
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 4: Income

## Goal

Implement the Income feature — income tracking with multiple sources and recurring entries.

## Overview

The Income section provides a comprehensive view of all earnings. It features summary metrics at the top showing key income insights, followed by a powerful filterable table of all income entries with support for bulk operations and recurring income tracking. This section mirrors the Expenses pattern for consistency.

**Key Functionality:**
- View summary metrics for the current income period
- Browse all income entries in a sortable, filterable table
- Add a new income entry via modal form (source, amount, date, account, tags, notes, recurring flag)
- Edit an income entry via row action menu opening a modal
- Delete individual entries or bulk delete selected items
- Filter income by date range, source, account, tags, amount range, or recurring status
- Search income by description or notes
- Select multiple income entries for bulk actions (delete, re-categorize, add tags)

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/income/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/income/components/`:

- `Income.tsx` — Main income component
- `IncomeMetricCard.tsx` — Displays a single income metric
- `IncomeFilterBar.tsx` — Filter controls
- `IncomeRow.tsx` — Displays a single income row
- `BulkActionBar.tsx` — Sticky toolbar for bulk actions

### Data Layer

The components expect these data shapes (see `product-plan/sections/income/types.ts`):

```typescript
interface IncomeData {
  summaryMetrics: SummaryMetrics
  income: Income[]
  filterOptions: FilterOptions
}
```

You'll need to:
- Create API endpoints for CRUD operations on income entries
- Implement filtering logic (date range, source, account, tags, amount range, recurring, search)
- Calculate summary metrics (total income, average monthly, top source, etc.)
- Implement bulk operations (delete, changeSource, addTags)
- Handle recurring income

### Callbacks

Wire up these user actions:

- `onAddIncome` — Open add income modal/form
- `onEditIncome` — Open edit income modal/form with income data
- `onDeleteIncome` — Delete income entry (with confirmation)
- `onFilterChange` — Apply filters and refresh income list
- `onSelectionChange` — Track selected income entries for bulk actions
- `onBulkAction` — Perform bulk action (delete, changeSource, addTags)
- `onSort` — Sort table by column

### Empty States

Implement empty state UI:

- **No income yet:** Show "No income entries yet. Add your first income entry to get started." with "Add Income" button
- **Filtered empty:** Show "No income entries found. Try adjusting your filters." with "Clear filters" link

## Files to Reference

- `product-plan/sections/income/README.md` — Feature overview
- `product-plan/sections/income/tests.md` — Test-writing instructions
- `product-plan/sections/income/components/` — React components
- `product-plan/sections/income/types.ts` — TypeScript interfaces
- `product-plan/sections/income/sample-data.json` — Test data
- `product-plan/sections/income/income.png` — Visual reference

## Expected User Flows

### Flow 1: Add New Income Entry

1. User clicks "Add Income" button
2. Modal/form opens
3. User fills in income details (source, amount, date, account, tags, notes, recurring)
4. User clicks "Save"
5. **Outcome:** New income entry appears in table, metrics update

### Flow 2: Filter Income by Source

1. User selects "Salary" from Source dropdown
2. Table updates to show only salary income
3. **Outcome:** User sees filtered results

### Flow 3: Bulk Change Source

1. User selects 2 income entries
2. Bulk action toolbar appears
3. User clicks "Change Source"
4. User selects new source "Freelance"
5. **Outcome:** Selected entries update to new source

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] Add/edit/delete income works
- [ ] Filtering works correctly
- [ ] Bulk operations work correctly
- [ ] Income amounts display in green (vs red for expenses)
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 5: Subscriptions

## Goal

Implement the Subscriptions feature — subscription management with renewal alerts and payment history.

## Overview

The Subscriptions section provides a comprehensive view of all recurring payments. It features summary metrics at the top showing subscription costs and upcoming renewals, a dedicated "Upcoming Renewals" section for imminent payments, and a powerful filterable table of all subscriptions with support for bulk operations and payment history tracking.

**Key Functionality:**
- View summary metrics for subscription spending (monthly, yearly, count, category breakdown)
- See upcoming renewals highlighted in a dedicated section
- Browse all subscriptions in a sortable, filterable table
- Add a new subscription via modal form (name, category, amount, billing cycle, next payment, status, payment method, start date)
- Edit a subscription via row action menu opening a modal
- Pause or resume a subscription
- Cancel/delete a subscription
- View payment history for a subscription
- Filter subscriptions by category, status, billing cycle, amount range, or search
- Select multiple subscriptions for bulk actions (pause, cancel, change category)

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/subscriptions/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/subscriptions/components/`:

- `Subscriptions.tsx` — Main subscriptions component
- `SubscriptionMetricCard.tsx` — Displays a single subscription metric
- `UpcomingRenewalCard.tsx` — Displays upcoming renewals with urgency indicators
- `SubscriptionFilterBar.tsx` — Filter controls
- `SubscriptionRow.tsx` — Displays a single subscription row
- `BulkActionBar.tsx` — Sticky toolbar for bulk actions

### Data Layer

The components expect these data shapes (see `product-plan/sections/subscriptions/types.ts`):

```typescript
interface SubscriptionsData {
  summaryMetrics: SummaryMetrics
  subscriptions: Subscription[]
  filterOptions: FilterOptions
}
```

You'll need to:
- Create API endpoints for CRUD operations on subscriptions
- Implement filtering logic (category, status, billing cycle, amount range, search)
- Calculate summary metrics (monthly/yearly cost, active count, upcoming renewals)
- Implement subscription status management (active, paused, cancelled)
- Track payment history for each subscription
- Calculate upcoming renewals (days until next payment)

### Callbacks

Wire up these user actions:

- `onAddSubscription` — Open add subscription modal/form
- `onEditSubscription` — Open edit subscription modal/form
- `onPauseSubscription` — Pause a subscription
- `onResumeSubscription` — Resume a paused subscription
- `onCancelSubscription` — Cancel a subscription (with confirmation)
- `onViewHistory` — Open payment history modal
- `onFilterChange` — Apply filters and refresh subscription list
- `onSelectionChange` — Track selected subscriptions for bulk actions
- `onBulkAction` — Perform bulk action (pause, cancel, changeCategory)
- `onSort` — Sort table by column

### Empty States

Implement empty state UI:

- **No subscriptions yet:** Show "No subscriptions yet. Add your first subscription to get started." with "Add Subscription" button
- **No upcoming renewals:** Hide upcoming renewals section or show empty state
- **Filtered empty:** Show "No subscriptions found. Try adjusting your filters."

## Files to Reference

- `product-plan/sections/subscriptions/README.md` — Feature overview
- `product-plan/sections/subscriptions/tests.md` — Test-writing instructions
- `product-plan/sections/subscriptions/components/` — React components
- `product-plan/sections/subscriptions/types.ts` — TypeScript interfaces
- `product-plan/sections/subscriptions/sample-data.json` — Test data
- `product-plan/sections/subscriptions/subscriptions.png` — Visual reference

## Expected User Flows

### Flow 1: Add New Subscription

1. User clicks "Add Subscription" button
2. Modal/form opens
3. User fills in subscription details (name, category, amount, billing cycle, next payment date, status, payment method)
4. User clicks "Save"
5. **Outcome:** New subscription appears in table, metrics update

### Flow 2: Pause Subscription

1. User clicks actions menu on active subscription
2. User clicks "Pause"
3. Subscription status changes to paused
4. **Outcome:** Subscription shows paused badge, metrics update

### Flow 3: View Payment History

1. User clicks actions menu on subscription
2. User clicks "View History"
3. Payment history modal opens showing past payments
4. **Outcome:** User sees payment history with dates, amounts, and statuses

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] Add/edit/delete subscription works
- [ ] Pause/resume/cancel functionality works
- [ ] Payment history displays correctly
- [ ] Upcoming renewals calculation works correctly
- [ ] Urgency indicators show correctly (due in X days)
- [ ] Bulk operations work correctly
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 6: Investments

## Goal

Implement the Investments feature — investment tracking with portfolio metrics and charts.

## Overview

The Investments section provides a comprehensive view of the user's portfolio with summary metrics, visual breakdowns, and a detailed holdings table. Users can track stocks, ETFs, crypto, bonds, savings, retirement accounts, real estate, and custom assets with cost basis, current value, and gain/loss performance.

**Key Functionality:**
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

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/investments/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/investments/components/`:

- `Investments.tsx` — Main investments component
- `InvestmentMetricCard.tsx` — Displays a single investment metric
- `AllocationChart.tsx` — Asset allocation visualization (placeholder — integrate chart library)
- `PerformanceChart.tsx` — Portfolio performance over time (placeholder — integrate chart library)
- `GainLossChart.tsx` — Gain/loss by investment (placeholder — integrate chart library)
- `SectorBreakdownChart.tsx` — Sector breakdown (placeholder — integrate chart library)
- `InvestmentFilterBar.tsx` — Filter controls
- `InvestmentRow.tsx` — Displays a single investment row

**Note:** Chart components are placeholders. You'll need to integrate a charting library (e.g., Recharts, Chart.js, Victory) to render actual charts.

### Data Layer

The components expect these data shapes (see `product-plan/sections/investments/types.ts`):

```typescript
interface InvestmentsData {
  summaryMetrics: SummaryMetrics
  investments: Investment[]
  chartData: ChartData
  filterOptions: FilterOptions
}
```

You'll need to:
- Create API endpoints for CRUD operations on investments
- Implement filtering logic (asset type, account, gain/loss status, search)
- Calculate summary metrics (total value, invested, gain/loss, allocation, performers)
- Calculate gain/loss percentages and today's changes
- Track transaction history for each investment
- Generate chart data (allocation, performance over time, gain/loss by investment, sector breakdown)

### Callbacks

Wire up these user actions:

- `onAddInvestment` — Open add investment modal/form
- `onEditInvestment` — Open edit investment modal/form
- `onDeleteInvestment` — Delete investment (with confirmation)
- `onRecordTransaction` — Open transaction recording form
- `onUpdateValue` — Open value update form
- `onViewHistory` — Open transaction history modal
- `onFilterChange` — Apply filters and refresh investment list
- `onSort` — Sort table by column

### Empty States

Implement empty state UI:

- **No investments yet:** Show "No investments yet. Add your first investment to get started." with "Add Investment" button
- **Charts empty:** Charts show empty states or "No data" messages
- **Filtered empty:** Show "No investments found. Try adjusting your filters."

## Files to Reference

- `product-plan/sections/investments/README.md` — Feature overview
- `product-plan/sections/investments/tests.md` — Test-writing instructions
- `product-plan/sections/investments/components/` — React components
- `product-plan/sections/investments/types.ts` — TypeScript interfaces
- `product-plan/sections/investments/sample-data.json` — Test data
- `product-plan/sections/investments/investments.png` — Visual reference

## Expected User Flows

### Flow 1: Add New Investment

1. User clicks "Add Investment" button
2. Modal/form opens
3. User fills in investment details (name, type, shares, cost basis, current value, account)
4. User clicks "Save"
5. **Outcome:** New investment appears in table, metrics update, allocation recalculates

### Flow 2: Record Transaction

1. User clicks actions menu on investment row
2. User clicks "Record Transaction"
3. Transaction form opens
4. User selects "Buy", enters shares "10", price "150.00"
5. User clicks "Save"
6. **Outcome:** Transaction is recorded, investment cost basis and shares update

### Flow 3: Update Investment Value

1. User clicks actions menu on investment row
2. User clicks "Update Value"
3. Value update form opens
4. User enters new current value "20,000.00"
5. User clicks "Save"
6. **Outcome:** Investment value updates, gain/loss recalculates

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] Add/edit/delete investment works
- [ ] Transaction recording works (buy/sell)
- [ ] Value update works
- [ ] Transaction history displays correctly
- [ ] Charts render correctly (chart library integrated)
- [ ] Gain/loss calculations are correct
- [ ] Allocation percentages calculate correctly
- [ ] Top/worst performers identify correctly
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

# Milestone 7: Settings

## Goal

Implement the Settings feature — settings for accounts, categories, budgets, preferences, and data management.

## Overview

The Settings section provides a centralized hub for managing all app configuration, organized into three tabs: Financial (accounts + categories), Budgets, and General Settings (data management + preferences). Users can configure their financial accounts, customize categories and tags, set budget limits with alerts, export/import data, and personalize their app experience.

**Key Functionality:**
- **Accounts Management:** Add, edit, delete, archive accounts; set default account; update balances
- **Categories Management:** Add, edit, delete, archive categories; create hierarchies; assign icons/colors
- **Tags Management:** Add, edit, delete tags; merge tags
- **Budgets Configuration:** Set budget limits per category or overall; configure rollover and recurring; set alert thresholds
- **Data Management:** Export data to CSV/JSON/PDF; import data from CSV/JSON; delete all data
- **Preferences:** Set theme, currency, date format; configure notifications; set subscription reminders; configure insights; update profile

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/settings/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/settings/components/`:

- `Settings.tsx` — Main settings component with tab navigation
- `FinancialTab.tsx` — Tab for accounts, categories, and tags
- `BudgetsTab.tsx` — Tab for budget configuration
- `GeneralTab.tsx` — Tab for data management, preferences, and profile
- `AccountRow.tsx` — Displays a single account with actions
- `CategoryRow.tsx` — Displays a single category with actions
- `TagRow.tsx` — Displays a single tag with merge functionality
- `BudgetCard.tsx` — Displays a single budget with progress and settings
- `PreferencesSection.tsx` — Preferences form section
- `ProfileSection.tsx` — Profile form section

### Data Layer

The components expect these data shapes (see `product-plan/sections/settings/types.ts`):

```typescript
interface SettingsData {
  accounts: Account[]
  categories: Category[]
  tags: Tag[]
  budgets: Budget[]
  preferences: Preferences
  profile: Profile
}
```

You'll need to:
- Create API endpoints for CRUD operations on accounts, categories, tags, budgets
- Implement account management (default, archive, balance updates)
- Implement category management (hierarchies, icons, colors)
- Implement tag merge functionality
- Implement budget management (limits, periods, rollover, alerts)
- Implement data export/import functionality
- Implement preferences management
- Implement profile management

### Callbacks

Wire up these user actions (see `product-plan/sections/settings/types.ts` for full list):

- `onAddAccount`, `onEditAccount`, `onDeleteAccount`, `onArchiveAccount`, `onSetDefaultAccount`, `onUpdateAccountBalance`
- `onAddCategory`, `onEditCategory`, `onDeleteCategory`, `onArchiveCategory`
- `onAddTag`, `onEditTag`, `onDeleteTag`, `onMergeTags`
- `onAddBudget`, `onEditBudget`, `onDeleteBudget`, `onUpdateBudget`
- `onUpdatePreferences`
- `onUpdateProfile`
- `onExportData` — Export data in CSV/JSON/PDF format
- `onImportData` — Import data from CSV/JSON file
- `onDeleteAllData` — Delete all user data (with strong confirmation)

### Empty States

Implement empty state UI:

- **No accounts yet:** Show "No accounts yet. Add your first account to get started."
- **No categories yet:** Show "No categories yet. Add your first category to get started."
- **No tags yet:** Show "No tags yet. Add your first tag to get started."
- **No budgets yet:** Show "No budgets set. Add your first budget to track spending limits."

## Files to Reference

- `product-plan/sections/settings/README.md` — Feature overview
- `product-plan/sections/settings/tests.md` — Test-writing instructions
- `product-plan/sections/settings/components/` — React components
- `product-plan/sections/settings/types.ts` — TypeScript interfaces
- `product-plan/sections/settings/sample-data.json` — Test data
- `product-plan/sections/settings/settings.png` — Visual reference

## Expected User Flows

### Flow 1: Set Default Account

1. User navigates to Settings → Financial tab
2. User clicks actions menu on an account
3. User clicks "Set as Default"
4. **Outcome:** Account shows "Default" badge, previous default loses badge

### Flow 2: Create Budget

1. User navigates to Settings → Budgets tab
2. User clicks "Add Budget"
3. Budget form opens
4. User selects category "Food & Dining", enters limit "750.00", sets alert threshold "80%"
5. User clicks "Save"
6. **Outcome:** Budget appears in Category Budgets section

### Flow 3: Export Data

1. User navigates to Settings → General tab
2. User clicks "Export CSV" button
3. Export options appear (date range, sections)
4. User selects options and clicks "Export"
5. **Outcome:** CSV file downloads with user's data

### Flow 4: Merge Tags

1. User navigates to Settings → Financial tab → Tags section
2. User clicks actions menu on tag "coffee"
3. User clicks "Merge into..." submenu
4. User selects "morning" from merge options
5. **Outcome:** Tag "coffee" merges into "morning", all transactions using "coffee" now use "morning"

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] All CRUD operations work (accounts, categories, tags, budgets)
- [ ] Archive functionality works (preserves historical data)
- [ ] Tag merge functionality works
- [ ] Budget toggles work (rollover, recurring)
- [ ] Data export works (CSV, JSON, PDF)
- [ ] Data import works (CSV, JSON)
- [ ] Preferences save correctly
- [ ] Profile updates work
- [ ] Delete all data works (with strong confirmation)
- [ ] Matches the visual design
- [ ] Responsive on mobile

---

