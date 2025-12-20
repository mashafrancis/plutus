# Plutus — Product Overview

## Summary

Plutus is a privacy-first personal finance app that helps individuals track, understand, and improve their financial life in one place — covering expenses, income, subscriptions, investments, and net worth. Unlike traditional finance apps, Plutus puts users in control with no mandatory bank connections, full data ownership, and smart insights that surface meaningful patterns.

## Planned Sections

1. **Dashboard** — Central hub showing cash flow, net worth trend, top categories, investment performance, and smart insights.
2. **Expenses** — Track spending with categories, tags, dates, payment methods, recurring entries, and filtering.
3. **Income** — Record earnings from multiple sources (salary, freelance, passive) with recurring and one-time entries.
4. **Subscriptions** — Manage recurring payments with billing frequency, next payment dates, spend history, and renewal alerts.
5. **Investments** — Track stocks, ETFs, crypto, savings, and retirement with cost basis, current value, and gains/losses.
6. **Settings** — Manage accounts, categories, budgets, data export, and privacy preferences.

## Data Model

**Core Entities:**
- **Account** — Wallets, bank accounts, cards, and investment accounts
- **Transaction** — Individual expenses and income entries
- **Category** — Groups for organizing expenses and income
- **Subscription** — Recurring payments with billing frequency and renewal alerts
- **Investment** — Holdings with cost basis, current value, and gains/losses
- **Liability** — Debts, loans, and credit cards
- **Budget** — Monthly spending targets per category or overall
- **Tag** — Optional labels for filtering and organizing transactions
- **Insight** — Smart alerts and patterns surfaced by the system

**Relationships:**
- Transaction belongs to Account and Category
- Transaction can have many Tags
- Subscription, Investment, and Liability are linked to Accounts
- Budget is set per Category (or overall)
- Insight references Transactions, Subscriptions, or Investments for context

## Design System

**Colors:**
- Primary: `blue` — Used for buttons, links, key accents
- Secondary: `sky` — Used for tags, highlights, secondary elements
- Neutral: `neutral` — Used for backgrounds, text, borders

**Typography:**
- Heading: `Geist Sans` — Used for headings and titles
- Body: `Geist Sans` — Used for body text
- Mono: `Geist Mono` — Used for code, numbers, and technical content

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing structure, and application shell
2. **Dashboard** — Implement the central hub with metrics, charts, and insights
3. **Expenses** — Build expense tracking with filtering, categories, and bulk actions
4. **Income** — Implement income tracking with multiple sources and recurring entries
5. **Subscriptions** — Build subscription management with renewal alerts and payment history
6. **Investments** — Implement investment tracking with portfolio metrics and charts
7. **Settings** — Build settings for accounts, categories, budgets, preferences, and data management

Each milestone has a dedicated instruction document in `product-plan/instructions/`.

