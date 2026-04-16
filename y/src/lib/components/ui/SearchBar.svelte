<script lang="ts">
  import { Search, X } from 'lucide-svelte';

  interface Props {
    value?: string;
    placeholder?: string;
    onSearch?: (q: string) => void;
    class?: string;
  }
  let { value = $bindable(''), placeholder = 'Search...', onSearch, class: cls = '' }: Props = $props();

  let timeout: ReturnType<typeof setTimeout>;
  function handleInput() {
    clearTimeout(timeout);
    timeout = setTimeout(() => onSearch?.(value), 300);
  }
</script>

<div class="relative {cls}">
  <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
  <input
    type="search" bind:value {placeholder} oninput={handleInput}
    class="input-base pl-10 pr-9"
  />
  {#if value}
    <button onclick={() => { value = ''; onSearch?.(''); }} class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
      <X class="w-4 h-4" />
    </button>
  {/if}
</div>
