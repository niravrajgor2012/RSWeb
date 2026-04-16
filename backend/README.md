# RSQuare HR Portal — Backend

Spring Boot 3.2 · Java 17 · Spring Security (JWT) · Spring Data JPA · PostgreSQL

---

## Project Structure

```
backend/
├── pom.xml
└── src/main/
    ├── resources/
    │   └── application.properties
    └── java/com/rsquare/portal/
        ├── RSquarePortalApplication.java
        ├── config/
        │   ├── SecurityConfig.java        # JWT + CORS + role rules
        │   └── WebConfig.java             # Static file serving (/uploads/**)
        ├── security/
        │   ├── JwtTokenProvider.java      # Token generate / validate / parse
        │   ├── JwtAuthenticationFilter.java
        │   └── UserDetailsServiceImpl.java
        ├── entity/                        # 16 JPA entities
        ├── repository/                    # 17 Spring Data JPA interfaces
        ├── dto/
        │   ├── request/                   # 13 Java records (validated)
        │   └── response/                  # ApiResponse · AuthResponse · PagedResponse
        ├── service/                       # 9 service classes (business logic)
        ├── controller/                    # 8 REST controllers
        └── exception/                     # GlobalExceptionHandler + 3 custom exceptions
```

---

## Supabase Setup (Recommended)

### Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Choose a name (e.g. `rsquare-portal`), set a strong database password, pick the nearest region
3. Wait ~2 minutes for the project to provision

### Step 2 — Run the schema SQL

1. In Supabase Dashboard → **SQL Editor** → **New query**
2. Open `backend/supabase_schema.sql` and paste the entire contents
3. Click **Run** (takes ~5 seconds)
4. The final `SELECT` at the bottom lists all 28 tables — verify they appear

### Step 3 — Get your connection credentials

In Supabase Dashboard → **Settings** → **Database**:

| Field | Where to find it |
|---|---|
| Project Ref | Top of Settings page (e.g. `abcxyzpqrstuv`) |
| Host | `db.YOUR_PROJECT_REF.supabase.co` |
| Port | `5432` (direct) |
| Database | `postgres` |
| User | `postgres` |
| Password | The password you set when creating the project |

### Step 4 — Update `application.properties`

Replace the two placeholders:

```properties
spring.datasource.url=jdbc:postgresql://db.YOUR_PROJECT_REF.supabase.co:5432/postgres?sslmode=require
spring.datasource.password=YOUR_DB_PASSWORD
```

Example:
```properties
spring.datasource.url=jdbc:postgresql://db.abcxyzpqrstuv.supabase.co:5432/postgres?sslmode=require
spring.datasource.password=MyStr0ngP@ssword
```

### Step 5 — Run the backend

```bash
cd backend
mvn spring-boot:run
```

`spring.jpa.hibernate.ddl-auto=validate` will verify all 28 tables exist and match the entities. If validation fails, re-run the SQL script.

---

## Prerequisites

| Tool | Version |
|---|---|
| Java (JDK) | 17 or higher |
| Maven | 3.8+ |
| PostgreSQL | 14+ |

---

## Quick Start

### 1. Create the database

```sql
CREATE DATABASE rsquare_portal;
```

### 2. Configure `application.properties`

Open `src/main/resources/application.properties` and update:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/rsquare_portal
spring.datasource.username=postgres
spring.datasource.password=YOUR_DB_PASSWORD

app.jwt.secret=YOUR_64_CHARACTER_SECRET
```

Generate a strong JWT secret (run once in terminal):

```bash
openssl rand -base64 64
```

### 3. Build and run

```bash
cd backend
mvn spring-boot:run
```

Server starts at **http://localhost:8080**

Hibernate creates all tables automatically on first run (`ddl-auto=update`).

---

## Environment Variables (optional override)

You can override any property via environment variables using Spring's relaxed binding:

| Property | Env variable | Default |
|---|---|---|
| `spring.datasource.url` | `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/rsquare_portal` |
| `spring.datasource.password` | `SPRING_DATASOURCE_PASSWORD` | — |
| `app.jwt.secret` | `APP_JWT_SECRET` | — |
| `app.jwt.expiry-ms` | `APP_JWT_EXPIRY_MS` | `86400000` (24 h) |
| `app.cors.allowed-origins` | `APP_CORS_ALLOWED_ORIGINS` | `http://localhost:5173` |
| `app.upload.dir` | `APP_UPLOAD_DIR` | `./uploads` |

