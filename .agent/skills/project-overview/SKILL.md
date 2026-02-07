---
name: project-overview
description: Provides a reference of the Laernr project structure, tech stack, architecture decisions, and current state. Use when answering questions about the project or onboarding.
user-invocable: false
---

# Project Overview

When asked about the project, its structure, or how things work, use this reference.

## What is Laernr?

Laernr is a learning platform in early development (v0.1.0). It is structured as a monorepo with a Next.js frontend and planned backend microservices.

## Current State

### Implemented

- **Frontend scaffold** — Next.js 16, React 19, TypeScript 5 (strict), Tailwind CSS v4
- **Design system** — Comprehensive CSS custom property tokens for light/dark themes with semantic color naming (primary, surface, foreground, status colors, category colors)
- **Theme switching** — `next-themes` integration with system-aware light/dark mode
- **Code quality** — ESLint 9 flat config with Airbnb extended rules, Prettier with Tailwind plugin, unused import detection, import ordering enforcement
- **Font system** — Geist Sans and Geist Mono via `next/font`
- **Git workflow** — main/development/feature branch strategy

### Planned (directories exist, not yet implemented)

- **Component library** — `frontend/components/` (empty, ready for components)
- **Constants** — `frontend/constants/` (empty, ready for config values)
- **Auth service** — `services/auth-service/` (empty, has a feature branch `feature/auth-service`)
- **Testing** — No test framework installed yet

## Architecture Decisions

| Decision                  | Choice                       | Reason                                |
| ------------------------- | ---------------------------- | ------------------------------------- |
| Rendering                 | Server Components (default)  | Performance, SEO, reduced JS bundle   |
| Styling                   | Tailwind CSS v4 + tokens     | Utility-first, theme-aware            |
| State: theme              | next-themes                  | SSR-safe, system-aware                |
| State: app (planned)      | TBD                          | Not yet needed                        |
| Linting                   | ESLint 9 + Airbnb extended   | Strict, community-standard rules      |
| Backend (planned)         | Microservices in `services/` | Separation of concerns, scalability   |

## Key Files

| File                                | Purpose                                        |
| ----------------------------------- | ---------------------------------------------- |
| `frontend/app/layout.tsx`           | Root layout — fonts, ThemeProvider, metadata    |
| `frontend/app/globals.css`          | Design tokens (CSS vars) + Tailwind theme map  |
| `frontend/app/provider/ThemeProvider.tsx` | Wrapper around next-themes                |
| `frontend/eslint.config.mjs`        | Full ESLint flat config (235 lines)            |
| `frontend/package.json`             | Dependencies and scripts                       |
| `frontend/tsconfig.json`            | TypeScript config (strict, path aliases)       |

## Design System Color Categories

The design system includes purpose-specific category colors for different content types:

- **Orange** (`bg-orange`, `text-orange-foreground`) — Content and documentation modules
- **Blue** (`bg-blue`, `text-blue-foreground`) — Code and technical modules
- **Purple** (`bg-purple`, `text-purple-foreground`) — AI features and premium content
- **Indigo** (`bg-indigo`, `text-indigo-foreground`) — Gradients and highlights

## Development Commands

```bash
cd frontend
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint check
npm run prettier   # Format code
```

## Git Branches

- `main` — Stable releases
- `development` — Active development (default working branch)
- `feature/[feature-name]` — Feature branch
