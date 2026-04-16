export type InstituteType =
  | 'University'
  | 'College'
  | 'Polytechnic'
  | 'ITI'
  | 'School'
  | 'Training Center';

export interface Institute {
  id: string;
  userId: string;
  name: string;
  type: InstituteType;
  affiliatedTo: string;
  city: string;
  state: string;
  website: string;
  contactPerson: string;
  logoUrl: string | null;
  brochureUrl: string | null;
  brief: string;
  courses: string[];
  placementRecord: string;
}
