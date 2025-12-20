# Test Instructions: Subscriptions

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Subscriptions section displays subscription metrics, upcoming renewals, and a filterable table of all subscriptions. Test that users can view subscriptions, manage subscription status, view payment history, and perform bulk operations.

---

## User Flow Tests

### Flow 1: View Subscriptions List

**Scenario:** User navigates to subscriptions page

#### Success Path

**Steps:**
1. User navigates to `/subscriptions`
2. User sees 6 metric cards: Total monthly cost, Total yearly cost, Active subscription count, Upcoming renewals count, Top spending category, Comparison vs last month
3. User sees "Upcoming Renewals" section with subscriptions due soon
4. User sees subscriptions table with all columns
5. User sees "Add Subscription" button

**Expected Results:**
- [ ] All metrics render correctly
- [ ] Upcoming Renewals section shows subscriptions due within reminder period
- [ ] Renewals show urgency indicators (e.g., "Due in 3 days")
- [ ] Table renders with all columns

---

### Flow 2: Pause Subscription

**Scenario:** User pauses an active subscription

#### Success Path

**Steps:**
1. User clicks actions menu on active subscription
2. User clicks "Pause" option
3. Subscription status changes to paused

**Expected Results:**
- [ ] `onPauseSubscription` callback is called with subscription ID
- [ ] Subscription status updates to "paused"
- [ ] Paused badge appears on subscription row

---

### Flow 3: View Payment History

**Scenario:** User views payment history for a subscription

#### Success Path

**Steps:**
1. User clicks actions menu on subscription
2. User clicks "View History"
3. Payment history modal opens

**Expected Results:**
- [ ] `onViewHistory` callback is called with subscription ID
- [ ] Modal opens showing payment history (implementation handles this)
- [ ] Payment history shows dates, amounts, and statuses

---

### Flow 4: Bulk Cancel Subscriptions

**Scenario:** User cancels multiple subscriptions at once

#### Success Path

**Steps:**
1. User selects 2 subscriptions via checkboxes
2. Bulk action toolbar appears
3. User clicks "Cancel Selected"
4. Confirmation dialog appears
5. User confirms

**Expected Results:**
- [ ] `onBulkAction` callback is called with action "cancel" and subscription IDs
- [ ] Selected subscriptions are cancelled (implementation handles this)

---

## Empty State Tests

### Primary Empty State: No Subscriptions Yet

**Setup:**
- `subscriptions` array is empty (`[]`)

**Expected Results:**
- [ ] Table shows empty state: "No subscriptions yet. Add your first subscription to get started."
- [ ] Upcoming Renewals section is hidden or shows empty state
- [ ] Empty state shows "Add Subscription" button

---

## Edge Cases

- [ ] **Upcoming renewals** — Handles subscriptions due today, tomorrow, this week
- [ ] **Many subscriptions** — Table handles 20+ subscriptions
- [ ] **Status transitions** — Pause → Resume → Cancel flows work correctly
- [ ] **Payment history** — Handles subscriptions with no payment history yet

---

## Sample Test Data

```typescript
const mockSubscription = {
  id: "sub-001",
  name: "Netflix Premium",
  category: "Streaming",
  amount: 22.99,
  billingCycle: "monthly",
  nextPaymentDate: "2024-12-22",
  status: "active",
  paymentMethodId: "acc-002",
  startDate: "2022-03-15",
  totalSpent: 643.72,
  paymentHistory: [
    { id: "pay-001-01", date: "2024-11-22", amount: 22.99, status: "paid" }
  ]
};
```

---

## Notes for Test Implementation

- Test upcoming renewals calculation (days until next payment)
- Verify status badges display correctly (active, paused, cancelled)
- Test payment history modal functionality
- **Always test empty states** — Pass empty arrays to verify helpful empty state UI appears

