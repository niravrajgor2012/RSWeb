<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { supabase } from '$lib/supabase.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import FileUpload from '$lib/components/ui/FileUpload.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { GraduationCap, Save } from 'lucide-svelte';

  let instituteName = $state('');
  let type          = $state('');
  let affiliation   = $state('');
  let city          = $state('');
  let state_        = $state('');
  let website       = $state('');
  let brief         = $state('');
  let brochure      = $state<File | null>(null);
  let logo          = $state<File | null>(null);
  let saving        = $state(false);
  let loading       = $state(true);
  let instituteId   = $state<string | null>(null);

  const types  = ['University','College','Polytechnic','ITI','School','Training Center'].map(t=>({label:t,value:t}));
  const states = ['Gujarat','Maharashtra','Delhi','Karnataka','Telangana','Tamil Nadu','Rajasthan','UP','MP','West Bengal'].map(s=>({label:s,value:s}));

  onMount(async () => {
    if (!auth.user?.id) { loading = false; return; }

    const { data } = await supabase
      .from('institutes')
      .select('id, name, type, affiliated_to, city, state, website, brief')
      .eq('user_id', auth.user.id)
      .single();

    if (data) {
      instituteId   = data.id;
      instituteName = data.name ?? '';
      type          = data.type ?? '';
      affiliation   = data.affiliated_to ?? '';
      city          = data.city ?? '';
      state_        = data.state ?? '';
      website       = data.website ?? '';
      brief         = data.brief ?? '';
    }
    loading = false;
  });

  async function save(e: Event) {
    e.preventDefault();
    if (!instituteId) { ui.toast('Institute profile not found.', 'error'); return; }
    saving = true;

    const { error } = await supabase
      .from('institutes')
      .update({
        name:          instituteName,
        type:          type || null,
        affiliated_to: affiliation || null,
        city:          city || null,
        state:         state_ || null,
        website:       website || null,
        brief:         brief || null,
        updated_at:    new Date().toISOString(),
      })
      .eq('id', instituteId);

    saving = false;
    if (error) ui.toast(error.message, 'error');
    else ui.toast('Institute profile saved!', 'success');
  }
</script>

<svelte:head><title>Institute Profile – RSQuare</title></svelte:head>

<div class="section-padding bg-surface">
  <div class="container-wide max-w-3xl">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center">
        <GraduationCap class="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 class="text-2xl font-black">Institute Profile</h1>
        <p class="text-slate-500 text-sm">Help employers and students find your institution</p>
      </div>
    </div>

    {#if loading}
      <div class="flex justify-center py-20">
        <span class="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></span>
      </div>
    {:else}
      <form class="space-y-6" onsubmit={save}>
        <Card padding="lg">
          <h2 class="text-base font-bold mb-5">Basic Details</h2>
          <div class="space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <Input label="Institute Name" bind:value={instituteName} required />
              <Select label="Institute Type" options={types} bind:value={type} required />
            </div>
            <Input label="Affiliated To" placeholder="Gujarat University / AICTE / CBSE..." bind:value={affiliation} />
            <Input label="Website" type="url" placeholder="https://..." bind:value={website} />
            <div class="grid sm:grid-cols-2 gap-4">
              <Input label="City" placeholder="Ahmedabad" bind:value={city} />
              <Select label="State" options={states} bind:value={state_} />
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <h2 class="text-base font-bold mb-5">Media</h2>
          <div class="grid sm:grid-cols-2 gap-6">
            <FileUpload label="Institute Logo" accept="image/*" maxMb={2} bind:file={logo} hint="PNG / JPG, max 2MB" />
            <FileUpload label="Brochure / Prospectus" accept=".pdf" maxMb={10} bind:file={brochure} hint="PDF, max 10MB" />
          </div>
        </Card>

        <Card padding="lg">
          <Textarea label="Brief About Your Institute" placeholder="Courses offered, placement history, achievements..." bind:value={brief} rows={5} maxlength={1000} required />
        </Card>

        <div class="flex justify-end">
          <button type="submit" class="btn-primary !py-3 !px-8" disabled={saving}>
            {#if saving}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {:else}<Save class="w-4 h-4" />{/if}
            Save Profile
          </button>
        </div>
      </form>
    {/if}
  </div>
</div>
