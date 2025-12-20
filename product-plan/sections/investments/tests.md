# Test Instructions: Investments

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Investments section displays portfolio metrics, charts, and a holdings table. Test that users can view investments, add/edit/delete investments, record transactions, update values, and view transaction history.

---

## User Flow Tests

### Flow 1: View Portfolio Overview

**Scenario:** User navigates to investments page

#### Success Path

**Steps:**
1. User navigates to `/investments`
2. User sees 7 metric cards: Total portfolio value, Total invested, Total gain/loss, Today's change, Asset allocation, Top performer, Worst performer
3. User sees charts section: Allocation chart, Performance chart, Gain/Loss chart, Sector breakdown
4. User sees holdings table with all columns
5. User sees "Add Investment" button

**Expected Results:**
- [ ] All metrics render correctly
- [ ] Charts render (placeholders if chart library not integrated)
- [ ] Holdings table shows all investments
- [ ] Gain/loss amounts show correct colors (green for positive, red for negative)

---

### Flow 2: Record Transaction

**Scenario:** User records a buy transaction for an investment

#### Success Path

**Steps:**
1. User clicks actions menu on investment row
2. User clicks "Record Transaction"
3. Transaction form opens
4. User selects "Buy", enters shares "10", price "150.00"
5. User clicks "Save"

**Expected Results:**
- [ ] `onRecordTransaction` callback is called with investment ID
- [ ] Transaction form opens (implementation handles this)
- [ ] After save, transaction is recorded (implementation handles this)

---

### Flow 3: Update Investment Value

**Scenario:** User manually updates current value for an investment

#### Success Path

**Steps:**
1. User clicks actions menu on investment row
2. User clicks "Update Value"
3. Value update form opens
4. User enters new current value "20,000.00"
5. User clicks "Save"

**Expected Results:**
- [ ] `onUpdateValue` callback is called with investment ID
- [ ] Value update form opens (implementation handles this)
- [ ] Investment value updates and gain/loss recalculates (implementation handles this)

---

## Empty State Tests

### Primary Empty State: No Investments Yet

**Setup:**
- `investments` array is empty (`[]`)

**Expected Results:**
- [ ] Table shows empty state: "No investments yet. Add your first investment to get started."
- [ ] Charts show empty states
- [ ] Metrics show zeros
- [ ] Empty state shows "Add Investment" button

---

## Edge Cases

- [ ] **Negative gains** — Displays losses correctly in red
- [ ] **Zero allocation** — Handles investments with 0% allocation
- [ ] **Many investments** — Table handles 50+ holdings
- [ ] **Transaction history** — Handles investments with no transactions yet

---

## Sample Test Data

```typescript
const mockInvestment = {
  id: "inv-001",
  name: "Apple Inc.",
  ticker: "AAPL",
  assetType: "Stocks",
  shares: 50,
  costBasis: 15000.00,
  currentValue: 18675.00,
  gainLossDollar: 3675.00,
  gainLossPercent: 24.5,
  todayChangeDollar: 125.50,
  todayChangePercent: 0.68,
  allocationPercent: 10.0,
  accountId: "acc-robinhood",
  transactions: []
};
```

---

## Notes for Test Implementation

- Test gain/loss calculations and display
- Verify chart placeholders render correctly (will need chart library integration)
- Test transaction recording for buy/sell operations
- **Always test empty states** — Pass empty arrays to verify helpful empty state UI appears

