import type { Announcement, NewsItem, Photo, Video } from '$lib/types/media.ts';

export const announcements: Announcement[] = [
  {
    id: 'a1', isPinned: true, tags: ['Jobs', 'Recruitment'],
    title: 'RSQuare Mega Job Fair – Ahmedabad | 20 May 2026',
    body: 'Join us for the RSQuare Mega Job Fair at GMDC Exhibition Ground, Ahmedabad. Over 50 top employers, 1,000+ openings across IT, Finance, Sales, and Operations. Free entry for all registered job seekers.',
    publishedAt: '2026-04-10'
  },
  {
    id: 'a2', isPinned: true, tags: ['Training', 'PoSH'],
    title: 'Free PoSH Awareness Webinar – 28 April 2026',
    body: 'RSQuare HR Solutions is hosting a free 2-hour PoSH awareness webinar on 28th April at 3:00 PM. All employees, managers, and HR professionals are welcome. Register via the Training Corner.',
    publishedAt: '2026-04-08'
  },
  {
    id: 'a3', isPinned: false, tags: ['Platform', 'Update'],
    title: 'New Feature: Advanced Resume Search Now Live',
    body: 'Employers can now use skill-based, location-based, and experience-range filters to find the perfect candidate faster. Upgrade to Standard or Premium plan to unlock Resume Search.',
    publishedAt: '2026-04-05'
  },
  {
    id: 'a4', isPinned: false, tags: ['Labour Laws', 'Training'],
    title: 'Upcoming Workshop: New Labour Codes – What HR Must Know',
    body: 'A comprehensive half-day workshop on India\'s four new Labour Codes (Wages, IR, SS, and OSH) will be held on 10 May 2026 in Ahmedabad. Spots are limited.',
    publishedAt: '2026-04-01'
  }
];

export const newsItems: NewsItem[] = [
  {
    id: 'n1', imageUrl: null, source: 'Economic Times',
    headline: 'India\'s Gig Economy Expected to Reach 23.5 Million Workers by 2029',
    summary: 'India\'s gig workforce is growing at 17% annually, creating new opportunities and regulatory challenges for HR professionals and businesses.',
    publishedAt: '2026-04-12', url: '#'
  },
  {
    id: 'n2', imageUrl: null, source: 'Business Standard',
    headline: 'NAPS Achieves Record 1.2 Lakh Apprentice Enrolments in Q1 2026',
    summary: 'The National Apprenticeship Promotion Scheme registered its highest-ever quarterly enrolment, driven by manufacturing and retail sectors.',
    publishedAt: '2026-04-09', url: '#'
  },
  {
    id: 'n3', imageUrl: null, source: 'HR Katha',
    headline: 'Four Labour Codes: Government Sets New Implementation Timeline',
    summary: 'The Ministry of Labour and Employment confirms revised rollout schedule for the four Labour Codes, urging employers to begin compliance preparation.',
    publishedAt: '2026-04-06', url: '#'
  },
  {
    id: 'n4', imageUrl: null, source: 'Mint',
    headline: 'Tech Hiring Rebounds: India Adds 180,000 IT Jobs in Q1 2026',
    summary: 'After a cautious 2025, Indian IT companies are back in full hiring mode, focusing on AI, cloud, and cybersecurity talent.',
    publishedAt: '2026-04-03', url: '#'
  }
];

export const photos: Photo[] = [
  { id: 'p1', caption: 'RSQuare Job Fair 2025 – GMDC Ahmedabad', url: '', thumbUrl: '', event: 'Job Fair 2025', takenAt: '2025-11-15' },
  { id: 'p2', caption: 'PoSH Training Session – TechNova Pvt Ltd', url: '', thumbUrl: '', event: 'Corporate Training', takenAt: '2025-10-20' },
  { id: 'p3', caption: 'Labour Laws Workshop – Batch 3', url: '', thumbUrl: '', event: 'Workshop', takenAt: '2025-09-12' },
  { id: 'p4', caption: 'MOU Signing with Gujarat University', url: '', thumbUrl: '', event: 'Institutional Partnership', takenAt: '2025-08-05' },
  { id: 'p5', caption: 'Navratri Cultural Evening – RSQuare Team', url: '', thumbUrl: '', event: 'Cultural Event', takenAt: '2025-10-02' },
  { id: 'p6', caption: 'CSR – Skill Development Camp, Mehsana', url: '', thumbUrl: '', event: 'CSR Activity', takenAt: '2025-07-18' }
];

export const videos: Video[] = [
  {
    id: 'v1', youtubeId: 'dQw4w9WgXcQ',
    title: 'About RSQuare HR Solutions',
    description: 'A brief introduction to our services, team, and mission.',
    thumbnailUrl: '', publishedAt: '2025-12-01', category: 'About Us'
  },
  {
    id: 'v2', youtubeId: 'dQw4w9WgXcQ',
    title: 'How to Register as an Employer',
    description: 'Step-by-step guide to post your first job in under 3 minutes.',
    thumbnailUrl: '', publishedAt: '2026-01-15', category: 'Tutorial'
  },
  {
    id: 'v3', youtubeId: 'dQw4w9WgXcQ',
    title: 'PoSH Act – Know Your Rights (Hindi)',
    description: 'Simple explainer video on the Prevention of Sexual Harassment Act 2013.',
    thumbnailUrl: '', publishedAt: '2026-02-10', category: 'Training'
  }
];
