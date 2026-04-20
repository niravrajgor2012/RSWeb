# R Square HR Services — Website

Official website for **R Square HR Services (RSQuare)**, an MSME company based in Ahmedabad, Gujarat, India. Founded by Shri S N Rao, Former Head-HR of IIM Ahmedabad.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | SvelteKit 5 (Svelte 5 Runes mode) |
| Styling | Tailwind CSS v4 |
| Icons | lucide-svelte v1 |
| Language | TypeScript |
| Dev Server | Vite |
| Backend (planned) | Spring Boot REST API |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

### Other commands

```bash
npm run build      # Production build
npm run preview    # Preview production build
npm run check      # TypeScript / Svelte type-check
```

---

## Project Structure

```
src/
├── lib/
│   ├── data/          # All static content (services, team, jobs, courses, clients)
│   ├── types/         # TypeScript interfaces
│   ├── components/
│   │   ├── ui/        # Card, Badge, Button, Tabs, Modal, etc.
│   │   └── layout/    # Navbar, Footer
│   ├── stores/        # Auth store (Svelte 5 $state)
│   └── api/           # API client + domain modules (Spring Boot, not yet wired)
└── routes/            # SvelteKit file-based pages
```

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home / landing |
| `/about` | About Us — Introduction, Mission & Vision, Quality Policy |
| `/management` | Management Team — S N Rao, Riddhish Rao, Resource Team |
| `/services` | All 22 services listing |
| `/services/[slug]` | Individual service detail page |
| `/clients` | List of clients |
| `/media` | Announcements & media |
| `/training` | Training courses |
| `/sitemap` | Full site navigation index |
| `/contact` | Contact form |
| `/employer/*` | Employer portal (post jobs, packages, resume search) |
| `/jobseeker/*` | Job seeker portal (find jobs, profile) |
| `/institute/*` | Institute / faculty portal |
| `/auth/login` | Login |

---

## Services (22)

1. Consultancy for HR Strategies, Policies & Services
2. Psychometric Test Services
3. Permanent Recruitment Services
4. Recruitment Process Outsourcing (RPO)
5. Contract Staffing
6. National Apprenticeship Training Scheme (NATS)
7. National Apprenticeship Promotion Scheme (NAPS)
8. Functional HR Services on Outsourcing Basis
9. Payroll Outsourcing
10. Legal Compliance (HR related)
11. Third Party Auditor for HR Services
12. Employment Background Verification
13. Advisory Services on Business Reforms & Improvement
14. Training & Development
15. Training on RTI and Legal Services under RTI
16. Training on Prevention of Sexual Harassment (PoSH) Act
17. Training on New Labour Codes
18. Tourism Specific Solutions & Services
19. Supporting CSR Activity
20. Collaborating with Various Institutions
21. Cultural Activities
22. IT Consultancy & Solutions

---

## Brand Colours

| Token | Hex |
|-------|-----|
| Navy | `#0f2d5c` |
| Blue | `#1a56db` |
| Teal | `#0891b2` |
| Accent | `#06b6d4` |
| Light | `#e0f2fe` |
| Surface | `#f8fafc` |

---

## Contact

**R Square HR Services**
Ahmedabad, Gujarat, India – 380 015
Email: info@rsquarehr.com
