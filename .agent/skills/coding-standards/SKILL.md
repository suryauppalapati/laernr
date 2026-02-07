---
name: coding-standards
description: JavaScript and TypeScript coding standards that apply across all packages — frontend and backend. Covers syntax style, error handling, naming, and common pitfalls.
user-invocable: false
---

# Coding Standards

These rules apply to all JavaScript and TypeScript code in the project regardless of framework.

## Variables & Declarations

- Use `const` by default. Use `let` only when reassignment is necessary. Never use `var`.
- Prefer destructuring for objects and arrays.
- Declare variables close to where they are used, not at the top of a function.

```ts
// correct
const { name, email } = user;
const [first, ...rest] = items;

// wrong
var name = user.name;
let x = 1; // never reassigned — should be const
```

## Functions

- Prefer arrow functions for callbacks and anonymous functions.
- Use named function declarations for top-level functions that benefit from hoisting or stack traces.
- Keep functions short — if it exceeds 50 lines, extract helpers.
- Use default parameters instead of manual fallbacks.

```ts
// correct
const formatPrice = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
};

// wrong
function formatPrice(amount: number, currency: string) {
  currency = currency || "USD";
}
```

## Async & Error Handling

- Always use `async/await` over raw `.then()` chains.
- Wrap awaited calls in `try/catch` with meaningful error handling — never swallow errors silently.
- Catch specific failure modes when possible rather than a single catch-all.
- Always log or rethrow — never leave an empty catch block.

```ts
// correct
try {
  const data = await fetchCourses();
  return data;
} catch (error) {
  console.error("Failed to fetch courses:", error);
  throw error;
}

// wrong — silent swallow
try {
  const data = await fetchCourses();
} catch (e) {}

// wrong — .then chain when async/await is cleaner
fetchCourses().then((data) => setCourses(data)).catch(() => {});
```

## Environment Variables

- Never reference `process.env` directly in application code.
- Export all environment variables from a centralized constants file (e.g., `constants/env.ts`).
- Validate required variables at startup — fail fast, not at runtime.

```ts
// constants/env.ts
const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

export const ENV = {
  API_URL: requireEnv("NEXT_PUBLIC_API_URL"),
  DATABASE_URL: requireEnv("DATABASE_URL"),
} as const;

// usage — import from constants, never process.env
import { ENV } from "@/constants/env";
fetch(ENV.API_URL);
```

## Strings

- Use template literals for string interpolation. Never concatenate with `+`.
- Use single quotes for imports (enforced by Prettier). Template literals for everything dynamic.

```ts
// correct
const greeting = `Hello, ${user.name}!`;

// wrong
const greeting = "Hello, " + user.name + "!";
```

## Arrays & Objects

- Prefer `.map()`, `.filter()`, `.find()`, `.reduce()` over `for` loops.
- Use spread for shallow copies. Never mutate arguments or shared state.
- Use optional chaining (`?.`) and nullish coalescing (`??`) over manual checks.

```ts
// correct
const active = users.filter((u) => u.isActive);
const name = user?.profile?.name ?? "Anonymous";

// wrong
let active = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].isActive) active.push(users[i]);
}
const name = user && user.profile && user.profile.name ? user.profile.name : "Anonymous";
```

## Types

- Never use `any`. Use `unknown` if the type is truly unknown, then narrow it.
- Prefer `interface` for object shapes. Use `type` for unions, intersections, and mapped types.
- Use `as const` for literal objects and arrays that should not be widened.
- Avoid type assertions (`as`) — prefer type guards or generics.

```ts
// correct
const isApiError = (error: unknown): error is ApiError => {
  return error instanceof Error && "statusCode" in error;
};

// wrong
const data = response as any;
```

## Naming

| What | Convention | Example |
|------|-----------|---------|
| Variables & functions | camelCase | `getUserById`, `isActive` |
| Booleans | `is`/`has`/`should` prefix | `isLoading`, `hasAccess` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRIES`, `API_TIMEOUT` |
| Types & interfaces | PascalCase | `UserProfile`, `CourseModule` |
| Enums | PascalCase (name), SCREAMING_SNAKE (members) | `enum Role { ADMIN, USER }` |
| Files | camelCase (utils), PascalCase (components) | `formatDate.ts`, `CourseCard.tsx` |

## Modules & Exports

- Prefer named exports over default exports for better refactoring and auto-imports.
- One concept per file. Don't bundle unrelated utilities.
- Avoid circular imports — if two modules import each other, extract the shared piece.

## Comments

- Don't comment what the code does — write clear code instead.
- Comment **why** something is done when the reason isn't obvious.
- Use `TODO:` for planned work and `FIXME:` for known issues. Include context.

```ts
// correct — explains why
// Offset by 1 because the API uses 1-based pagination
const page = index + 1;

// wrong — restates the code
// Add 1 to index
const page = index + 1;
```

## Magic Values

- Never use unexplained literal values. Extract to named constants.

```ts
// correct
const MAX_RETRY_ATTEMPTS = 3;
const DEBOUNCE_MS = 300;

if (attempts >= MAX_RETRY_ATTEMPTS) { ... }

// wrong
if (attempts >= 3) { ... }
```
