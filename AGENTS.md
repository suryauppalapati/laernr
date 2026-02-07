# Laernr App — Agent Instructions

## Project Overview

**Laernr** is a modern learning platform built as a monorepo. The project is in early development (v0.1.0) with a Next.js frontend and a planned microservices backend.

## Repository Structure

```
Laernr App/
├── frontend/          → Next.js 16 app (React 19, TypeScript, Tailwind v4)
│   ├── app/           → App Router pages, layouts, and providers
│   ├── components/    → Reusable UI components
│   ├── constants/     → Shared constants and configuration
│   └── public/        → Static assets
├── services/          → Backend microservices
│   └── auth-service/  → Authentication service (planned)
└── .agent/            → Agent configuration
    ├── skills/        → Agent skill definitions
    └── workflows/     → Automation workflows
```

## Tech Stack

| Layer       | Technology                                      |
| ----------- | ----------------------------------------------- |
| Framework   | Next.js 16 (App Router)                         |
| UI          | React 19 (Server Components by default)         |
| Language    | TypeScript 5 (strict mode)                      |
| Styling     | Tailwind CSS v4 + CSS custom properties         |
| Theming     | next-themes (light/dark/system)                 |
| Linting     | ESLint 9 (flat config) + Airbnb extended        |
| Formatting  | Prettier + prettier-plugin-tailwindcss           |
| Fonts       | Geist Sans & Geist Mono via next/font           |

## Code Conventions

### TypeScript

- Strict mode is enabled — never use `any` or `@ts-ignore` without justification.
- Use `interface` for object shapes, `type` for unions/intersections.
- Use path aliases: `@/` maps to the frontend root (e.g., `@/components/Button`).

### React & Next.js

- **Server Components by default.** Only add `"use client"` when the component needs browser APIs, hooks, or event handlers.
- Use named exports for components (except page/layout files which use default exports).
- Colocate component files: `ComponentName.tsx` inside `components/`.
- Props should be defined as an `interface` named `ComponentNameProps`.

### Imports

Import ordering is enforced by ESLint and must follow this order with blank lines between groups:

```tsx
// 1. Built-in modules
import path from "node:path";

// 2. External packages (alphabetical)
import { useTheme } from "next-themes";
import { type ReactNode } from "react";

// 3. Internal aliases (alphabetical)
import { Button } from "@/components/Button";
import { ROUTES } from "@/constants/routes";

// 4. Relative imports
import { helper } from "./utils";
```

Alphabetical within each group (case-insensitive). Auto-fixed on save.

### Tailwind CSS v4

- Configured via PostCSS (`@tailwindcss/postcss`), not a `tailwind.config` file.
- Theme is defined in `frontend/app/globals.css` using `@theme { }` blocks that map CSS custom properties to Tailwind classes.
- To add new design tokens: add the CSS variable in `:root` / `.dark` and map it in the `@theme` block.
- ESLint recognizes `clsx`, `cn`, and `cva` as class-containing functions.
- Use **Tailwind utility classes** — avoid inline styles or CSS modules.
- All components must support both light and dark themes using the design tokens. Do not hardcode colors.
- Use the `dark:` variant only for overrides beyond what tokens provide.
- Prettier auto-sorts Tailwind classes — do not manually reorder them.

### Theming

- Managed by `next-themes` wrapped in `app/provider/ThemeProvider.tsx`.
- `attribute="class"` means dark mode is toggled by adding `.dark` to `<html>`.
- Access in client components: `const { theme, setTheme } = useTheme();`
- Design tokens auto-switch between light/dark — most components need no `dark:` prefix.

### Design Token Reference

The app uses a semantic color system defined as CSS custom properties and mapped to Tailwind:

| Token                | Purpose                            |
| -------------------- | ---------------------------------- |
| `background`         | Page background                    |
| `surface`            | Card / panel background            |
| `surface-alt`        | Alternate surface                  |
| `foreground`         | Primary text                       |
| `foreground-muted`   | Secondary text                     |
| `foreground-subtle`  | Tertiary / placeholder text        |
| `primary`            | Brand color / CTAs                 |
| `primary-hover`      | Hover state for primary            |
| `primary-foreground` | Text on primary backgrounds        |
| `primary-muted`      | Faint primary tint                 |
| `border`             | Default borders                    |
| `border-muted`       | Subtle dividers                    |
| `ring`               | Focus ring color                   |
| `accent`             | Badges, announcements background   |
| `accent-foreground`  | Badges, announcements text         |
| `success`            | Success states                     |
| `warning`            | Warning states                     |
| `destructive`        | Error / danger states              |
| `orange`             | Content / docs module category     |
| `blue`               | Code / technical module category   |
| `purple`             | AI / premium feature category      |
| `indigo`             | Gradients / highlights             |

### File & Folder Naming

- Components: `PascalCase.tsx` (e.g., `CourseCard.tsx`)
- Utilities / helpers: `camelCase.ts` (e.g., `formatDate.ts`)
- Constants: `SCREAMING_SNAKE_CASE` for values, `camelCase.ts` for filenames
- Directories: `kebab-case` or `camelCase` (match existing conventions)

### Git Workflow

- **main** — stable release branch
- **development** — active development branch (default working branch)
- **feature/\*** — feature branches off `development`
- Commit messages follow conventional commits: `feat:`, `fix:`, `chore:`, `style:`, `refactor:`, `docs:`, `test:`, `perf:`, `build:`, `ci:`, `revert:`

## Commands

All commands run from `frontend/`:

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # Run ESLint
npm run prettier   # Format with Prettier
npm run test       # Run tests
```

## Quality Checklist

Before considering any task complete:

1. Code compiles with no TypeScript errors
2. ESLint passes (`npm run lint` from `frontend/`)
3. Components support both light and dark themes
4. No hardcoded colors — use design tokens
5. Imports follow the enforced ordering rules
6. Server Components are used unless client features are needed
