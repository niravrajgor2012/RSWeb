<script lang="ts">
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { goto } from '$app/navigation';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { jobTypes, jobCities, jobDepartments, jobQualifications } from '$lib/data/jobs.ts';
  import { Briefcase, Plus, X } from 'lucide-svelte';

  let title       = $state('');
  let role        = $state('');
  let department  = $state('');
  let city        = $state('');
  let jobType     = $state('');
  let qual        = $state('');
  let experience  = $state('');
  let salaryMin   = $state('');
  let salaryMax   = $state('');
  let vacancies   = $state('1');
  let deadline    = $state('');
  let description = $state('');
  let skillInput  = $state('');
  let skills      = $state<string[]>([]);
  let saving      = $state(false);

  function addSkill() {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) skills = [...skills, s];
    skillInput = '';
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    saving = true;
    await new Promise(r => setTimeout(r, 800));
    saving = false;
    ui.toast('Job posted successfully! It will be live within minutes.', 'success');
    goto('/employer');
  }

  const typeOpts  = jobTypes.map(t => ({ label: t, value: t }));
  const cityOpts  = jobCities.map(c => ({ label: c, value: c }));
  const deptOpts  = jobDepartments.map(d => ({ label: d, value: d }));
  const qualOpts  = jobQualifications.map(q => ({ label: q, value: q }));
  const expOpts   = ['0–1 years','1–3 years','3–5 years','5–8 years','8–12 years','12+ years','Any'].map(e=>({label:e,value:e}));
</script>

<svelte:head>
  <title>Post a Job – RSQuare Employer</title>
</svelte:head>

<div class="section-padding bg-surface">
  <div class="container-wide max-w-3xl">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center">
        <Briefcase class="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 class="text-2xl font-black">Post a New Job</h1>
        <p class="text-slate-500 text-sm">Fill in the details below — takes less than 3 minutes</p>
      </div>
    </div>

    <form class="space-y-6" onsubmit={handleSubmit}>
      <Card padding="lg">
        <h2 class="text-base font-bold mb-5">Job Basics</h2>
        <div class="space-y-4">
          <Input label="Job Title" placeholder="e.g. Senior React Developer" bind:value={title} required />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Role / Designation" placeholder="e.g. Frontend Developer" bind:value={role} required />
            <Select label="Department" options={deptOpts} bind:value={department} required />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Job Type" options={typeOpts} bind:value={jobType} required />
            <Select label="City" options={cityOpts} bind:value={city} required />
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h2 class="text-base font-bold mb-5">Requirements</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Qualification" options={qualOpts} bind:value={qual} required />
            <Select label="Experience" options={expOpts} bind:value={experience} required />
          </div>
          <!-- Skills -->
          <div>
            <label class="text-sm font-medium text-slate-700 block mb-1">Skills Required</label>
            <div class="flex gap-2">
              <input
                type="text" placeholder="e.g. React, Python..."
                bind:value={skillInput}
                onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                class="input-base flex-1"
              />
              <button type="button" onclick={addSkill} class="btn-outline !py-2 !px-3 shrink-0">
                <Plus class="w-4 h-4" />
              </button>
            </div>
            {#if skills.length}
              <div class="flex flex-wrap gap-2 mt-2">
                {#each skills as skill}
                  <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full px-2.5 py-1">
                    {skill}
                    <button type="button" onclick={() => skills = skills.filter(s => s !== skill)}>
                      <X class="w-3 h-3" />
                    </button>
                  </span>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h2 class="text-base font-bold mb-5">Compensation & Deadline</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Input label="Salary Min (₹/yr)" type="number" placeholder="500000" bind:value={salaryMin} hint="Leave blank to hide" />
          <Input label="Salary Max (₹/yr)" type="number" placeholder="900000" bind:value={salaryMax} />
          <Input label="Vacancies" type="number" placeholder="1" bind:value={vacancies} required />
        </div>
        <div class="mt-4">
          <Input label="Application Deadline" type="date" bind:value={deadline} required />
        </div>
      </Card>

      <Card padding="lg">
        <h2 class="text-base font-bold mb-5">Job Description</h2>
        <Textarea
          label="Describe the role, responsibilities, and ideal candidate..."
          bind:value={description}
          rows={6}
          maxlength={2000}
          required
        />
      </Card>

      <div class="flex justify-end gap-3">
        <a href="/employer" class="btn-ghost border border-slate-200 !py-3 !px-6">Cancel</a>
        <button type="submit" class="btn-primary !py-3 !px-8" disabled={saving}>
          {#if saving}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{/if}
          Publish Job
        </button>
      </div>
    </form>
  </div>
</div>
