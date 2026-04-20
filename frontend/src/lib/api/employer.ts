import { api } from './client.ts';
import type { Employer } from '$lib/types/employer.ts';

export interface EmployerProfilePayload {
	companyName: string;
	gstn?: string;
	companyType: string;
	brief?: string;
	website?: string;
	address?: string;
	city: string;
	state: string;
	pincode?: string;
	industryTags?: string[];
	yearEstablished?: number;
}

export function getEmployerProfile(token: string) {
	return api.get<Employer>('/api/employer/profile', token);
}

/**
 * Save employer profile with optional logo file.
 * Sends as multipart/form-data.
 */
export function saveEmployerProfile(
	payload: EmployerProfilePayload,
	logo: File | null,
	token: string
) {
	const form = new FormData();
	form.append('profile', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
	if (logo) form.append('logo', logo);
	return api.postForm<Employer>('/api/employer/profile', form, token);
}

export function getPublicStats() {
	return api.get<{ activeJobs: number; employers: number; jobSeekers: number; institutes: number }>(
		'/api/public/stats'
	);
}
