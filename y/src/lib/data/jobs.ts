import type { JobPost } from '$lib/types/employer.ts';

export const jobs: JobPost[] = [
  {
    id: 'j1', employerId: 'e1', companyName: 'TechNova Pvt Ltd', companyLogoUrl: null,
    employerType: 'Direct', title: 'Senior React Developer', role: 'Frontend Developer',
    department: 'IT', city: 'Bengaluru', state: 'Karnataka',
    jobType: 'Full Time', qualification: 'B.E. / B.Tech (CS/IT)',
    skills: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    salaryMin: 1200000, salaryMax: 2000000, experience: '4–7 years',
    description: 'We are looking for a skilled React Developer to build high-quality web apps. You will work closely with product and backend teams to deliver exceptional user experiences.',
    vacancies: 2, deadline: '2026-05-30', postedAt: '2026-04-10', isFeatured: true, isActive: true
  },
  {
    id: 'j2', employerId: 'e2', companyName: 'FinEdge Capital', companyLogoUrl: null,
    employerType: 'Direct', title: 'Accounts Manager', role: 'Finance Manager',
    department: 'Finance', city: 'Mumbai', state: 'Maharashtra',
    jobType: 'Full Time', qualification: 'CA / MBA Finance',
    skills: ['Tally', 'GST', 'Financial Reporting', 'MS Excel'],
    salaryMin: 800000, salaryMax: 1200000, experience: '5–8 years',
    description: 'Manage day-to-day accounting operations, lead a team of 4 accountants, and ensure timely month-end close and statutory compliance.',
    vacancies: 1, deadline: '2026-05-15', postedAt: '2026-04-08', isFeatured: true, isActive: true
  },
  {
    id: 'j3', employerId: 'e3', companyName: 'GreenLeaf Organics', companyLogoUrl: null,
    employerType: 'Direct', title: 'Digital Marketing Executive', role: 'Marketing Executive',
    department: 'Marketing', city: 'Ahmedabad', state: 'Gujarat',
    jobType: 'Full Time', qualification: 'Graduate / MBA Marketing',
    skills: ['SEO', 'Social Media', 'Google Ads', 'Content Marketing'],
    salaryMin: 400000, salaryMax: 700000, experience: '2–4 years',
    description: 'Drive digital campaigns, manage social media channels, and grow organic traffic for our e-commerce brand. Must have hands-on Google Ads and Meta experience.',
    vacancies: 1, deadline: '2026-05-20', postedAt: '2026-04-11', isFeatured: false, isActive: true
  },
  {
    id: 'j4', employerId: 'e4', companyName: 'Apex Staffing Solutions', companyLogoUrl: null,
    employerType: 'Consultant', title: 'HR Generalist', role: 'HR Executive',
    department: 'HR', city: 'Pune', state: 'Maharashtra',
    jobType: 'Full Time', qualification: 'MBA HR / MSW',
    skills: ['Recruitment', 'Payroll', 'Labour Laws', 'HRIS'],
    salaryMin: 350000, salaryMax: 600000, experience: '2–5 years',
    description: 'Handle end-to-end HR operations including recruitment, onboarding, payroll coordination, and compliance for a manufacturing client.',
    vacancies: 2, deadline: '2026-05-25', postedAt: '2026-04-09', isFeatured: false, isActive: true
  },
  {
    id: 'j5', employerId: 'e5', companyName: 'CloudSoft Technologies', companyLogoUrl: null,
    employerType: 'Direct', title: 'Python Developer (Fresher)', role: 'Software Developer',
    department: 'IT', city: 'Hyderabad', state: 'Telangana',
    jobType: 'Fresher', qualification: 'B.E./B.Tech (CS/IT) 2024-25 Passouts',
    skills: ['Python', 'Django', 'SQL', 'Git'],
    salaryMin: 300000, salaryMax: 450000, experience: '0–1 years',
    description: 'Join our growing engineering team as a Python developer. You will work on backend APIs and data pipelines, mentored by senior engineers.',
    vacancies: 5, deadline: '2026-06-10', postedAt: '2026-04-12', isFeatured: true, isActive: true
  },
  {
    id: 'j6', employerId: 'e6', companyName: 'EduNext Learning', companyLogoUrl: null,
    employerType: 'Direct', title: 'Content Writer – EdTech', role: 'Content Writer',
    department: 'Marketing', city: 'Delhi', state: 'Delhi',
    jobType: 'Work From Home', qualification: 'Graduate (any stream)',
    skills: ['Content Writing', 'Research', 'SEO Writing', 'MS Word'],
    salaryMin: 250000, salaryMax: 420000, experience: '1–3 years',
    description: 'Create engaging learning content, blog articles, and course descriptions. 100% remote role with flexible hours.',
    vacancies: 3, deadline: '2026-05-31', postedAt: '2026-04-07', isFeatured: false, isActive: true
  },
  {
    id: 'j7', employerId: 'e7', companyName: 'Shri Retail Chain', companyLogoUrl: null,
    employerType: 'Direct', title: 'Store Sales Executive', role: 'Sales Executive',
    department: 'Sales', city: 'Ahmedabad', state: 'Gujarat',
    jobType: 'Walk-In', qualification: '12th / Graduate',
    skills: ['Customer Service', 'Sales', 'Communication'],
    salaryMin: 180000, salaryMax: 280000, experience: '0–2 years',
    description: 'Walk-in drive every Saturday 10am–1pm at our Satellite Road office. Looking for energetic candidates for our retail stores across Ahmedabad.',
    vacancies: 10, deadline: '2026-05-10', postedAt: '2026-04-13', isFeatured: false, isActive: true
  },
  {
    id: 'j8', employerId: 'e8', companyName: 'CareFirst Hospital', companyLogoUrl: null,
    employerType: 'Direct', title: 'Female Ward Nurse', role: 'Nurse',
    department: 'Operations', city: 'Surat', state: 'Gujarat',
    jobType: 'Female Only', qualification: 'GNM / B.Sc. Nursing',
    skills: ['Patient Care', 'IV Therapy', 'Medical Records', 'First Aid'],
    salaryMin: 240000, salaryMax: 380000, experience: '1–4 years',
    description: 'Providing quality patient care in female ward. Must have valid nursing registration certificate.',
    vacancies: 4, deadline: '2026-05-28', postedAt: '2026-04-06', isFeatured: false, isActive: true
  },
  {
    id: 'j9', employerId: 'e9', companyName: 'LogiQuick Pvt Ltd', companyLogoUrl: null,
    employerType: 'Direct', title: 'Night Shift Operations Executive', role: 'Operations Executive',
    department: 'Operations', city: 'Mumbai', state: 'Maharashtra',
    jobType: 'Night Shift', qualification: 'Graduate',
    skills: ['Logistics', 'Coordination', 'MS Excel', 'Communication'],
    salaryMin: 320000, salaryMax: 480000, experience: '1–4 years',
    description: 'Manage night-shift logistics operations, coordinate with fleet and warehouse teams, ensure on-time dispatch metrics. Night differential pay applicable.',
    vacancies: 2, deadline: '2026-05-18', postedAt: '2026-04-05', isFeatured: false, isActive: true
  },
  {
    id: 'j10', employerId: 'e10', companyName: 'GlobalEdge Consulting', companyLogoUrl: null,
    employerType: 'Consultant', title: 'ERP Functional Consultant', role: 'ERP Consultant',
    department: 'IT', city: 'Dubai', state: 'UAE',
    jobType: 'Overseas', qualification: 'B.E. / MBA / CA',
    skills: ['SAP', 'ERP Implementation', 'Business Analysis', 'Project Management'],
    salaryMin: 2000000, salaryMax: 3500000, experience: '5–10 years',
    description: 'Exciting overseas opportunity in Dubai. Implement SAP FICO/MM modules for large government client. Tax-free salary, furnished accommodation, annual flights.',
    vacancies: 1, deadline: '2026-05-20', postedAt: '2026-04-04', isFeatured: true, isActive: true
  },
  {
    id: 'j11', employerId: 'e1', companyName: 'TechNova Pvt Ltd', companyLogoUrl: null,
    employerType: 'Direct', title: 'DevOps Engineer', role: 'DevOps Engineer',
    department: 'IT', city: 'Bengaluru', state: 'Karnataka',
    jobType: 'Full Time', qualification: 'B.E./B.Tech',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Linux'],
    salaryMin: 1400000, salaryMax: 2200000, experience: '3–6 years',
    description: 'Build and maintain cloud infrastructure, CI/CD pipelines, and monitoring systems. Work with engineering teams to improve deployment frequency and reliability.',
    vacancies: 1, deadline: '2026-06-05', postedAt: '2026-04-11', isFeatured: false, isActive: true
  },
  {
    id: 'j12', employerId: 'e11', companyName: 'MediCare Pharma', companyLogoUrl: null,
    employerType: 'Direct', title: 'Medical Representative', role: 'Sales Representative',
    department: 'Sales', city: 'Pune', state: 'Maharashtra',
    jobType: 'Full Time', qualification: 'B.Pharm / B.Sc. Life Sciences',
    skills: ['Pharma Knowledge', 'Sales', 'Relationship Management', 'Reporting'],
    salaryMin: 280000, salaryMax: 420000, experience: '1–3 years',
    description: 'Promote pharmaceutical products to doctors, hospitals, and clinics in Pune territory. Company vehicle, mobile, and performance-linked incentives provided.',
    vacancies: 3, deadline: '2026-05-25', postedAt: '2026-04-10', isFeatured: false, isActive: true
  },
  {
    id: 'j13', employerId: 'e12', companyName: 'LexCorp Legal', companyLogoUrl: null,
    employerType: 'Direct', title: 'Legal Compliance Officer', role: 'Compliance Officer',
    department: 'Legal', city: 'Delhi', state: 'Delhi',
    jobType: 'Full Time', qualification: 'LLB / LLM',
    skills: ['Labour Law', 'Contract Review', 'Regulatory Compliance', 'Legal Drafting'],
    salaryMin: 700000, salaryMax: 1100000, experience: '4–8 years',
    description: 'Oversee all legal and regulatory compliance matters, draft contracts, manage litigation, and advise management on risk mitigation.',
    vacancies: 1, deadline: '2026-05-22', postedAt: '2026-04-09', isFeatured: false, isActive: true
  },
  {
    id: 'j14', employerId: 'e13', companyName: 'Samarth Foundation', companyLogoUrl: null,
    employerType: 'Direct', title: 'Program Coordinator – Skill Development', role: 'Program Coordinator',
    department: 'HR', city: 'Ahmedabad', state: 'Gujarat',
    jobType: 'Full Time', qualification: 'MBA / MSW / Any Graduate',
    skills: ['Project Management', 'Reporting', 'Community Engagement', 'MS Office'],
    salaryMin: 300000, salaryMax: 480000, experience: '2–5 years',
    description: 'Coordinate skill development programmes in rural Gujarat, liaise with government agencies, manage training delivery, and submit impact reports.',
    vacancies: 2, deadline: '2026-05-30', postedAt: '2026-04-08', isFeatured: false, isActive: true
  },
  {
    id: 'j15', employerId: 'e14', companyName: 'SwiftMove Logistics', companyLogoUrl: null,
    employerType: 'Consultant', title: 'Supply Chain Analyst', role: 'Supply Chain Analyst',
    department: 'Operations', city: 'Chennai', state: 'Tamil Nadu',
    jobType: 'Full Time', qualification: 'B.E. / MBA Operations',
    skills: ['Supply Chain', 'Data Analysis', 'Power BI', 'ERP', 'Forecasting'],
    salaryMin: 600000, salaryMax: 950000, experience: '3–5 years',
    description: 'Analyse supply chain data, optimise inventory levels, and implement process improvements to reduce logistics costs.',
    vacancies: 1, deadline: '2026-06-01', postedAt: '2026-04-12', isFeatured: false, isActive: true
  }
];

