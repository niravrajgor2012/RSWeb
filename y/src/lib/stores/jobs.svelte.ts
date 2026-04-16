import type { JobPost } from '$lib/types/employer.ts';
import type { JobFilters } from '$lib/types/jobseeker.ts';

const defaultFilters: JobFilters = {
  query: '', type: [], city: '', department: '',
  qualification: '', role: '', skill: '', company: '', employerType: '', page: 1
};

let _jobs = $state<JobPost[]>([]);
let _filters = $state<JobFilters>({ ...defaultFilters });
let _total = $state(0);
let _loading = $state(false);

export const jobStore = {
  get jobs() { return _jobs; },
  get filters() { return _filters; },
  get total() { return _total; },
  get loading() { return _loading; },

  setJobs(jobs: JobPost[], total: number) {
    _jobs = jobs;
    _total = total;
  },

  setFilter<K extends keyof JobFilters>(key: K, value: JobFilters[K]) {
    _filters = { ..._filters, [key]: value, page: 1 };
  },

  setPage(page: number) {
    _filters = { ..._filters, page };
  },

  resetFilters() {
    _filters = { ...defaultFilters };
  },

  setLoading(v: boolean) { _loading = v; }
};
