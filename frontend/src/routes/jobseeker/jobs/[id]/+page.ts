import { jobs } from '$lib/data/jobs.ts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const job = jobs.find(j => j.id === params.id);
  if (!job) throw error(404, 'Job not found');
  const similar = jobs.filter(j => j.department === job.department && j.id !== job.id).slice(0, 3);
  return { job, similar };
};
