import type { RecruitmentPackage, ConsultantMembership } from '$lib/types/employer.ts';

export const recruitmentPackages: RecruitmentPackage[] = [
  {
    id: 'pkg-basic', name: 'Basic', price: 0, currency: 'INR', isPopular: false, isCustom: false,
    jobPostLimit: 1, resumeSearchLimit: 0, featuredJobSlots: 0, validityDays: 30,
    features: ['1 Free Job Posting', '30-day Listing', 'Standard Visibility', 'Email Support']
  },
  {
    id: 'pkg-standard', name: 'Standard', price: 2999, currency: 'INR', isPopular: false, isCustom: false,
    jobPostLimit: 10, resumeSearchLimit: 50, featuredJobSlots: 0, validityDays: 90,
    features: ['10 Job Postings', '50 Resume Views', '90-day Validity', 'Enhanced Visibility', 'Priority Email Support', 'Company Profile Page']
  },
  {
    id: 'pkg-premium', name: 'Premium', price: 7999, currency: 'INR', isPopular: true, isCustom: false,
    jobPostLimit: -1, resumeSearchLimit: 200, featuredJobSlots: 3, validityDays: 180,
    features: ['Unlimited Job Postings', '200 Resume Views', '3 Featured Job Slots', '180-day Validity', 'Top Search Ranking', 'Dedicated Account Manager', 'Analytics Dashboard', 'Logo Branding on Listings']
  },
  {
    id: 'pkg-enterprise', name: 'Enterprise', price: 0, currency: 'INR', isPopular: false, isCustom: true,
    jobPostLimit: -1, resumeSearchLimit: -1, featuredJobSlots: -1, validityDays: 365,
    features: ['Everything in Premium', 'Custom Integration', 'Bulk Upload via Excel', 'Dedicated RM', 'SLA-Backed Support', 'Campus Drive Support', 'RPO Add-On Available', 'Annual Contract']
  }
];

export const consultantMemberships: ConsultantMembership[] = [
  {
    id: 'cm-basic', name: 'Associate', price: 1499, currency: 'INR', isPopular: false, validityDays: 90,
    features: ['Listed as Verified Consultant', '5 Employer Connections/month', 'Profile Listing', 'Email Support']
  },
  {
    id: 'cm-pro', name: 'Professional', price: 3999, currency: 'INR', isPopular: true, validityDays: 180,
    features: ['Priority Consultant Listing', '20 Employer Connections/month', 'Featured Badge', 'Lead Alerts', 'Verified Tick', 'Dedicated Portal Access']
  },
  {
    id: 'cm-elite', name: 'Elite', price: 7499, currency: 'INR', isPopular: false, validityDays: 365,
    features: ['Top-of-list Placement', 'Unlimited Connections', 'All Professional Features', 'Monthly Analytics', 'Co-marketing Opportunities', 'Annual Certificate']
  }
];
