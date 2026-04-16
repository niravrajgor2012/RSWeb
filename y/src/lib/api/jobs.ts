import { api } from './client.ts';
import type { JobPost } from '$lib/types/employer.ts';

export interface JobFiltersApi {
	q?: string;
	type?: string;
	city?: string;
	department?: string;
	skill?: string;
	employerType?: string;
	company?: string;
	page?: number;
	size?: number;
}

export interface PagedJobs {
	content: JobPost[];
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	last: boolean;
}

function buildQuery(filters: JobFiltersApi): string {
	const params = new URLSearchParams();
	if (filters.q) params.set('q', filters.q);
	if (filters.type) params.set('type', filters.type);
	if (filters.city) params.set('city', filters.city);
	if (filters.department) params.set('department', filters.department);
	if (filters.skill) params.set('skill', filters.skill);
	if (filters.employerType) params.set('employerType', filters.employerType);
	if (filters.company) params.set('company', filters.company);
	if (filters.page !== undefined) params.set('page', String(filters.page));
	if (filters.size !== undefined) params.set('size', String(filters.size));
	const qs = params.toString();
	return qs ? `?${qs}` : '';
}

export function searchJobs(filters: JobFiltersApi = {}) {
	return api.get<PagedJobs>(`/api/jobs${buildQuery(filters)}`);
}

export function getJob(id: string) {
	return api.get<JobPost>(`/api/jobs/${id}`);
}

export function getFeaturedJobs() {
	return api.get<JobPost[]>('/api/jobs/featured');
}

// ── Employer job management (requires token) ──────────────────────────────────

export function getMyJobs(token: string) {
	return api.get<JobPost[]>('/api/employer/jobs', token);
}

export function postJob(job: Omit<JobPost, 'id' | 'employerId' | 'companyName' | 'companyLogoUrl' | 'postedAt'>, token: string) {
	return api.post<JobPost>('/api/employer/jobs', job, token);
}

export function updateJob(id: string, job: Partial<JobPost>, token: string) {
	return api.put<JobPost>(`/api/employer/jobs/${id}`, job, token);
}

export function deleteJob(id: string, token: string) {
	return api.delete<void>(`/api/employer/jobs/${id}`, token);
}
