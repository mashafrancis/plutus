# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:**
- Primary: `blue` — Used for buttons, links, key accents
- Secondary: `sky` — Used for tags, highlights, secondary elements
- Neutral: `neutral` — Used for backgrounds, text, borders

**Typography:**
- Heading: `Geist Sans` — Used for headings and titles
- Body: `Geist Sans` — Used for body text
- Mono: `Geist Mono` — Used for code, numbers, and technical content

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:**
- `Account` — Financial accounts (checking, savings, credit, cash, investment)
- `Transaction` — Expenses and income entries
- `Category` — Expense and income categories
- `Subscription` — Recurring payments
- `Investment` — Investment holdings
- `Liability` — Debts and loans
- `Budget` — Spending limits and targets
- `Tag` — Transaction tags
- `Insight` — Smart insights and alerts

### 3. Routing Structure

Create placeholder routes for each section:

- `/` — Dashboard (default/home)
- `/expenses` — Expenses section
- `/income` — Income section
- `/subscriptions` — Subscriptions section
- `/investments` — Investments section
- `/settings` — Settings section

Routes can be placeholder pages initially — you'll implement each section in subsequent milestones.

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu with avatar

**Wire Up Navigation:**

Connect navigation to your routing. The navigation expects these items:

```typescript
const navigationItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard, isActive: currentRoute === '/' },
  { label: 'Expenses', href: '/expenses', icon: ArrowDownCircle, isActive: currentRoute === '/expenses' },
  { label: 'Income', href: '/income', icon: ArrowUpCircle, isActive: currentRoute === '/income' },
  { label: 'Subscriptions', href: '/subscriptions', icon: RefreshCw, isActive: currentRoute === '/subscriptions' },
  { label: 'Investments', href: '/investments', icon: TrendingUp, isActive: currentRoute === '/investments' },
  { label: 'Settings', href: '/settings', icon: Settings, isActive: currentRoute === '/settings' },
]
```

**User Menu:**

The user menu expects:
- User name
- Avatar URL (optional)
- Logout callback

**Integration Example:**

```typescript
import { AppShell } from './shell/components'
import { useRouter } from 'your-routing-library'
import { useAuth } from './auth'

function Layout({ children }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  
  const navigationItems = [
    // ... navigation items with isActive based on router.pathname
  ]
  
  return (
    <AppShell
      navigationItems={navigationItems}
      user={{ name: user.name, avatarUrl: user.avatarUrl }}
      onNavigate={(href) => router.push(href)}
      onLogout={logout}
    >
      {children}
    </AppShell>
  )
}
```

**Note on UI Components:**

The shell components reference UI components at `../../ui/button`, `../../ui/avatar`, etc. You'll need to:
- Create these UI components in your project, OR
- Adjust the import paths to match your UI component library location

Common UI components needed:
- `Button` — Standard button component
- `Avatar` — Avatar component with fallback initials
- `Card` — Card container component
- `Table` — Table components (Table, TableBody, TableHead, TableHeader, TableRow)
- `Tabs` — Tab navigation components
- `Checkbox` — Checkbox component
- `Switch` — Toggle switch component
- `Select` — Dropdown select component
- `DropdownMenu` — Dropdown menu component

You can use a UI library like shadcn/ui, Radix UI, or create your own components matching the expected props.

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components
- `product-plan/shell/spec.md` — Shell specification

## Done When

- [ ] Design tokens are configured (colors, fonts)
- [ ] Data model types are defined (TypeScript interfaces)
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Logout functionality works
- [ ] Responsive on mobile (sidebar collapses/hamburger menu)
- [ ] Dark mode support works (if implementing dark mode)

