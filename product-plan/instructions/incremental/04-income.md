# Milestone 4: Income

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 2 (Dashboard) complete, Milestone 3 (Expenses) complete

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

