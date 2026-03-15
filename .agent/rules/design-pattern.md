---
trigger: always_on
---

# Feature-Sliced Design (FSD) Structure

## Core Principles

Feature-Sliced Design organizes code by **business value** rather than technical role. The architecture has three key concepts:

1. **Layers** - standardized levels of abstraction (mandatory)
2. **Slices** - business-domain partitions within layers (flexible)
3. **Segments** - technical-purpose folders within slices (optional)

## Layer Hierarchy (Top to Bottom)

```
app/          # Application initialization, providers, global styles
pages/        # Full page components and routing
widgets/      # Large composite UI blocks (header, sidebar, etc.)
features/     # User interactions and business features
entities/     # Business entities (user, product, order, etc.)
shared/       # Reusable infrastructure code (UI kit, utils, API)
```

**Import Rule**: Layers can only import from layers **below** them. No upward or circular imports.

## Standard Project Structure

```
src/
├── app/
│   ├── providers/           # App providers (router, store, theme)
│   ├── styles/              # Global styles
│   └── index.tsx            # Entry point
├── pages/
│   ├── home/
│   │   ├── ui/              # Page components
│   │   └── index.ts         # Public API
│   └── product-details/
├── widgets/
│   ├── header/
│   │   ├── ui/
│   │   └── index.ts
│   └── product-card/
├── features/
│   ├── auth/
│   │   ├── ui/              # Auth forms, buttons
│   │   ├── model/           # State, business logic
│   │   ├── api/             # API requests
│   │   └── index.ts         # Public API
│   ├── add-to-cart/
│   └── product-filters/
├── entities/
│   ├── user/
│   │   ├── ui/              # User avatar, card
│   │   ├── model/           # User types, store
│   │   ├── api/             # User API
│   │   └── index.ts
│   ├── product/
│   └── order/
└── shared/
    ├── ui/                  # UI kit (Button, Input, Modal)
    ├── lib/                 # Utilities, helpers
    ├── api/                 # API client, base configuration
    ├── config/              # Constants, environment
    └── types/               # Common TypeScript types
```

## Segment Types (Within Slices)

- `ui/` - UI components (React, Vue, etc.)
- `model/` - Business logic, state management (stores, hooks)
- `api/` - API requests and transformations
- `lib/` - Infrastructure utilities for this slice
- `config/` - Feature flags, constants
- `types/` - TypeScript types/interfaces

## Public API Pattern

Each slice exports only what's needed through `index.ts`:

```typescript
// features/auth/index.ts
export { LoginForm } from "./ui/LoginForm";
export { useAuth } from "./model/useAuth";
export type { AuthState } from "./model/types";
// Internal implementation stays private
```

## Key Rules

1. **One layer can't import from layers above it**
2. **Slices on the same layer can't directly import from each other** (use shared or lower layers)
3. **Always use public APIs** (import from `index.ts`, not internal files)
4. **Keep business logic in features/entities**, not in UI

## Quick Examples

**❌ Bad**: Importing from a higher layer

```typescript
// entities/user/model.ts
import { CartWidget } from "@/widgets/cart"; // ❌ widgets is above entities
```

**✅ Good**: Importing from lower layers

```typescript
// widgets/cart/ui.tsx
import { useCart } from "@/entities/cart"; // ✅
import { Button } from "@/shared/ui/button"; // ✅
```

**❌ Bad**: Direct slice-to-slice imports on same layer

```typescript
// features/add-to-cart/model.ts
import { checkAuth } from "@/features/auth/model/utils"; // ❌ bypassing public API
```

**✅ Good**: Using public API

```typescript
// features/add-to-cart/model.ts
import { useAuth } from "@/features/auth"; // ✅ using public API
```

## Benefits

- **Scalability**: Clear boundaries prevent spaghetti code
- **Maintainability**: Easy to locate and modify features
- **Team collaboration**: Multiple developers can work on different slices
- **Reusability**: Shared infrastructure is explicitly defined
- **Testability**: Isolated slices are easier to test

---

**Reference**: https://feature-sliced.design/
