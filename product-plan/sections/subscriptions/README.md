# Subscriptions

## Overview

The Subscriptions section provides a comprehensive view of all recurring payments. It features summary metrics at the top showing subscription costs and upcoming renewals, a dedicated "Upcoming Renewals" section for imminent payments, and a powerful filterable table of all subscriptions with support for bulk operations and payment history tracking.

## User Flows

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

## Design Decisions

- **Upcoming renewals prominence** — Dedicated section for urgent payments
- **Status management** — Clear visual distinction between active, paused, and cancelled subscriptions
- **Payment history** — Track past payments for each subscription
- **Bulk management** — Efficient handling of multiple subscriptions

## Data Used

**Entities:**
- `SummaryMetrics` — Aggregated subscription metrics (monthly/yearly cost, active count, upcoming renewals, etc.)
- `Subscription` — Individual subscription entries with payment history
- `FilterOptions` — Available filter options (categories, statuses, billing cycles, accounts)

**From global model:** Subscriptions are linked to Accounts

## Visual Reference

See `subscriptions.png` for the target UI design.

## Components Provided

- `Subscriptions` — Main subscriptions component with metrics, upcoming renewals, filters, and table
- `SubscriptionMetricCard` — Displays a single subscription metric
- `UpcomingRenewalCard` — Displays upcoming renewals with urgency indicators
- `SubscriptionFilterBar` — Filter controls for subscriptions
- `SubscriptionRow` — Displays a single subscription row in the table
- `BulkActionBar` — Sticky toolbar for bulk actions when rows are selected

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddSubscription` | Called when user clicks "Add Subscription" button |
| `onEditSubscription` | Called when user clicks edit action on a subscription row |
| `onPauseSubscription` | Called when user pauses a subscription |
| `onResumeSubscription` | Called when user resumes a paused subscription |
| `onCancelSubscription` | Called when user cancels a subscription |
| `onViewHistory` | Called when user views payment history for a subscription |
| `onFilterChange` | Called when user changes any filter |
| `onSelectionChange` | Called when user selects/deselects subscriptions for bulk actions |
| `onBulkAction` | Called when user performs a bulk action (pause, cancel, changeCategory) |
| `onSort` | Called when user sorts the table by a column |

