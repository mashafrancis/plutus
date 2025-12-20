# Test Instructions: Expenses

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Expenses section displays spending metrics and a filterable table of all expenses. Test that users can view expenses, filter/search, add/edit/delete expenses, and perform bulk operations.

---

## User Flow Tests

### Flow 1: View Expenses List

**Scenario:** User navigates to expenses page and sees all expenses

#### Success Path

**Setup:**
- User is authenticated
- Expenses data exists

**Steps:**
1. User navigates to `/expenses`
2. User sees heading "Expenses"
3. User sees 6 metric cards at top: Total spending this month, Average daily spending, Top spending category, Budget progress, Comparison vs last month, Transaction count
4. User sees filter bar with: Date range picker, Category dropdown, Account dropdown, Tag multi-select, Amount range inputs, Recurring toggle, Search input
5. User sees "Add Expense" button
6. User sees expenses table with columns: Checkbox, Date, Description/Merchant, Category, Amount, Account, Tags, Recurring indicator, Notes, Actions menu
7. User sees expense rows with data

**Expected Results:**
- [ ] All 6 metric cards render with correct formatted values
- [ ] Filter bar renders with all filter controls
- [ ] Expenses table renders with all columns
- [ ] Each expense row shows correct data (date, description, category, amount, etc.)
- [ ] Recurring expenses show recurring badge/indicator
- [ ] Amounts are formatted as currency (e.g., "$45.50")
- [ ] Dates are formatted correctly (e.g., "Dec 10")
- [ ] Tags display as badges/chips

#### Failure Path: No Expenses Yet

**Setup:**
- `expenses` array is empty (`[]`)

**Steps:**
1. User navigates to `/expenses`

**Expected Results:**
- [ ] Metrics cards still render (may show zeros)
- [ ] Table shows empty state: "No expenses yet. Add your first expense to get started."
- [ ] Empty state shows "Add Expense" button/CTA
- [ ] No errors or broken UI

---

### Flow 2: Add New Expense

**Scenario:** User adds a new expense via modal form

#### Success Path

**Setup:**
- User is authenticated
- Expenses page is loaded

**Steps:**
1. User clicks "Add Expense" button
2. Modal/form opens
3. User fills in: Category (selects "Food & Dining"), Amount (enters "45.50"), Date (selects date), Account (selects "Chase Checking"), Tags (selects "coffee"), Notes (enters "Morning coffee"), Recurring (checks box)
4. User clicks "Save" or "Add Expense" button in modal
5. Form submits

**Expected Results:**
- [ ] `onAddExpense` callback is called
- [ ] Modal opens (implementation handles this via callback)
- [ ] Form fields are accessible and functional
- [ ] After save, new expense appears in table (implementation handles this)

#### Failure Path: Validation Error

**Setup:**
- User submits form with invalid data

**Steps:**
1. User leaves Amount field empty
2. User clicks "Save"

**Expected Results:**
- [ ] Form shows validation error: "Amount is required" or similar
- [ ] Form does not submit
- [ ] Focus moves to first invalid field

#### Failure Path: Server Error

**Setup:**
- Server returns 500 error when saving

**Steps:**
1. User fills form correctly
2. User clicks "Save"
3. Server returns error

**Expected Results:**
- [ ] Error message appears: "Unable to save expense. Please try again."
- [ ] Form data is preserved (not cleared)
- [ ] User can retry

---

### Flow 3: Edit Expense

**Scenario:** User edits an existing expense

#### Success Path

**Setup:**
- User is authenticated
- Expenses table has expense rows

**Steps:**
1. User sees expense row with actions menu (three dots)
2. User clicks actions menu
3. User clicks "Edit" option
4. Modal/form opens with expense data pre-filled
5. User changes amount from $45.50 to $50.00
6. User clicks "Save"

**Expected Results:**
- [ ] `onEditExpense` callback is called with expense ID
- [ ] Modal opens with form pre-filled with expense data
- [ ] User can modify fields
- [ ] After save, expense updates in table (implementation handles this)

---

### Flow 4: Delete Expense

**Scenario:** User deletes an expense

