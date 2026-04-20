<script lang="ts">
  import type { Snippet } from 'svelte';
  import { X } from 'lucide-svelte';

  interface Props {
    open: boolean;
    title?: string;
    onclose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children: Snippet;
  }
  let { open, title, onclose, size = 'md', children }: Props = $props();
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" role="button" tabindex="-1" onclick={onclose}></div>
    <div class="relative bg-white rounded-2xl card-shadow w-full {sizes[size]} max-h-[90vh] overflow-y-auto">
      {#if title}
        <div class="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 class="text-lg font-bold text-slate-900">{title}</h3>
          <button onclick={onclose} class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>
      {/if}
      <div class="p-6">
        {@render children()}
      </div>
    </div>
  </div>
{/if}
