# Test Instructions: Income

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Income section displays income metrics and a filterable table of all income entries. Test that users can view income, filter/search, add/edit/delete income entries, and perform bulk operations. This section mirrors the Expenses pattern but for income data.

---

## User Flow Tests

### Flow 1: View Income List

**Scenario:** User navigates to income page and sees all income entries

#### Success Path

**Setup:**
- User is authenticated
- Income data exists

**Steps:**
1. User navigates to `/income`
2. User sees heading "Income"
3. User sees 6 metric cards at top: Total income this month, Average monthly income, Top income source, Comparison vs last month, Total recurring income, Number of income entries
4. User sees filter bar with: Date range picker, Source dropdown, Account dropdown, Tag multi-select, Amount range inputs, Recurring toggle, Search input
5. User sees "Add Income" button
6. User sees income table with columns: Checkbox, Date, Description/Payer, Source, Amount, Account, Tags, Recurring indicator, Notes, Actions menu
7. User sees income rows with data

**Expected Results:**
- [ ] All 6 metric cards render with correct formatted values
- [ ] Amounts display in green (positive indicator)
- [ ] Filter bar renders with all filter controls
- [ ] Income table renders with all columns
- [ ] Each income row shows correct data (date, description, source, amount, etc.)
- [ ] Recurring income shows recurring badge/indicator
- [ ] Amounts are formatted as currency (e.g., "$5,200.00")
- [ ] Dates are formatted correctly

#### Failure Path: No Income Yet

**Setup:**
- `income` array is empty (`[]`)

**Steps:**
1. User navigates to `/income`

**Expected Results:**
- [ ] Table shows empty state: "No income entries yet. Add your first income entry to get started."
- [ ] Empty state shows "Add Income" button/CTA
- [ ] Metrics may show zeros but still render
- [ ] No errors or broken UI

---

### Flow 2: Add New Income Entry

**Scenario:** User adds a new income entry via modal form

#### Success Path

**Steps:**
1. User clicks "Add Income" button
2. Modal/form opens
3. User fills in: Source (selects "Salary"), Amount (enters "5200.00"), Date (selects date), Account (selects "Chase Checking"), Tags (selects "salary"), Notes (enters "December salary"), Recurring (checks box)
4. User clicks "Save"

**Expected Results:**
- [ ] `onAddIncome` callback is called
- [ ] Modal opens with form
- [ ] After save, new income entry appears in table

#### Failure Path: Validation Error

**Steps:**
1. User leaves Source field empty
2. User clicks "Save"

**Expected Results:**
- [ ] Form shows validation error: "Source is required"
- [ ] Form does not submit

---

### Flow 3: Filter Income by Source

**Scenario:** User filters income to show only salary entries

#### Success Path

**Steps:**
1. User selects "Salary" from Source dropdown
2. Table updates

**Expected Results:**
- [ ] `onFilterChange` callback is called with `{ source: "Salary" }`
- [ ] Table shows only salary income entries

---

### Flow 4: Bulk Change Source

**Scenario:** User selects multiple income entries and changes their source

#### Success Path

**Steps:**
1. User selects 2 income entries via checkboxes
2. Bulk action toolbar appears
3. User clicks "Change Source"
4. User selects new source "Freelance"
5. User confirms

**Expected Results:**
- [ ] `onBulkAction` callback is called with action "changeSource", income IDs, and new source
- [ ] Selected entries update to new source

---

## Empty State Tests

### Primary Empty State: No Income Yet

**Setup:**
- `income` array is empty (`[]`)

**Expected Results:**
- [ ] Table shows empty state: "No income entries yet. Add your first income entry to get started."
- [ ] Empty state shows "Add Income" button
- [ ] Clicking button opens add form

---

## Component Interaction Tests

### IncomeRow Component

**Renders correctly:**
- [ ] Displays amount in green color (positive indicator)
- [ ] Shows source name
- [ ] Shows recurring badge if recurring

**User interactions:**
- [ ] Clicking checkbox calls `onSelect` with income ID
- [ ] Clicking "Edit" calls `onEdit` with income ID
- [ ] Clicking "Delete" calls `onDelete` with income ID

---

## Edge Cases

- [ ] **Large income amounts** — Formats correctly ($100,000.00)
- [ ] **Many income entries** — Table handles 100+ entries
- [ ] **All income selected** — Select all works correctly
- [ ] **Transition from empty to populated** — After adding first entry, table renders correctly

---

## Sample Test Data

```typescript
const mockIncome = {
  id: "inc-001",
  type: "income",
  amount: 5200.00,
  source: "Salary",
  description: "Monthly Salary",
  date: "2024-12-05",
  accountId: "acc-001",
  tags: ["salary", "recurring"],
  notes: "December salary payment",
  recurring: true
};
```

---

## Notes for Test Implementation

- Test that income amounts display in green (vs red for expenses)
- Verify source filter works correctly
- Test bulk source change functionality
- **Always test empty states** — Pass empty arrays to verify helpful empty state UI appears

