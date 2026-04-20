import { services } from '$lib/data/services.ts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const svc = services.find(s => s.slug === params.slug);
  if (!svc) throw error(404, 'Service not found');
  return { svc };
};
