import { api } from './client.ts';
import type { Announcement, NewsItem, Photo, Video, Client } from '$lib/types/media.ts';

export interface Paged<T> {
	content: T[];
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	last: boolean;
}

export function getAnnouncements(page = 0, size = 10) {
	return api.get<Paged<Announcement>>(`/api/media/announcements?page=${page}&size=${size}`);
}

export function getNews(page = 0, size = 10) {
	return api.get<Paged<NewsItem>>(`/api/media/news?page=${page}&size=${size}`);
}

export function getPhotos(page = 0, size = 20) {
	return api.get<Paged<Photo>>(`/api/media/photos?page=${page}&size=${size}`);
}

export function getVideos(page = 0, size = 12) {
	return api.get<Paged<Video>>(`/api/media/videos?page=${page}&size=${size}`);
}

export function getClients() {
	return api.get<Client[]>('/api/public/clients');
}
