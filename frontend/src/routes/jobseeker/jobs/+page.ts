import { jobs, filterJobs } from '$lib/data/jobs.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
  const q            = url.searchParams.get('q') ?? '';
  const type         = url.searchParams.getAll('type');
  const city         = url.searchParams.get('city') ?? '';
  const department   = url.searchParams.get('dept') ?? '';
  const skill        = url.searchParams.get('skill') ?? '';
  const company      = url.searchParams.get('company') ?? '';
  const employerType = url.searchParams.get('etype') ?? '';
  const page         = Number(url.searchParams.get('page') ?? '1');
  const perPage      = 9;

  const filtered = filterJobs(jobs, { query: q, type, city, department, skill, company, employerType });
  const total    = filtered.length;
  const paged    = filtered.slice((page - 1) * perPage, page * perPage);

  return { jobs: paged, total, page, perPage, filters: { q, type, city, department, skill, company, employerType } };
};
