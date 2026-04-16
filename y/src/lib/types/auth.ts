export type UserRole = 'employer' | 'jobseeker' | 'institute' | 'faculty' | 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  verified: boolean;
  createdAt: string;
}

export interface Session {
  user: User | null;
  token: string | null;
}

export interface OTPPayload {
  target: string;
  targetType: 'mobile' | 'email';
  expiresAt: number;
  attempts: number;
}
