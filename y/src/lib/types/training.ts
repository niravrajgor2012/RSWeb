export type CourseMode = 'Online' | 'Offline' | 'Webinar' | 'Seminar';
export type CourseStatus = 'Upcoming' | 'Ongoing' | 'Completed';

export interface Course {
  id: string;
  title: string;
  mode: CourseMode;
  status: CourseStatus;
  description: string;
  duration: string;
  fees: number | null;
  currency: 'INR';
  startDate: string;
  endDate: string;
  instructor: string;
  seats: number;
  seatsRemaining: number;
  brochureUrl: string | null;
  tags: string[];
  imageUrl: string | null;
}

export interface Faculty {
  id: string;
  userId: string;
  fullName: string;
  specialization: string;
  qualifications: string[];
  cvUrl: string | null;
  bio: string;
}

export interface Student {
  id: string;
  userId: string;
  fullName: string;
  institute: string;
  course: string;
  year: string;
  cvUrl: string | null;
}
