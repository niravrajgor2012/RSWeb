<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    name?: string;
    id?: string;
    icon?: Snippet;
    hint?: string;
    onchange?: (e: Event) => void;
    oninput?: (e: Event) => void;
    class?: string;
  }

  let {
    label, type = 'text', placeholder, value = $bindable(''),
    error, required, disabled, name, id, icon, hint, onchange, oninput, class: cls = ''
  }: Props = $props();

  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString(36).slice(2));
</script>

<div class="flex flex-col gap-1 {cls}">
  {#if label}
    <label for={inputId} class="text-sm font-medium text-slate-700">
      {label}{#if required}<span class="text-red-500 ml-0.5">*</span>{/if}
    </label>
  {/if}
  <div class="relative">
    {#if icon}
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4">
        {@render icon()}
      </span>
    {/if}
    <input
      {type} id={inputId} {name} bind:value {placeholder} {required} {disabled}
      {onchange} {oninput}
      class="input-base {icon ? 'pl-9' : ''} {error ? 'input-error' : ''}"
    />
  </div>
  {#if error}<p class="text-xs text-red-500">{error}</p>{/if}
  {#if hint && !error}<p class="text-xs text-slate-500">{hint}</p>{/if}
</div>
