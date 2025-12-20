# Test Instructions: Dashboard

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Dashboard is the central hub showing financial metrics, charts, insights, and recent activity. Test that users can view their financial overview, interact with charts and insights, add transactions, and navigate to detailed views.

---

## User Flow Tests

### Flow 1: View Financial Overview

**Scenario:** User navigates to dashboard and sees their financial summary

#### Success Path

**Setup:**
- User is authenticated
- Dashboard has data (metrics, transactions, subscriptions, investments)

**Steps:**
1. User navigates to `/` (dashboard route)
2. User sees heading "Dashboard" with subtitle "Your financial overview at a glance"
3. User sees 6 metric cards displaying: Net Worth, Monthly Cash Flow, Total Balance, Savings Rate, Monthly Spending, Monthly Income
4. User sees timeframe selector with options: week, month, quarter, year, custom
5. User sees "Spending by Category" chart
6. User sees "Income by Source" chart
7. User sees Budget Progress section
8. User sees Investment Performance section
9. User sees Insights section (if insights exist)
10. User sees Upcoming Payments section
11. User sees Recent Activity section

**Expected Results:**
- [ ] All 6 metric cards render with correct values formatted as currency or percentage
- [ ] Metric cards show trend indicators (up/down arrows) with correct colors (green for positive, red for negative)
- [ ] Timeframe selector shows "month" as selected by default
- [ ] Charts render with data (bars/progress indicators visible)
- [ ] Budget progress bars show correct percentages
- [ ] Investment performance shows total gain/loss with correct color (green/red)
- [ ] Insights cards render with correct severity styling (info/warning/success/error)
- [ ] Upcoming subscriptions show correct names, amounts, and dates
- [ ] Recent transactions show correct descriptions, amounts, and dates

#### Failure Path: No Data Available

**Setup:**
- User is authenticated
- Dashboard has no data (empty arrays, zero values)

**Steps:**
1. User navigates to `/`
2. Dashboard renders with empty/zero data

**Expected Results:**
- [ ] Metric cards show $0.00 or 0% (not broken or error states)
- [ ] Charts show empty states or "No data" messages
- [ ] Budget Progress section shows empty state or "No budgets set"
- [ ] Investment Performance shows $0.00 if no investments
- [ ] Insights section is hidden if no insights exist
- [ ] Upcoming Payments shows "No upcoming payments" message
- [ ] Recent Activity shows "No recent transactions" message
- [ ] No errors or broken UI elements

---

### Flow 2: Add Expense from Dashboard

**Scenario:** User clicks "Add Expense" button from dashboard

#### Success Path

**Setup:**
- User is authenticated
- Dashboard is loaded

**Steps:**
1. User sees "Add Expense" button in header
2. User clicks "Add Expense" button
3. Modal/form opens for adding expense

**Expected Results:**
- [ ] `onAddExpense` callback is called
- [ ] Modal/form opens (implementation handles this via callback)
- [ ] User can fill in expense details and save

#### Failure Path: Callback Not Provided

**Setup:**
- Component rendered without `onAddExpense` prop

**Steps:**
1. User clicks "Add Expense" button

**Expected Results:**
- [ ] Button still renders and is clickable
- [ ] No errors thrown (callback is optional)

---

### Flow 3: Switch Timeframe

**Scenario:** User changes timeframe to view different time period

#### Success Path

**Setup:**
- User is authenticated
- Dashboard is loaded with "month" timeframe selected

**Steps:**
1. User sees timeframe selector with "month" selected
2. User clicks "quarter" option
3. Dashboard updates to show quarterly data

**Expected Results:**
- [ ] `onTimeframeChange` callback is called with "quarter"
- [ ] Timeframe selector updates to show "quarter" as selected
- [ ] Data refreshes to show quarterly metrics (implementation handles this)

---

### Flow 4: Dismiss Insight

**Scenario:** User dismisses a smart insight

#### Success Path

**Setup:**
- User is authenticated
- Dashboard has active insights

**Steps:**
1. User sees insight card with dismiss (X) button
2. User clicks dismiss button
3. Insight is removed from view

**Expected Results:**
- [ ] `onDismissInsight` callback is called with insight ID
- [ ] Insight card disappears from view
- [ ] Other insights remain visible

---

### Flow 5: Navigate to Category Details

**Scenario:** User clicks on a category in the spending chart

#### Success Path

**Setup:**
- User is authenticated
- Dashboard has spending by category data

**Steps:**
1. User sees "Spending by Category" chart
2. User clicks on a category bar/item (e.g., "Food & Dining")
3. Navigation occurs to category details

**Expected Results:**
- [ ] `onViewCategory` callback is called with category name
- [ ] User is navigated to expenses filtered by that category (implementation handles this)

---

### Flow 6: View Transaction Details

**Scenario:** User clicks on a recent transaction

#### Success Path

**Setup:**
- User is authenticated
- Dashboard has recent transactions

**Steps:**
1. User sees "Recent Activity" section with transaction rows
2. User clicks on a transaction row
3. Transaction details view opens

**Expected Results:**
- [ ] `onViewTransaction` callback is called with transaction ID
- [ ] User is navigated to transaction details (implementation handles this)

---

## Empty State Tests

### Primary Empty State: No Transactions Yet

**Scenario:** User has no transactions (first-time user)

**Setup:**
- `recentTransactions` array is empty (`[]`)
- `upcomingSubscriptions` array is empty (`[]`)
- Metrics show zero values

**Expected Results:**
- [ ] Recent Activity section shows helpful empty state: "No recent transactions" or similar message
- [ ] Upcoming Payments section shows "No upcoming payments" message
- [ ] Charts show empty states or "No data" messages
- [ ] Metric cards still render showing $0.00 (not broken)
- [ ] No errors or broken layouts

