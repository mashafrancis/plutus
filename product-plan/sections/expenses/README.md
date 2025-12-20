# Expenses

## Overview

The Expenses section provides a comprehensive view of all spending activity. It features summary metrics at the top showing key spending insights, followed by a powerful filterable table of all expenses with support for bulk operations and recurring expense tracking.

## User Flows

- View summary metrics for the current spending period
- Browse all expenses in a sortable, filterable table
- Add a new expense via modal form (category, amount, date, account, tags, notes, recurring flag)
- Edit an expense via row action menu opening a modal
- Delete individual expenses or bulk delete selected items
- Filter expenses by date range, category, account, tags, amount range, or recurring status
- Search expenses by description or notes
- Select multiple expenses for bulk actions (delete, re-categorize, add tags)

## Design Decisions

- **Metrics-first layout** — Key spending insights displayed prominently at top
- **Powerful filtering** — Comprehensive filter bar for finding specific expenses
- **Bulk operations** — Efficient management of multiple expenses at once
- **Recurring indicator** — Clear visual distinction for recurring expenses
- **Table-based layout** — Dense data display optimized for scanning many expenses

## Data Used

**Entities:**
- `SummaryMetrics` — Aggregated expense metrics (total spending, daily average, top category, etc.)
- `Expense` — Individual expense transactions
- `BudgetProgress` — Budget status per category
- `FilterOptions` — Available filter options (categories, accounts, tags)

**From global model:** Expenses belong to Accounts and Categories, can have multiple Tags

## Visual Reference

See `expenses.png` for the target UI design.

## Components Provided

- `Expenses` — Main expenses component with metrics, filters, and table
- `ExpenseMetricCard` — Displays a single expense metric
- `ExpenseFilterBar` — Filter controls for expenses
- `ExpenseRow` — Displays a single expense row in the table
- `BulkActionBar` — Sticky toolbar for bulk actions when rows are selected

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddExpense` | Called when user clicks "Add Expense" button |
| `onEditExpense` | Called when user clicks edit action on an expense row |
| `onDeleteExpense` | Called when user clicks delete action on an expense row |
| `onFilterChange` | Called when user changes any filter |
| `onSelectionChange` | Called when user selects/deselects expenses for bulk actions |
| `onBulkAction` | Called when user performs a bulk action (delete, changeCategory, addTags) |
| `onSort` | Called when user sorts the table by a column |

