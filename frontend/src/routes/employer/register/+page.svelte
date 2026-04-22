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
  let company  = $state('');
  let compType = $state('');
  let password = $state('');

  const companyTypes = [
    'Private Limited','Public Limited','LLP','Proprietorship','Partnership','Government','NGO'
  ].map(t => ({ label: t, value: t }));

  async function handleSubmit(e: Event) {
    e.preventDefault();
    loading = true;
    const now = new Date().toISOString();

    const { data: user, error: userErr } = await supabase
      .from('users')
      .insert({ name, email, mobile, password_hash: password, role: 'EMPLOYER', verified: true, active: true, created_at: now, updated_at: now })
      .select('id')
      .single();

    if (userErr) {
      ui.toast(userErr.message.includes('unique') ? 'Email or mobile already registered.' : userErr.message, 'error');
      loading = false;
      return;
    }

    const { error: empErr } = await supabase
      .from('employers')
      .insert({ user_id: user.id, company_name: company, company_type: compType || null, verified: false, created_at: now, updated_at: now });

    if (empErr) {
      ui.toast(empErr.message, 'error');
      loading = false;
      return;
    }

    auth.login(
      { id: user.id, name, email, mobile, role: 'employer', verified: true, createdAt: now },
      user.id
    );
    loading = false;
    ui.toast('Registration successful! Welcome to RSQuare.', 'success');
    goto('/employer/profile');
  }
</script>

<svelte:head>
  <title>Employer Registration – RSQuare</title>
</svelte:head>

<div class="min-h-[80vh] bg-surface flex items-center justify-center py-12 px-4">
  <div class="w-full max-w-lg">
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 mb-5">
        <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-black text-lg">R²</div>
        <span class="font-black text-brand-navy text-xl">RSQuare</span>
      </a>
      <h1 class="text-2xl font-black">Register as Employer</h1>
      <p class="text-slate-500 text-sm mt-1">Fill in your details to create an account</p>
    </div>

    <div class="bg-white rounded-2xl card-shadow p-6">
      <form class="space-y-4" onsubmit={handleSubmit}>
        <div class="grid grid-cols-2 gap-4">
          <Input label="Contact Person" placeholder="Full Name" bind:value={name} required />
          <Input label="Mobile Number" type="tel" placeholder="9876543210" bind:value={mobile} required />
        </div>
        <Input label="Email Address" type="email" placeholder="hr@company.com" bind:value={email} required />
        <Input label="Company Name" placeholder="Acme Pvt Ltd" bind:value={company} required />
        <Select label="Company Type" options={companyTypes} bind:value={compType} required />
        <Input label="Password" type="password" placeholder="Min 8 characters" bind:value={password} required />
        <p class="text-xs text-slate-500">By registering you agree to our Terms of Service and Privacy Policy.</p>
        <!-- <button type="submit" class="btn-primary w-full justify-center !py-3" disabled={loading}>
          {#if loading}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{/if}
          Create Account 
        </button> -->
        <button type="button" class="btn-primary w-full justify-center !py-3" disabled={loading}>
          {#if loading}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{/if}
          Create Account 
        </button>
      </form>
      <p class="text-center text-sm text-slate-500 mt-4">
        Already registered? <a href="/auth/login" class="text-brand-blue font-semibold hover:underline">Login</a>
      </p>
    </div>
  </div>
</div>
