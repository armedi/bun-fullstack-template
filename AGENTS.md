# AGENTS.md

## Runtime defaults
- Always run JS scripts with Bun (`bun <file>`, `bun run <script>`, `bun test`, `bun build`). Bun auto-loads `.env`, so never add `dotenv`.
- Development servers (root `bun run dev`, or any long-running watchers) must run in a background terminal per repo policy.

## Repository layout & architecture
- Monorepo managed by Bun workspaces: `packages/web` is a Bun-powered fullstack server, `packages/mobile` is an Expo Router app.
- The Bun server (`packages/web/index.tsx`) uses `bun.serve` to mount Elysia API routes under `/api/*` and serve the React frontend for the rest.
- Both web and mobile clients share the typed API contract exported from `packages/web/backend/api.ts`, so changes there ripple to `frontend/lib/apiClient.ts` and `mobile/lib/apiClient.ts`.

## Web app specifics (`packages/web`)
- File-based routes live in `frontend/routes`; run `bun run --filter web watch-routes` (or `generate-routes`) whenever route files change so `frontend/routeTree.gen.ts` stays in sync.
- Frontend uses TanStack Router + React 19 (`frontend/main.tsx`) and TanStack devtools are wired in `routes/__root.tsx`.
- Styling relies on Tailwind v4 via `bun-plugin-tailwind`; inject utilities by editing `frontend/style.css` (currently `@import "tailwindcss";`).
- `frontend/lib/apiClient.ts` builds a browser treaty client: any new backend endpoint should be reflected here for typed access.

## Mobile app specifics (`packages/mobile`)
- Expo Router with file-based structure under `app/`; `_layout.tsx` sets up the stack and `(tabs)/_layout.tsx` defines tab navigation plus haptic tabs/icons.
- Shared theming utilities (`components/themed-*`, `constants/theme.ts`, `hooks/use-color-scheme.ts`) are consumed via the `@/*` path alias defined in `tsconfig.json`.
- `lib/apiClient.ts` reuses the Bun API types (`type { Api } from "web/backend/api"`) and points to `API_BASE` from `lib/config.ts`; set `EXPO_PUBLIC_API_BASE` to your machine IP when testing on devices.

## API & cross-client data flow
- REST endpoints live in `backend/api.ts` using Elysia + `@elysiajs/cors`; returning structured objects keeps treaty clients in sync.
- Treaty clients are created with `treaty<Api>(...)`, so renaming routes or response shapes requires coordinated updates across both clients.
- Favor server-side changes in `backend/api.ts` before duplicating logic in either client to keep behavior centralized.

## Tooling & workflows
- Root scripts: `bun run dev` (runs `watch-routes:web`, `dev:web`, and `dev:mobile` via `concurrently`), `bun run dev:web`, `bun run dev:mobile`, and `bun run biome:check`.
- Biome (`biome check --write`) is the source of truth for lint/format; fix formatting there rather than ad-hoc tools.
- Production build: from `packages/web`, run `bun run start` which first regenerates routes (`prestart`) and then serves with `NODE_ENV=production`.
