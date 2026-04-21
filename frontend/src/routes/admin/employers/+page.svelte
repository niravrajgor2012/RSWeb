<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.ts';

  type Employer = {
    id: string;
    company_name: string;
    company_type: string | null;
    city: string | null;
    state: string | null;
    verified: boolean;
    created_at: string;
    users: { name: string; email: string; mobile: string } | null;
  };

  let employers = $state<Employer[]>([]);
  let loading   = $state(true);
  let error     = $state('');
  let search    = $state('');

  onMount(async () => {
    const { data, error: err } = await supabase
      .from('employers')
      .select('id, company_name, company_type, city, state, verified, created_at, users(name, email, mobile)')
      .order('created_at', { ascending: false });

    if (err) error = err.message;
    else employers = (data ?? []) as Employer[];
    loading = false;
  });

  const filtered = $derived(
    search.trim()
      ? employers.filter(e =>
          e.company_name.toLowerCase().includes(search.toLowerCase()) ||
          e.users?.name.toLowerCase().includes(search.toLowerCase()) ||
          e.users?.email.toLowerCase().includes(search.toLowerCase()) ||
          e.users?.mobile?.includes(search)
        )
      : employers
  );
</script>

<svelte:head><title>Employers – Admin | RSQuare</title></svelte:head>

<div class="min-h-screen bg-surface py-10 px-4">
  <div class="max-w-7xl mx-auto">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-black text-brand-navy">Registered Employers</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          {#if !loading}{filtered.length} of {employers.length} records{/if}
        </p>
      </div>
      <input
        type="search"
        placeholder="Search by company, name, email, mobile…"
        bind:value={search}
        class="input-base w-72"
      />
    </div>

    <!-- Table -->
    {#if loading}
      <div class="flex justify-center py-20">
        <span class="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></span>
      </div>
    {:else if error}
      <div class="bg-red-50 text-red-600 rounded-xl p-6 text-center">{error}</div>
    {:else if filtered.length === 0}
      <div class="bg-white rounded-2xl card-shadow p-12 text-center text-slate-400">
        {search ? 'No results match your search.' : 'No employers registered yet.'}
      </div>
    {:else}
      <div class="bg-white rounded-2xl card-shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-left">
                <th class="px-4 py-3 font-semibold text-slate-600">#</th>
                <th class="px-4 py-3 font-semibold text-slate-600">Company</th>
                <th class="px-4 py-3 font-semibold text-slate-600">Type</th>
                <th class="px-4 py-3 font-semibold text-slate-600">Contact Person</th>
                <th class="px-4 py-3 font-semibold text-slate-600">Email</th>
                <th class="px-4 py-3 font-semibold text-slate-600">Mobile</th>
                <th class="px-4 py-3 font-semibold text-slate-600">City</th>
                <th class="px-4 py-3 font-semibold text-slate-600">Verified</th>
                <th class="px-4 py-3 font-semibold text-slate-600">Registered On</th>
              </tr>
            </thead>
            <tbody>
              {#each filtered as emp, i}
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td class="px-4 py-3 text-slate-400">{i + 1}</td>
                  <td class="px-4 py-3 font-semibold text-brand-navy">{emp.company_name}</td>
                  <td class="px-4 py-3 text-slate-600">{emp.company_type ?? '—'}</td>
                  <td class="px-4 py-3 text-slate-700">{emp.users?.name ?? '—'}</td>
                  <td class="px-4 py-3 text-slate-600">{emp.users?.email ?? '—'}</td>
                  <td class="px-4 py-3 text-slate-600">{emp.users?.mobile ?? '—'}</td>
                  <td class="px-4 py-3 text-slate-600">{emp.city ?? '—'}</td>
                  <td class="px-4 py-3">
                    {#if emp.verified}
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">✓ Yes</span>
                    {:else}
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">⏳ Pending</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 text-slate-500">
                    {new Date(emp.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </div>
</div>
