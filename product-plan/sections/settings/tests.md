# Test Instructions: Settings

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

The Settings section provides configuration management across three tabs: Financial (accounts, categories, tags), Budgets, and General (data, preferences, profile). Test that users can manage all settings, export/import data, and configure preferences.

---

## User Flow Tests

### Flow 1: Set Default Account

**Scenario:** User sets an account as default

#### Success Path

**Steps:**
1. User navigates to `/settings`
2. User sees "Financial" tab selected by default
3. User sees Accounts section
4. User clicks actions menu on an account row
5. User clicks "Set as Default"
6. Account becomes default

**Expected Results:**
- [ ] `onSetDefaultAccount` callback is called with account ID
- [ ] Account shows "Default" badge
- [ ] Previous default account loses default badge
- [ ] Only one account is default at a time

---

### Flow 2: Archive Account

**Scenario:** User archives an account to hide it without deleting

#### Success Path

**Steps:**
1. User clicks actions menu on account
2. User clicks "Archive"
3. Account moves to "Archived Accounts" section

**Expected Results:**
- [ ] `onArchiveAccount` callback is called with account ID and `archived: true`
- [ ] Account moves to archived section
- [ ] Account shows "Archived" badge
- [ ] Historical transactions remain linked to archived account

---

### Flow 3: Merge Tags

**Scenario:** User merges two tags into one

#### Success Path

**Steps:**
1. User sees Tags section in Financial tab
2. User clicks actions menu on tag "coffee"
3. User clicks "Merge into..." submenu
4. User selects "morning" from merge options
5. Tag "coffee" merges into "morning"

**Expected Results:**
- [ ] `onMergeTags` callback is called with source tag ID and target tag ID
- [ ] Source tag is removed
- [ ] Target tag's usage count increases
- [ ] All transactions using source tag now use target tag (implementation handles this)

---

### Flow 4: Create Budget

**Scenario:** User creates a new category budget

#### Success Path

**Steps:**
1. User clicks "Budgets" tab
2. User clicks "Add Budget" button
3. Budget form opens
4. User selects category "Food & Dining", enters limit "750.00", sets alert threshold "80%"
5. User clicks "Save"

**Expected Results:**
- [ ] `onAddBudget` callback is called
- [ ] Budget form opens (implementation handles this)
- [ ] After save, budget appears in Category Budgets section

---

### Flow 5: Export Data

**Scenario:** User exports data to CSV

#### Success Path

**Steps:**
1. User clicks "General" tab
2. User sees Data Management section
3. User clicks "Export CSV" button
4. Export options appear (if implemented)
5. User clicks "Export"

**Expected Results:**
- [ ] `onExportData` callback is called with format "csv" and options
- [ ] CSV file downloads (implementation handles this)
- [ ] Success notification appears

---

### Flow 6: Update Preferences

**Scenario:** User changes theme preference

#### Success Path

**Steps:**
1. User clicks "General" tab
2. User sees Preferences section
3. User changes Theme dropdown from "System" to "Dark"
4. Theme updates

**Expected Results:**
- [ ] `onUpdatePreferences` callback is called with `{ theme: "dark" }`
- [ ] Theme preference updates (implementation handles this)

---

### Flow 7: Delete All Data

**Scenario:** User deletes all their data

#### Success Path

**Steps:**
1. User clicks "General" tab
2. User scrolls to Danger Zone section
3. User clicks "Delete All Data" button
4. Strong confirmation dialog appears
5. User types confirmation text (if required)
6. User confirms deletion

**Expected Results:**
- [ ] `onDeleteAllData` callback is called
- [ ] Strong confirmation dialog appears: "This will permanently delete all your data. This action cannot be undone."
- [ ] After confirmation, all data is deleted (implementation handles this)
- [ ] User is logged out or redirected (implementation handles this)

---

## Empty State Tests

### No Accounts Yet

**Setup:**
- `accounts` array is empty (`[]`)

**Expected Results:**
- [ ] Accounts section shows empty state: "No accounts yet. Add your first account to get started."
- [ ] Empty state shows "Add Account" button

### No Categories Yet

**Setup:**
- `categories` array is empty (`[]`)

**Expected Results:**
- [ ] Categories section shows empty state: "No categories yet. Add your first category to get started."
- [ ] Empty state shows "Add Category" button

### No Budgets Yet

**Setup:**
- `budgets` array is empty (`[]`)

**Expected Results:**
- [ ] Budgets tab shows empty state: "No budgets set. Add your first budget to track spending limits."
- [ ] Empty state shows "Add Budget" button

---

## Component Interaction Tests

### AccountRow Component

**Renders correctly:**
- [ ] Shows account name
- [ ] Shows account type
- [ ] Shows current balance formatted as currency
- [ ] Shows "Default" badge if account is default
- [ ] Shows "Archived" badge if account is archived

**User interactions:**
- [ ] Clicking "Set as Default" calls `onSetDefaultAccount`
- [ ] Clicking "Archive" calls `onArchiveAccount` with `archived: true`
- [ ] Clicking "Unarchive" calls `onArchiveAccount` with `archived: false`
- [ ] Clicking "Delete" calls `onDeleteAccount` with confirmation

### BudgetCard Component

**Renders correctly:**
- [ ] Shows category name (or "Overall")
- [ ] Shows limit and current spending
- [ ] Progress bar shows correct percentage
- [ ] Progress bar color changes based on percentage (green/amber/red)
- [ ] Shows rollover and recurring toggles

**User interactions:**
- [ ] Toggling rollover calls `onUpdate` with updated `rolloverEnabled`
- [ ] Toggling recurring calls `onUpdate` with updated `recurringEnabled`
- [ ] Clicking "Edit" calls `onEdit`

---

## Edge Cases

- [ ] **Many accounts** — Handles 20+ accounts (archived section works correctly)
- [ ] **Category hierarchy** — Parent/child categories display correctly with indentation
- [ ] **Many tags** — Tag grid handles 50+ tags
- [ ] **Budget over limit** — Progress bar shows >100% correctly
- [ ] **Export with filters** — Export respects date range and section filters
- [ ] **Import validation** — Handles invalid import files gracefully
- [ ] **Profile avatar** — Handles avatar upload and removal

---

## Sample Test Data

```typescript
const mockAccount = {
  id: "acc-001",
  name: "Chase Checking",
  type: "checking",
  currentBalance: 5420.50,
  isDefault: true,
  isArchived: false
};

const mockBudget = {
  id: "budget-001",
  categoryId: "cat-001",
  categoryName: "Housing",
  limit: 2000.00,
  currentSpending: 1850.00,
  period: "monthly",
  rolloverEnabled: false,
  recurringEnabled: true,
  alertThreshold: 80,
  alertThresholdType: "percentage"
};
```

---

## Notes for Test Implementation

- Test all three tabs (Financial, Budgets, General)
- Verify archive functionality preserves historical data
- Test tag merge functionality thoroughly
- Test budget toggles (rollover, recurring) update correctly
- Test export/import file handling
- **Always test empty states** — Pass empty arrays to verify helpful empty state UI appears
- Test confirmation dialogs for destructive actions (delete account, delete all data)

