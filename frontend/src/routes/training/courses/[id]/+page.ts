import { courses } from '$lib/data/courses.ts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const course = courses.find(c => c.id === params.id);
  if (!course) throw error(404, 'Course not found');
  return { course };
};
