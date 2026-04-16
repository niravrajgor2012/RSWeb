-- =============================================================================
-- RSQuare HR Portal — Supabase Schema
-- Run this entire file once in: Supabase Dashboard → SQL Editor → Run
-- =============================================================================

-- ─── Extensions ──────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()

-- ─── Auto-update updated_at helper ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- 1. USERS
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
    id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(150) UNIQUE,
    mobile        VARCHAR(15)  UNIQUE,
    password_hash TEXT,
    role          VARCHAR(20)  NOT NULL
                  CHECK (role IN ('EMPLOYER','JOBSEEKER','INSTITUTE','FACULTY','STUDENT','ADMIN')),
    verified      BOOLEAN      NOT NULL DEFAULT FALSE,
    active        BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_email  ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_mobile ON users(mobile);

CREATE OR REPLACE TRIGGER tr_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- 2. OTP VERIFICATIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS otp_verifications (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    target      VARCHAR(150) NOT NULL,
    target_type VARCHAR(10)  NOT NULL CHECK (target_type IN ('mobile','email')),
    code        VARCHAR(6)   NOT NULL,
    expires_at  TIMESTAMPTZ  NOT NULL,
    attempts    INT          NOT NULL DEFAULT 0,
    used        BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_otp_target
    ON otp_verifications(target, target_type, used);

-- =============================================================================
-- 3. EMPLOYERS
-- =============================================================================
CREATE TABLE IF NOT EXISTS employers (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID         NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_name     VARCHAR(200) NOT NULL,
    gstn             VARCHAR(15),
    company_type     VARCHAR(50),
    logo_url         TEXT,
    brief            TEXT,
    website          VARCHAR(200),
    address          TEXT,
    city             VARCHAR(100),
    state            VARCHAR(100),
    pincode          VARCHAR(6),
    verified         BOOLEAN      NOT NULL DEFAULT FALSE,
    year_established INT,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER tr_employers_updated_at
    BEFORE UPDATE ON employers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 3a. Employer industry tags
CREATE TABLE IF NOT EXISTS employer_industry_tags (
    employer_id UUID         NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
    tag         VARCHAR(100) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_emp_tags ON employer_industry_tags(employer_id);

-- =============================================================================
-- 4. JOB POSTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS job_posts (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_id     UUID         NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
    company_name    VARCHAR(200) NOT NULL,
    company_logo_url TEXT,
    employer_type   VARCHAR(20)  NOT NULL CHECK (employer_type IN ('Direct','Consultant')),
    title           VARCHAR(200) NOT NULL,
    role            VARCHAR(100),
    department      VARCHAR(100),
    city            VARCHAR(100),
    state           VARCHAR(100),
    job_type        VARCHAR(30)  NOT NULL
                    CHECK (job_type IN (
                        'Full Time','Part Time','Fresher','Work From Home',
                        'Walk-In','Female Only','Night Shift','Overseas'
                    )),
    qualification   VARCHAR(200),
    experience      VARCHAR(100),
    description     TEXT         NOT NULL,
    salary_min      BIGINT,
    salary_max      BIGINT,
    vacancies       INT          NOT NULL DEFAULT 1,
    deadline        DATE         NOT NULL,
    posted_at       DATE         NOT NULL DEFAULT CURRENT_DATE,
    is_featured     BOOLEAN      NOT NULL DEFAULT FALSE,
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_active    ON job_posts(is_active);
CREATE INDEX IF NOT EXISTS idx_job_city      ON job_posts(city);
CREATE INDEX IF NOT EXISTS idx_job_type      ON job_posts(job_type);
CREATE INDEX IF NOT EXISTS idx_job_dept      ON job_posts(department);
CREATE INDEX IF NOT EXISTS idx_job_employer  ON job_posts(employer_id);
CREATE INDEX IF NOT EXISTS idx_job_featured  ON job_posts(is_featured) WHERE is_featured = TRUE;

CREATE OR REPLACE TRIGGER tr_job_posts_updated_at
    BEFORE UPDATE ON job_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 4a. Job post skills
CREATE TABLE IF NOT EXISTS job_post_skills (
    job_post_id UUID         NOT NULL REFERENCES job_posts(id) ON DELETE CASCADE,
    skill       VARCHAR(100) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_job_skills ON job_post_skills(job_post_id);

-- =============================================================================
-- 5. JOB SEEKERS
-- =============================================================================
CREATE TABLE IF NOT EXISTS job_seekers (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID         NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name        VARCHAR(150) NOT NULL,
    dob              DATE,
    gender           VARCHAR(10)  CHECK (gender IN ('Male','Female','Other')),
    city             VARCHAR(100),
    state            VARCHAR(100),
    qualification    VARCHAR(200),
    department       VARCHAR(100),
    experience       VARCHAR(100),
    cv_url           TEXT,
    photo_url        TEXT,
    profile_complete INT          NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER tr_job_seekers_updated_at
    BEFORE UPDATE ON job_seekers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5a. Seeker skills
CREATE TABLE IF NOT EXISTS job_seeker_skills (
    job_seeker_id UUID         NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    skill         VARCHAR(100) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_seeker_skills ON job_seeker_skills(job_seeker_id);

-- 5b. Preferred job types
CREATE TABLE IF NOT EXISTS job_seeker_pref_job_types (
    job_seeker_id UUID        NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    job_type      VARCHAR(30) NOT NULL
);

-- 5c. Preferred locations
CREATE TABLE IF NOT EXISTS job_seeker_pref_locations (
    job_seeker_id UUID         NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    location      VARCHAR(100) NOT NULL
);

-- 5d. Preferred employer types
CREATE TABLE IF NOT EXISTS job_seeker_pref_employer_types (
    job_seeker_id UUID        NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    employer_type VARCHAR(20) NOT NULL
);

-- =============================================================================
-- 6. JOB APPLICATIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS job_applications (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    job_post_id   UUID        NOT NULL REFERENCES job_posts(id)   ON DELETE CASCADE,
    job_seeker_id UUID        NOT NULL REFERENCES job_seekers(id) ON DELETE CASCADE,
    applied_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status        VARCHAR(20) NOT NULL DEFAULT 'Applied'
                  CHECK (status IN ('Applied','Shortlisted','Interview','Offered','Rejected')),
    CONSTRAINT uq_application UNIQUE (job_post_id, job_seeker_id)
);

CREATE INDEX IF NOT EXISTS idx_app_job    ON job_applications(job_post_id);
CREATE INDEX IF NOT EXISTS idx_app_seeker ON job_applications(job_seeker_id);

-- =============================================================================
-- 7. INSTITUTES
-- =============================================================================
CREATE TABLE IF NOT EXISTS institutes (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID         NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name             VARCHAR(200) NOT NULL,
    type             VARCHAR(50)
                     CHECK (type IN ('University','College','Polytechnic','ITI','School','Training Center')),
    affiliated_to    VARCHAR(200),
    city             VARCHAR(100),
    state            VARCHAR(100),
    website          VARCHAR(200),
    contact_person   VARCHAR(150),
    logo_url         TEXT,
    brochure_url     TEXT,
    brief            TEXT,
    placement_record TEXT,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER tr_institutes_updated_at
    BEFORE UPDATE ON institutes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 7a. Institute offered courses list
CREATE TABLE IF NOT EXISTS institute_courses (
    institute_id UUID         NOT NULL REFERENCES institutes(id) ON DELETE CASCADE,
    course_name  VARCHAR(200) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inst_courses ON institute_courses(institute_id);

-- =============================================================================
-- 8. COURSES  (RSQuare training catalogue)
-- =============================================================================
CREATE TABLE IF NOT EXISTS courses (
    id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(200)  NOT NULL,
    mode            VARCHAR(20)   NOT NULL CHECK (mode IN ('Online','Offline','Webinar','Seminar')),
    status          VARCHAR(20)   NOT NULL CHECK (status IN ('Upcoming','Ongoing','Completed')),
    description     TEXT          NOT NULL,
    duration        VARCHAR(100),
    fees            NUMERIC(10,2),
    start_date      DATE          NOT NULL,
    end_date        DATE          NOT NULL,
    instructor      VARCHAR(150),
    seats           INT           NOT NULL,
    seats_remaining INT           NOT NULL,
    brochure_url    TEXT,
    image_url       TEXT,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_seats CHECK (seats_remaining >= 0 AND seats_remaining <= seats)
);

CREATE INDEX IF NOT EXISTS idx_course_mode   ON courses(mode);
CREATE INDEX IF NOT EXISTS idx_course_status ON courses(status);

CREATE OR REPLACE TRIGGER tr_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 8a. Course tags
CREATE TABLE IF NOT EXISTS course_tags (
    course_id UUID         NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    tag       VARCHAR(100) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_course_tags ON course_tags(course_id);

-- =============================================================================
-- 9. COURSE REGISTRATIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS course_registrations (
    id                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id         UUID         NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    participant_name  VARCHAR(150) NOT NULL,
    participant_email VARCHAR(150) NOT NULL,
    participant_mobile VARCHAR(15),
    participant_type  VARCHAR(20)  NOT NULL CHECK (participant_type IN ('FACULTY','STUDENT','GENERAL')),
    payment_status    VARCHAR(20)  NOT NULL DEFAULT 'PENDING'
                      CHECK (payment_status IN ('PENDING','PAID','WAIVED','REFUNDED')),
    registered_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reg_course ON course_registrations(course_id);
CREATE INDEX IF NOT EXISTS idx_reg_email  ON course_registrations(participant_email);

-- =============================================================================
-- 10. FACULTIES
-- =============================================================================
CREATE TABLE IF NOT EXISTS faculties (
    id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID         NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name      VARCHAR(150) NOT NULL,
    specialization VARCHAR(200),
    cv_url         TEXT,
    bio            TEXT,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER tr_faculties_updated_at
    BEFORE UPDATE ON faculties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 10a. Faculty qualifications
CREATE TABLE IF NOT EXISTS faculty_qualifications (
    faculty_id    UUID         NOT NULL REFERENCES faculties(id) ON DELETE CASCADE,
    qualification VARCHAR(200) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_faculty_quals ON faculty_qualifications(faculty_id);

-- =============================================================================
-- 11. STUDENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS students (
    id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID         NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name  VARCHAR(150) NOT NULL,
    institute  VARCHAR(200),
    course     VARCHAR(200),
    year       VARCHAR(50),
    cv_url     TEXT,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER tr_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- 12. ANNOUNCEMENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS announcements (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    title        VARCHAR(300) NOT NULL,
    body         TEXT         NOT NULL,
    published_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    is_pinned    BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ann_pinned ON announcements(is_pinned, published_at DESC);

CREATE OR REPLACE TRIGGER tr_announcements_updated_at
    BEFORE UPDATE ON announcements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 12a. Announcement tags
CREATE TABLE IF NOT EXISTS announcement_tags (
    announcement_id UUID         NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
    tag             VARCHAR(100) NOT NULL
);

-- =============================================================================
-- 13. NEWS ITEMS
-- =============================================================================
CREATE TABLE IF NOT EXISTS news_items (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    headline     VARCHAR(300) NOT NULL,
    summary      TEXT,
    image_url    TEXT,
    source       VARCHAR(200),
    published_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    url          VARCHAR(500),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_published ON news_items(published_at DESC);

-- =============================================================================
-- 14. PHOTOS
-- =============================================================================
CREATE TABLE IF NOT EXISTS photos (
    id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    caption    VARCHAR(300),
    url        TEXT         NOT NULL,
    thumb_url  TEXT,
    event      VARCHAR(200),
    taken_at   DATE,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_photos_taken ON photos(taken_at DESC);

-- =============================================================================
-- 15. VIDEOS
-- =============================================================================
CREATE TABLE IF NOT EXISTS videos (
    id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    title         VARCHAR(300) NOT NULL,
    description   TEXT,
    youtube_id    VARCHAR(20)  NOT NULL,
    thumbnail_url TEXT,
    published_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    category      VARCHAR(100),
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(published_at DESC);

-- =============================================================================
-- 16. CLIENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS clients (
    id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(200) NOT NULL,
    logo_url   TEXT,
    industry   VARCHAR(100),
    website    VARCHAR(200),
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 17. RECRUITMENT PACKAGES
-- =============================================================================
CREATE TABLE IF NOT EXISTS recruitment_packages (
    id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    name                VARCHAR(100)  NOT NULL,
    price               NUMERIC(10,2) NOT NULL,
    job_post_limit      INT           NOT NULL DEFAULT 0,
    resume_search_limit INT           NOT NULL DEFAULT 0,
    featured_job_slots  INT           NOT NULL DEFAULT 0,
    validity_days       INT           NOT NULL DEFAULT 30,
    is_popular          BOOLEAN       NOT NULL DEFAULT FALSE,
    is_custom           BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- 17a. Package features
CREATE TABLE IF NOT EXISTS package_features (
    package_id UUID         NOT NULL REFERENCES recruitment_packages(id) ON DELETE CASCADE,
    feature    VARCHAR(300) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pkg_features ON package_features(package_id);

-- =============================================================================
-- ROW LEVEL SECURITY — disable for all tables (Spring Boot handles auth via JWT)
-- =============================================================================
ALTER TABLE users                        DISABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications            DISABLE ROW LEVEL SECURITY;
ALTER TABLE employers                    DISABLE ROW LEVEL SECURITY;
ALTER TABLE employer_industry_tags       DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_posts                    DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_post_skills              DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_seekers                  DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_skills            DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_pref_job_types    DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_pref_locations    DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_pref_employer_types DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications             DISABLE ROW LEVEL SECURITY;
ALTER TABLE institutes                   DISABLE ROW LEVEL SECURITY;
ALTER TABLE institute_courses            DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses                      DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_tags                  DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_registrations         DISABLE ROW LEVEL SECURITY;
ALTER TABLE faculties                    DISABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_qualifications       DISABLE ROW LEVEL SECURITY;
ALTER TABLE students                     DISABLE ROW LEVEL SECURITY;
ALTER TABLE announcements                DISABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_tags            DISABLE ROW LEVEL SECURITY;
ALTER TABLE news_items                   DISABLE ROW LEVEL SECURITY;
ALTER TABLE photos                       DISABLE ROW LEVEL SECURITY;
ALTER TABLE videos                       DISABLE ROW LEVEL SECURITY;
ALTER TABLE clients                      DISABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_packages         DISABLE ROW LEVEL SECURITY;
ALTER TABLE package_features             DISABLE ROW LEVEL SECURITY;

-- =============================================================================
-- SEED DATA — sample recruitment packages
-- =============================================================================
INSERT INTO recruitment_packages (name, price, job_post_limit, resume_search_limit, featured_job_slots, validity_days, is_popular, is_custom)
VALUES
    ('Starter',      999,   5,  50,  1, 30,  FALSE, FALSE),
    ('Professional', 2499, 15, 200,  3, 90,  TRUE,  FALSE),
    ('Enterprise',   4999, 50, 999, 10, 365, FALSE, FALSE),
    ('Custom',          0,  0,   0,  0, 0,   FALSE, TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO package_features (package_id, feature)
SELECT id, unnest(ARRAY[
    '5 Active Job Posts',
    '50 CV Downloads',
    '1 Featured Job Slot',
    'Email Support'
]) FROM recruitment_packages WHERE name = 'Starter';

INSERT INTO package_features (package_id, feature)
SELECT id, unnest(ARRAY[
    '15 Active Job Posts',
    '200 CV Downloads',
    '3 Featured Job Slots',
    'Priority Email & Phone Support',
    'Company Profile Badge'
]) FROM recruitment_packages WHERE name = 'Professional';

INSERT INTO package_features (package_id, feature)
SELECT id, unnest(ARRAY[
    '50 Active Job Posts',
    'Unlimited CV Downloads',
    '10 Featured Job Slots',
    'Dedicated Account Manager',
    'Company Profile Badge',
    'Social Media Promotion'
]) FROM recruitment_packages WHERE name = 'Enterprise';

-- =============================================================================
-- VERIFY — list all created tables
-- =============================================================================
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
