# Income

## Overview

The Income section provides a comprehensive view of all earnings. It features summary metrics at the top showing key income insights, followed by a powerful filterable table of all income entries with support for bulk operations and recurring income tracking.

## User Flows

- View summary metrics for the current income period
- Browse all income entries in a sortable, filterable table
- Add a new income entry via modal form (source, amount, date, account, tags, notes, recurring flag)
- Edit an income entry via row action menu opening a modal
- Delete individual entries or bulk delete selected items
- Filter income by date range, source, account, tags, amount range, or recurring status
- Search income by description or notes
- Select multiple income entries for bulk actions (delete, re-categorize, add tags)

## Design Decisions

- **Mirrors Expenses pattern** — Consistent UX with Expenses section for familiarity
- **Source-based organization** — Income grouped by source (salary, freelance, etc.)
- **Positive indicators** — Green color scheme for income (vs red for expenses)
- **Recurring tracking** — Support for both recurring and one-time income

## Data Used

**Entities:**
- `SummaryMetrics` — Aggregated income metrics (total income, average monthly, top source, etc.)
- `Income` — Individual income entries
- `FilterOptions` — Available filter options (sources, accounts, tags)

**From global model:** Income belongs to Accounts and Sources, can have multiple Tags

## Visual Reference

See `income.png` for the target UI design.

## Components Provided

- `Income` — Main income component with metrics, filters, and table
- `IncomeMetricCard` — Displays a single income metric
- `IncomeFilterBar` — Filter controls for income
- `IncomeRow` — Displays a single income row in the table
- `BulkActionBar` — Sticky toolbar for bulk actions when rows are selected

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddIncome` | Called when user clicks "Add Income" button |
| `onEditIncome` | Called when user clicks edit action on an income row |
| `onDeleteIncome` | Called when user clicks delete action on an income row |
| `onFilterChange` | Called when user changes any filter |
| `onSelectionChange` | Called when user selects/deselects income entries for bulk actions |
| `onBulkAction` | Called when user performs a bulk action (delete, changeSource, addTags) |
| `onSort` | Called when user sorts the table by a column |

