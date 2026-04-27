# RSQuare HR Solutions — Web Portal

Official web portal for **RSQuare HR Solutions**, an MSME HR consulting firm based in Ahmedabad, Gujarat, India. Founded by Shri S N Rao, Former Head-HR of IIM Ahmedabad.

🌐 **Live:** [rsquarehr.com](https://rsquarehr.com)

---

## Repository Layout

```
RSWeb/
├── frontend/          # SvelteKit 5 + Cloudflare Workers
├── backend/           # Spring Boot 3.2 REST API (Java 17)
├── .github/workflows/ # CI/CD — Cloudflare Workers deploy
└── CLAUDE.md          # AI assistant project guide
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit 5 (Svelte 5 Runes mode), Tailwind CSS v4, TypeScript 6 |
| Hosting | Cloudflare Workers (rsquarehr.com + www.rsquarehr.com) |
| Backend | Spring Boot 3.2, Java 17, Spring Security (JWT HS512) |
| Database | PostgreSQL on Supabase (28 tables) |
| Auth | OTP-based (mobile/email) + JWT, 24-hour expiry |
| Testing | Playwright E2E — 25 tests across Chromium |

---

## Quick Start

### Prerequisites

- Node.js 20+
- Java 17+ and Maven 3.8+
- A [Supabase](https://supabase.com) project

### Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build
npm run preview    # Preview build
```

### Backend

```bash
cd backend
mvn spring-boot:run   # http://localhost:8080
```

### E2E Tests

```bash
cd frontend
npm test              # Run all 25 Playwright tests (headless)
npm run test:ui       # Interactive Playwright UI
npm run test:report   # Open HTML test report
```

---

## Setup

### 1. Database

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** → run `backend/supabase_schema.sql` (creates 28 tables)
3. Copy the connection string from **Project Settings → Database**

### 2. Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://<host>:5432/postgres?sslmode=require
spring.datasource.username=postgres
spring.datasource.password=<your-password>
app.jwt.secret=<64-char-base64-secret>
app.cors.allowed-origins=http://localhost:5173
```

Generate a JWT secret:
```bash
openssl rand -base64 64
```

### 3. Frontend

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:8080
VITE_SUPABASE_URL=https://<ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

---

## User Roles

| Role | Portal | Key Features |
|---|---|---|
| Employer | `/employer` | Post jobs, resume search, manage packages |
| Job Seeker | `/jobseeker` | Browse & apply for jobs, upload CV |
| Institute | `/institute` | Manage institute profile & brochure |
| Faculty | `/training` | Manage courses & faculty profile |
| Student | `/training` | Register for courses |
| Admin | `/admin` | Platform management *(in progress)* |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/about` | About RSQuare, mission & vision |
| `/management` | Leadership & resource team |
| `/services` | All 22 HR services |
| `/services/[slug]` | Service detail |
| `/clients` | Client logos |
| `/media` | Announcements & media gallery |
| `/training` | Training portal |
| `/training/courses/[id]` | Course detail |
| `/contact` | Contact form |
| `/sitemap` | Full site navigation index |
| `/auth/login` | OTP login |
| `/employer/*` | Employer portal |
| `/jobseeker/*` | Job seeker portal |
| `/institute/*` | Institute portal |

---

## API Overview

All responses: `{ success, message, data }`

| Group | Base Path | Access |
|---|---|---|
| Auth | `/api/auth/**` | Public |
| Jobs | `/api/jobs/**` | Public |
| Employer | `/api/employer/**` | EMPLOYER role |
| Job Seeker | `/api/jobseeker/**` | JOBSEEKER role |
| Institute | `/api/institute/**` | INSTITUTE role |
| Training | `/api/training/**` | Mixed |
| Media | `/api/media/**` | Public / ADMIN |
| Public | `/api/public/**` | Public |

**Dev OTP bypass:** code `000000` — OTP is logged to console.

---

## Deployment

### Frontend → Cloudflare Workers

Push to `main` → GitHub Actions builds and deploys via Wrangler automatically.

- Production: `https://rsquarehr.com` and `https://www.rsquarehr.com`
- Preview: `https://rsweb.niravrajgor2012.workers.dev`
- Config: `frontend/wrangler.toml`

### Backend

```bash
cd backend
mvn clean package -DskipTests
java -jar target/*.jar
```

No CI/CD configured for backend yet.

---

## What Is Not Yet Built

- Admin panel (`/admin`)
- OTP delivery via SMS/email (console-only in dev)
- Backend CI/CD pipeline
- Production secrets rotation

---

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `brand-navy` | `#0f2d5c` | Headings, navbar |
| `brand-blue` | `#1a56db` | Buttons, links |
| `brand-teal` | `#0891b2` | Accents |
| `brand-accent` | `#06b6d4` | Gradients, icons |
| `brand-light` | `#e0f2fe` | Backgrounds, badges |
| `surface` | `#f8fafc` | Page backgrounds |

---

## Contact

**RSQuare HR Solutions**
Ahmedabad, Gujarat, India – 380 015
Email: info@rsquarehr.com
Website: [rsquarehr.com](https://rsquarehr.com)
