# tanstack-effect-convex

Monorepo for a TanStack Start web app with a Convex backend. Tooling is standardized on Vite+.

## Stack

- TypeScript
- TanStack Start (React + SSR)
- Convex backend + Better Auth integration
- Tailwind CSS + shadcn/ui
- Vite+ (`vp`) for install, dev, checks, testing, build, start, and task running

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
vp install
```

### 2) Configure Convex

```bash
vp run dev:setup
```

### 3) Start development

```bash
vp run dev
```

App runs at `http://localhost:3000`.

## Vite+ Workflow

Common commands:

- `vp install` - install workspace dependencies (uses pnpm under the hood)
- `vp run dev` - run workspace dev tasks
- `vp run check` - format + lint + type checks
- `vp run check-types` - workspace type checks only
- `vp run build` - cached recursive workspace build
- `vp run build:web` - build web package only
- `vp run start` - serve Node SSR output (after `vp run build`)
- `vp run cached-build` - explicit cached build task

Vite+ specific notes:

- Use `vp run <task>` for package scripts and workspace tasks at the repo root.
- Inside `apps/web`, `vp build` / `vp dev` run the Vite app directly.
- Root task orchestration lives in `vite.config.ts` under `run.tasks`.
- Git hooks are configured through `vp config`.

## Turbo Migration Note

Turbo/Turbopack usage has been removed:

- Root Turbo scripts were replaced with `vp run` equivalents.
- `turbo` dependency and workspace catalog entry were removed.
- `turbo.json` was removed.

## Deploy targets

The web app can deploy to **Vercel** (Nitro `vercel` preset when `VERCEL` is set) or **Cloudflare Workers** (`DEPLOY_CLOUDFLARE=1` → `cloudflare_module` preset). Convex remains the backend source of truth in both cases.

### Vercel

[`apps/web/vercel.json`](apps/web/vercel.json) bootstraps Vite+ and runs `vp run build:web`. Set the Vercel project Root Directory to match where that config is applied (typically `apps/web` with monorepo install from root, or repo root per your Vercel project settings).

### Cloudflare Publish

#### Prerequisites

1. Cloudflare account (already available)
2. Wrangler auth on your machine:

   ```bash
   vp run --filter=web exec wrangler login
   ```

3. Convex production deployment configured
4. Required runtime env vars set for the web app

#### Required Environment Variables

Set these in your Cloudflare Worker settings (or via Wrangler secrets/vars):

- `VITE_CONVEX_URL` - Convex API URL
- `VITE_CONVEX_SITE_URL` - Convex `.site` URL

Optional frontend vars (if used in your environment):

- `VITE_OP_CLIENT_ID`
- `VITE_DATABUDDY_CLIENT_ID`
- `SENTRY_AUTH_TOKEN` (for sourcemap upload in Sentry plugin flows)

#### Deployment Commands

From the repository root:

```bash
vp run build:cloudflare
vp run deploy:cloudflare
```

Package-level equivalents:

```bash
vp run --filter=web build:cf
vp run --filter=web deploy:cf
```

For Cloudflare Workers Builds in the dashboard, use install/build like:

```bash
vp install --frozen-lockfile
vp run build:cloudflare
```

Preview locally in Worker runtime:

```bash
vp run preview:cloudflare
```

#### First Deploy Checklist

1. Ensure Convex production env is healthy.
2. Set required Worker env vars.
3. Run `vp run check`.
4. Run `vp run deploy:cloudflare`.
5. Open the deployed URL and validate:
   - homepage loads
   - auth endpoints under `/api/auth/*` respond
   - app can query Convex successfully

#### Rollback / Recovery

- Redeploy the previous known-good commit.
- If env regressions are suspected, restore previous Worker secrets/vars and redeploy.
