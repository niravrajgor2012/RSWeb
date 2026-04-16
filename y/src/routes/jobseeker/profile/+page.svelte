<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import FileUpload from '$lib/components/ui/FileUpload.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { UserCircle, Save, Plus, X } from 'lucide-svelte';
  import { jobTypes, jobCities, jobDepartments, jobQualifications } from '$lib/data/jobs.ts';

  let fullName   = $state(auth.user?.name ?? '');
  let mobile     = $state(auth.user?.mobile ?? '');
  let email      = $state(auth.user?.email ?? '');
  let dob        = $state('');
  let gender     = $state('');
  let city       = $state('');
  let qual       = $state('');
  let dept       = $state('');
  let experience = $state('');
  let skillInput = $state('');
  let skills     = $state<string[]>([]);
  let cvFile     = $state<File | null>(null);
  let photoFile  = $state<File | null>(null);
  let saving     = $state(false);

  const profileComplete = $derived(
    Math.round([fullName, mobile, email, dob, gender, city, qual, dept, experience].filter(Boolean).length / 9 * 100)
  );

  const genderOpts = [{ label:'Male',value:'Male' },{ label:'Female',value:'Female' },{ label:'Other',value:'Other' }];
  const cityOpts   = jobCities.map(c => ({ label: c, value: c }));
  const qualOpts   = jobQualifications.map(q => ({ label: q, value: q }));
  const deptOpts   = jobDepartments.map(d => ({ label: d, value: d }));
  const expOpts    = ['0–1 years','1–3 years','3–5 years','5–8 years','8+ years'].map(e => ({ label: e, value: e }));

  function addSkill() {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) skills = [...skills, s];
    skillInput = '';
  }

  async function save(e: Event) {
    e.preventDefault();
    saving = true;
    await new Promise(r => setTimeout(r, 700));
    saving = false;
    ui.toast('Profile saved! You\'re now visible to employers.', 'success');
  }
</script>

<svelte:head>
  <title>My Profile – RSQuare Job Seeker</title>
</svelte:head>

<div class="section-padding bg-surface">
  <div class="container-wide max-w-3xl">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center">
          <UserCircle class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-black">My Profile</h1>
          <p class="text-slate-500 text-sm">Keep it complete to stand out to employers</p>
        </div>
      </div>
      <!-- Profile completeness -->
      <div class="hidden sm:flex flex-col items-end gap-1">
        <p class="text-xs font-semibold text-slate-500">Profile {profileComplete}% Complete</p>
        <div class="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full gradient-brand rounded-full transition-all" style="width:{profileComplete}%"></div>
        </div>
      </div>
    </div>

    <form class="space-y-6" onsubmit={save}>
      <Card padding="lg">
        <h2 class="text-base font-bold mb-5">Personal Information</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" bind:value={fullName} required />
            <Input label="Date of Birth" type="date" bind:value={dob} required />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Mobile" type="tel" bind:value={mobile} required />
            <Input label="Email" type="email" bind:value={email} required />
            <Select label="Gender" options={genderOpts} bind:value={gender} required />
          </div>
          <Select label="City" options={cityOpts} bind:value={city} required />
        </div>
      </Card>

      <Card padding="lg">
        <h2 class="text-base font-bold mb-5">Education & Experience</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Qualification" options={qualOpts} bind:value={qual} required />
            <Select label="Department / Specialisation" options={deptOpts} bind:value={dept} />
          </div>
          <Select label="Total Experience" options={expOpts} bind:value={experience} required />
          <!-- Skills -->
          <div>
            <label class="text-sm font-medium text-slate-700 block mb-1">Key Skills</label>
            <div class="flex gap-2">
              <input type="text" placeholder="Add a skill..." bind:value={skillInput}
                onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                class="input-base flex-1" />
              <button type="button" onclick={addSkill} class="btn-outline !py-2 !px-3">
                <Plus class="w-4 h-4" />
              </button>
            </div>
            {#if skills.length}
              <div class="flex flex-wrap gap-2 mt-2">
                {#each skills as skill}
                  <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full px-2.5 py-1">
                    {skill} <button type="button" onclick={() => skills = skills.filter(s=>s!==skill)}><X class="w-3 h-3" /></button>
                  </span>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h2 class="text-base font-bold mb-5">Documents</h2>
        <div class="grid sm:grid-cols-2 gap-6">
          <FileUpload label="Upload CV / Resume" accept=".pdf,.doc,.docx" maxMb={5} bind:file={cvFile} hint="PDF or DOCX, max 5MB" />
          <FileUpload label="Profile Photo" accept="image/*" maxMb={2} bind:file={photoFile} hint="JPG or PNG, max 2MB" />
        </div>
      </Card>

      <div class="flex justify-end">
        <button type="submit" class="btn-primary !py-3 !px-8" disabled={saving}>
          {#if saving}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {:else}<Save class="w-4 h-4" />{/if}
          Save Profile
        </button>
      </div>
    </form>
  </div>
</div>
