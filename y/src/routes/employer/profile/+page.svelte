<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import FileUpload from '$lib/components/ui/FileUpload.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { Building2, Save } from 'lucide-svelte';

  let companyName = $state(auth.user?.name ?? '');
  let gstn        = $state('');
  let compType    = $state('');
  let yearEst     = $state('');
  let website     = $state('');
  let city        = $state('');
  let state_      = $state('');
  let brief       = $state('');
  let logo        = $state<File | null>(null);
  let saving      = $state(false);

  const companyTypes = ['Private Limited','Public Limited','LLP','Proprietorship','Partnership','Government','NGO'].map(t=>({label:t,value:t}));
  const states = ['Gujarat','Maharashtra','Delhi','Karnataka','Telangana','Tamil Nadu','Rajasthan','UP','MP','West Bengal'].map(s=>({label:s,value:s}));

  async function save(e: Event) {
    e.preventDefault();
    saving = true;
    await new Promise(r => setTimeout(r, 700));
    saving = false;
    ui.toast('Company profile saved successfully!', 'success');
  }
</script>

<svelte:head>
  <title>Company Profile – RSQuare Employer</title>
</svelte:head>

<div class="section-padding bg-surface">
  <div class="container-wide max-w-3xl">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center">
        <Building2 class="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 class="text-2xl font-black">Company Profile</h1>
        <p class="text-slate-500 text-sm">Complete your profile to attract better candidates</p>
      </div>
    </div>

    <form class="space-y-6" onsubmit={save}>
      <Card padding="lg">
        <h2 class="text-base font-bold mb-5 text-slate-900">Basic Information</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Company Name" bind:value={companyName} required />
            <Input label="GSTN" placeholder="22AAAAA0000A1Z5" bind:value={gstn} hint="GST Identification Number" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Company Type" options={companyTypes} bind:value={compType} required />
            <Input label="Year of Establishment" type="number" placeholder="2005" bind:value={yearEst} />
          </div>
          <Input label="Website" type="url" placeholder="https://yourcompany.com" bind:value={website} />
        </div>
      </Card>

      <Card padding="lg">
        <h2 class="text-base font-bold mb-5 text-slate-900">Location</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="City" placeholder="Ahmedabad" bind:value={city} required />
          <Select label="State" options={states} bind:value={state_} required />
        </div>
      </Card>

      <Card padding="lg">
        <h2 class="text-base font-bold mb-5 text-slate-900">Company Logo</h2>
        <FileUpload
          label="Upload Logo"
          accept="image/png,image/jpeg,image/svg+xml"
          maxMb={2}
          bind:file={logo}
          hint="PNG, JPG, SVG · Recommended: 200×200px"
        />
      </Card>

      <Card padding="lg">
        <h2 class="text-base font-bold mb-5 text-slate-900">Brief Profile</h2>
        <Textarea
          label="About your company"
          placeholder="Describe your company, industry, culture, and what makes you a great employer..."
          bind:value={brief}
          rows={5}
          maxlength={1000}
          required
        />
      </Card>

      <div class="flex justify-end">
        <button type="submit" class="btn-primary !py-3 !px-8" disabled={saving}>
          {#if saving}
            <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {:else}
            <Save class="w-4 h-4" />
          {/if}
          Save Profile
        </button>
      </div>
    </form>
  </div>
</div>
