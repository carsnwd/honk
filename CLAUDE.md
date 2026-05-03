# Honk

A full-stack TypeScript monorepo template. The goose handles the scaffolding. You write the app.

## What this is

Honk is an opinionated starter that wires together a specific set of tools with a layered architecture. The goal is zero time spent debating structure and immediate focus on building.

## Stack

| Concern | Tool |
|---|---|
| Runtime | Bun |
| Monorepo | Turborepo + Bun workspaces |
| Lint + format | Biome |
| HTTP server | Hono |
| Type-safe API | Hono RPC |
| Validation | Zod |
| ORM | Drizzle |
| Database | Bun SQLite |
| Frontend bundler | Vite |
| UI | React 19 + React Compiler |
| Routing | TanStack Router |
| Server state | TanStack Query |
| Components | Ark UI |
| Styling | Panda CSS |
| Code generation | Turbo Gen |

## Monorepo structure

```
honk/
  packages/
    schemas/    Zod schemas + inferred types. Source of truth for all types.
    core/       Pure business logic. No framework deps. Fully testable.
    db/         Drizzle client + table definitions.
  apps/
    server/     Hono API. Controller → service → repository.
    web/        React frontend. Routes, components, queries.
```

## Dependency rules

This is the most important thing to understand about Honk. Dependencies only flow inward:

```
schemas   →  nothing
core      →  schemas (types only)
db        →  nothing
server    →  schemas, core, db
web       →  schemas, core, server (AppType type-only import)
```

Never violate these rules. If you find yourself wanting to import server code into web beyond AppType, something is wrong with the approach.

## Adding a new module

Always use `turbo gen` — never create module files manually:

```bash
turbo gen
# select "module"
# enter module name e.g. "facilities"
```

This generates across all packages simultaneously:

```
packages/schemas/src/modules/facilities/facility.schema.ts
packages/core/src/modules/facilities/facility.ts
packages/core/src/modules/facilities/facility.test.ts
packages/db/src/schema/facilities.table.ts
apps/server/src/modules/facilities/facilities.repository.ts
apps/server/src/modules/facilities/facilities.service.ts
apps/server/src/modules/facilities/facilities.controller.ts
apps/web/src/modules/facilities/facilities.queries.ts
apps/web/src/modules/facilities/FacilityList.tsx
apps/web/src/modules/facilities/FacilityDetail.tsx
apps/web/src/routes/facilities/index.tsx
apps/web/src/routes/facilities/$facilityId.tsx
```

After generating, the first thing to do is add domain-specific fields to the schema and table before touching anything else.

## Layer responsibilities

**schemas** — Zod schemas and inferred TypeScript types. No logic. Shared across server and web.

**core** — Pure functions that operate on schema types. No Drizzle, no Hono, no React. These run on both client and server. Every exported function needs a test. Zero mocking required.

**db** — Drizzle table definitions and the database client. DB row types live here via InferSelectModel/InferInsertModel.

**server/repository** — Data access only. Translates between DB row types and domain types. No business logic.

**server/service** — Orchestration. Calls repository for data, calls core for business rules. No HTTP concerns.

**server/controller** — HTTP only. Validates request with zValidator + shared Zod schema. Calls service. Returns response. No business logic.

**web/queries** — Query options defined once, shared between route loaders and components. Never define queryFn inline in a component.

**web/routes** — File-based routes. Loaders call `queryClient.ensureQueryData()` to prefetch. Components always use `useSuspenseQuery()` — data is guaranteed by the time the component renders.

**web/components** — Use `useSuspenseQuery` with shared query options. Import core functions directly for local business logic — no API call needed for pure computations.

## Commands

```bash
bun dev           # start server + web dev servers
bun build         # build all packages in dependency order
bun test          # run all tests
bun typecheck     # typecheck all packages
bun check         # biome lint + format check
bun check:fix     # biome lint + format autofix
turbo gen         # generate a new module
```

## Key patterns

**Hono RPC** — The web app imports `AppType` from the server as a type-only import. This gives full end-to-end type safety with no runtime coupling. The Hono client in `src/lib/client.ts` is the only place fetch calls live.

**Route loaders + SuspenseQuery** — Route loaders prefetch data before the component renders. Components use `useSuspenseQuery` with the same query options. This means no loading spinners on navigation — data is always ready.

**Shared query options** — Query options are defined in `*.queries.ts` files and imported by both the route loader and the component. This ensures the cache key is always consistent.

**Core on the client** — Core functions are pure TypeScript with no deps. Import them directly in components for display logic like `isAtCapacity(facility, count)` — no API round trip needed.

**Panda CSS** — All styles use design tokens from `panda.config.ts`. Use `cva` for component variants, `css` for one-off styles. Never hardcode values. Never edit `styled-system/` — it is generated by `panda codegen`.

**Ark UI** — All interactive components (dialogs, selects, popovers, menus, tooltips, checkboxes) use Ark UI primitives. Never build these from scratch.

## Testing approach

| Layer | Approach |
|---|---|
| core | Plain unit tests, zero mocking |
| repository | Integration tests against a test DB |
| service | Unit tests, mock repository |
| controller | Unit tests, mock service |
| web queries | Unit tests, mock api client |
| web components | React Testing Library, mock TanStack Query |

## What not to do

- Don't import across layer boundaries in the wrong direction
- Don't define Zod schemas outside of `@honk/schemas`
- Don't write business logic in controllers or repositories
- Don't write fetch calls outside of `src/lib/client.ts` and query options files
- Don't use `useMemo`, `useCallback`, or `memo` — React Compiler handles this
- Don't edit `styled-system/` — run `panda codegen` instead
- Don't create module files manually — use `turbo gen`
- Don't use ESLint or Prettier — Biome handles both
- Don't use any Node.js-specific APIs — use Bun equivalents