<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import FileUpload from '$lib/components/ui/FileUpload.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { GraduationCap, Save } from 'lucide-svelte';

  let instituteName = $state(auth.user?.name ?? '');
  let type = $state(''), affiliation = $state(''), website = $state(''), brief = $state('');
  let brochure = $state<File | null>(null);
  let logo = $state<File | null>(null);
  let saving = $state(false);

  const types = ['University','College','Polytechnic','ITI','School','Training Center'].map(t=>({label:t,value:t}));

  async function save(e: Event) {
    e.preventDefault(); saving = true;
    await new Promise(r => setTimeout(r, 700));
    saving = false;
    ui.toast('Institute profile saved!', 'success');
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
  </div>
</div>
