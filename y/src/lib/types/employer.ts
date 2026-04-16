export type CompanyType =
  | 'Private Limited'
  | 'Public Limited'
  | 'LLP'
  | 'Proprietorship'
  | 'Partnership'
  | 'Government'
  | 'NGO';

export interface Employer {
  id: string;
  userId: string;
  companyName: string;
  gstn: string;
  companyType: CompanyType;
  logoUrl: string | null;
  brief: string;
  website: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  industryTags: string[];
  verified: boolean;
  yearEstablished: number | null;
}

export type JobType =
  | 'Full Time'
  | 'Part Time'
  | 'Fresher'
  | 'Work From Home'
  | 'Walk-In'
  | 'Female Only'
  | 'Night Shift'
  | 'Overseas';

export type EmployerType = 'Direct' | 'Consultant';

export interface JobPost {
  id: string;
  employerId: string;
  companyName: string;
  companyLogoUrl: string | null;
  employerType: EmployerType;
  title: string;
  role: string;
  department: string;
  city: string;
  state: string;
  jobType: JobType;
  qualification: string;
  skills: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  experience: string;
  description: string;
  vacancies: number;
  deadline: string;
  postedAt: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface RecruitmentPackage {
  id: string;
  name: string;
  price: number;
  currency: 'INR';
  features: string[];
  jobPostLimit: number;
  resumeSearchLimit: number;
  featuredJobSlots: number;
  validityDays: number;
  isPopular: boolean;
  isCustom: boolean;
}

export interface ConsultantMembership {
  id: string;
  name: string;
  price: number;
  currency: 'INR';
  features: string[];
  validityDays: number;
  isPopular: boolean;
}
