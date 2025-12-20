# Application Shell Specification

## Overview

The Plutus application shell provides a persistent navigation structure that wraps all sections. It features a collapsible sidebar navigation optimized for frequent access to financial data across Dashboard, Expenses, Income, Subscriptions, Investments, and Settings.

## Navigation Structure

- **Dashboard** (`/`) — Default/home view showing cash flow, net worth trend, top categories, investment performance, and smart insights
- **Expenses** (`/expenses`) — Track spending with categories, tags, dates, payment methods, recurring entries, and filtering
- **Income** (`/income`) — Record earnings from multiple sources (salary, freelance, passive) with recurring and one-time entries
- **Subscriptions** (`/subscriptions`) — Manage recurring payments with billing frequency, next payment dates, spend history, and renewal alerts
- **Investments** (`/investments`) — Track stocks, ETFs, crypto, savings, and retirement with cost basis, current value, and gains/losses
- **Settings** (`/settings`) — Manage accounts, categories, budgets, data export, and privacy preferences

## User Menu

Located at the bottom of the sidebar, the user menu displays:
- User avatar (with fallback initials)
- User name
- Collapse/expand sidebar toggle button
- Logout action

## Layout Pattern

**Collapsible Sidebar Navigation**
- Desktop: Full sidebar (280px width) with icons and labels, collapsible to icons-only (64px)
- Tablet: Collapsed by default (icons-only), expandable on hover/click
- Mobile: Hidden sidebar, hamburger menu in header, slide-out drawer overlay

## Responsive Behavior

- **Desktop (≥1024px):** Full sidebar visible, can collapse to icons-only mode
- **Tablet (768px-1023px):** Sidebar collapsed by default, expands on interaction
- **Mobile (<768px):** Sidebar hidden, hamburger menu in top header opens slide-out drawer

## Design Notes

- Primary color (`blue`) used for active navigation items and key accents
- Secondary color (`sky`) used for hover states and subtle highlights
- Neutral color palette for backgrounds, borders, and text
- Geist Sans typography for all text
- Icons from lucide-react library
- Smooth transitions for collapse/expand animations
- Dark mode support with appropriate color variants

