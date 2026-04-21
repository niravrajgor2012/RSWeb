<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { supabase } from '$lib/supabase.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import FileUpload from '$lib/components/ui/FileUpload.svelte';

  let loading   = $state(false);
  let name      = $state('');
  let email     = $state('');
  let mobile    = $state('');
  let institute = $state('');
  let course    = $state('');
  let year      = $state('');
  let cvFile    = $state<File | null>(null);

  const years = ['1st Year','2nd Year','3rd Year','Final Year','Pass-Out 2025','Pass-Out 2026'].map(y=>({label:y,value:y}));

  async function handleSubmit(e: Event) {
    e.preventDefault();
    loading = true;
    const now = new Date().toISOString();

    const { data: user, error: userErr } = await supabase
      .from('users')
      .insert({ name, email, mobile, role: 'STUDENT', verified: true, active: true, created_at: now, updated_at: now })
      .select('id')
      .single();

    if (userErr) {
      ui.toast(userErr.message.includes('unique') ? 'Email or mobile already registered.' : userErr.message, 'error');
      loading = false;
      return;
    }

    const { error: stuErr } = await supabase
      .from('students')
      .insert({ user_id: user.id, full_name: name, institute: institute || null, course: course || null, year: year || null, created_at: now, updated_at: now });

    if (stuErr) {
      ui.toast(stuErr.message, 'error');
      loading = false;
      return;
    }

    auth.login(
      { id: user.id, name, email, mobile, role: 'student', verified: true, createdAt: now },
      user.id
    );
    loading = false;
    ui.toast('Student profile created!', 'success');
    goto('/training');
  }
</script>

<svelte:head><title>Student Registration – RSQuare Training</title></svelte:head>

<div class="min-h-[80vh] bg-surface flex items-center justify-center py-12 px-4">
  <div class="w-full max-w-lg">
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 mb-5">
        <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-black text-lg">R²</div>
        <span class="font-black text-brand-navy text-xl">RSQuare</span>
      </a>
      <h1 class="text-2xl font-black">Student Registration</h1>
      <p class="text-slate-500 text-sm mt-1">Access courses, webinars, and career guidance</p>
    </div>
    <div class="bg-white rounded-2xl card-shadow p-6">
      <form class="space-y-4" onsubmit={handleSubmit}>
        <div class="grid grid-cols-2 gap-4">
          <Input label="Full Name" bind:value={name} required />
          <Input label="Mobile" type="tel" bind:value={mobile} required />
        </div>
        <Input label="Email" type="email" bind:value={email} required />
        <Input label="Institute / College Name" bind:value={institute} required />
        <div class="grid grid-cols-2 gap-4">
          <Input label="Course / Programme" placeholder="B.Tech, MBA..." bind:value={course} required />
          <Select label="Year" options={years} bind:value={year} required />
        </div>
        <FileUpload label="Upload CV (Optional)" accept=".pdf,.doc,.docx" maxMb={5} bind:file={cvFile} hint="Optional — upload after registration too" />
        <button type="submit" class="btn-primary w-full justify-center !py-3" disabled={loading}>
          {#if loading}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{/if}
          Create Account
        </button>
      </form>
    </div>
  </div>
</div>
