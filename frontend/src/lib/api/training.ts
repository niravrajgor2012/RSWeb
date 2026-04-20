import { api } from './client.ts';
import type { Course, Faculty, Student } from '$lib/types/training.ts';

export function getCourses(mode?: string) {
	const qs = mode ? `?mode=${encodeURIComponent(mode)}` : '';
	return api.get<Course[]>(`/api/training/courses${qs}`);
}

export function getCourse(id: string) {
	return api.get<Course>(`/api/training/courses/${id}`);
}

export interface CourseRegistrationPayload {
	courseId: string;
	participantName: string;
	participantEmail: string;
	participantMobile: string;
	participantType: 'FACULTY' | 'STUDENT' | 'GENERAL';
}

export function registerForCourse(payload: CourseRegistrationPayload, token: string) {
	return api.post<{ id: string }>('/api/training/courses/register', payload, token);
}

// ── Faculty profile ───────────────────────────────────────────────────────────

export function getFacultyProfile(token: string) {
	return api.get<Faculty>('/api/training/faculty/profile', token);
}

export function saveFacultyProfile(
	payload: { fullName: string; specialization: string; qualifications?: string[]; bio?: string },
	cv: File | null,
	token: string
) {
	const form = new FormData();
	form.append('profile', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
	if (cv) form.append('cv', cv);
	return api.postForm<Faculty>('/api/training/faculty/profile', form, token);
}

// ── Student profile ───────────────────────────────────────────────────────────

export function getStudentProfile(token: string) {
	return api.get<Student>('/api/training/student/profile', token);
}

export function saveStudentProfile(
	payload: { fullName: string; institute: string; course: string; year: string },
	cv: File | null,
	token: string
) {
	const form = new FormData();
	form.append('profile', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
	if (cv) form.append('cv', cv);
	return api.postForm<Student>('/api/training/student/profile', form, token);
}
