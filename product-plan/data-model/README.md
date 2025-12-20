# Data Model

## Overview

The Plutus data model defines the core entities and relationships for tracking personal finances. All entities are designed to be privacy-first, allowing users to own and control their data.

## Entities

### Account
Wallets, bank accounts, cards, and investment accounts that transactions, subscriptions, investments, and liabilities are associated with.

**Key Fields:**
- `id` — Unique identifier
- `name` — Account name (e.g., "Chase Checking")
- `type` — Account type (checking, savings, credit, cash, investment)
- `currentBalance` — Current balance (can be negative for credit cards)
- `isDefault` — Whether this is the default account for new transactions
- `isArchived` — Whether the account is archived (hidden but preserved)

### Transaction
Individual expenses and income entries with amount, date, category, account, tags, and optional notes.

**Key Fields:**
- `id` — Unique identifier
- `type` — Transaction type (expense or income)
- `amount` — Transaction amount
- `date` — Transaction date
- `category` — Category name
- `accountId` — Associated account ID
- `tags` — Array of tag names
- `notes` — Optional notes
- `recurring` — Whether this is a recurring transaction
- `recurringFrequency` — Frequency if recurring (monthly, weekly, etc.)

### Category
Groups for organizing expenses and income (e.g., "Food", "Transportation", "Salary").

**Key Fields:**
- `id` — Unique identifier
- `name` — Category name
- `type` — Category type (expense or income)
- `icon` — Icon identifier
- `color` — Color identifier
- `parentId` — Parent category ID for hierarchies (null for root categories)
- `isArchived` — Whether the category is archived
- `isDefault` — Whether this is a default category

### Subscription
Recurring payments with billing frequency, next payment date, total spend, and renewal alerts, linked to an account.

**Key Fields:**
- `id` — Unique identifier
- `name` — Subscription name
- `category` — Category name
- `amount` — Monthly/yearly cost
- `billingCycle` — Billing frequency (monthly, yearly, weekly)
- `nextPaymentDate` — Next payment date
- `status` — Status (active, paused, cancelled)
- `paymentMethodId` — Associated account ID
- `startDate` — When subscription started
- `totalSpent` — Total amount spent over time
- `paymentHistory` — Array of payment records

### Investment
Holdings like stocks, ETFs, crypto, savings accounts with cost basis, current value, and gains/losses, linked to an account.

**Key Fields:**
- `id` — Unique identifier
- `name` — Investment name
- `ticker` — Stock/crypto ticker symbol (optional)
- `type` — Asset type (Stocks, ETFs, Crypto, Bonds, Savings, Retirement, Real Estate, Other)
- `shares` — Number of shares/units
- `costBasis` — Original purchase cost
- `currentPrice` — Current price per share
- `currentValue` — Current total value
- `gainLossAmount` — Total gain/loss in dollars
- `gainLossPercent` — Total gain/loss percentage
- `todayChangeAmount` — Today's change in dollars
- `todayChangePercent` — Today's change percentage
- `allocationPercent` — Portfolio allocation percentage
- `accountId` — Associated account ID
- `transactionHistory` — Array of buy/sell transactions

### Liability
Debts, loans, and credit cards with balance, interest rate, and payment terms, linked to an account.

**Key Fields:**
- `id` — Unique identifier
- `name` — Liability name
- `type` — Liability type (credit card, loan, mortgage, etc.)
- `balance` — Current balance
- `interestRate` — Annual interest rate
- `minimumPayment` — Minimum monthly payment
- `accountId` — Associated account ID

### Budget
Monthly spending targets set per category or overall, with warnings when limits are approached.

**Key Fields:**
- `id` — Unique identifier
- `categoryId` — Category ID (null for overall budget)
- `categoryName` — Category name (or "Overall")
- `limit` — Budget limit
- `currentSpending` — Current spending this period
- `period` — Budget period (monthly, weekly, quarterly, yearly)
- `rolloverEnabled` — Whether unused budget rolls over
- `recurringEnabled` — Whether budget resets automatically
- `alertThreshold` — Percentage or dollar amount to trigger alerts
- `alertThresholdType` — Threshold type (percentage or dollar)

### Tag
Optional labels for filtering and organizing transactions.

**Key Fields:**
- `id` — Unique identifier
- `name` — Tag name
- `usageCount` — Number of transactions using this tag

### Insight
Smart alerts and patterns surfaced by the system (e.g., spending anomalies, subscription ratios, savings rate changes).

**Key Fields:**
- `id` — Unique identifier
- `type` — Insight type (spendingAnomalies, subscriptionRatio, savingsRate, etc.)
- `title` — Insight title
- `message` — Insight message
- `severity` — Severity level (info, warning, critical)
- `date` — When insight was generated
- `relatedEntityIds` — IDs of related transactions/subscriptions/investments

## Relationships

- **Transaction** belongs to **Account** (via `accountId`)
- **Transaction** belongs to **Category** (via `category` name)
- **Transaction** can have many **Tags** (via `tags` array)
- **Subscription** is linked to **Account** (via `paymentMethodId`)
- **Investment** is linked to **Account** (via `accountId`)
- **Liability** is linked to **Account** (via `accountId`)
- **Budget** is set per **Category** (via `categoryId`, or null for overall)
- **Insight** references **Transactions**, **Subscriptions**, or **Investments** for context (via `relatedEntityIds`)

## Data Ownership

All data is user-owned and can be:
- Exported in CSV, JSON, or PDF formats
- Imported from CSV or JSON files
- Deleted entirely (with confirmation)
- Archived without losing historical data

