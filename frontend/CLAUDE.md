# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type-check with svelte-check (one-shot)
npm run check:watch  # Type-check in watch mode
```

There are no tests. There is no linter configured beyond `svelte-check`.

> **Note:** `npm run check` will report many pre-existing `.ts` extension errors across the codebase. These are a known project-wide quirk (all internal imports use explicit `.ts` suffixes, e.g. `import ... from '$lib/data/team.ts'`). Do not attempt to fix them — they are intentional and match the project's established pattern.

## Architecture Overview

This is a **SvelteKit 5 frontend-only** application for R Square HR Services. There is no backend — all page data comes from static TypeScript data files. Backend integration is planned but not yet wired up.

### Svelte 5 Runes Mode

Runes mode is **globally enforced** via `svelte.config.js`. This means:
- Use `$state()`, `$derived()`, `$props()`, `$effect()` — not legacy `let`/reactive statements
- Stores in `src/lib/stores/` are plain objects using module-level `$state()` (not Svelte stores)
- Use `{@render children()}` and `snippet` — not `<slot>`

### Data Layer

All content is in `src/lib/data/`:
- `services.ts` — 22 services (id, slug, title, category, shortDesc, longDesc, icon, features, targetAudience)
- `team.ts` — leadership (rich bios with roles/expertise/achievements) + resourceTeam (department table)
- `jobs.ts` — sample job posts
- `courses.ts` — training courses
- `clients.ts` — client logos/names
- `packages.ts` — employer job-posting packages
- `media.ts` — announcements

Types live in `src/lib/types/`. Key types: `Service`, `TeamMember`, `ResourceDept` (services.ts), `User`/`UserRole` (auth.ts), `JobPost` (employer.ts).

### Routing & Page Data

SvelteKit file-based routing under `src/routes/`. Dynamic routes use `+page.ts` load functions that pull from data files:

```
/services/[slug]         → +page.ts loads from services array by slug
/jobseeker/jobs/[id]     → +page.ts loads from jobs array by id
/training/courses/[id]   → +page.ts loads from courses array by id
```

All other pages are self-contained `+page.svelte` files that import data directly.

### API Client

`src/lib/api/client.ts` exports an `api` object (`get`, `post`, `put`, `delete`, `postForm`) that hits `VITE_API_URL` (defaults to `http://localhost:8080`). The backend is a Spring Boot REST API returning `{ success: boolean, data: T, message?: string }`. API modules per domain live in `src/lib/api/` but are not yet called by any page — pages currently use static data only.

### Auth Store

`src/lib/stores/auth.svelte.ts` — singleton object with `$state` internals. Persists to `localStorage` under keys `rs_user` and `rs_token`. Hydrated on app mount in `+layout.svelte`. User roles: `employer | jobseeker | institute | faculty | student | admin`.

### Styling

**Tailwind v4** configured via `@tailwindcss/vite` plugin (no `tailwind.config.*` file). Custom design tokens are defined in `src/app.css` under `@theme`:

| Token | Value |
|-------|-------|
| `brand-navy` | `#0f2d5c` |
| `brand-blue` | `#1a56db` |
| `brand-teal` | `#0891b2` |
| `brand-accent` | `#06b6d4` |
| `brand-light` | `#e0f2fe` |
| `surface` | `#f8fafc` |

Global utility classes defined in `app.css` (use these instead of long Tailwind chains):
- `.gradient-brand` — navy→blue→teal gradient (buttons, avatars, icons)
- `.gradient-hero` — page hero backgrounds
- `.section-padding` — `py-20` equivalent
- `.container-wide` — max-w-1280 centered with padding
- `.btn-primary`, `.btn-outline`, `.btn-ghost` — button variants
- `.input-base`, `.input-error` — form field base styles
- `.card-shadow`, `.card-shadow-hover` — box shadows

### UI Components

Reusable components in `src/lib/components/ui/`: `Card`, `Badge`, `Button`, `Input`, `Select`, `Textarea`, `Modal`, `Tabs`, `Toast`, `SearchBar`, `Pagination`, `FileUpload`, `OTPInput`, `Spinner`.

Icons come from `lucide-svelte`. Not all icon names are available — if an icon renders blank, check the [lucide-svelte v1 icon list](https://lucide.dev/icons/) and pick an available one.

### Icon Usage Pattern

```svelte
<script>
  import { Users, Mail } from 'lucide-svelte';
</script>
<Users class="w-5 h-5 text-brand-blue" />
```

Do **not** use `<svelte:component this={iconVar} />` — it is deprecated in runes mode and causes type errors. Render icon components directly.
