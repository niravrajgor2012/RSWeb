<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import OTPInput from '$lib/components/ui/OTPInput.svelte';

  let step = $state<1|2>(1);
  let loading = $state(false);
  let countdown = $state(0);
  let timer: ReturnType<typeof setInterval>;

  let name = $state(''), contactPerson = $state(''), email = $state(''), mobile = $state('');
  let type = $state(''), city = $state(''), state_ = $state(''), password = $state('');
  let otp = $state('');

  const types = ['University','College','Polytechnic','ITI','School','Training Center'].map(t=>({label:t,value:t}));
  const cities = ['Ahmedabad','Mumbai','Pune','Delhi','Bengaluru','Hyderabad','Surat','Other'].map(c=>({label:c,value:c}));
  const states = ['Gujarat','Maharashtra','Delhi','Karnataka','Telangana','Tamil Nadu','Rajasthan'].map(s=>({label:s,value:s}));

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
    auth.login({ id:'inst1', name, email, mobile, role:'institute', verified:true, createdAt:new Date().toISOString() }, 'mock-inst-token');
    loading = false;
    ui.toast('Institute registered successfully!', 'success');
    goto('/institute/profile');
  }
</script>

<svelte:head><title>Institute Registration – RSQuare</title></svelte:head>

<div class="min-h-[80vh] bg-surface flex items-center justify-center py-12 px-4">
  <div class="w-full max-w-lg">
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-2 mb-5">
        <div class="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-black text-lg">R²</div>
        <span class="font-black text-brand-navy text-xl">RSQuare</span>
      </a>
      <h1 class="text-2xl font-black">Register Your Institute</h1>
    </div>
    <div class="bg-white rounded-2xl card-shadow p-6">
      {#if step === 1}
        <form class="space-y-4" onsubmit={handleStep1}>
          <Input label="Institute Name" placeholder="Gujarat University" bind:value={name} required />
          <div class="grid grid-cols-2 gap-4">
            <Input label="Contact Person" bind:value={contactPerson} required />
            <Select label="Institute Type" options={types} bind:value={type} required />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Input label="Mobile" type="tel" bind:value={mobile} required />
            <Input label="Email" type="email" bind:value={email} required />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Select label="City" options={cities} bind:value={city} required />
            <Select label="State" options={states} bind:value={state_} required />
          </div>
          <Input label="Password" type="password" bind:value={password} required />
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
