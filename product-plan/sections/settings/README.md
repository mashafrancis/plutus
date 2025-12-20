# Settings

## Overview

The Settings section provides a centralized hub for managing all app configuration, organized into three tabs: Financial (accounts + categories), Budgets, and General Settings (data management + preferences). Users can configure their financial accounts, customize categories and tags, set budget limits with alerts, export/import data, and personalize their app experience.

## User Flows

### Accounts Management
- Add, edit, delete, and archive accounts
- Set a default account for new transactions
- Update account balances

### Categories Management
- Add, edit, delete, and archive categories
- Create parent/child category hierarchies
- Assign icons and colors to categories

### Tags Management
- Add, edit, and delete tags
- Merge tags (combine two tags into one)

### Budgets Configuration
- Set monthly budget limits per category or overall
- Configure rollover and recurring settings
- Set alert thresholds

### Data Management
- Export data to CSV, JSON, or PDF
- Import data from CSV or JSON files
- Delete all data (with confirmation)

### Preferences
- Set theme, currency, and date format preferences
- Configure email and in-app notifications
- Set subscription reminder timing
- Configure which smart insights to display
- Update user profile (name, email, avatar)

## Design Decisions

- **Tabbed organization** — Three clear tabs for different setting categories
- **Card-based sections** — Each setting area in its own card for clarity
- **Archive vs delete** — Archive preserves historical data, delete removes permanently
- **Hierarchical categories** — Support for parent/child relationships

## Data Used

**Entities:**
- `Account` — Financial accounts
- `Category` — Expense and income categories
- `Tag` — Transaction tags
- `Budget` — Budget limits and settings
- `Preferences` — User preferences
- `Profile` — User profile information

**From global model:** All entities from the global data model are used in Settings

## Visual Reference

See `settings.png` for the target UI design.

## Components Provided

- `Settings` — Main settings component with tab navigation
- `FinancialTab` — Tab for accounts, categories, and tags
- `BudgetsTab` — Tab for budget configuration
- `GeneralTab` — Tab for data management, preferences, and profile
- `AccountRow` — Displays a single account with actions
- `CategoryRow` — Displays a single category with actions
- `TagRow` — Displays a single tag with merge functionality
- `BudgetCard` — Displays a single budget with progress and settings
- `PreferencesSection` — Preferences form section
- `ProfileSection` — Profile form section

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAddAccount` | Called when user wants to add a new account |
| `onEditAccount` | Called when user wants to edit an account |
| `onDeleteAccount` | Called when user wants to delete an account |
| `onArchiveAccount` | Called when user archives/unarchives an account |
| `onSetDefaultAccount` | Called when user sets an account as default |
| `onUpdateAccountBalance` | Called when user updates account balance |
| `onAddCategory` | Called when user wants to add a new category |
| `onEditCategory` | Called when user wants to edit a category |
| `onDeleteCategory` | Called when user wants to delete a category |
| `onArchiveCategory` | Called when user archives/unarchives a category |
| `onAddTag` | Called when user wants to add a new tag |
| `onEditTag` | Called when user wants to edit a tag |
| `onDeleteTag` | Called when user wants to delete a tag |
| `onMergeTags` | Called when user merges two tags |
| `onAddBudget` | Called when user wants to add a new budget |
| `onEditBudget` | Called when user wants to edit a budget |
| `onDeleteBudget` | Called when user wants to delete a budget |
| `onUpdateBudget` | Called when user updates budget settings |
| `onUpdatePreferences` | Called when user updates preferences |
| `onUpdateProfile` | Called when user updates profile |
| `onExportData` | Called when user exports data |
| `onImportData` | Called when user imports data |
| `onDeleteAllData` | Called when user wants to delete all data |

