# RSQuare HR Solutions — Project Guide for Claude

## Repository Layout

```
RSWeb/
├── frontend/          # SvelteKit 5 + Cloudflare Pages
├── backend/           # Spring Boot 3.2 REST API (Java 17)
├── .github/workflows/ # CI/CD (Cloudflare Pages deploy)
└── CLAUDE.md          # This file
```

---

## Frontend (`frontend/`)

### Stack
- **SvelteKit 5** with **runes mode enforced globally** (`svelte.config.js` → `compilerOptions: { runes: true }`)
- **Tailwind CSS v4** — no `tailwind.config.js`; all theme tokens live in `src/routes/app.css` inside `@theme {}`
- **TypeScript 6** — strict mode, `moduleResolution: "bundler"`
- **Adapter:** `@sveltejs/adapter-cloudflare` (Cloudflare Workers)
- **Icons:** `lucide-svelte@^1.0.1`
- **Supabase client** imported but not yet actively used

### Svelte 5 Rules
- Always use runes: `$state()`, `$derived()`, `$effect()`, `$props()`
- No `$:` reactive statements, no `export let` props, no legacy stores
- `{@const}` may only appear inside `{#each}`, `{#if}`, `{#snippet}`, or component markup — not at the top level of a component
- Before using a `lucide-svelte` icon, verify it exists in the package — not all icon names are available

### Import Conventions
- Internal imports use explicit `.ts` extension: `import { foo } from '$lib/utils.ts'`  
  This is intentional — do not remove `.ts` suffixes from internal imports

### Key Source Paths
| Path | Purpose |
|------|---------|
| `src/lib/api/client.ts` | Base fetch wrapper — reads `VITE_API_URL` |
| `src/lib/api/*.ts` | Domain API modules (auth, jobs, employer, jobseeker, training, media) |
| `src/lib/stores/auth.svelte.ts` | Auth state — persisted to localStorage |
| `src/lib/stores/ui.svelte.ts` | Toast and modal state |
| `src/lib/data/*.ts` | Static TypeScript content (services, jobs, courses, clients, packages) |
| `src/lib/types/*.ts` | Shared TypeScript types |
| `src/lib/components/ui/` | Reusable UI components (Button, Input, Card, Modal, Badge, …) |
| `src/lib/components/layout/` | Navbar, Footer |
| `src/routes/app.css` | Global styles + Tailwind `@theme` brand tokens |

### Brand Tokens (Tailwind v4 `@theme`)
```css
--color-brand-navy:   #0f2d5c
--color-brand-blue:   #1a56db
--color-brand-teal:   #0891b2
--color-brand-accent: #06b6d4
--color-brand-light:  #e0f2fe
--color-surface:      #f8fafc
```
Use as `bg-brand-navy`, `text-brand-blue`, etc.

### Global Utility Classes
`.gradient-brand`, `.gradient-hero`, `.section-padding`, `.container-wide`,
`.btn-primary`, `.btn-outline`, `.btn-ghost`, `.input-base`, `.input-error`,
`.card-shadow`, `.card-shadow-hover`

### Route Structure
```
/                        Home
/about                   About Us
/management              Leadership & team
/services                All 22 HR services
/services/[slug]         Service detail (load from src/lib/data/services.ts)
/clients                 Client logos
/media                   Announcements & media
/training                Training portal
/training/courses/[id]   Course detail
/contact                 Contact form
/sitemap                 Navigation index
/auth/login              OTP-based login
/auth/logout             Session clear
/employer                Employer portal
/employer/register       Employer registration
/employer/profile        Employer profile
/employer/post-job       Post a job
/employer/packages       Packages
/employer/resume-search  Resume search
/jobseeker               Job seeker portal
/jobseeker/register      Seeker registration
/jobseeker/profile       Seeker profile
/jobseeker/jobs          Job listings
/jobseeker/jobs/[id]     Job detail
/institute               Institute portal
/institute/register      Institute registration
/institute/profile       Institute profile
```