---

## API Reference

All responses follow a consistent envelope:

```json
{ "success": true, "message": "...", "data": { ... } }
```

### Auth — `/api/auth/**` (public)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/otp/send` | Request OTP to mobile or email |
| POST | `/api/auth/otp/verify` | Verify OTP → login or register |
| POST | `/api/auth/login` | Password login (admin accounts) |
| PUT | `/api/auth/change-password` | Change password (JWT required) |

**Send OTP request body:**
```json
{ "target": "9876543210", "targetType": "mobile" }
```

**Verify OTP request body (new user):**
```json
{
  "target": "9876543210",
  "targetType": "mobile",
  "otp": "123456",
  "name": "Ravi Kumar",
  "role": "JOBSEEKER"
}
```

Valid roles: `EMPLOYER` · `JOBSEEKER` · `INSTITUTE` · `FACULTY` · `STUDENT`

**Verify OTP response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "uuid",
    "name": "Ravi Kumar",
    "email": null,
    "mobile": "9876543210",
    "role": "JOBSEEKER",
    "verified": true,
    "token": "eyJ..."
  }
}
```

Use the `token` as `Authorization: Bearer <token>` on all protected endpoints.

---

### Jobs — `/api/jobs/**` (public read)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Search / filter jobs (paginated) |
| GET | `/api/jobs/featured` | Featured active jobs |
| GET | `/api/jobs/{id}` | Single job detail |

**Search query params:**

| Param | Example |
|---|---|
| `q` | `React Developer` |
| `type` | `Full Time` |
| `city` | `Ahmedabad` |
| `department` | `IT` |
| `skill` | `Python` |
| `employerType` | `Direct` |
| `company` | `TechNova` |
| `page` | `0` |
| `size` | `12` (max 50) |

---

### Employer — `/api/employer/**` (role: EMPLOYER)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employer/profile` | Get company profile |
| POST | `/api/employer/profile` | Save profile (multipart: `profile` JSON + `logo` file) |
| GET | `/api/employer/jobs` | List my job posts |
| POST | `/api/employer/jobs` | Post a new job |
| PUT | `/api/employer/jobs/{id}` | Update job |
| DELETE | `/api/employer/jobs/{id}` | Deactivate job (soft delete) |

---

### Job Seeker — `/api/jobseeker/**` (role: JOBSEEKER)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobseeker/profile` | Get profile |
| POST | `/api/jobseeker/profile` | Save profile (multipart: `profile` JSON + `cv` + `photo`) |
| POST | `/api/jobseeker/apply/{jobId}` | Apply for a job |
| GET | `/api/jobseeker/applications` | My applications |
| GET | `/api/jobseeker/candidates` | CV search — employers only |

---

### Institute — `/api/institute/**` (role: INSTITUTE)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/institute/profile` | Get profile |
| POST | `/api/institute/profile` | Save profile (multipart: `profile` + `logo` + `brochure`) |

---

### Training — `/api/training/**`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/training/courses` | Public | List courses (optional `?mode=Online`) |
| GET | `/api/training/courses/{id}` | Public | Course detail |
| POST | `/api/training/courses` | FACULTY / ADMIN | Create course (multipart) |
| POST | `/api/training/courses/register` | Any authenticated | Register for a course |
| GET | `/api/training/faculty/profile` | FACULTY | Faculty profile |
| POST | `/api/training/faculty/profile` | FACULTY | Save faculty profile + CV |
| GET | `/api/training/student/profile` | STUDENT | Student profile |
| POST | `/api/training/student/profile` | STUDENT | Save student profile + CV |

---

### Media — `/api/media/**` (public read, ADMIN write)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/media/announcements` | Paginated announcements |
| POST | `/api/media/announcements` | Create announcement (ADMIN) |
| DELETE | `/api/media/announcements/{id}` | Delete announcement (ADMIN) |
| GET | `/api/media/news` | Paginated news |
| GET | `/api/media/photos` | Paginated photos |
| GET | `/api/media/videos` | Paginated videos |

---

### Public — `/api/public/**`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/public/clients` | All client logos |
| GET | `/api/public/packages` | Recruitment packages |
| GET | `/api/public/stats` | Homepage counters (jobs, employers, seekers, institutes) |

---

## OTP Integration

OTPs are currently **logged to the console** only. To send real OTPs:

1. Open `src/main/java/.../service/OtpService.java`
2. Find the `// TODO: Integrate SMS/email gateway here` comment
3. Inject your gateway service and call it with `target` and `code`

Recommended providers for India: **MSG91**, **Fast2SMS**, **Textlocal**
For email: **Spring Mail** + Gmail SMTP / SendGrid

---

## File Uploads

Uploaded files are stored under `./uploads/` organized by type:

```
uploads/
├── logos/          company & institute logos
├── cvs/            job seeker & faculty CVs
├── photos/         job seeker profile photos
├── brochures/      institute & course brochures
└── course-images/  course cover images
```

Files are served publicly at `http://localhost:8080/uploads/<subdir>/<filename>`.

**Limits:** Images 5 MB · Documents (PDF/Word) 10 MB

To use cloud storage (S3, GCS), replace `FileStorageService.java` — the rest of the code is unchanged.

---

## Database Tables Created by Hibernate

| Table | Entity |
|---|---|
| `users` | User |
| `otp_verifications` | OtpVerification |
| `employers` | Employer |
| `employer_industry_tags` | Employer.industryTags |
| `job_posts` | JobPost |
| `job_post_skills` | JobPost.skills |
| `job_seekers` | JobSeeker |
| `job_seeker_skills` | JobSeeker.skills |
| `job_seeker_pref_job_types` | JobSeeker.preferredJobTypes |
| `job_seeker_pref_locations` | JobSeeker.preferredLocations |
| `job_seeker_pref_employer_types` | JobSeeker.preferredEmployerTypes |
| `job_applications` | JobApplication |
| `institutes` | Institute |
| `institute_courses` | Institute.courses |
| `courses` | Course |
| `course_tags` | Course.tags |
| `course_registrations` | CourseRegistration |
| `faculties` | Faculty |
| `faculty_qualifications` | Faculty.qualifications |
| `students` | Student |
| `announcements` | Announcement |
| `announcement_tags` | Announcement.tags |
| `news_items` | NewsItem |
| `photos` | Photo |
| `videos` | Video |
| `clients` | Client |
| `recruitment_packages` | RecruitmentPackage |
| `package_features` | RecruitmentPackage.features |

---

## Frontend Integration

The SvelteKit frontend connects via `src/lib/api/`:

```
y/src/lib/api/
├── client.ts       base fetch wrapper + ApiError
├── auth.ts         OTP flow + password login
├── jobs.ts         job search + employer job management
├── employer.ts     employer profile
├── jobseeker.ts    seeker profile + applications
├── training.ts     courses + faculty/student profiles
└── media.ts        announcements, news, photos, videos, clients
```

Set `VITE_API_URL=http://localhost:8080` in `y/.env`.

---

## Security Notes

- JWT signed with **HS512** — secret must be ≥ 64 characters
- Passwords hashed with **BCrypt strength 12**
- OTP: 6-digit, **5-minute expiry**, max **3 attempts** then invalidated
- CSRF disabled (stateless JWT API)
- CORS restricted to configured origins only
- File uploads: content-type validated server-side (not just extension)
- SQL injection: prevented by JPA parameterized queries throughout
