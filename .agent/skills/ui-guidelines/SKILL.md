---
name: laernr-ui
description: Build UI components for Laernr following the design system, Tailwind tokens, and React/Next.js conventions. Use when creating or modifying frontend components.
---

# Laernr UI — Component Development Skill

You are building UI components for **Laernr**, a learning platform. Follow these rules precisely.

## Component Architecture

### File Structure

Create components in `frontend/components/`. For complex components, use a folder:

```
components/
├── Button.tsx                  # Simple component
├── CourseCard/                  # Complex component
│   ├── CourseCard.tsx           # Main component
│   ├── CourseCardSkeleton.tsx   # Loading state
│   └── index.ts                # Re-export barrel
```

### Component Template

```tsx
// For client components that need interactivity:
"use client";

import { type ReactNode } from "react";

interface ComponentNameProps {
  children?: ReactNode;
  className?: string;
  // ... other props
}

export const ComponentName = ({ children, className, ...props }: ComponentNameProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
```

### Rules

1. **Server Component by default.** Only add `"use client"` if the component uses hooks (`useState`, `useEffect`, `useTheme`, etc.), event handlers (`onClick`, `onChange`, etc.), or browser APIs.
2. **Props interface** must be named `{ComponentName}Props` and defined above the component.
3. **Accept `className`** as a prop on the outermost element for composability.
4. Use **named exports** (not default exports) for components.
5. Spread remaining props with `...props` onto the root element when appropriate.

## Styling Rules

### Use Design Tokens — Never Hardcode Colors

The Laernr design system uses semantic CSS custom properties mapped to Tailwind classes. Always use them:

```tsx
// CORRECT — uses design tokens
<div className="bg-surface text-foreground border border-border rounded-xl p-4">
  <h2 className="text-foreground font-semibold">Title</h2>
  <p className="text-foreground-muted text-sm">Subtitle</p>
  <button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg px-4 py-2">
    Action
  </button>
</div>

// WRONG — hardcoded colors break theming
<div className="bg-white text-gray-900 border border-gray-200">
```

### Available Tailwind Color Classes

**Backgrounds:** `bg-background`, `bg-surface`, `bg-surface-alt`, `bg-surface-inset`
**Text:** `text-foreground`, `text-foreground-muted`, `text-foreground-subtle`
**Borders:** `border-border`, `border-border-muted`
**Primary:** `bg-primary`, `bg-primary-hover`, `text-primary-foreground`, `bg-primary-muted`
**Status:** `bg-success`, `text-success-foreground`, `bg-warning`, `bg-destructive`
**Categories:** `bg-orange`, `text-orange-foreground`, `bg-blue`, `text-blue-foreground`, `bg-purple`, `text-purple-foreground`, `bg-indigo`, `text-indigo-foreground`
**Muted:** `bg-muted`, `text-muted-foreground`
**Accent:** `bg-accent`, `text-accent-foreground`
**Focus:** `ring-ring`, `focus:ring-ring`

### Dark Mode

Components automatically support dark mode through the design token system. The tokens switch values based on the `.dark` class on `<html>`. You do **not** need to add `dark:` variants unless you need behavior beyond what the tokens provide.

### Responsive Design

Use Tailwind responsive prefixes. Mobile-first approach:

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

### Conditional Classes

Use `clsx` or a `cn` utility for conditional classes:

```tsx
import { clsx } from "clsx";

<button className={clsx(
  "rounded-lg px-4 py-2 font-medium transition-colors",
  variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary-hover",
  variant === "outline" && "border border-border text-foreground hover:bg-surface-alt",
  disabled && "pointer-events-none opacity-50"
)} />
```

## Common Patterns

### Interactive Card

```tsx
<div className="rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
  <div className="mb-3 flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue text-blue-foreground">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
  </div>
  <p className="text-sm text-foreground-muted">{description}</p>
</div>
```

### Category Badge

```tsx
// Use category tokens: orange (content), blue (code), purple (AI), indigo (highlights)
<span className="inline-flex items-center rounded-full bg-purple px-3 py-1 text-xs font-medium text-purple-foreground">
  AI Feature
</span>
```

### Focus States

Always include focus styles for accessibility:

```tsx
<button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
```

## Checklist Before Finishing

- [ ] Uses design tokens only — no hardcoded colors (`#fff`, `gray-500`, etc.)
- [ ] Works in both light and dark mode
- [ ] Has proper focus styles for interactive elements
- [ ] Uses Server Component unless client features are needed
- [ ] Props interface defined and typed
- [ ] Imports follow the enforced order (externals → `@/` aliases → relatives)
- [ ] Tailwind classes are used — no inline styles
