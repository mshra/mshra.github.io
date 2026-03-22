# AGENTS.md

Agentic coding guidelines for the Aaryan Mishra portfolio project.

## Project Overview

This is a personal portfolio and blog site built with **Astro 4** (static output), **Tailwind CSS v4**, and **Bun** as the package manager. It deploys to GitHub Pages. The site contains a blog powered by Astro Content Collections with Zod schema validation.

---

## Build / Lint / Test Commands

### Core Commands
```bash
bun run dev          # Start dev server at http://localhost:4321
bun run build        # Build for production (outputs to dist/)
bun run preview      # Preview the production build locally
```

### CI / Deployment
```bash
# GitHub Actions (defined in .github/workflows/deploy.yml)
# Uses: withastro/action@v3 with package-manager: bun@latest
# Triggered on push to main or manual workflow_dispatch
```

### Single-Test Approach
This project has **no test suite** and **no linter** configured. Before submitting changes:
- Run `bun run build` to verify the site compiles without errors
- Manually test the dev server (`bun run dev`) to check for runtime issues
- If adding features, consider adding Playwright or Vitest tests

### Type Checking
```bash
# Astro infers types from tsconfig.json; strict mode is enabled via astro/tsconfigs/strict
# No separate typecheck script; build performs type validation
```

---

## Code Style Guidelines

### General Conventions

- **Indentation**: 4 spaces (not tabs) for all files including Astro frontmatter, TypeScript, and CSS
- **Line endings**: Unix (`\n`)
- **Encoding**: UTF-8
- **Quotes**: Double quotes for imports and string literals; single quotes in Markdown frontmatter
- **Trailing commas**: Optional; follow existing patterns in each file

### Astro Files (`.astro`)

Astro files mix a YAML frontmatter section (`---`) with HTML/template markup.

**Frontmatter rules:**
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";  // relative path with trailing .astro
import { getCollection } from "astro:content";         // Astro built-in imports

interface Props {
    title?: string;
    description?: string;
}
// Destructuring with defaults
const { title = "Default", description } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, "");  // remove trailing slash
---
```

**Template rules:**
- Use Astro's expression syntax `{expression}` for dynamic values
- Map over arrays with `{items.map((item) => (...))}`
- Use conditional rendering `{condition && (<Element />)}` or `{condition ? (...) : (...)}`
- Always use `class` (not `className`) for HTML attributes
- Format multi-line Tailwind class strings across lines for readability

**Example:**
```astro
<div
    class="prose prose-neutral max-w-none
           prose-headings:font-serif prose-headings:tracking-tight"
>
    <Content />
</div>
```

### TypeScript

- Uses **Astro's strict tsconfig** (`astro/tsconfigs/strict`)
- Prefer explicit types for function parameters and return values
- Use `type` for type aliases; use `interface` for object shapes
- Import types with `import { type CollectionEntry }` syntax when only using types

**Path aliases** (defined in `tsconfig.json`):
```typescript
import BaseLayout from "@layouts/BaseLayout.astro";   // maps to src/layouts/
import type CollectionEntry from "@content/config";  // maps to src/content/
```

### Tailwind CSS v4

Uses **Tailwind v4** with the `@tailwindcss/vite` plugin and `@tailwindcss/typography` plugin.

**Global theme** (defined in `src/styles/global.css` via `@theme`):
- `--font-sans`, `--font-serif`, `--font-mono`
- `--color-text`, `--color-muted`, `--color-subtle`, `--color-border`, `--color-bg`

**Class conventions:**
- Use arbitrary values sparingly (e.g., `text-[#888]`, `max-w-130`)
- Prefer utility classes; avoid extracting to custom CSS unless necessary
- View transitions: use `@view-transition { navigation: auto; }` in global CSS

### CSS

- Located in `src/styles/global.css`
- Use `@theme` block for CSS custom properties
- Use `@layer base` for base element resets
- 4-space indentation

### Content Collections

Blog posts live in `src/content/blog/` as Markdown files with YAML frontmatter.

**Schema** (defined in `src/content/config.ts`):
```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
  }),
});
```

**Frontmatter format in Markdown files:**
```markdown
---
title: "Post Title"
date: 2024-01-15
description: "Optional description."
---

Content here...
```

### File Naming

- Astro components: `PascalCase.astro` (e.g., `BaseLayout.astro`)
- TypeScript files: `camelCase.ts` (e.g., `config.ts`)
- Content: `kebab-case.md`
- CSS: `kebab-case.css`

### Import Patterns

| Import type | Example |
|---|---|
| Astro layouts | `import BaseLayout from "@layouts/BaseLayout.astro"` |
| Astro content | `import { getCollection } from "astro:content"` |
| Zod schemas | `import { z } from "astro:content"` |
| Content types | `import type { CollectionEntry } from "astro:content"` |
| Path aliases | `import styles from "@styles/global.css"` |

### Environment Variables

- Access via `import.meta.env`
- Key variable: `BASE_URL` (Astro sets this automatically)
- Always normalize `BASE_URL` to avoid trailing slash issues:
  ```typescript
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  ```

### Error Handling

- This project has minimal runtime logic; most errors are build-time
- Content collection errors (missing fields, type mismatches) are caught at build time by Zod
- For async operations in frontmatter (e.g., `getCollection`), ensure proper error handling for missing data

### Formatting / Prettier

No Prettier or formatter is configured. Follow existing style:
- 4-space indentation everywhere
- Line length: let lines flow; avoid arbitrary wrapping (except Tailwind classes and long imports)
- Import ordering: Astro built-ins → external packages → internal aliases → relative imports

---

## Project Structure

```
src/
├── components/        # (currently empty) Reusable .astro components
├── content/
│   ├── blog/          # Markdown blog posts
│   └── config.ts      # Content collection schema
├── layouts/
│   └── BaseLayout.astro   # Main page wrapper
├── pages/
│   ├── index.astro        # Homepage
│   ├── writing.astro      # Blog listing
│   ├── writing/[slug].astro  # Individual post
│   ├── demo.astro         # Demo video page
│   └── 404.astro          # 404 page
├── styles/
│   └── global.css         # Tailwind + theme + base styles
└── env.d.ts               # Astro type references

astro.config.mjs    # Astro config (site URL, integrations, vite plugins)
tsconfig.json       # TypeScript config with path aliases
package.json        # Dependencies and scripts
```

---

## Deployment

- **Target**: GitHub Pages
- **Method**: GitHub Actions via `withastro/action@v3`
- **Trigger**: Push to `main` branch or manual `workflow_dispatch`
- **Package manager**: Bun (`bun@latest`)
- **Site URL**: `https://mshra.github.io`

---

## Tips for Agents

- **Building new pages**: Add `.astro` files in `src/pages/`. Use `BaseLayout` for consistent styling.
- **Adding blog posts**: Create `.md` files in `src/content/blog/` with the required frontmatter fields.
- **Styling**: Prefer Tailwind utility classes. For new theme variables, add them to `@theme` in `global.css`.
- **Path aliases**: Use `@layouts/`, `@components/`, `@content/` instead of relative paths in imports.
- **Static generation**: All pages are statically rendered at build time. No server-side rendering.
- **No Tailwind config file**: Tailwind v4 uses CSS-based configuration via `@theme`; no `tailwind.config.js` exists.
