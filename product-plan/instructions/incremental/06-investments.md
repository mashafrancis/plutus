# Milestone 6: Investments

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 2 (Dashboard) complete

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

