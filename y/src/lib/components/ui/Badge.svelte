<script lang="ts">
  interface Props {
    variant?: 'blue' | 'teal' | 'green' | 'orange' | 'red' | 'gray' | 'navy';
    size?: 'sm' | 'md';
    children: import('svelte').Snippet;
  }
  let { variant = 'blue', size = 'md', children }: Props = $props();

  const colors: Record<string, string> = {
    blue:   'bg-blue-100 text-blue-700',
    teal:   'bg-cyan-100 text-cyan-700',
    green:  'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    red:    'bg-red-100 text-red-700',
    gray:   'bg-slate-100 text-slate-600',
    navy:   'bg-blue-900/10 text-blue-900'
  };
  const sizes: Record<string, string> = { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-xs' };
</script>

<span class="inline-flex items-center font-medium rounded-full {colors[variant]} {sizes[size]}">
  {@render children()}
</span>
