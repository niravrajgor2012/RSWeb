<script lang="ts">
  interface Props { size?: 'sm' | 'md' | 'lg'; color?: string; }
  let { size = 'md', color = 'border-brand-blue' }: Props = $props();
  const sizes = { sm: 'w-4 h-4 border-2', md: 'w-7 h-7 border-2', lg: 'w-10 h-10 border-[3px]' };
</script>

<span class="inline-block rounded-full animate-spin border-t-transparent {sizes[size]} {color}"></span>
