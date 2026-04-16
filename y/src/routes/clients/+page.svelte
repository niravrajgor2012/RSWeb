<script lang="ts">
  import { clients } from '$lib/data/clients.ts';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { Building2 } from 'lucide-svelte';
</script>

<svelte:head><title>Our Clients – RSQuare HR Solutions</title></svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <h1 class="text-4xl sm:text-5xl font-black text-white mb-3">Our Clients</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto">
      Trusted by India's leading organisations across industries for over 30 years.
    </p>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {#each clients as client}
        <Card hover padding="md" class="text-center flex flex-col items-center gap-3">
          <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Building2 class="w-7 h-7 text-slate-400" />
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-sm">{client.name}</h3>
            <Badge variant="gray" size="sm" >{client.industry}</Badge>
          </div>
        </Card>
      {/each}
    </div>

    <div class="mt-14 text-center bg-gradient-to-r from-brand-light to-cyan-50 rounded-2xl p-10 border border-brand-accent/20">
      <p class="text-2xl font-black text-brand-navy mb-2">Join 350+ Satisfied Clients</p>
      <p class="text-slate-500 mb-6 max-w-md mx-auto">From Fortune 500 companies to fast-growing start-ups — RSQuare serves them all.</p>
      <a href="/contact" class="btn-primary text-base !py-3 !px-8">Get in Touch</a>
    </div>
  </div>
</section>
