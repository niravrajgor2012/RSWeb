/**
 * Base API client for the RSQuare Spring Boot backend.
 * All API calls go through this module — swap BASE_URL for production.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export class ApiError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message);
		this.name = 'ApiError';
	}
}

async function request<T>(
	path: string,
	options: RequestInit = {},
	token?: string | null
): Promise<T> {
	const headers: Record<string, string> = {
		...(options.body && !(options.body instanceof FormData)
			? { 'Content-Type': 'application/json' }
			: {}),
		...(token ? { Authorization: `Bearer ${token}` } : {})
	};

	const res = await fetch(`${BASE_URL}${path}`, {
		...options,
		headers: { ...headers, ...(options.headers as Record<string, string>) }
	});

	const json = await res.json();

	if (!res.ok || !json.success) {
		throw new ApiError(res.status, json.message ?? 'Request failed');
	}

	return json.data as T;
}

export const api = {
	get: <T>(path: string, token?: string | null) =>
		request<T>(path, { method: 'GET' }, token),

	post: <T>(path: string, body: unknown, token?: string | null) =>
		request<T>(path, { method: 'POST', body: JSON.stringify(body) }, token),

	postForm: <T>(path: string, form: FormData, token?: string | null) =>
		request<T>(path, { method: 'POST', body: form }, token),

	put: <T>(path: string, body: unknown, token?: string | null) =>
		request<T>(path, { method: 'PUT', body: JSON.stringify(body) }, token),

	delete: <T>(path: string, token?: string | null) =>
		request<T>(path, { method: 'DELETE' }, token)
};
