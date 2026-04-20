<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { jobs } from '$lib/data/jobs.ts';
  import { jobTypes, jobCities, jobDepartments } from '$lib/data/jobs.ts';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { Search, UserCircle, Briefcase, ArrowRight, CheckCircle } from 'lucide-svelte';

  const recentJobs = jobs.slice(0, 4);
  const quickLinks = [
    { label: 'Full Time',     href: '/jobseeker/jobs?type=Full+Time' },
    { label: 'Work From Home',href: '/jobseeker/jobs?type=Work+From+Home' },
    { label: 'Fresher',       href: '/jobseeker/jobs?type=Fresher' },
    { label: 'Walk-In',       href: '/jobseeker/jobs?type=Walk-In' },
    { label: 'Part Time',     href: '/jobseeker/jobs?type=Part+Time' },
    { label: 'Overseas',      href: '/jobseeker/jobs?type=Overseas' },
    { label: 'Night Shift',   href: '/jobseeker/jobs?type=Night+Shift' },
    { label: 'Female Only',   href: '/jobseeker/jobs?type=Female+Only' },
  ];
</script>

<svelte:head>
  <title>Job Seeker Corner – RSQuare HR Solutions</title>
</svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <Badge variant="teal">Job Seeker Corner</Badge>
    <h1 class="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">Your Next Job is Here</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto mb-8">Search 1,200+ verified jobs by type, city, skill, department, and more.</p>
    <div class="flex flex-wrap justify-center gap-3">
      <a href="/jobseeker/jobs" class="btn-primary text-base !py-3 !px-8">
        <Search class="w-5 h-5" /> Browse All Jobs
      </a>
      {#if !auth.isLoggedIn}
        <a href="/jobseeker/register" class="bg-white/15 hover:bg-white/25 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
          Register Free
        </a>
      {:else}
        <a href="/jobseeker/profile" class="bg-white/15 hover:bg-white/25 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
          <UserCircle class="w-5 h-5" /> My Profile
        </a>
      {/if}
    </div>
  </div>
</div>

<!-- Browse by type -->
<section class="section-padding bg-surface">
  <div class="container-wide">
    <h2 class="text-2xl font-black mb-6 text-center">Browse Jobs By Type</h2>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {#each quickLinks as ql}
        <a href={ql.href} class="bg-white rounded-xl border border-slate-100 p-4 text-center hover:border-brand-blue hover:bg-blue-50 transition-colors card-shadow group">
          <Briefcase class="w-6 h-6 text-brand-blue mx-auto mb-2" />
          <p class="font-semibold text-sm text-slate-800 group-hover:text-brand-blue">{ql.label}</p>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Browse by city -->
<section class="section-padding bg-white">
  <div class="container-wide">
    <h2 class="text-2xl font-black mb-6 text-center">Browse Jobs By City</h2>
    <div class="flex flex-wrap justify-center gap-2">
      {#each jobCities as city}
        <a href="/jobseeker/jobs?city={city}" class="px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:border-brand-blue hover:text-brand-blue hover:bg-blue-50 transition-colors">
          {city}
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Recent jobs -->
<section class="section-padding bg-surface">
  <div class="container-wide">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-black">Latest Jobs</h2>
      <a href="/jobseeker/jobs" class="text-sm font-semibold text-brand-blue hover:underline flex items-center gap-1">
        View All <ArrowRight class="w-4 h-4" />
      </a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#each recentJobs as job}
        <a href="/jobseeker/jobs/{job.id}">
          <Card hover padding="md" class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 shrink-0">
              {job.companyName.slice(0,2).toUpperCase()}
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-slate-900 truncate">{job.title}</h3>
              <p class="text-sm text-slate-500 truncate">{job.companyName} · {job.city}</p>
            </div>
            <Badge variant="blue" size="sm">{job.jobType}</Badge>
          </Card>
        </a>
      {/each}
    </div>
  </div>
</section>
