<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import OTPInput from '$lib/components/ui/OTPInput.svelte';
  import { LogIn, Briefcase, Users, GraduationCap, TrendingUp } from 'lucide-svelte';
  import type { UserRole } from '$lib/types/auth.ts';

  const redirect = $page.url.searchParams.get('redirect') ?? '/';

  const roles: { value: UserRole; label: string; icon: unknown; desc: string }[] = [
    { value: 'employer',  label: 'Employer',    icon: Briefcase,    desc: 'Post jobs & search resumes' },
    { value: 'jobseeker', label: 'Job Seeker',  icon: Users,        desc: 'Find & apply to jobs' },
    { value: 'institute', label: 'Institute',   icon: GraduationCap,desc: 'University / College' },
    { value: 'faculty',   label: 'Faculty',     icon: TrendingUp,   desc: 'Trainer / Educator' },
  ];

  let step        = $state<'role' | 'credentials' | 'otp'>('role');
  let selectedRole = $state<UserRole>('jobseeker');
  let loginMethod = $state<'password' | 'otp'>('otp');
  let mobile      = $state('');
  let email       = $state('');
  let password    = $state('');
  let otp         = $state('');
  let loading     = $state(false);
  let otpError    = $state('');
  let countdown   = $state(0);
  let timer: ReturnType<typeof setInterval>;

  function startCountdown() {
    countdown = 60;
    clearInterval(timer);
    timer = setInterval(() => { if (--countdown <= 0) clearInterval(timer); }, 1000);
  }

  async function sendOTP() {
    if (!mobile && !email) return;
    loading = true;
    await new Promise(r => setTimeout(r, 800));
    loading = false;
    step = 'otp';
    startCountdown();
    ui.toast('OTP sent successfully!', 'success');
  }

  async function verifyOTP(val: string) {
    if (val.length !== 6) return;
    loading = true;
    await new Promise(r => setTimeout(r, 600));
    // Mock: any 6-digit OTP works
    auth.login(
      { id: 'u1', name: mobile ? `User ${mobile.slice(-4)}` : email.split('@')[0], email: email || `${mobile}@rs.com`, mobile: mobile || '', role: selectedRole, verified: true, createdAt: new Date().toISOString() },
      'mock-token-abc'
    );
    loading = false;
    ui.toast(`Welcome back! Logged in as ${selectedRole}.`, 'success');
    goto(redirect);
  }

  async function loginWithPassword() {
    loading = true;
    await new Promise(r => setTimeout(r, 600));
    auth.login(
      { id: 'u1', name: email.split('@')[0], email, mobile: '', role: selectedRole, verified: true, createdAt: new Date().toISOString() },
      'mock-token-abc'
    );
    loading = false;
    ui.toast(`Logged in as ${selectedRole}!`, 'success');
    goto(redirect);
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
        {step === 'role' ? 'Welcome Back' : step === 'credentials' ? `Login as ${selectedRole}` : 'Enter OTP'}
      </h1>
      <p class="text-slate-500 text-sm mt-1">
        {step === 'role' ? 'Choose your role to continue' : step === 'otp' ? `OTP sent to ${mobile || email}` : 'Enter your details'}
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

      {:else if step === 'credentials'}
        <div class="flex gap-2 mb-5">
          <button
            onclick={() => loginMethod = 'otp'}
            class="flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors {loginMethod === 'otp' ? 'bg-brand-blue text-white border-brand-blue' : 'border-slate-200 text-slate-600'}"
          >OTP Login</button>
          <button
            onclick={() => loginMethod = 'password'}
            class="flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors {loginMethod === 'password' ? 'bg-brand-blue text-white border-brand-blue' : 'border-slate-200 text-slate-600'}"
          >Password</button>
        </div>

        <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); loginMethod === 'otp' ? sendOTP() : loginWithPassword(); }}>
          {#if loginMethod === 'otp'}
            <Input label="Mobile / Email" placeholder="9876543210 or you@email.com" bind:value={mobile} required />
          {:else}
            <Input label="Email" type="email" placeholder="you@email.com" bind:value={email} required />
            <Input label="Password" type="password" placeholder="••••••••" bind:value={password} required />
          {/if}
          <button type="submit" class="btn-primary w-full justify-center" disabled={loading}>
            {#if loading}<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>{/if}
            {loginMethod === 'otp' ? 'Send OTP' : 'Login'}
          </button>
        </form>
        <button onclick={() => step = 'role'} class="w-full text-center text-sm text-slate-400 hover:text-slate-600 mt-3">← Change role</button>

      {:else if step === 'otp'}
        <p class="text-center text-sm text-slate-600 mb-6">Enter the 6-digit code sent to <span class="font-semibold">{mobile || email}</span></p>
        <OTPInput bind:value={otp} error={otpError} onComplete={verifyOTP} />
        {#if loading}
          <p class="text-center text-sm text-slate-500 mt-4">Verifying…</p>
        {/if}
        <div class="text-center mt-4">
          {#if countdown > 0}
            <p class="text-sm text-slate-400">Resend OTP in {countdown}s</p>
          {:else}
            <button onclick={sendOTP} class="text-sm text-brand-blue font-semibold hover:underline">Resend OTP</button>
          {/if}
        </div>
        <button onclick={() => step = 'credentials'} class="w-full text-center text-sm text-slate-400 hover:text-slate-600 mt-3">← Change number</button>
      {/if}
    </div>
  </div>
</div>