### Data Layer Pattern
Pages currently use **static TypeScript data** from `src/lib/data/`. The API client in `src/lib/api/` is implemented and ready but not yet wired into routes. When connecting a page to the API, import the relevant module from `src/lib/api/` and call it from a `+page.ts` load function.

### Environment Variables
```
VITE_API_URL=http://localhost:8080        # Backend base URL
VITE_SUPABASE_URL=...                     # Supabase project URL (future)
VITE_SUPABASE_ANON_KEY=...               # Supabase anon key (future)
```

### Dev Commands
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # Cloudflare Workers build
npm run preview    # Preview production build
```

---

## Backend (`backend/`)

### Stack
- **Spring Boot 3.2** / **Java 17** / **Maven**
- **Spring Security** — JWT (HS512), BCrypt passwords, role-based access
- **Spring Data JPA + Hibernate** — ORM over PostgreSQL
- **PostgreSQL** hosted on Supabase (direct connection)
- **Lombok** — boilerplate reduction

### Architecture
```
controller/ → service/ → repository/ → entity/
```
All HTTP responses are wrapped in `ApiResponse<T> { success, message, data }`.
Paginated responses use `PagedResponse<T>`.

### Auth Flow
1. User sends mobile/email → `/api/auth/otp/send`
2. OTP returned in dev (logged to console, bypass code `000000`)
3. User verifies → `/api/auth/otp/verify`
4. Login → `/api/auth/login` → returns JWT (24-hour expiry)
5. All protected endpoints require `Authorization: Bearer <token>`

### Roles
`EMPLOYER`, `JOBSEEKER`, `INSTITUTE`, `FACULTY`, `STUDENT`, `ADMIN`

### API Controllers
| Controller | Base Path | Auth |
|---|---|---|
| AuthController | `/api/auth/**` | Public / JWT |
| JobController | `/api/jobs/**` | Public |
| EmployerController | `/api/employer/**` | EMPLOYER role |
| JobSeekerController | `/api/jobseeker/**` | JOBSEEKER role |
| InstituteController | `/api/institute/**` | INSTITUTE role |
| TrainingController | `/api/training/**` | Mixed |
| MediaController | `/api/media/**` | Public / ADMIN |
| PublicController | `/api/public/**` | Public |

### Key Config (`application.properties`)
```
server.port=8080
spring.datasource.url=jdbc:postgresql://...supabase.co:5432/postgres?sslmode=require
spring.jpa.hibernate.ddl-auto=validate    # Schema must match entities
app.jwt.expiry-ms=86400000                # 24 hours
app.otp.bypass=true                       # Dev only — logs to console
app.upload.dir=./uploads
app.cors.allowed-origins=http://localhost:5173,http://localhost:4173
```

### File Uploads
Stored locally in `./uploads/{logos,cvs,photos,brochures,course-images}/`  
Served at `http://localhost:8080/uploads/<subdir>/<filename>`

### Database
Schema is defined in `backend/supabase_schema.sql` (28 tables).  
Run once in Supabase SQL editor to initialise. Hibernate validates against it on startup (`ddl-auto=validate`).

### Dev Commands
```bash
cd backend
mvn spring-boot:run                   # Start on :8080
mvn test                              # Run tests
mvn clean package -DskipTests        # Build JAR
```

---

## Deployment

### Frontend → Cloudflare Pages
- Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) triggers Wrangler deploy
- Build command: `cd frontend && npm install && npm run build`
- Output: `.svelte-kit/cloudflare/`

### Backend
- No CI/CD configured — manual deploy
- Supabase PostgreSQL is cloud-hosted; no local DB setup needed

---

## What Is Not Yet Built
- Admin panel (`/admin`) — route exists, content TBD
- OTP delivery via SMS/email (currently console-only in dev)
- Supabase client integration in frontend (client imported but unused)
- Backend CI/CD pipeline
- Production secrets rotation (`application.properties` has dev credentials)
