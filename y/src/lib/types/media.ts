export interface Announcement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  isPinned: boolean;
  tags: string[];
}

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  url: string;
}

export interface Photo {
  id: string;
  caption: string;
  url: string;
  thumbUrl: string;
  event: string;
  takenAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
  publishedAt: string;
  category: string;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string | null;
  industry: string;
  website?: string;
}
