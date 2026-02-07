---
name: sync-skills
description: Keeps agent skills accurate when the codebase changes. Run after creating files, modifying config, adding dependencies, changing design tokens, or altering project structure.
---

# Sync Skills

After a file change or creation, determine which agent skill files need updating and apply the changes.

## When to Run

Trigger after any of these events:

| Change | Skills to update |
|--------|-----------------|
| Design tokens added/removed in `globals.css` | `ui-guidelines`, `project-overview`, `AGENTS.md` |
| New dependency in `package.json` | `project-overview` |
| ESLint rules changed in `eslint.config.mjs` | `ui-guidelines`, `AGENTS.md` |
| New directory or service created | `project-overview`, `AGENTS.md` |
| New component pattern established | `ui-guidelines` |
| New script added to `package.json` | `project-overview`, `AGENTS.md` |
| Tailwind or PostCSS config changes | `ui-guidelines`, `AGENTS.md` |
| New provider added to `app/provider/` | `project-overview`, `AGENTS.md` |
| Path aliases changed in `tsconfig.json` | `AGENTS.md` |
| JS/TS convention changes | `coding-standards` |
| New skill created | `AGENTS.md` (update repo structure), `sync-skills` (update file locations & map) |
| New workflow created | `AGENTS.md` (update repo structure), `sync-skills` (update file locations & map) |

## Skill File Locations

```
AGENTS.md                                       → Root project instructions
.agent/skills/coding-standards/SKILL.md         → JS/TS coding standards
.agent/skills/project-overview/SKILL.md         → Project state reference
.agent/skills/sync-skills/SKILL.md              → This skill's own trigger map
.agent/skills/ui-guidelines/SKILL.md            → UI component development guide
```

## Workflow File Locations

```
.agent/workflows/git-commit.md           → Git commit workflow
.agent/workflows/git-squash-merge.md      → Git squash merge workflow
.agent/workflows/sync-skills.md           → Sync skills workflow
```

## Process

1. **Read the changed file** to understand what was added, removed, or modified.
2. **Identify affected skills** using the table above.
3. **Read each affected skill file** in full before editing.
4. **Apply minimal, targeted edits** — only update the sections that are now stale. Do not rewrite entire files.
5. **Preserve formatting** — match the existing markdown style (tables, bullet lists, code blocks) of each skill file.

## Rules

- Only update facts that are now incorrect or incomplete. Do not rephrase working content.
- When a design token is added, add it to both the token reference table in `AGENTS.md` and the available classes list in `ui-guidelines/SKILL.md`.
- When a design token is removed, remove it from all skill files that reference it.
- When a new dependency is added, update the tech stack table in `AGENTS.md` and the implemented list in `project-overview/SKILL.md` only if the dependency is architecturally significant (frameworks, state management, auth libraries — not small utilities).
- When a new directory is created, update the repository structure tree in `AGENTS.md`.
- Never add speculative content. Only document what exists in the codebase right now.