### No Insights State

**Scenario:** User has no active insights

**Setup:**
- `insights` array is empty (`[]`) or all insights are dismissed

**Expected Results:**
- [ ] Insights section is hidden (not rendered at all)
- [ ] No empty state message needed (section doesn't appear)

### No Budgets State

**Scenario:** User hasn't set up any budgets

**Setup:**
- `budgetProgress` array is empty (`[]`)

**Expected Results:**
- [ ] Budget Progress section shows empty state: "No budgets set" or similar message
- [ ] Optionally shows CTA to "Set up budgets" linking to Settings

### No Investments State

**Scenario:** User hasn't added any investments

**Setup:**
- `investmentPerformance.holdings` array is empty (`[]`)
- `investmentPerformance.totalValue` is 0

**Expected Results:**
- [ ] Investment Performance section shows empty state: "No investments yet" or similar
- [ ] Optionally shows CTA to "Add Investment"
- [ ] Total gain/loss shows $0.00 (not broken)

---

## Component Interaction Tests

### MetricCard Component

**Renders correctly:**
- [ ] Displays label text (e.g., "Net Worth")
- [ ] Displays formatted value (e.g., "$125,000.00")
- [ ] Displays "last period" comparison value
- [ ] Shows trend icon (ArrowUp, ArrowDown, or Minus)
- [ ] Trend icon color matches trend (green for up, red for down, neutral for neutral)
- [ ] Change percentage displays correctly (e.g., "+5.2%")

**Hover states:**
- [ ] Card border color changes on hover (blue accent)

### InsightCard Component

**Renders correctly:**
- [ ] Displays insight title
- [ ] Displays insight message
- [ ] Shows correct icon based on severity (Info, AlertCircle, CheckCircle2)
- [ ] Background and border colors match severity (blue for info, amber for warning, etc.)
- [ ] Shows action button if `actionLabel` exists

**User interactions:**
- [ ] Clicking dismiss (X) button calls `onDismiss` with insight ID
- [ ] Clicking action button calls `onAction` callback

### SpendingChart Component

**Renders correctly:**
- [ ] Displays all categories from data
- [ ] Shows category names and amounts
- [ ] Progress bars show correct widths based on amounts
- [ ] Progress bars use colors from data

**User interactions:**
- [ ] Clicking a category bar calls `onViewCategory` with category name

### BudgetProgressBar Component

**Renders correctly:**
- [ ] Displays category name
- [ ] Shows spent amount and target amount
- [ ] Progress bar shows correct percentage
- [ ] Progress bar color changes based on percentage (green < 80%, amber 80-100%, red > 100%)

**User interactions:**
- [ ] Clicking budget card calls `onView` with category name

---

## Edge Cases

- [ ] **Very large numbers** — Handles amounts like $1,000,000.00 with proper formatting
- [ ] **Negative values** — Displays negative amounts correctly (e.g., -$500.00)
- [ ] **Zero values** — Shows $0.00 without errors
- [ ] **Missing optional data** — Handles missing optional fields gracefully
- [ ] **Many insights** — Renders correctly with 10+ insights (scrollable if needed)
- [ ] **Many transactions** — Recent Activity shows only 5 most recent
- [ ] **Long category names** — Truncates or wraps long category names properly
- [ ] **Transition from empty to populated** — After adding first transaction, dashboard updates correctly
- [ ] **Transition from populated to empty** — After deleting all transactions, empty states appear

---

## Accessibility Checks

- [ ] All interactive elements are keyboard accessible
- [ ] Timeframe selector buttons have proper focus states
- [ ] Metric cards are readable by screen readers
- [ ] Chart elements have accessible labels
- [ ] Insight dismiss buttons have aria-label="Dismiss insight"
- [ ] Color contrast meets WCAG AA standards (especially for trend indicators)
- [ ] Focus is managed appropriately after actions

---

## Sample Test Data

Use the data from `sample-data.json` or create variations:

```typescript
// Example test data - populated state
const mockDashboardData = {
  metrics: {
    netWorth: { value: 125000, previousValue: 120000, change: 5000, changePercent: 4.2, trend: 'up' },
    monthlyCashFlow: { value: 2500, previousValue: 2000, change: 500, changePercent: 25, trend: 'up' },
    // ... other metrics
  },
  recentTransactions: [
    { id: "txn-1", type: "expense", amount: 45.50, category: "Food & Dining", description: "Coffee & Breakfast", date: "2024-12-10" },
    // ... more transactions
  ],
  insights: [
    { id: "insight-1", type: "spending_anomaly", title: "Unusual Spending", message: "You spent 30% more on Food this month", severity: "warning", dismissed: false },
  ],
  // ... other data
};

// Example test data - empty states
const mockEmptyDashboardData = {
  metrics: {
    netWorth: { value: 0, previousValue: 0, change: 0, changePercent: 0, trend: 'neutral' },
    // ... all metrics zero
  },
  recentTransactions: [],
  upcomingSubscriptions: [],
  insights: [],
  budgetProgress: [],
  investmentPerformance: { holdings: [], totalValue: 0, totalCostBasis: 0, totalGain: 0, gainPercent: 0 },
};
```

---

## Notes for Test Implementation

- Mock API calls to test both success and failure scenarios
- Test each callback prop is called with correct arguments
- Verify UI updates optimistically where appropriate
- Test that loading states appear during async operations
- Ensure error boundaries catch and display errors gracefully
- **Always test empty states** — Pass empty arrays to verify helpful empty state UI appears (not blank screens)
- Test transitions: empty → first item created, last item deleted → empty state returns
- Test that charts handle edge cases (single data point, all zeros, etc.)

