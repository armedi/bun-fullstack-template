# Bun Fullstack Template

## Overview
This is a Bun-powered fullstack monorepo application with:
- **Web App**: React frontend with TanStack Router + Elysia backend API
- **Mobile App**: Expo Router application

The project has been successfully configured to run in the Replit environment with both web and mobile development workflows active.

## Recent Changes (November 18, 2025)
- Installed all dependencies with Bun
- Configured server to run on port 5000 with 0.0.0.0 binding for Replit compatibility
- Set up Web App workflow for development
- Set up Expo Mobile App workflow for development
- Configured autoscale deployment for production
- Verified frontend and backend API integration

## Project Architecture

### Monorepo Structure
This is a Bun workspaces monorepo with two main packages:

- **`packages/web/`**: Fullstack Bun application
  - `backend/api.ts`: Elysia API routes (mounted under `/api/*`)
  - `frontend/`: React app with TanStack Router
    - `routes/`: File-based routing (auto-generates `routeTree.gen.ts`)
    - `lib/apiClient.ts`: Type-safe browser API client
  - `index.tsx`: Bun server entry point using `bun.serve`
  
- **`packages/mobile/`**: Expo Router mobile app
  - `app/`: File-based routing structure
    - `(tabs)/`: Tab navigation layout
    - `_layout.tsx`: Root layout with stack navigation
  - `components/`: Shared UI components with theming
  - `lib/apiClient.ts`: Type-safe mobile API client
  - `lib/config.ts`: Configuration with `EXPO_PUBLIC_API_BASE`

### Technology Stack
- **Runtime**: Bun (JavaScript/TypeScript runtime) - auto-loads `.env` files
- **Backend**: Elysia (lightweight web framework) with `@elysiajs/cors`
- **Frontend**: React 19 + TanStack Router (file-based routing)
- **Mobile**: Expo Router with haptic tabs and themed components
- **Styling**: 
  - Web: Tailwind CSS v4 via `bun-plugin-tailwind` (injected in `frontend/style.css`)
  - Mobile: Shared theming utilities (`constants/theme.ts`, `hooks/use-color-scheme.ts`)
- **Dev Tools**: TanStack DevTools (wired in `routes/__root.tsx`), Biome (linting/formatting)

### Key Features
- **Type-safe API clients**: Both web and mobile clients use Elysia's Eden Treaty with shared types
- **File-based routing**: TanStack Router (web) and Expo Router (mobile)
- **Hot module reloading**: Automatic in development
- **Shared API contract**: Changes in `backend/api.ts` ripple to both clients
- **Cross-platform theming**: Mobile app includes themed components with light/dark mode support
- **CORS enabled**: API endpoints accessible from both web and mobile clients

## Development Workflow

### Runtime Defaults
- **Always use Bun**: Run all scripts with `bun <file>`, `bun run <script>`, `bun test`, `bun build`
- **No dotenv needed**: Bun automatically loads `.env` files
- **Development servers**: Long-running processes should run in background workflows

### Running the Web App
The Web App workflow automatically runs:
```bash
cd packages/web && bun run dev
```

This starts the Bun server with hot reloading on port 5000.

### Running the Mobile App
The Expo Mobile App workflow runs:
```bash
cd packages/mobile && bun run start
```

For device testing, set `EXPO_PUBLIC_API_BASE` to your machine IP in the environment.

### Root-Level Scripts
From the project root:
- `bun run dev`: Runs web + mobile + route watching concurrently
- `bun run dev:web`: Web app only
- `bun run dev:mobile`: Mobile app only
- `bun run biome:check`: Lint and format check

### File-Based Routing

#### Web App (`packages/web`)
- Routes are defined in `frontend/routes/`
- Run `bun run --filter web watch-routes` or `generate-routes` to update `frontend/routeTree.gen.ts`
- Route tree updates automatically during development via the dev command

#### Mobile App (`packages/mobile`)
- Routes are defined in `app/` directory
- `_layout.tsx` sets up stack navigation
- `(tabs)/_layout.tsx` defines tab navigation with haptic feedback

### API Development
- **Backend routes**: `packages/web/backend/api.ts`
- **Web client**: `packages/web/frontend/lib/apiClient.ts` (browser treaty client)
- **Mobile client**: `packages/mobile/lib/apiClient.ts` (uses same API types)
- **Type safety**: Changes to backend API are automatically typed in both frontend clients
- **Best practice**: Make server-side changes in `backend/api.ts` before duplicating logic in clients

### Styling

#### Web App
- Tailwind v4 configured via `bun-plugin-tailwind`
- Edit `frontend/style.css` to inject utilities (currently `@import "tailwindcss";`)

#### Mobile App
- Shared theming utilities in `components/themed-*`
- Theme constants in `constants/theme.ts`
- Color scheme hook: `hooks/use-color-scheme.ts`
- Path alias `@/*` configured in `tsconfig.json`

### Code Quality
- **Biome** handles all linting and formatting
- Run `bun run biome:check --write` to auto-fix issues
- Biome is the source of truth for code style

## Deployment
Configured for Replit Autoscale deployment:
- **Build command**: Generates routes before starting
- **Run command**: `bun run --filter web start`
- **Production mode**: Sets `NODE_ENV=production`
- **Prestart**: Automatically regenerates routes

## Port Configuration
- **Development**: Port 5000 (0.0.0.0) for web server
- **API Routes**: `/api/*` (proxied to Elysia backend)
- **Frontend Routes**: All other routes served by React app

## API & Cross-Client Data Flow
- REST endpoints live in `backend/api.ts` using Elysia
- Treaty clients created with `treaty<Api>(...)` ensure type safety
- Returning structured objects from API keeps treaty clients in sync
- Renaming routes or response shapes requires coordinated updates across both clients
- Keep backend logic centralized; avoid duplicating in clients

## Important Notes
- **Always use Bun** for running scripts (not npm or node)
- **No dotenv package needed**: Bun auto-loads `.env` files
- **Route generation**: Happens automatically during development for web app
- **Biome**: Handles all code formatting and linting
- **Mobile testing**: Set `EXPO_PUBLIC_API_BASE` environment variable for device testing
- **Type safety**: API contract is shared between web and mobile clients
- **Long-running processes**: Should run in background workflows per repo policy
