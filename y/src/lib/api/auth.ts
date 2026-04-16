import { api } from './client.ts';

export interface AuthUser {
	id: string;
	name: string;
	email: string;
	mobile: string;
	role: string;
	verified: boolean;
	token: string;
}

/** Step 1 — request OTP */
export function sendOtp(target: string, targetType: 'mobile' | 'email') {
	return api.post<void>('/api/auth/otp/send', { target, targetType });
}

/** Step 2 — verify OTP (login or register) */
export function verifyOtp(
	target: string,
	targetType: 'mobile' | 'email',
	otp: string,
	name?: string,
	role?: string
) {
	return api.post<AuthUser>('/api/auth/otp/verify', { target, targetType, otp, name, role });
}

/** Password login (admin) */
export function loginWithPassword(email: string, password: string) {
	return api.post<AuthUser>('/api/auth/login', { email, password });
}

/** Change password */
export function changePassword(oldPassword: string, newPassword: string, token: string) {
	return api.put<void>('/api/auth/change-password', { oldPassword, newPassword }, token);
}
