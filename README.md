# RSQuare HR Solutions — Job Portal

A full-stack HR job portal for RSQuare HR Solutions, Ahmedabad. Connects employers, job seekers, training institutes, and faculty on a single platform.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | SvelteKit 5 (runes mode), Tailwind CSS v4, TypeScript 6 |
| Backend | Spring Boot 3.2, Java 17, Spring Security (JWT) |
| Database | PostgreSQL via Supabase |
| Deployment | Cloudflare Pages (frontend), manual (backend) |
| Auth | OTP-based (mobile/email) + JWT |

---

## Project Structure

```
RSWeb/
├── frontend/          # SvelteKit 5 web app
│   ├── src/
│   │   ├── lib/
│   │   │   ├── api/        # REST client modules
│   │   │   ├── components/ # UI + layout components
│   │   │   ├── data/       # Static TypeScript content
│   │   │   ├── stores/     # Auth & UI state (runes)
│   │   │   └── types/      # Shared TypeScript types
│   │   └── routes/         # SvelteKit file-based routes
│   ├── svelte.config.js
│   └── wrangler.toml       # Cloudflare Workers config
│
├── backend/           # Spring Boot REST API
│   ├── src/main/java/com/rsquare/portal/
│   │   ├── controller/ # REST endpoints
│   │   ├── service/    # Business logic
│   │   ├── repository/ # Spring Data JPA
│   │   ├── entity/     # JPA entities (16 tables)
│   │   ├── dto/        # Request / response DTOs
│   │   ├── security/   # JWT filter + provider
│   │   └── config/     # Security, CORS, file serving
│   └── supabase_schema.sql  # Full DB schema (run once)
│
└── .github/workflows/deploy.yml  # Cloudflare Pages CI/CD
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Java 17+
- Maven 3.8+
- A [Supabase](https://supabase.com) project with PostgreSQL

---

### 1. Database Setup

1. Create a Supabase project
2. Open the **SQL Editor** and run `backend/supabase_schema.sql`
3. Note your project URL and connection string from **Project Settings → Database**

---

### 2. Backend

```bash
cd backend
```

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://<host>:5432/postgres?sslmode=require
spring.datasource.username=postgres
spring.datasource.password=<your-password>
app.jwt.secret=<64-char-base64-secret>
app.cors.allowed-origins=http://localhost:5173
```

```bash
mvn spring-boot:run
# API available at http://localhost:8080
```

---

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env: set VITE_API_URL=http://localhost:8080
npm install
npm run dev
# App available at http://localhost:5173
```

---

## User Roles

| Role | Portal | Key Features |
|------|--------|-------------|
| Employer | `/employer` | Post jobs, search resumes, manage packages |
| Job Seeker | `/jobseeker` | Browse & apply for jobs, manage profile, upload CV |
| Institute | `/institute` | Manage institute profile |
| Faculty | `/training` | Manage faculty profile |
| Student | `/training` | Register for courses |
| Admin | `/admin` | Platform management *(in progress)* |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home / landing |
| `/about` | About RSQuare, mission & vision |
| `/management` | Leadership & resource team |
| `/services` | All 22 HR services |
| `/services/[slug]` | Individual service detail |
| `/clients` | Client logos |
| `/media` | Announcements & media gallery |
| `/training` | Training portal |
| `/contact` | Contact form |
| `/sitemap` | Full site navigation index |

---

## API Overview

All responses follow: `{ success, message, data }`

| Endpoint Group | Base Path | Access |
|---|---|---|
| Auth | `POST /api/auth/**` | Public |
| Jobs | `GET /api/jobs/**` | Public |
| Employer | `/api/employer/**` | EMPLOYER role |
| Job Seeker | `/api/jobseeker/**` | JOBSEEKER role |
| Institute | `/api/institute/**` | INSTITUTE role |
| Training | `/api/training/**` | Mixed |
| Media | `/api/media/**` | Public / ADMIN |
| Public | `/api/public/**` | Public (clients, packages, stats) |

---

## Auth Flow

```
1. POST /api/auth/otp/send      { mobile or email }
2. POST /api/auth/otp/verify    { target, code }
3. POST /api/auth/login         { mobile/email, password }
   → returns JWT (24-hour expiry)
4. All protected requests: Authorization: Bearer <token>
```

**Dev mode:** OTP is logged to the console. Use code `000000` as bypass.

---

## Deployment

### Frontend — Cloudflare Pages

Push to the `main` branch. GitHub Actions runs the build and deploys via Wrangler.

```bash
cd frontend
npm run build   # output: .svelte-kit/cloudflare/
```

### Backend

```bash
cd backend
mvn clean package -DskipTests
java -jar target/*.jar
```

No CI/CD is configured for the backend yet.

---

## HR Services Offered

Permanent Staffing · Temporary Staffing · Contract Staffing · Executive Search ·
Campus Recruitment · Volume Hiring · Technical Recruitment · IT Staffing ·
Non-IT Staffing · RPO · Background Verification · Payroll Management ·
HR Consulting · Compliance Management · Training & Development ·
Skill Development · Onboarding Support · Labour Law Consulting ·
Outplacement Services · HR Audit · Workforce Planning · HR Outsourcing

---

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-navy` | `#0f2d5c` | Primary headings, navbar |
| `brand-blue` | `#1a56db` | Buttons, links |
| `brand-teal` | `#0891b2` | Accents, highlights |
| `brand-accent` | `#06b6d4` | Gradients, icons |
| `brand-light` | `#e0f2fe` | Backgrounds, badges |
| `surface` | `#f8fafc` | Page backgrounds |
