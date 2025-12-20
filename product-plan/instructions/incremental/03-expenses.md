# Milestone 3: Expenses

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 2 (Dashboard) complete

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