#### Success Path

**Setup:**
- User is authenticated
- Expenses table has expense rows

**Steps:**
1. User clicks actions menu on an expense row
2. User clicks "Delete" option
3. Confirmation dialog appears
4. User confirms deletion

**Expected Results:**
- [ ] `onDeleteExpense` callback is called with expense ID
- [ ] Confirmation dialog appears: "Are you sure you want to delete this expense?" or similar
- [ ] After confirmation, expense is removed from table (implementation handles this)
- [ ] If last expense deleted, empty state appears

#### Failure Path: Cancel Deletion

**Steps:**
1. User clicks "Delete"
2. Confirmation dialog appears
3. User clicks "Cancel"

**Expected Results:**
- [ ] Dialog closes
- [ ] Expense remains in table
- [ ] No callback is called

---

### Flow 5: Filter Expenses

**Scenario:** User filters expenses by category

#### Success Path

**Setup:**
- User is authenticated
- Expenses table has expenses from multiple categories

**Steps:**
1. User sees Category dropdown in filter bar
2. User selects "Food & Dining" from dropdown
3. Table updates to show only Food & Dining expenses

**Expected Results:**
- [ ] `onFilterChange` callback is called with `{ category: "Food & Dining" }`
- [ ] Table filters to show only matching expenses (implementation handles this)
- [ ] Filter dropdown shows selected value

#### Multiple Filters

**Steps:**
1. User selects category "Food & Dining"
2. User selects account "Chase Checking"
3. User enters search term "coffee"

**Expected Results:**
- [ ] `onFilterChange` called with combined filters: `{ category: "Food & Dining", account: "acc-001", search: "coffee" }`
- [ ] Table shows expenses matching all filters

---

### Flow 6: Bulk Delete Expenses

**Scenario:** User selects multiple expenses and deletes them

#### Success Path

**Setup:**
- User is authenticated
- Expenses table has multiple expense rows

**Steps:**
1. User checks checkbox on first expense row
2. User checks checkbox on second expense row
3. Bulk action toolbar appears
4. User clicks "Delete Selected" in toolbar
5. Confirmation dialog appears
6. User confirms

**Expected Results:**
- [ ] `onSelectionChange` callback is called with array of selected expense IDs
- [ ] Bulk action toolbar appears with "Delete Selected" button
- [ ] `onBulkAction` callback is called with action "delete" and array of expense IDs
- [ ] After confirmation, selected expenses are removed (implementation handles this)
- [ ] If all expenses deleted, empty state appears

---

### Flow 7: Bulk Change Category

**Scenario:** User selects multiple expenses and changes their category

#### Success Path

**Steps:**
1. User selects 3 expenses via checkboxes
2. Bulk action toolbar appears
3. User clicks "Change Category" in toolbar
4. Category selector appears
5. User selects "Transportation"
6. User confirms

**Expected Results:**
- [ ] `onBulkAction` callback is called with action "changeCategory", expense IDs, and new category data
- [ ] Selected expenses update to new category (implementation handles this)

---

## Empty State Tests

### Primary Empty State: No Expenses Yet

**Scenario:** User has no expenses (first-time user)

**Setup:**
- `expenses` array is empty (`[]`)

**Expected Results:**
- [ ] Table shows empty state message: "No expenses yet. Add your first expense to get started."
- [ ] Empty state shows "Add Expense" button/CTA
- [ ] Clicking "Add Expense" opens the add form
- [ ] Metrics may show zeros but still render
- [ ] No broken layouts or errors

### Filtered Empty State

**Scenario:** User applies filters that return no results

**Setup:**
- Expenses exist but filter matches nothing (e.g., category "NonExistent" selected)

**Expected Results:**
- [ ] Table shows "No expenses found" message
- [ ] Shows guidance: "Try adjusting your filters" or "Clear filters" link
- [ ] Clear filters link resets all filters

---

## Component Interaction Tests

### ExpenseRow Component

