<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'teal';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    href?: string;
    class?: string;
    onclick?: () => void;
    children: Snippet;
  }
  let {
    variant = 'primary', size = 'md', type = 'button',
    disabled = false, loading = false, href, class: cls = '',
    onclick, children
  }: Props = $props();

  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg border transition-all duration-150 cursor-pointer whitespace-nowrap';
  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-brand-blue to-brand-teal text-white border-transparent hover:opacity-90 hover:-translate-y-px active:translate-y-0',
    outline: 'bg-transparent text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white',
    ghost:   'bg-transparent text-slate-600 border-transparent hover:bg-slate-100 hover:text-slate-900',
    danger:  'bg-red-600 text-white border-transparent hover:bg-red-700',
    teal:    'bg-brand-teal text-white border-transparent hover:bg-cyan-700'
  };
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base'
  };
</script>

{#if href}
  <a {href} class="{base} {variants[variant]} {sizes[size]} {cls} {disabled ? 'opacity-50 pointer-events-none' : ''}">
    {#if loading}<span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>{/if}
    {@render children()}
  </a>
{:else}
  <button {type} {disabled} class="{base} {variants[variant]} {sizes[size]} {cls} {disabled || loading ? 'opacity-60 pointer-events-none' : ''}" {onclick}>
    {#if loading}<span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>{/if}
    {@render children()}
  </button>
{/if}
