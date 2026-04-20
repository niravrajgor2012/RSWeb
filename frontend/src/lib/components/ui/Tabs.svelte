<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Tab { label: string; value: string; icon?: unknown; }
  interface Props {
    tabs: Tab[];
    active?: string;
    onchange?: (value: string) => void;
    children: Snippet<[string]>;
  }
  let { tabs, active = $bindable(tabs[0]?.value ?? ''), onchange, children }: Props = $props();
</script>

<div>
  <div class="flex gap-1 border-b border-slate-200 overflow-x-auto scrollbar-hide">
    {#each tabs as tab}
      <button
        onclick={() => { active = tab.value; onchange?.(tab.value); }}
        class="px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors {active === tab.value ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-500 hover:text-slate-900'}"
      >
        {tab.label}
      </button>
    {/each}
  </div>
  <div class="pt-4">
    {@render children(active)}
  </div>
</div>