**Renders correctly:**
- [ ] Displays date formatted correctly
- [ ] Displays description/merchant name
- [ ] Displays category name
- [ ] Displays amount formatted as currency
- [ ] Displays account name
- [ ] Displays tags as badges
- [ ] Shows recurring badge if expense is recurring
- [ ] Shows actions menu button (three dots)

**User interactions:**
- [ ] Clicking checkbox calls `onSelect` with expense ID and checked state
- [ ] Clicking actions menu opens dropdown
- [ ] Clicking "Edit" in menu calls `onEdit` with expense ID
- [ ] Clicking "Delete" in menu calls `onDelete` with expense ID
- [ ] Row click does nothing (as specified)

### ExpenseFilterBar Component

**Renders correctly:**
- [ ] All filter controls are visible and functional
- [ ] Date range picker works
- [ ] Category dropdown shows all available categories
- [ ] Account dropdown shows all available accounts
- [ ] Tag multi-select works
- [ ] Amount range inputs accept numbers
- [ ] Recurring toggle has three states: all, recurring only, one-time only
- [ ] Search input accepts text

**User interactions:**
- [ ] Changing any filter calls `onFilterChange` with updated filter object
- [ ] Clearing filters resets filter state

### BulkActionBar Component

**Renders correctly:**
- [ ] Only appears when expenses are selected
- [ ] Shows count of selected expenses (e.g., "3 selected")
- [ ] Shows action buttons: "Delete Selected", "Change Category", "Add Tags"

**User interactions:**
- [ ] Clicking "Delete Selected" calls `onBulkAction` with "delete" action
- [ ] Clicking "Change Category" opens category selector, then calls `onBulkAction` with "changeCategory"
- [ ] Clicking "Add Tags" opens tag selector, then calls `onBulkAction` with "addTags"
- [ ] Clicking "Clear Selection" clears selection

---

## Edge Cases

- [ ] **Very long descriptions** — Truncates long expense descriptions with ellipsis
- [ ] **Many tags** — Handles expenses with 5+ tags (wraps or scrolls)
- [ ] **Large amounts** — Formats large amounts correctly ($10,000.00)
- [ ] **Many expenses** — Table handles 100+ expenses (pagination or virtualization)
- [ ] **All expenses selected** — Select all checkbox selects all visible expenses
- [ ] **Filter then select** — Bulk actions work correctly on filtered results
- [ ] **Recurring vs one-time** — Recurring filter works correctly
- [ ] **Date range edge cases** — Handles dates in past/future correctly
- [ ] **Amount range edge cases** — Handles negative amounts, zero, very large numbers
- [ ] **Transition from empty to populated** — After adding first expense, table renders correctly
- [ ] **Transition from populated to empty** — After deleting last expense, empty state appears

---

## Accessibility Checks

- [ ] All interactive elements are keyboard accessible
- [ ] Table headers are properly labeled
- [ ] Checkboxes have associated labels
- [ ] Actions menu is keyboard accessible (Enter to open, Arrow keys to navigate, Escape to close)
- [ ] Filter inputs have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Focus is managed appropriately after actions (delete, bulk actions)

---

## Sample Test Data

```typescript
// Example test data - populated state
const mockExpense = {
  id: "exp-001",
  type: "expense",
  amount: 45.50,
  category: "Food & Dining",
  description: "Coffee & Breakfast",
  date: "2024-12-10",
  accountId: "acc-001",
  tags: ["coffee", "morning"],
  notes: "Morning coffee",
  recurring: false
};

const mockExpenses = [mockExpense, /* ... more expenses */];

// Example test data - empty state
const mockEmptyExpenses = [];

// Example test data - filtered empty state
const mockFilteredExpenses = []; // After applying filter that matches nothing
```

---

## Notes for Test Implementation

- Mock API calls for fetching expenses, adding, editing, deleting
- Test that filters persist across page refreshes (if implemented)
- Verify optimistic updates (expense appears immediately, then confirms with server)
- Test that bulk actions work correctly with filtered results
- Ensure proper error handling for failed API calls
- **Always test empty states** — Pass empty arrays to verify helpful empty state UI appears
- Test that recurring badge displays correctly for recurring expenses
- Verify that table sorting works correctly (by date, amount, category, etc.)

