<script lang="ts">
  import { services, serviceCategories } from '$lib/data/services.ts';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { ArrowRight, Search } from 'lucide-svelte';
  import {
    Users, Brain, UserCheck, RefreshCw, FileText, GraduationCap,
    BookOpen, Settings, Wallet, Scale, ClipboardCheck, ShieldCheck,
    Lightbulb, TrendingUp, Eye, Heart, Gavel, MapPin, Leaf, Building2,
    Music, Monitor
  } from 'lucide-svelte';

  const iconMap: Record<string, unknown> = {
    Users, Brain, UserCheck, RefreshCw, FileText, GraduationCap,
    BookOpen, Settings, Wallet, Scale, ClipboardCheck, ShieldCheck,
    Lightbulb, TrendingUp, Eye, Heart, Gavel, MapPin, Leaf, Building2,
    Music, Monitor
  };

  const catColors: Record<string, string> = {
    'HR Solutions':          'blue',
    'Recruitment':           'teal',
    'Compliance & Legal':    'red',
    'Training & Development':'green',
    'Advisory':              'orange',
    'IT & Digital':          'navy',
    'Specialty':             'gray',
  };

  let activeCategory = $state('All');
  let searchQuery    = $state('');

  const filtered = $derived(services.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchQ   = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  }));

  const allCats = ['All', ...serviceCategories];
</script>

<svelte:head>
  <title>Our Services – RSQuare HR Solutions</title>
</svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <p class="text-brand-accent font-semibold uppercase tracking-widest text-sm mb-3">What We Offer</p>
    <h1 class="text-4xl sm:text-5xl font-black text-white mb-4">22 Specialised Services</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto">
      From HR strategy to IT consultancy — a complete ecosystem for every business need.
    </p>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide">
    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4 mb-8">
      <div class="relative flex-1 max-w-xs">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="search" placeholder="Search services..."
          bind:value={searchQuery}
          class="input-base pl-10"
        />
      </div>
      <div class="flex flex-wrap gap-2">
        {#each allCats as cat}
          <button
            onclick={() => activeCategory = cat}
            class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors {activeCategory === cat ? 'bg-brand-blue text-white border-brand-blue' : 'border-slate-200 text-slate-600 hover:border-brand-blue hover:text-brand-blue'}"
          >{cat}</button>
        {/each}
      </div>
    </div>

    <!-- Grid -->
    {#if filtered.length === 0}
      <p class="text-center text-slate-400 py-16">No services found. Try a different search or filter.</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {#each filtered as svc}
          {@const Icon = iconMap[svc.icon] as unknown}
          <a href="/services/{svc.slug}">
            <Card hover padding="md" class="h-full flex flex-col gap-4">
              <div class="flex items-start justify-between gap-3">
                <div class="w-11 h-11 rounded-xl bg-brand-light flex items-center justify-center shrink-0 text-brand-blue">
                  <!-- @ts-ignore -->
                  <svelte:component this={Icon} class="w-5 h-5" />
                </div>
                <Badge variant={catColors[svc.category] as 'blue' | 'teal' | 'red' | 'green' | 'orange' | 'navy' | 'gray'} size="sm">
                  {svc.category}
                </Badge>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-slate-900 text-sm leading-snug mb-2">{svc.title}</h3>
                <p class="text-xs text-slate-500 leading-relaxed">{svc.shortDesc}</p>
              </div>
              <div class="flex flex-wrap gap-1">
                {#each svc.features.slice(0, 3) as f}
                  <Badge variant="gray" size="sm">{f}</Badge>
                {/each}
              </div>
              <div class="flex items-center gap-1 text-brand-blue text-xs font-semibold group-hover:gap-2 pt-1 border-t border-slate-50">
                Learn More <ArrowRight class="w-3.5 h-3.5" />
              </div>
            </Card>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
