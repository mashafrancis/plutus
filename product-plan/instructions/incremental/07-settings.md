# Milestone 7: Settings

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Settings feature — settings for accounts, categories, budgets, preferences, and data management.

## Overview

The Settings section provides a centralized hub for managing all app configuration, organized into three tabs: Financial (accounts + categories), Budgets, and General Settings (data management + preferences). Users can configure their financial accounts, customize categories and tags, set budget limits with alerts, export/import data, and personalize their app experience.

**Key Functionality:**
- **Accounts Management:** Add, edit, delete, archive accounts; set default account; update balances
- **Categories Management:** Add, edit, delete, archive categories; create hierarchies; assign icons/colors
- **Tags Management:** Add, edit, delete tags; merge tags
- **Budgets Configuration:** Set budget limits per category or overall; configure rollover and recurring; set alert thresholds
- **Data Management:** Export data to CSV/JSON/PDF; import data from CSV/JSON; delete all data
- **Preferences:** Set theme, currency, date format; configure notifications; set subscription reminders; configure insights; update profile

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/settings/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/settings/components/`:

- `Settings.tsx` — Main settings component with tab navigation
- `FinancialTab.tsx` — Tab for accounts, categories, and tags
- `BudgetsTab.tsx` — Tab for budget configuration
- `GeneralTab.tsx` — Tab for data management, preferences, and profile
- `AccountRow.tsx` — Displays a single account with actions
- `CategoryRow.tsx` — Displays a single category with actions
- `TagRow.tsx` — Displays a single tag with merge functionality
- `BudgetCard.tsx` — Displays a single budget with progress and settings
- `PreferencesSection.tsx` — Preferences form section
- `ProfileSection.tsx` — Profile form section

### Data Layer

The components expect these data shapes (see `product-plan/sections/settings/types.ts`):

```typescript
interface SettingsData {
  accounts: Account[]
  categories: Category[]
  tags: Tag[]
  budgets: Budget[]
  preferences: Preferences
  profile: Profile
}
```

You'll need to:
- Create API endpoints for CRUD operations on accounts, categories, tags, budgets
- Implement account management (default, archive, balance updates)
- Implement category management (hierarchies, icons, colors)
- Implement tag merge functionality
- Implement budget management (limits, periods, rollover, alerts)
- Implement data export/import functionality
- Implement preferences management
- Implement profile management

### Callbacks

Wire up these user actions (see `product-plan/sections/settings/types.ts` for full list):

- `onAddAccount`, `onEditAccount`, `onDeleteAccount`, `onArchiveAccount`, `onSetDefaultAccount`, `onUpdateAccountBalance`
- `onAddCategory`, `onEditCategory`, `onDeleteCategory`, `onArchiveCategory`
- `onAddTag`, `onEditTag`, `onDeleteTag`, `onMergeTags`
- `onAddBudget`, `onEditBudget`, `onDeleteBudget`, `onUpdateBudget`
- `onUpdatePreferences`
- `onUpdateProfile`
- `onExportData` — Export data in CSV/JSON/PDF format
- `onImportData` — Import data from CSV/JSON file
- `onDeleteAllData` — Delete all user data (with strong confirmation)

### Empty States

Implement empty state UI:

- **No accounts yet:** Show "No accounts yet. Add your first account to get started."
- **No categories yet:** Show "No categories yet. Add your first category to get started."
- **No tags yet:** Show "No tags yet. Add your first tag to get started."
- **No budgets yet:** Show "No budgets set. Add your first budget to track spending limits."

## Files to Reference

- `product-plan/sections/settings/README.md` — Feature overview
- `product-plan/sections/settings/tests.md` — Test-writing instructions
- `product-plan/sections/settings/components/` — React components
- `product-plan/sections/settings/types.ts` — TypeScript interfaces
- `product-plan/sections/settings/sample-data.json` — Test data
- `product-plan/sections/settings/settings.png` — Visual reference

## Expected User Flows

### Flow 1: Set Default Account

1. User navigates to Settings → Financial tab
2. User clicks actions menu on an account
3. User clicks "Set as Default"
4. **Outcome:** Account shows "Default" badge, previous default loses badge

### Flow 2: Create Budget

1. User navigates to Settings → Budgets tab
2. User clicks "Add Budget"
3. Budget form opens
4. User selects category "Food & Dining", enters limit "750.00", sets alert threshold "80%"
5. User clicks "Save"
6. **Outcome:** Budget appears in Category Budgets section

### Flow 3: Export Data

1. User navigates to Settings → General tab
2. User clicks "Export CSV" button
3. Export options appear (date range, sections)
4. User selects options and clicks "Export"
5. **Outcome:** CSV file downloads with user's data

### Flow 4: Merge Tags

1. User navigates to Settings → Financial tab → Tags section
2. User clicks actions menu on tag "coffee"
3. User clicks "Merge into..." submenu
4. User selects "morning" from merge options
5. **Outcome:** Tag "coffee" merges into "morning", all transactions using "coffee" now use "morning"

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Empty states display properly
- [ ] All CRUD operations work (accounts, categories, tags, budgets)
- [ ] Archive functionality works (preserves historical data)
- [ ] Tag merge functionality works
- [ ] Budget toggles work (rollover, recurring)
- [ ] Data export works (CSV, JSON, PDF)
- [ ] Data import works (CSV, JSON)
- [ ] Preferences save correctly
- [ ] Profile updates work
- [ ] Delete all data works (with strong confirmation)
- [ ] Matches the visual design
- [ ] Responsive on mobile

