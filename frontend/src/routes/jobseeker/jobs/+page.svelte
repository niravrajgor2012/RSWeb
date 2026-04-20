<script lang="ts">
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { MapPin, Briefcase, Building2, Clock, ChevronDown, SlidersHorizontal, X } from 'lucide-svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import SearchBar from '$lib/components/ui/SearchBar.svelte';
  import Pagination from '$lib/components/ui/Pagination.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import { jobTypes, jobCities, jobDepartments } from '$lib/data/jobs.ts';

  let { data }: { data: PageData } = $props();
  let filtersOpen = $state(false);

  const typeOptions    = jobTypes.map(t => ({ label: t, value: t }));
  const cityOptions    = jobCities.map(c => ({ label: c, value: c }));
  const deptOptions    = jobDepartments.map(d => ({ label: d, value: d }));
  const etypeOptions   = [{ label: 'Direct', value: 'Direct' }, { label: 'Consultant', value: 'Consultant' }];

  function updateURL(key: string, value: string) {
    const u = new URL($page.url);
    if (value) u.searchParams.set(key, value); else u.searchParams.delete(key);
    u.searchParams.delete('page');
    goto(u.toString(), { replaceState: true, keepFocus: true });
  }

  function toggleType(type: string) {
    const u = new URL($page.url);
    const types = u.searchParams.getAll('type');
    if (types.includes(type)) {
      u.searchParams.delete('type');
      types.filter(t => t !== type).forEach(t => u.searchParams.append('type', t));
    } else {
      u.searchParams.append('type', type);
    }
    u.searchParams.delete('page');
    goto(u.toString(), { replaceState: true, keepFocus: true });
  }

  function clearFilters() {
    goto('/jobseeker/jobs', { replaceState: true });
  }

  const jobTypeBadgeVariant: Record<string, string> = {
    'Full Time': 'blue', 'Part Time': 'gray', 'Fresher': 'green',
    'Work From Home': 'teal', 'Walk-In': 'orange', 'Female Only': 'orange',
    'Night Shift': 'navy', 'Overseas': 'orange'
  };

  const hasFilters = $derived(
    !!(data.filters.q || data.filters.type.length || data.filters.city ||
       data.filters.department || data.filters.skill || data.filters.company || data.filters.employerType)
  );
</script>

<svelte:head>
  <title>Browse Jobs – RSQuare HR Solutions</title>
</svelte:head>

<div class="gradient-hero text-white py-10">
  <div class="container-wide">
    <h1 class="text-3xl font-black text-white mb-4">Browse {data.total} Jobs</h1>
    <SearchBar
      value={data.filters.q}
      placeholder="Search jobs, skills, companies..."
      class="max-w-xl"
      onSearch={(q) => updateURL('q', q)}
    />
  </div>
</div>

