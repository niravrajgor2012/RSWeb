import type { Course } from '$lib/types/training.ts';

export const courses: Course[] = [
  {
    id: 'co1', title: 'PoSH Awareness Webinar', mode: 'Webinar', status: 'Upcoming',
    description: 'A 2-hour live webinar covering the Prevention of Sexual Harassment Act 2013, ICC formation, complaint handling procedures, and employee rights.',
    duration: '2 hours', fees: null, currency: 'INR',
    startDate: '2026-04-28', endDate: '2026-04-28',
    instructor: 'Kavita Sharma', seats: 200, seatsRemaining: 143,
    brochureUrl: null, imageUrl: null,
    tags: ['PoSH', 'Compliance', 'Free', 'Webinar']
  },
  {
    id: 'co2', title: 'New Labour Codes – HR Practitioner Workshop', mode: 'Seminar', status: 'Upcoming',
    description: 'A comprehensive half-day seminar on all four Labour Codes (Wages, IR, SS, OSH). Practical compliance guidance with real-case examples.',
    duration: '4 hours', fees: 1499, currency: 'INR',
    startDate: '2026-05-10', endDate: '2026-05-10',
    instructor: 'S N Rao', seats: 60, seatsRemaining: 22,
    brochureUrl: null, imageUrl: null,
    tags: ['Labour Laws', 'HR', 'Compliance', 'Workshop']
  },
  {
    id: 'co3', title: 'RTI Filing & Appeals – Practical Course', mode: 'Online', status: 'Ongoing',
    description: 'Self-paced online course teaching you to file RTI applications, respond to PIO queries, and handle first and second appeals with confidence.',
    duration: '8 hours (self-paced)', fees: 999, currency: 'INR',
    startDate: '2026-03-01', endDate: '2026-06-30',
    instructor: 'Rajan Desai', seats: 500, seatsRemaining: 312,
    brochureUrl: null, imageUrl: null,
    tags: ['RTI', 'Legal', 'Online', 'Self-paced']
  },
  {
    id: 'co4', title: 'Payroll & Statutory Compliance – Certificate Program', mode: 'Offline', status: 'Upcoming',
    description: 'Hands-on classroom programme covering payroll processing, PF, ESIC, PT, TDS, and Form 16 using live software tools.',
    duration: '3 days (18 hours)', fees: 4999, currency: 'INR',
    startDate: '2026-05-20', endDate: '2026-05-22',
    instructor: 'Neha Gupta', seats: 25, seatsRemaining: 8,
    brochureUrl: null, imageUrl: null,
    tags: ['Payroll', 'Compliance', 'Certificate', 'Classroom']
  },
  {
    id: 'co5', title: 'HR Analytics – Data-Driven Decision Making', mode: 'Online', status: 'Upcoming',
    description: 'Learn to use people data, dashboards, and predictive models to make smarter HR decisions. Includes Power BI basics for HR professionals.',
    duration: '12 hours (self-paced)', fees: 2499, currency: 'INR',
    startDate: '2026-05-01', endDate: '2026-07-31',
    instructor: 'Suresh Nair', seats: 300, seatsRemaining: 278,
    brochureUrl: null, imageUrl: null,
    tags: ['Analytics', 'HR Tech', 'Online', 'Power BI']
  },
  {
    id: 'co6', title: 'Recruitment Masterclass – Sourcing to Offer', mode: 'Webinar', status: 'Upcoming',
    description: 'Live 3-hour webinar for recruiters and HR managers covering modern sourcing techniques, structured interviews, and offer negotiation.',
    duration: '3 hours', fees: 599, currency: 'INR',
    startDate: '2026-05-05', endDate: '2026-05-05',
    instructor: 'Amit Patel', seats: 150, seatsRemaining: 97,
    brochureUrl: null, imageUrl: null,
    tags: ['Recruitment', 'Talent Acquisition', 'Webinar']
  }
];
