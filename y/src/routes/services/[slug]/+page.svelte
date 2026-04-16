<script lang="ts">
  import type { PageData } from './$types';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { ArrowLeft, CheckCircle, Users } from 'lucide-svelte';
  import { services } from '$lib/data/services.ts';

  let { data }: { data: PageData } = $props();
  const { svc } = data;

  const related = services.filter(s => s.category === svc.category && s.id !== svc.id).slice(0, 3);
</script>

<svelte:head>
  <title>{svc.title} – RSQuare HR Solutions</title>
</svelte:head>

<div class="gradient-hero text-white py-14">
  <div class="container-wide">
    <a href="/services" class="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white mb-6 transition-colors">
      <ArrowLeft class="w-4 h-4" /> All Services
    </a>
    <Badge variant="teal">{svc.category}</Badge>
    <h1 class="text-3xl sm:text-4xl font-black text-white mt-3 mb-3 max-w-2xl">{svc.title}</h1>
    <p class="text-blue-200 text-lg max-w-xl">{svc.shortDesc}</p>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide grid lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2 space-y-6">
      <Card padding="lg">
        <h2 class="text-xl font-black mb-4">Overview</h2>
        <p class="text-slate-600 leading-relaxed">{svc.longDesc}</p>
      </Card>

      <Card padding="lg">
        <h2 class="text-xl font-black mb-4">What's Included</h2>
        <ul class="space-y-3">
          {#each svc.features as feature}
            <li class="flex items-start gap-3">
              <CheckCircle class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span class="text-slate-700">{feature}</span>
            </li>
          {/each}
        </ul>
      </Card>
    </div>

    <div class="space-y-5">
      <Card padding="md">
        <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Users class="w-4 h-4 text-brand-blue" /> Who Is This For?
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each svc.targetAudience as aud}
            <Badge variant="blue" size="sm">{aud}</Badge>
          {/each}
        </div>
      </Card>

      <Card padding="md" class="bg-gradient-to-br from-brand-blue to-brand-teal text-white">
        <h3 class="font-bold text-white mb-2">Interested in this service?</h3>
        <p class="text-sm text-blue-100 mb-4">Speak with our experts — free consultation, no obligations.</p>
        <a href="/contact?service={svc.slug}" class="w-full bg-white text-brand-blue font-bold py-2.5 rounded-xl text-sm text-center block hover:bg-blue-50 transition-colors">
          Get Free Consultation
        </a>
      </Card>

      {#if related.length}
        <Card padding="md">
          <h3 class="font-bold text-slate-900 mb-3">Related Services</h3>
          <ul class="space-y-2">
            {#each related as r}
              <li>
                <a href="/services/{r.slug}" class="text-sm text-brand-blue hover:underline font-medium">{r.title}</a>
              </li>
            {/each}
          </ul>
        </Card>
      {/if}
    </div>
  </div>
</section>