<div class="container-wide py-8">
  <div class="flex gap-6">
    <!-- Sidebar Filters -->
    <aside class="hidden lg:block w-64 shrink-0 space-y-5">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-slate-900 flex items-center gap-2"><SlidersHorizontal class="w-4 h-4" /> Filters</h3>
        {#if hasFilters}
          <button onclick={clearFilters} class="text-xs text-red-500 hover:underline font-medium">Clear All</button>
        {/if}
      </div>

      <!-- Job Type -->
      <Card padding="sm">
        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Job Type</p>
        <div class="flex flex-col gap-2">
          {#each jobTypes as t}
            <label class="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox" checked={data.filters.type.includes(t)}
                onchange={() => toggleType(t)}
                class="w-4 h-4 rounded accent-blue-600"
              />
              <span class="text-sm text-slate-700 group-hover:text-brand-blue">{t}</span>
            </label>
          {/each}
        </div>
      </Card>

      <!-- City -->
      <Card padding="sm">
        <Select
          label="City"
          options={[{ label: 'All Cities', value: '' }, ...cityOptions]}
          value={data.filters.city}
          onchange={(v) => updateURL('city', v)}
        />
      </Card>

      <!-- Department -->
      <Card padding="sm">
        <Select
          label="Department"
          options={[{ label: 'All Departments', value: '' }, ...deptOptions]}
          value={data.filters.department}
          onchange={(v) => updateURL('dept', v)}
        />
      </Card>

      <!-- Employer Type -->
      <Card padding="sm">
        <Select
          label="Employer Type"
          options={[{ label: 'All', value: '' }, ...etypeOptions]}
          value={data.filters.employerType}
          onchange={(v) => updateURL('etype', v)}
        />
      </Card>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 min-w-0">
      <!-- Mobile filter bar -->
      <div class="lg:hidden flex items-center justify-between mb-4">
        <p class="text-sm text-slate-600 font-medium">{data.total} jobs found</p>
        <button
          onclick={() => filtersOpen = !filtersOpen}
          class="flex items-center gap-1.5 text-sm font-semibold text-brand-blue border border-brand-blue/30 rounded-lg px-3 py-1.5"
        >
          <SlidersHorizontal class="w-3.5 h-3.5" /> Filters
          {#if hasFilters}<span class="w-2 h-2 bg-red-500 rounded-full"></span>{/if}
        </button>
      </div>

      <!-- Active filters chips -->
      {#if hasFilters}
        <div class="flex flex-wrap gap-2 mb-5">
          {#if data.filters.q}
            <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full px-2.5 py-1">
              "{data.filters.q}"
              <button onclick={() => updateURL('q', '')}><X class="w-3 h-3" /></button>
            </span>
          {/if}
          {#each data.filters.type as t}
            <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full px-2.5 py-1">
              {t} <button onclick={() => toggleType(t)}><X class="w-3 h-3" /></button>
            </span>
          {/each}
          {#if data.filters.city}
            <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full px-2.5 py-1">
              {data.filters.city} <button onclick={() => updateURL('city', '')}><X class="w-3 h-3" /></button>
            </span>
          {/if}
        </div>
      {/if}

      <!-- Job Grid -->
      {#if data.jobs.length === 0}
        <div class="text-center py-24">
          <Briefcase class="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 class="text-lg font-bold text-slate-600 mb-2">No jobs found</h3>
          <p class="text-slate-400 mb-4">Try adjusting your filters or search term.</p>
          <button onclick={clearFilters} class="btn-primary">Clear Filters</button>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
          {#each data.jobs as job}
            <a href="/jobseeker/jobs/{job.id}">
              <Card hover padding="md" class="h-full flex flex-col gap-3 group">
                <div class="flex items-start justify-between gap-2">
                  <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm shrink-0">
                    {job.companyName.slice(0,2).toUpperCase()}
                  </div>
                  <Badge variant={jobTypeBadgeVariant[job.jobType] as 'blue' | 'gray' | 'teal' | 'orange' | 'navy' | 'green' || 'blue'} size="sm">
                    {job.jobType}
                  </Badge>
                </div>

                <div class="flex-1">
                  <h3 class="font-bold text-slate-900 text-sm leading-snug group-hover:text-brand-blue transition-colors">{job.title}</h3>
                  <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Building2 class="w-3 h-3" />{job.companyName}
                  </p>
                </div>

                <div class="flex flex-wrap gap-1">
                  {#each job.skills.slice(0,3) as skill}
                    <Badge variant="gray" size="sm">{skill}</Badge>
                  {/each}
                </div>

                <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-500 pt-2 border-t border-slate-50">
                  <span class="flex items-center gap-1"><MapPin class="w-3 h-3" />{job.city}</span>
                  <span class="flex items-center gap-1"><Clock class="w-3 h-3" />{job.experience}</span>
                  {#if job.salaryMin}
                    <span class="font-semibold text-green-600 col-span-2">
                      ₹{(job.salaryMin/100000).toFixed(0)}–{(job.salaryMax!/100000).toFixed(0)} LPA
                    </span>
                  {/if}
                </div>
              </Card>
            </a>
          {/each}
        </div>

        <Pagination
          page={data.page}
          total={data.total}
          perPage={data.perPage}
          onchange={(p) => { const u = new URL($page.url); u.searchParams.set('page', String(p)); goto(u.toString()); }}
        />
      {/if}
    </div>
  </div>
</div>
