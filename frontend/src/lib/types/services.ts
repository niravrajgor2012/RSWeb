export type ServiceCategory =
  | 'HR Solutions'
  | 'Recruitment'
  | 'Compliance & Legal'
  | 'Training & Development'
  | 'Advisory'
  | 'IT & Digital'
  | 'Specialty';

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  longDesc: string;
  icon: string;
  features: string[];
  targetAudience: string[];
}

export interface TeamMember {
  name: string;
  designation: string;
  roles: string[];
  bio: string;
  expertise?: string[];
  achievements?: string[];
  education?: string;
  personalNote?: string;
  photoUrl: string | null;
  email?: string;
  linkedin?: string;
}

export interface ResourceDept {
  area: string;
  nos: number;
}
