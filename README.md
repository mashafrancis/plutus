# tanstack-effect-convex

Monorepo for a TanStack Start web app with a Convex backend. Tooling is standardized on Vite+.

## Stack

- TypeScript
- TanStack Start (React + SSR)
- Convex backend + Better Auth integration
- Tailwind CSS + shadcn/ui
- Vite+ (`vp`) for dev, checks, testing, build, and task running

## Project Structure

```text
tanstack-effect-convex/
├── apps/
│   └── web/         # TanStack Start web app
└── packages/
    ├── backend/     # Convex functions and schema
    ├── config/      # Shared config package
    └── env/         # Shared typed env package
```

## Local Development

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure Convex

```bash
pnpm run dev:setup
```

### 3) Start development

```bash
pnpm run dev
```

App runs at `http://localhost:3000`.

## Vite+ Workflow

Common commands:

- `pnpm run dev` - run workspace dev tasks
- `pnpm run check` - format + lint + type checks
- `pnpm run check-types` - workspace type checks only
- `pnpm run build` - cached recursive workspace build
- `pnpm run build:web` - build web package only
- `pnpm run cached-build` - explicit cached build task

Vite+ specific notes:

- Use `vp run <task>` for package scripts and workspace tasks.
- Root task orchestration lives in `vite.config.ts` under `run.tasks`.
- Git hooks are configured through `vp config`.

## Turbo Migration Note

Turbo/Turbopack usage has been removed:

- Root Turbo scripts were replaced with `vp run` equivalents.
- `turbo` dependency and workspace catalog entry were removed.
- `turbo.json` was removed.

## Cloudflare Publish (Convex backend retained)

The web app deploys to Cloudflare Workers, while Convex remains the backend source of truth.

### Prerequisites

1. Cloudflare account (already available)
2. Wrangler auth on your machine:

   ```bash
   pnpm --filter web exec wrangler login
   ```

3. Convex production deployment configured
4. Required runtime env vars set for the web app

### Required Environment Variables

Set these in your Cloudflare Worker settings (or via Wrangler secrets/vars):

- `VITE_CONVEX_URL` - Convex API URL
- `VITE_CONVEX_SITE_URL` - Convex `.site` URL

Optional frontend vars (if used in your environment):

- `VITE_OP_CLIENT_ID`
- `VITE_DATABUDDY_CLIENT_ID`
- `SENTRY_AUTH_TOKEN` (for sourcemap upload in Sentry plugin flows)

### Deployment Commands

From the repository root:

```bash
pnpm run build:cloudflare
pnpm run deploy:cloudflare
```

Package-level equivalents:

```bash
pnpm --filter web run build:cf
pnpm --filter web run deploy:cf
```

Preview locally in Worker runtime:

```bash
pnpm run preview:cloudflare
```

### First Deploy Checklist

1. Ensure Convex production env is healthy.
2. Set required Worker env vars.
3. Run `pnpm run check`.
4. Run `pnpm run deploy:cloudflare`.
5. Open the deployed URL and validate:
   - homepage loads
   - auth endpoints under `/api/auth/*` respond
   - app can query Convex successfully

### Rollback / Recovery

- Redeploy the previous known-good commit.
- If env regressions are suspected, restore previous Worker secrets/vars and redeploy.
