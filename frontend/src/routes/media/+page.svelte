<script lang="ts">
  import { announcements, newsItems, photos, videos } from '$lib/data/media.ts';
  import Tabs from '$lib/components/ui/Tabs.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { Megaphone, Newspaper, Image, Play, Pin, ExternalLink, Calendar } from 'lucide-svelte';

  const tabs = [
    { label: 'Announcements', value: 'announcements' },
    { label: 'News',          value: 'news' },
    { label: 'Photographs',   value: 'photos' },
    { label: 'Videos',        value: 'videos' },
  ];

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }
</script>

<svelte:head><title>Media – RSQuare HR Solutions</title></svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <h1 class="text-4xl sm:text-5xl font-black text-white mb-3">Media &amp; Updates</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto">Announcements, news, event photos, and videos from RSQuare.</p>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide max-w-4xl">
    <Tabs {tabs}>
      {#snippet children(active)}
        {#if active === 'announcements'}
          <div class="space-y-4">
            {#each announcements as a}
              <Card padding="md" class="flex gap-4 {a.isPinned ? 'border-l-4 border-l-brand-blue' : ''}">
                <div class="w-10 h-10 rounded-xl {a.isPinned ? 'gradient-brand' : 'bg-slate-100'} flex items-center justify-center shrink-0">
                  {#if a.isPinned}
                    <Pin class="w-5 h-5 text-white" />
                  {:else}
                    <Megaphone class="w-5 h-5 text-slate-500" />
                  {/if}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap mb-1">
                    <h3 class="font-bold text-slate-900">{a.title}</h3>
                    {#if a.isPinned}<Badge variant="blue" size="sm">Pinned</Badge>{/if}
                  </div>
                  <p class="text-sm text-slate-600 leading-relaxed mb-2">{a.body}</p>
                  <div class="flex items-center gap-3">
                    <span class="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar class="w-3 h-3" />{formatDate(a.publishedAt)}
                    </span>
                    {#each a.tags as tag}
                      <Badge variant="gray" size="sm">{tag}</Badge>
                    {/each}
                  </div>
                </div>
              </Card>
            {/each}
          </div>

        {:else if active === 'news'}
          <div class="space-y-4">
            {#each newsItems as item}
              <Card hover padding="md" class="flex gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Newspaper class="w-5 h-5 text-slate-500" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-slate-900 mb-1 leading-snug">{item.headline}</h3>
                  <p class="text-sm text-slate-500 leading-relaxed mb-2">{item.summary}</p>
                  <div class="flex items-center gap-3">
                    <span class="text-xs text-slate-400">{formatDate(item.publishedAt)}</span>
                    <Badge variant="gray" size="sm">{item.source}</Badge>
                    <a href={item.url} class="text-xs text-brand-blue font-semibold flex items-center gap-1 hover:underline ml-auto">
                      Read More <ExternalLink class="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Card>
            {/each}
          </div>

        {:else if active === 'photos'}
          <div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {#each photos as p}
                <div class="group relative bg-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-brand-blue transition-all">
                  <div class="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Image class="w-8 h-8 text-slate-400" />
                    <p class="text-xs text-slate-400 text-center px-2">{p.caption}</p>
                  </div>
                  <div class="absolute inset-0 bg-brand-navy/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div class="p-3 w-full">
                      <p class="text-xs text-white font-medium">{p.caption}</p>
                      <p class="text-[10px] text-blue-300">{formatDate(p.takenAt)}</p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
            <p class="text-center text-sm text-slate-400 mt-6">More photos coming soon. Follow us on Instagram!</p>
          </div>

        {:else if active === 'videos'}
          <div class="grid sm:grid-cols-2 gap-5">
            {#each videos as v}
              <Card hover padding="none" class="overflow-hidden">
                <div class="bg-slate-900 aspect-video flex items-center justify-center relative cursor-pointer group">
                  <div class="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Play class="w-6 h-6 text-white" />
                  </div>
                  <div class="absolute bottom-2 right-2">
                    <Badge variant="gray" size="sm">{v.category}</Badge>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold text-slate-900 text-sm mb-1">{v.title}</h3>
                  <p class="text-xs text-slate-500">{v.description}</p>
                  <p class="text-xs text-slate-400 mt-2">{formatDate(v.publishedAt)}</p>
                </div>
              </Card>
            {/each}
          </div>
        {/if}
      {/snippet}
    </Tabs>
  </div>
</section>
