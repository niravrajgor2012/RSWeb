<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  interface Props {
    page: number;
    total: number;
    perPage?: number;
    onchange: (page: number) => void;
  }
  let { page, total, perPage = 10, onchange }: Props = $props();

  const totalPages = $derived(Math.ceil(total / perPage));
  const pages = $derived(Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1;
    if (page <= 4) return i + 1;
    if (page >= totalPages - 3) return totalPages - 6 + i;
    return page - 3 + i;
  }));
</script>

{#if totalPages > 1}
  <div class="flex items-center justify-center gap-1">
    <button
      onclick={() => onchange(page - 1)} disabled={page === 1}
      class="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
    ><ChevronLeft class="w-4 h-4" /></button>

    {#each pages as p}
      <button
        onclick={() => onchange(p)}
        class="w-9 h-9 rounded-lg text-sm font-medium border transition-colors {p === page ? 'bg-brand-blue text-white border-brand-blue' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}"
      >{p}</button>
    {/each}

    <button
      onclick={() => onchange(page + 1)} disabled={page === totalPages}
      class="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
    ><ChevronRight class="w-4 h-4" /></button>
  </div>
{/if}
