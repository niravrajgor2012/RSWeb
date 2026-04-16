<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowLeft, MapPin, Clock, Users, Calendar, Building2, Briefcase, CheckCircle, Share2 } from 'lucide-svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';
  import FileUpload from '$lib/components/ui/FileUpload.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import { ui } from '$lib/stores/ui.svelte.ts';

  let { data }: { data: PageData } = $props();
  const { job, similar } = data;

  let applyOpen  = $state(false);
  let applyName  = $state('');
  let applyEmail = $state('');
  let applyPhone = $state('');
  let cvFile     = $state<File | null>(null);
  let submitted  = $state(false);

  function handleApply() {
    submitted = true;
    applyOpen = false;
    ui.toast('Application submitted! The employer will reach out to you.', 'success');
  }

  const salaryText = job.salaryMin
    ? `₹${(job.salaryMin/100000).toFixed(1)}–${(job.salaryMax!/100000).toFixed(1)} LPA`
    : 'Not Disclosed';

  const deadline = new Date(job.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const posted   = new Date(job.postedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
</script>

<svelte:head>
  <title>{job.title} at {job.companyName} – RSQuare</title>
</svelte:head>

<div class="bg-white border-b border-slate-100">
  <div class="container-wide py-6">
    <a href="/jobseeker/jobs" class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-blue mb-4 transition-colors">
      <ArrowLeft class="w-4 h-4" /> Back to Jobs
    </a>
    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div class="flex items-start gap-4">
        <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xl shrink-0">
          {job.companyName.slice(0,2).toUpperCase()}
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-brand-navy">{job.title}</h1>
          <p class="text-slate-600 font-medium mt-1 flex items-center gap-1.5">
            <Building2 class="w-4 h-4" /> {job.companyName}
            <span class="text-slate-300">·</span>
            <MapPin class="w-4 h-4" /> {job.city}, {job.state}
          </p>
        </div>
      </div>
      <div class="flex gap-2 shrink-0">
        <button
          onclick={() => { navigator.clipboard?.writeText(window.location.href); ui.toast('Link copied!', 'success'); }}
          class="btn-ghost !py-2 !px-3 border border-slate-200"
          title="Share"
        ><Share2 class="w-4 h-4" /></button>
        {#if submitted}
          <div class="flex items-center gap-2 px-5 py-2.5 bg-green-50 text-green-700 rounded-lg font-semibold text-sm border border-green-200">
            <CheckCircle class="w-4 h-4" /> Applied
          </div>
        {:else}
          <button onclick={() => applyOpen = true} class="btn-primary">Apply Now</button>
        {/if}
      </div>
    </div>

    <!-- Meta chips -->
    <div class="flex flex-wrap gap-2 mt-4">
      <Badge variant="blue">{job.jobType}</Badge>
      <Badge variant="gray">{job.department}</Badge>
      <Badge variant="gray">{job.qualification}</Badge>
      <Badge variant={job.employerType === 'Direct' ? 'green' : 'orange'}>{job.employerType}</Badge>
      {#if job.isFeatured}<Badge variant="orange">Featured</Badge>{/if}
    </div>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide grid lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2 space-y-6">
      <Card padding="lg">
        <h2 class="text-lg font-black mb-4">Job Description</h2>
        <p class="text-slate-600 leading-relaxed">{job.description}</p>
      </Card>

      <Card padding="lg">
        <h2 class="text-lg font-black mb-4">Required Skills</h2>
        <div class="flex flex-wrap gap-2">
          {#each job.skills as skill}
            <Badge variant="blue">{skill}</Badge>
          {/each}
        </div>
      </Card>

      {#if similar.length}
        <Card padding="lg">
          <h2 class="text-lg font-black mb-4">Similar Jobs</h2>
          <div class="space-y-3">
            {#each similar as s}
              <a href="/jobseeker/jobs/{s.id}" class="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors">
                <div>
                  <p class="font-semibold text-slate-900 text-sm">{s.title}</p>
                  <p class="text-xs text-slate-500">{s.companyName} · {s.city}</p>
                </div>
                <Badge variant="gray" size="sm">{s.jobType}</Badge>
              </a>
            {/each}
          </div>
        </Card>
      {/if}
    </div>

    <!-- Sidebar -->
    <div class="space-y-5">
      <Card padding="md">
        <h3 class="font-bold text-slate-900 mb-4">Job Overview</h3>
        <ul class="space-y-3 text-sm">
          {#each [
            [Clock,     'Experience',  job.experience],
            [Users,     'Vacancies',   String(job.vacancies)],
            [Briefcase, 'Salary',      salaryText],
            [Calendar,  'Apply By',    deadline],
            [Calendar,  'Posted',      posted],
          ] as [Icon, label, value]}
            <li class="flex items-start gap-3">
              <Icon class="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <span class="text-slate-500 w-24 shrink-0">{label}</span>
              <span class="font-medium text-slate-800">{value}</span>
            </li>
          {/each}
        </ul>
      </Card>

      {#if !submitted}
        <Card padding="md" class="bg-gradient-to-br from-brand-blue to-brand-teal text-white">
          <h3 class="font-bold text-white mb-2">Ready to Apply?</h3>
          <p class="text-sm text-blue-100 mb-4">Submit your application in under 60 seconds.</p>
          <button onclick={() => applyOpen = true} class="w-full bg-white text-brand-blue font-bold py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors">
            Apply Now
          </button>
        </Card>
      {/if}
    </div>
  </div>
</section>

<!-- Apply Modal -->
<Modal open={applyOpen} title="Apply for {job.title}" onclose={() => applyOpen = false}>
  <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); handleApply(); }}>
    <Input label="Full Name" placeholder="Your full name" bind:value={applyName} required />
    <Input label="Email" type="email" placeholder="your@email.com" bind:value={applyEmail} required />
    <Input label="Mobile Number" type="tel" placeholder="+91 98765 43210" bind:value={applyPhone} required />
    <FileUpload
      label="Upload CV / Resume"
      accept=".pdf,.doc,.docx"
      maxMb={5}
      bind:file={cvFile}
      hint="PDF, DOC, DOCX accepted"
    />
    <div class="flex gap-3 pt-2">
      <button type="button" onclick={() => applyOpen = false} class="btn-ghost flex-1 border border-slate-200">Cancel</button>
      <button type="submit" class="btn-primary flex-1">Submit Application</button>
    </div>
  </form>
</Modal>
