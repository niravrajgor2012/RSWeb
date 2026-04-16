<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import FileUpload from '$lib/components/ui/FileUpload.svelte';
  import OTPInput from '$lib/components/ui/OTPInput.svelte';

  let step = $state<1|2>(1);
  let loading = $state(false);
  let countdown = $state(0);
  let timer: ReturnType<typeof setInterval>;

  let name = $state(''), email = $state(''), mobile = $state('');
  let institute = $state(''), course = $state(''), year = $state('');
  let cvFile = $state<File | null>(null);
  let otp = $state('');

  const years = ['1st Year','2nd Year','3rd Year','Final Year','Pass-Out 2025','Pass-Out 2026'].map(y=>({label:y,value:y}));

  async function handleStep1(e: Event) {
    e.preventDefault(); loading = true;
    await new Promise(r => setTimeout(r, 700));
    loading = false; step = 2;
    countdown = 60; clearInterval(timer);
    timer = setInterval(() => { if (--countdown <= 0) clearInterval(timer); }, 1000);
    ui.toast('OTP sent!', 'success');
  }

  async function verifyOTP(val: string) {
    if (val.length !== 6) return; loading = true;
    await new Promise(r => setTimeout(r, 600));
    auth.login({ id:'stu1', name, email, mobile, role:'student', verified:true, createdAt:new Date().toISOString() }, 'mock-stu-token');
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
      {#if step === 1}
        <form class="space-y-4" onsubmit={handleStep1}>
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
            Send OTP & Register
          </button>
        </form>
      {:else}
        <p class="text-center text-sm text-slate-600 mb-6">OTP sent to <span class="font-semibold">{mobile}</span></p>
        <OTPInput bind:value={otp} onComplete={verifyOTP} />
        {#if loading}<p class="text-center text-sm text-slate-500 mt-4">Verifying…</p>{/if}
      {/if}
    </div>
  </div>
</div>
