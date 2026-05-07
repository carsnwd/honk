# 🪿 Honk

A full-stack TypeScript monorepo template. The goose handles the scaffolding. You write the app. This was born out of a desire to 
not repeat myself when starting new projects or ideas, and setup from tech stack I enjoy.

## Stack

| Concern | Tool |
|---|---|
| Runtime | Bun |
| Monorepo | Turborepo + Bun workspaces |
| Lint + format | Biome |
| HTTP server | Hono |
| Type-safe API | Hono RPC |
| Request validation | Zod + @hono/zod-openapi |
| API docs | Scalar |
| ORM | Drizzle |
| Database | Bun SQLite |
| Frontend bundler | Vite |
| UI | SolidJS |
| Routing | TanStack Router |
| Server state | TanStack Query |
| Headless components | Ark UI |
| Styling | Panda CSS |
| Code generation | Turbo Gen |

## Get started

### Prerequisites

- [Bun](https://bun.sh) 1.3.10+
- [Git](https://git-scm.com)

### Create a new project

```bash
git clone https://github.com/you/honk my-app
cd my-app
bun install
bun prepare
```

### Start developing

```bash
bun dev
```

This starts:
- Server at `http://localhost:3000`
- Web app at `http://localhost:5173`
- API docs at `http://localhost:3000/docs`

## Project structure

```
honk/
  packages/
    schemas/    Zod schemas + inferred types. Source of truth for all types.
    core/       Pure business logic. No framework deps. Fully testable.
    db/         Drizzle client + table definitions.

  apps/
    server/     Hono API. Controller → service → repository.
    web/        SolidJS frontend. Routes, components, queries.
```

## Commands

```bash
bun dev           # start server + web dev servers
bun build         # build all packages in dependency order
bun test          # run all tests
bun typecheck     # typecheck all packages
bun check         # biome lint + format check
bun check:fix     # biome lint + format autofix
bun db:generate   # generate drizzle migrations
bun db:migrate    # apply migrations
```

## Architecture

The repository was setup for a hexagonal architecture flow. Dependencies only flow inward — outer layers depend on inner layers, never the reverse:

```
schemas   →  nothing
core      →  schemas (types only)
db        →  nothing
server    →  schemas, core, db
web       →  schemas, core, server (AppType type import only)
```

**schemas** — Zod schemas are the source of truth. Types are inferred, never hand-written. Shared across server and web.

**core** — Pure functions with no framework dependencies. Runs on both server and client. Every exported function has a test. Zero mocking required.

**db** — Drizzle table definitions and the database client. The repository layer translates between DB row types and domain types.

**server** — Hono handles HTTP. Controllers validate requests with Zod, call services, return responses. Services orchestrate — they call repositories for data and core for business rules. Repositories handle DB access only.

**web** — Route loaders prefetch data via `queryClient.ensureQueryData`. Components use `createQuery` with shared query options — data is always ready, no loading spinners on navigation. Core functions run locally on the client with no API round trip.

## Styling

Panda CSS handles all styling via design tokens. Update tokens in `apps/web/panda.preset.ts` to match your brand — all components inherit automatically.

```ts
// apps/web/panda.preset.ts
semanticTokens: {
  colors: {
    primary: {
      default: {
        value: { base: '#your-brand-color', _dark: '#your-brand-dark' }
      }
    }
  }
}
```

Run codegen after any config change:

```bash
cd apps/web && bunx panda codegen
```

### Optional — Park UI components

Park UI provides shadcn-style copy-paste components built on Ark UI + Panda CSS with official SolidJS support. Components drop straight into `src/components/ui/` and use your existing tokens automatically:

```bash
cd apps/web
bunx park-ui add button
bunx park-ui add dialog
bunx park-ui add table
```

See [park-ui.com](https://park-ui.com) for the full component list.

I chose not to add this to keep the template simple and focused on the core architecture. You can create your own components using Ark UI + Panda CSS, or use Park UI if you prefer.

## API docs

Interactive API reference is available at `http://localhost:3000/docs` powered by Scalar. Every route is documented automatically from your Zod schemas — no separate OpenAPI spec to maintain.

## Testing

```bash
bun test                    # run all tests
cd packages/core && bun test  # run tests for a specific package
```

Testing strategy per layer:

| Layer | Approach | Mocking |
|---|---|---|
| `core` | Plain unit tests | Nothing |
| `repository` | Integration tests | Test DB |
| `service` | Unit tests | Mock repository |
| `controller` | Unit tests | Mock service |
| `web/queries` | Unit tests | Mock api client |
| `web/components` | Component tests | Mock TanStack Query |

## Environment variables

Create a `.env` file at the root — Bun loads it automatically:

```bash
cp .env.example .env
```

```env
DATABASE_URL=file:./honk.db
PORT=3000
```

## Deployment

Build for production:

```bash
bun install --frozen-lockfile
bun prepare
bun build
```

**Server** — deploy `apps/server/dist/index.js` anywhere Bun runs: Fly.io, Railway, a plain VPS.

**Web** — deploy `apps/web/dist/` to any static host: Cloudflare Pages, Vercel, Netlify, S3.

See `docs/deployment.md` for platform-specific guides.

## Future Enhancements
- I will try and keep all dependencies up to date. 
- Add in turbo gen for scaffolding modules and components quickly.

## License

MIT