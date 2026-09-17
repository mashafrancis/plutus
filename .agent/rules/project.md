---
trigger: always_on
globs: **/*.{ts,tsx,js,jsx,json,jsonc,html,vue,svelte,astro,css,yaml,yml,graphql,gql,md,mdx,grit}
---

---

**role**: Senior Full-Stack Engineer (Effect/Convex/React Specialist)
**architecture**: Monorepo (Vite+ / pnpm workspaces)
**pattern**: Feature-Sliced Design (FSD)
**logic_engine**: Effect.ts (Strict)
**validation**: Effect Schema (StandardSchemaV1)

---

## CRITICAL DIRECTIVES

1. **Validation**: Use **ONLY** `Effect Schema`. Never use Zod or Valibot.
   - _Tanstack Forms_: Wrap schemas in `Schema.standardSchemaV1` before defining the main form schema.
2. **Error Handling**: **NEVER** use `throw`. Use `Effect.fail` with TaggedErrors from `packages/backend/convex/schemas/errors.ts`.
3. **Logging**: Use `Console` from Effect instead of native `console`. Provide concise, valuable logs for every endpoint.
4. **Context**: Use `context7` MCP for all documentation lookups before coding.

## PROJECT TOPOGRAPHY

- **Web App**: `apps/web/` (Tanstack Start + Effect Atom + shadcn/ui + BaseUI).
- **Backend**: `packages/backend/` (Convex + Confect).
- **Auth**: Convex Auth (frontend) & `packages/backend/convex/lib/policies.ts` (backend/policies).
- **Dev URL**: `http://localhost:3000`

## WORKFLOW MODES

### **Plan Mode**

- **Requirement**: You MUST follow the process in `/specs/README.md` before generating code.

### **Development Mode**

- **Structure**: New features MUST follow **Feature-Sliced Design (FSD)** per `design-pattern.md`.
- **Reference**: Search `~/.local/share/effect` and `~/.local/share/effect-atom` to find API usage and implementation
  details for Effect and Effect-Atom.
- **Pre-flight**: Run `effect-solutions list` before implementing new Effect features.

## COMMAND PALETTE (vp only)

- **Install**: `vp install`
- **Start All**: `vp run dev`
- **Web Only**: `vp run dev:web`
- **Backend Only**: `vp run dev:server`
- **Build**: `vp run build`
- **Start (Node SSR)**: `vp run start`
- **Format**: `vp run format`
- **Check**: `vp run check`

---

**Verification**: Before completing a task, verify against these rules. If the implementation violates FSD or uses native Errors instead of TaggedErrors, rewrite it.

## RULE COMPLIANCE CHECKLIST

> Before delivering code, verify the following points:

- [ ] **Architecture**: Does this follow Feature-Sliced Design (FSD)? (if applicable, only frontend)
- [ ] **Logic**: Is this using `Effect` for all logic/flow control?
- [ ] **Validation**: Is `Effect Schema` used exclusively? (If Tanstack Form: is `standardSchemaV1` applied?)
- [ ] **Error Handling**: Are there zero `throws`? Are `TaggedErrors` used with `Effect.fail`?
- [ ] **Logging**: Is `Console` (from Effect) used instead of `console`?
- [ ] **Auth**: Are backend policies updated in `packages/backend/convex/lib/policies.ts`?
- [ ] **Documentation**: Have I consulted `context7` or the local Effect source (`~/.local/share/effect`)? (if applicable)
- [ ] **Tooling**: Are all suggested commands using `vp` / `vpx` (not raw `pnpm` / `npm` for install/dev/build)?
