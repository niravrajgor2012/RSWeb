<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { onMount } from 'svelte';

  onMount(() => {
    auth.logout();
    ui.toast('You have been logged out.', 'info');
    goto('/');
  });
</script>

<div class="min-h-[50vh] flex items-center justify-center">
  <p class="text-slate-500">Logging out…</p>
</div>
