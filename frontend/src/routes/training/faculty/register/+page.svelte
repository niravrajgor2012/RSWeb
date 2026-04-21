<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { supabase } from '$lib/supabase.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import FileUpload from '$lib/components/ui/FileUpload.svelte';
  import Card from '$lib/components/ui/Card.svelte';

  let loading        = $state(false);
  let name           = $state('');
  let email          = $state('');
  let mobile         = $state('');
  let specialization = $state('');
  let qualifications = $state('');
  let bio            = $state('');
  let cvFile         = $state<File | null>(null);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    loading = true;
    const now = new Date().toISOString();

    const { data: user, error: userErr } = await supabase
      .from('users')
      .insert({ name, email, mobile, role: 'FACULTY', verified: true, active: true, created_at: now, updated_at: now })
      .select('id')
      .single();

    if (userErr) {
      ui.toast(userErr.message.includes('unique') ? 'Email or mobile already registered.' : userErr.message, 'error');
      loading = false;
      return;
    }

    const { error: facErr } = await supabase
      .from('faculties')
      .insert({ user_id: user.id, full_name: name, specialization: specialization || null, bio: bio || null, created_at: now, updated_at: now });

    if (facErr) {
      ui.toast(facErr.message, 'error');
      loading = false;
      return;
    }

    auth.login(
      { id: user.id, name, email, mobile, role: 'faculty', verified: true, createdAt: now },
      user.id
    );
    loading = false;
    ui.toast('Faculty profile created!', 'success');
    goto('/training');
  }
</script>

<svelte:head><title>Faculty Registration – RSQuare Training</title></svelte:head>

<div class="min-h-[80vh] bg-surface flex items-center justify-center py-12 px-4">
  <div class="w-full max-w-lg">
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 mb-5">
        <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-black text-lg">R²</div>
        <span class="font-black text-brand-navy text-xl">RSQuare</span>
      </a>
      <h1 class="text-2xl font-black">Faculty Registration</h1>
      <p class="text-slate-500 text-sm mt-1">Share your expertise with thousands of learners</p>
    </div>
    <div class="bg-white rounded-2xl card-shadow p-6">
      <form class="space-y-4" onsubmit={handleSubmit}>
        <div class="grid grid-cols-2 gap-4">
          <Input label="Full Name" bind:value={name} required />
          <Input label="Mobile" type="tel" bind:value={mobile} required />
        </div>
        <Input label="Email" type="email" bind:value={email} required />
        <Input label="Specialization" placeholder="e.g. Labour Laws, PoSH, HR Analytics" bind:value={specialization} required />
        <Input label="Qualifications" placeholder="e.g. MBA HR, LLB, PGDM" bind:value={qualifications} required />
        <Textarea label="Brief Bio" placeholder="Tell learners about your experience and teaching approach..." bind:value={bio} rows={3} />
        <FileUpload label="Upload CV" accept=".pdf,.doc,.docx" maxMb={5} bind:file={cvFile} hint="PDF or DOCX, max 5MB" />
        <button type="submit" class="btn-primary w-full justify-center !py-3" disabled={loading}>
          {#if loading}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{/if}
          Register as Faculty
        </button>
      </form>
    </div>
  </div>
</div>
