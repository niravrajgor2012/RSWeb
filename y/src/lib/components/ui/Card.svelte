<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    class?: string;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg' | 'none';
    children: Snippet;
  }
  let { class: cls = '', hover = false, padding = 'md', children }: Props = $props();
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
</script>

<div class="bg-white rounded-xl border border-slate-100 card-shadow {paddings[padding]} {hover ? 'transition-shadow duration-200 hover:card-shadow-hover hover:-translate-y-0.5' : ''} {cls}">
  {@render children()}
</div>
