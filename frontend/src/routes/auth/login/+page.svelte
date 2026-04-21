<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { supabase } from '$lib/supabase.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import { LogIn, Briefcase, Users, GraduationCap, TrendingUp } from 'lucide-svelte';
  import type { UserRole } from '$lib/types/auth.ts';

  const redirect = $page.url.searchParams.get('redirect') ?? '/';

  const roles: { value: UserRole; label: string; icon: unknown; desc: string }[] = [
    { value: 'employer',  label: 'Employer',   icon: Briefcase,     desc: 'Post jobs & search resumes' },
    { value: 'jobseeker', label: 'Job Seeker', icon: Users,         desc: 'Find & apply to jobs' },
    { value: 'institute', label: 'Institute',  icon: GraduationCap, desc: 'University / College' },
    { value: 'faculty',   label: 'Faculty',    icon: TrendingUp,    desc: 'Trainer / Educator' },
  ];

  const roleRedirect: Record<UserRole, string> = {
    employer:  '/employer/profile',
    jobseeker: '/jobseeker/profile',
    institute: '/institute/profile',
    faculty:   '/training',
    student:   '/training',
    admin:     '/',
  };

  let step         = $state<'role' | 'credentials'>('role');
  let selectedRole = $state<UserRole>('jobseeker');
  let email        = $state('');
  let password     = $state('');
  let loading      = $state(false);

  async function handleLogin(e: Event) {
    e.preventDefault();
    loading = true;

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, mobile, role, verified, created_at')
      .eq('email', email.trim().toLowerCase())
      .eq('password_hash', password)
      .eq('active', true)
      .single();

    if (error || !user) {
      ui.toast('Invalid email or password.', 'error');
      loading = false;
      return;
    }

    auth.login(
      { id: user.id, name: user.name, email: user.email, mobile: user.mobile ?? '', role: user.role.toLowerCase() as UserRole, verified: user.verified, createdAt: user.created_at },
      user.id
    );
    loading = false;
    ui.toast(`Welcome back, ${user.name}!`, 'success');
    goto(redirect !== '/' ? redirect : roleRedirect[user.role.toLowerCase() as UserRole] ?? '/');
  }
</script>

<svelte:head>
  <title>Login – RSQuare HR Solutions</title>
</svelte:head>

<div class="min-h-[80vh] bg-surface flex items-center justify-center py-12 px-4">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 mb-5">
        <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-black text-lg">R²</div>
        <span class="font-black text-brand-navy text-xl">RSQuare</span>
      </a>
      <h1 class="text-2xl font-black text-slate-900">
        {step === 'role' ? 'Welcome Back' : `Login as ${roles.find(r => r.value === selectedRole)?.label}`}
      </h1>
      <p class="text-slate-500 text-sm mt-1">
        {step === 'role' ? 'Choose your role to continue' : 'Enter your email and password'}
      </p>
    </div>

    <div class="bg-white rounded-2xl card-shadow p-6">
      {#if step === 'role'}
        <div class="grid grid-cols-2 gap-3 mb-6">
          {#each roles as r}
            <button
              onclick={() => selectedRole = r.value}
              class="p-4 rounded-xl border-2 text-left transition-all {selectedRole === r.value ? 'border-brand-blue bg-blue-50' : 'border-slate-100 hover:border-slate-200'}"
            >
              <!-- @ts-ignore -->
              <svelte:component this={r.icon} class="w-5 h-5 mb-2 {selectedRole === r.value ? 'text-brand-blue' : 'text-slate-400'}" />
              <p class="font-bold text-sm text-slate-900">{r.label}</p>
              <p class="text-xs text-slate-400 mt-0.5">{r.desc}</p>
            </button>
          {/each}
        </div>
        <button onclick={() => step = 'credentials'} class="btn-primary w-full justify-center">
          Continue as {roles.find(r => r.value === selectedRole)?.label}
        </button>
        <p class="text-center text-sm text-slate-500 mt-4">
          New here? <a href="/employer/register" class="text-brand-blue font-semibold hover:underline">Create an account</a>
        </p>

      {:else}
        <form class="space-y-4" onsubmit={handleLogin}>
          <Input label="Email" type="email" placeholder="you@email.com" bind:value={email} required />
          <Input label="Password" type="password" placeholder="••••••••" bind:value={password} required />
          <button type="submit" class="btn-primary w-full justify-center !py-3" disabled={loading}>
            {#if loading}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{/if}
            <LogIn class="w-4 h-4" />
            Login
          </button>
        </form>
        <button onclick={() => step = 'role'} class="w-full text-center text-sm text-slate-400 hover:text-slate-600 mt-3">← Change role</button>
      {/if}
    </div>
  </div>
</div>
