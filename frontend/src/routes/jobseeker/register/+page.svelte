<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { supabase } from '$lib/supabase.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';

  let loading = $state(false);
  let name     = $state('');
  let email    = $state('');
  let mobile   = $state('');
  let city     = $state('');
  let qual     = $state('');
  let password = $state('');

  const quals  = ['10th','12th','Diploma','Graduate','Post Graduate','B.E./B.Tech','MBA','CA','Any Graduate'].map(q=>({label:q,value:q}));
  const cities = ['Ahmedabad','Mumbai','Pune','Delhi','Bengaluru','Hyderabad','Surat','Chennai','Other'].map(c=>({label:c,value:c}));

  async function handleSubmit(e: Event) {
    e.preventDefault();
    loading = true;
    const now = new Date().toISOString();

    const { data: user, error: userErr } = await supabase
      .from('users')
      .insert({ name, email, mobile, password_hash: password, role: 'JOBSEEKER', verified: true, active: true, created_at: now, updated_at: now })
      .select('id')
      .single();

    if (userErr) {
      ui.toast(userErr.message.includes('unique') ? 'Email or mobile already registered.' : userErr.message, 'error');
      loading = false;
      return;
    }

    const { error: jsErr } = await supabase
      .from('job_seekers')
      .insert({ user_id: user.id, full_name: name, city: city || null, qualification: qual || null, profile_complete: 0, created_at: now, updated_at: now });

    if (jsErr) {
      ui.toast(jsErr.message, 'error');
      loading = false;
      return;
    }

    auth.login(
      { id: user.id, name, email, mobile, role: 'jobseeker', verified: true, createdAt: now },
      user.id
    );
    loading = false;
    ui.toast('Registration successful! Complete your profile to get noticed.', 'success');
    goto('/jobseeker/profile');
  }
</script>

<svelte:head>
  <title>Job Seeker Registration – RSQuare</title>
</svelte:head>

<div class="min-h-[80vh] bg-surface flex items-center justify-center py-12 px-4">
  <div class="w-full max-w-lg">
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 mb-5">
        <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-black text-lg">R²</div>
        <span class="font-black text-brand-navy text-xl">RSQuare</span>
      </a>
      <h1 class="text-2xl font-black">Create Job Seeker Account</h1>
      <p class="text-slate-500 text-sm mt-1">Find your dream job with RSQuare</p>
    </div>

    <div class="bg-white rounded-2xl card-shadow p-6">
      <form class="space-y-4" onsubmit={handleSubmit}>
        <div class="grid grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="Your name" bind:value={name} required />
          <Input label="Mobile" type="tel" placeholder="9876543210" bind:value={mobile} required />
        </div>
        <Input label="Email" type="email" placeholder="you@email.com" bind:value={email} required />
        <div class="grid grid-cols-2 gap-4">
          <Select label="City" options={cities} bind:value={city} required />
          <Select label="Qualification" options={quals} bind:value={qual} required />
        </div>
        <Input label="Password" type="password" placeholder="Min 8 characters" bind:value={password} required />
        <button type="submit" class="btn-primary w-full justify-center !py-3" disabled={loading}>
          {#if loading}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{/if}
          Create Account
        </button>
      </form>
      <p class="text-center text-sm text-slate-500 mt-4">
        Already have an account? <a href="/auth/login" class="text-brand-blue font-semibold hover:underline">Login</a>
      </p>
    </div>
  </div>
</div>
