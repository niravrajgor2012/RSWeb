<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { supabase } from '$lib/supabase.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import FileUpload from '$lib/components/ui/FileUpload.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { Building2, Save } from 'lucide-svelte';

  let companyName = $state('');
  let gstn        = $state('');
  let compType    = $state('');
  let yearEst     = $state('');
  let website     = $state('');
  let address     = $state('');
  let city        = $state('');
  let state_      = $state('');
  let pincode     = $state('');
  let brief       = $state('');
  let logo        = $state<File | null>(null);
  let logoUrl     = $state('');
  let saving      = $state(false);
  let loading     = $state(true);
  let employerId  = $state<string | null>(null);

  const companyTypes = ['Private Limited','Public Limited','LLP','Proprietorship','Partnership','Government','NGO'].map(t=>({label:t,value:t}));
  const states = ['Gujarat','Maharashtra','Delhi','Karnataka','Telangana','Tamil Nadu','Rajasthan','UP','MP','West Bengal'].map(s=>({label:s,value:s}));

  onMount(async () => {
    auth.hydrate();
    if (!auth.user?.id) {
      goto('/auth/login?redirect=/employer/profile');
      return;
    }

    const { data } = await supabase
      .from('employers')
      .select('id, company_name, gstn, company_type, year_established, website, address, city, state, pincode, brief, logo_url')
      .eq('user_id', auth.user.id)
      .single();

    if (data) {
      employerId  = data.id;
      companyName = data.company_name ?? '';
      gstn        = data.gstn ?? '';
      compType    = data.company_type ?? '';
      yearEst     = data.year_established?.toString() ?? '';
      website     = data.website ?? '';
      address     = data.address ?? '';
      city        = data.city ?? '';
      state_      = data.state ?? '';
      pincode     = data.pincode ?? '';
      brief       = data.brief ?? '';
      logoUrl     = data.logo_url ?? '';
    }
    loading = false;
  });

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function save(e: Event) {
    e.preventDefault();
    if (!employerId) { ui.toast('Employer profile not found.', 'error'); return; }
    saving = true;

    if (logo) {
      logoUrl = await fileToBase64(logo);
    }

    const now = new Date().toISOString();
    const { error } = await supabase
      .from('employers')
      .update({
        company_name:     companyName,
        gstn:             gstn || null,
        company_type:     compType || null,
        year_established: yearEst ? parseInt(yearEst) : null,
        website:          website || null,
        address:          address || null,
        city:             city || null,
        state:            state_ || null,
        pincode:          pincode || null,
        brief:            brief || null,
        logo_url:         logoUrl || null,
        updated_at:       now,
      })
      .eq('id', employerId);

    saving = false;
    if (error) ui.toast(error.message, 'error');
    else ui.toast('Company profile saved successfully!', 'success');
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

    {#if loading}
      <div class="flex justify-center py-20">
        <span class="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></span>
      </div>
    {:else}
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
          <div class="space-y-4">
            <Textarea label="Address" placeholder="Street, Area, Landmark…" bind:value={address} rows={2} />
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="City" placeholder="Ahmedabad" bind:value={city} required />
              <Select label="State" options={states} bind:value={state_} required />
              <Input label="Pincode" placeholder="380015" bind:value={pincode} />
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <h2 class="text-base font-bold mb-5 text-slate-900">Company Logo</h2>
          {#if logoUrl}
            <div class="mb-4 flex items-center gap-3">
              <img src={logoUrl} alt="Current logo" class="w-16 h-16 rounded-xl object-contain border border-slate-200 bg-white p-1" />
              <p class="text-sm text-slate-500">Current logo — upload a new one to replace it</p>
            </div>
          {/if}
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
    {/if}
  </div>
</div>
