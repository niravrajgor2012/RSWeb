<script lang="ts">
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-svelte';

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error:   'bg-red-50 border-red-200 text-red-800',
    info:    'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-orange-50 border-orange-200 text-orange-800'
  };
  const iconColors = {
    success: 'text-green-500', error: 'text-red-500',
    info: 'text-blue-500', warning: 'text-orange-500'
  };
</script>

<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
  {#each ui.toasts as toast (toast.id)}
    <div class="pointer-events-auto flex items-start gap-3 rounded-xl border p-4 card-shadow {colors[toast.type]}">
      {#if toast.type === 'success'}
        <CheckCircle class="w-5 h-5 shrink-0 mt-0.5 {iconColors.success}" />
      {:else if toast.type === 'error'}
        <AlertCircle class="w-5 h-5 shrink-0 mt-0.5 {iconColors.error}" />
      {:else if toast.type === 'warning'}
        <AlertTriangle class="w-5 h-5 shrink-0 mt-0.5 {iconColors.warning}" />
      {:else}
        <Info class="w-5 h-5 shrink-0 mt-0.5 {iconColors.info}" />
      {/if}
      <p class="flex-1 text-sm font-medium">{toast.message}</p>
      <button onclick={() => ui.closeToast(toast.id)} class="shrink-0 opacity-60 hover:opacity-100">
        <X class="w-4 h-4" />
      </button>
    </div>
  {/each}
</div>
