import type { JobType, EmployerType } from './employer.ts';

export interface JobSeeker {
  id: string;
  userId: string;
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  city: string;
  state: string;
  qualification: string;
  department: string;
  skills: string[];
  experience: string;
  cvUrl: string | null;
  photoUrl: string | null;
  preferredJobTypes: JobType[];
  preferredLocations: string[];
  preferredEmployerTypes: EmployerType[];
  profileComplete: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  seekerId: string;
  appliedAt: string;
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected';
}

export interface JobFilters {
  query: string;
  type: JobType[];
  city: string;
  department: string;
  qualification: string;
  role: string;
  skill: string;
  company: string;
  employerType: string;
  page: number;
}