export const jobTypes = ['Full Time', 'Part Time', 'Fresher', 'Work From Home', 'Walk-In', 'Female Only', 'Night Shift', 'Overseas'] as const;
export const jobCities = ['Mumbai', 'Pune', 'Bengaluru', 'Delhi', 'Hyderabad', 'Ahmedabad', 'Surat', 'Chennai', 'Dubai'] as const;
export const jobDepartments = ['IT', 'Finance', 'HR', 'Marketing', 'Sales', 'Operations', 'Legal'] as const;
export const jobQualifications = ['10th', '12th', 'Diploma', 'Graduate', 'Post Graduate', 'B.E./B.Tech', 'MBA', 'CA', 'LLB', 'Any Graduate'] as const;

export function filterJobs(jobs: JobPost[], filters: Partial<{
  query: string; type: string[]; city: string; department: string;
  qualification: string; role: string; skill: string; company: string; employerType: string;
}>) {
  return jobs.filter(job => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      if (!job.title.toLowerCase().includes(q) && !job.companyName.toLowerCase().includes(q) && !job.skills.some(s => s.toLowerCase().includes(q))) return false;
    }
    if (filters.type?.length) { if (!filters.type.includes(job.jobType)) return false; }
    if (filters.city) { if (job.city !== filters.city) return false; }
    if (filters.department) { if (job.department !== filters.department) return false; }
    if (filters.company) { if (!job.companyName.toLowerCase().includes(filters.company.toLowerCase())) return false; }
    if (filters.employerType) { if (job.employerType !== filters.employerType) return false; }
    if (filters.skill) { if (!job.skills.some(s => s.toLowerCase().includes(filters.skill!.toLowerCase()))) return false; }
    return true;
  });
}
