# Milestone 5: Subscriptions

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 2 (Dashboard) complete

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

