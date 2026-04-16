import { api } from './client.ts';
import type { JobSeeker, JobApplication } from '$lib/types/jobseeker.ts';

export interface JobSeekerProfilePayload {
	fullName: string;
	dob?: string;
	gender: string;
	city: string;
	state: string;
	qualification: string;
	department: string;
	skills?: string[];
	experience?: string;
	preferredJobTypes?: string[];
	preferredLocations?: string[];
	preferredEmployerTypes?: string[];
}

export function getJobSeekerProfile(token: string) {
	return api.get<JobSeeker>('/api/jobseeker/profile', token);
}

/**
 * Save job seeker profile with optional CV and photo files (multipart).
 */
export function saveJobSeekerProfile(
	payload: JobSeekerProfilePayload,
	cv: File | null,
	photo: File | null,
	token: string
) {
	const form = new FormData();
	form.append('profile', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
	if (cv) form.append('cv', cv);
	if (photo) form.append('photo', photo);
	return api.postForm<JobSeeker>('/api/jobseeker/profile', form, token);
}

export function applyForJob(jobId: string, token: string) {
	return api.post<JobApplication>(`/api/jobseeker/apply/${jobId}`, {}, token);
}

export function getMyApplications(token: string) {
	return api.get<JobApplication[]>('/api/jobseeker/applications', token);
}
