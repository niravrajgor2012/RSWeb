<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import OTPInput from '$lib/components/ui/OTPInput.svelte';

  let step      = $state<1 | 2>(1);
  let loading   = $state(false);
  let countdown = $state(0);
  let timer: ReturnType<typeof setInterval>;

  let name       = $state('');
  let email      = $state('');
  let mobile     = $state('');
  let city       = $state('');
  let qual       = $state('');
  let password   = $state('');
  let otp        = $state('');

  const quals = ['10th','12th','Diploma','Graduate','Post Graduate','B.E./B.Tech','MBA','CA','Any Graduate'].map(q=>({label:q,value:q}));
  const cities = ['Ahmedabad','Mumbai','Pune','Delhi','Bengaluru','Hyderabad','Surat','Chennai','Other'].map(c=>({label:c,value:c}));

  function startCountdown() {
    countdown = 60;
    clearInterval(timer);
    timer = setInterval(() => { if (--countdown <= 0) clearInterval(timer); }, 1000);
  }

  async function handleStep1(e: Event) {
    e.preventDefault();
    loading = true;
    await new Promise(r => setTimeout(r, 700));
    loading = false;
    step = 2;
    startCountdown();
    ui.toast('OTP sent to your mobile!', 'success');
  }

  async function verifyOTP(val: string) {
    if (val.length !== 6) return;
    loading = true;
    await new Promise(r => setTimeout(r, 600));
    auth.login(
      { id: 'js1', name, email, mobile, role: 'jobseeker', verified: true, createdAt: new Date().toISOString() },
      'mock-js-token'
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
      <p class="text-slate-500 text-sm mt-1">
        {step === 1 ? 'Your details' : `Verify mobile ${mobile}`}
      </p>
    </div>

    <div class="flex items-center gap-3 mb-6">
      {#each [1,2] as s}
        <div class="flex items-center gap-2 flex-1">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold {step >= s ? 'gradient-brand text-white' : 'bg-slate-100 text-slate-400'}">{s}</div>
          <span class="text-xs font-medium {step >= s ? 'text-brand-blue' : 'text-slate-400'}">{s === 1 ? 'Your Details' : 'Verify OTP'}</span>
        </div>
        {#if s < 2}<div class="w-8 h-px bg-slate-200"></div>{/if}
      {/each}
    </div>

    <div class="bg-white rounded-2xl card-shadow p-6">
      {#if step === 1}
        <form class="space-y-4" onsubmit={handleStep1}>
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
            Send OTP & Continue
          </button>
        </form>
        <p class="text-center text-sm text-slate-500 mt-4">
          Already have an account? <a href="/auth/login" class="text-brand-blue font-semibold hover:underline">Login</a>
        </p>
      {:else}
        <p class="text-center text-sm text-slate-600 mb-6">Enter the OTP sent to <span class="font-semibold">{mobile}</span></p>
        <OTPInput bind:value={otp} onComplete={verifyOTP} />
        {#if loading}<p class="text-center text-sm text-slate-500 mt-4">Verifying…</p>{/if}
        <div class="text-center mt-4">
          {#if countdown > 0}
            <p class="text-sm text-slate-400">Resend in {countdown}s</p>
          {:else}
            <button onclick={() => step = 1} class="text-sm text-brand-blue font-semibold hover:underline">Resend OTP</button>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>
