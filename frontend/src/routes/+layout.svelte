<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Toast from '$lib/components/ui/Toast.svelte';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => auth.hydrate());
</script>

<div class="flex flex-col min-h-screen">
  <Navbar />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
<Toast />
