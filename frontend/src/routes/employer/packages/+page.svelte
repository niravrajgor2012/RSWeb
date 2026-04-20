<script lang="ts">
  import { recruitmentPackages, consultantMemberships } from '$lib/data/packages.ts';
  import { CheckCircle, Star, Phone } from 'lucide-svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Tabs from '$lib/components/ui/Tabs.svelte';

  const tabs = [
    { label: 'Recruitment Packages', value: 'recruitment' },
    { label: 'Consultant Membership', value: 'consultant' },
  ];
</script>

<svelte:head>
  <title>Packages & Plans – RSQuare Employer</title>
</svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <h1 class="text-4xl font-black text-white mb-3">Plans for Every Employer</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto">Start free, upgrade when you need more. No hidden fees.</p>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide max-w-5xl">
    <Tabs {tabs}>
      {#snippet children(active)}
        {#if active === 'recruitment'}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {#each recruitmentPackages as pkg}
              <Card padding="lg" class="flex flex-col gap-5 relative {pkg.isPopular ? 'border-2 border-brand-blue' : ''}">
                {#if pkg.isPopular}
                  <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star class="w-3 h-3" /> Most Popular
                  </div>
                {/if}
                <div>
                  <h3 class="font-black text-xl text-slate-900">{pkg.name}</h3>
                  {#if pkg.isCustom}
                    <p class="text-3xl font-black text-brand-blue mt-2">Custom</p>
                    <p class="text-xs text-slate-400 mt-1">Contact us for pricing</p>
                  {:else}
                    <p class="text-3xl font-black text-brand-blue mt-2">
                      {pkg.price === 0 ? 'Free' : `₹${pkg.price.toLocaleString('en-IN')}`}
                    </p>
                    {#if pkg.price > 0}<p class="text-xs text-slate-400 mt-1">+ GST / {pkg.validityDays} days</p>{/if}
                  {/if}
                </div>
                <ul class="space-y-2 flex-1">
                  {#each pkg.features as f}
                    <li class="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle class="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {f}
                    </li>
                  {/each}
                </ul>
                {#if pkg.isCustom}
                  <a href="/contact" class="btn-outline text-sm justify-center w-full flex">
                    <Phone class="w-4 h-4" /> Contact Sales
                  </a>
                {:else}
                  <button class="btn-{pkg.isPopular ? 'primary' : 'outline'} text-sm justify-center w-full flex">
                    {pkg.price === 0 ? 'Start Free' : 'Buy Now'}
                  </button>
                {/if}
              </Card>
            {/each}
          </div>

        {:else}
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {#each consultantMemberships as plan}
              <Card padding="lg" class="flex flex-col gap-5 {plan.isPopular ? 'border-2 border-brand-teal' : ''}">
                {#if plan.isPopular}
                  <div class="text-xs font-bold text-brand-teal mb-1">⭐ Most Popular</div>
                {/if}
                <div>
                  <h3 class="font-black text-xl text-slate-900">{plan.name}</h3>
                  <p class="text-3xl font-black text-brand-teal mt-2">₹{plan.price.toLocaleString('en-IN')}</p>
                  <p class="text-xs text-slate-400 mt-1">+ GST / {plan.validityDays} days</p>
                </div>
                <ul class="space-y-2 flex-1">
                  {#each plan.features as f}
                    <li class="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle class="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {f}
                    </li>
                  {/each}
                </ul>
                <button class="btn-{plan.isPopular ? 'teal' : 'outline'} text-sm justify-center w-full flex">Buy Plan</button>
              </Card>
            {/each}
          </div>
        {/if}
      {/snippet}
    </Tabs>
  </div>
</section>
