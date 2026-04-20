<script lang="ts">
  import type { SelectOption } from '$lib/types/common.ts';
  import { ChevronDown } from 'lucide-svelte';

  interface Props {
    label?: string;
    options: SelectOption[];
    value?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    name?: string;
    error?: string;
    onchange?: (value: string) => void;
  }
  let { label, options, value = $bindable(''), placeholder = 'Select...', required, disabled, name, error, onchange }: Props = $props();

  const id = label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString(36).slice(2);
</script>

<div class="flex flex-col gap-1">
  {#if label}
    <label for={id} class="text-sm font-medium text-slate-700">
      {label}{#if required}<span class="text-red-500 ml-0.5">*</span>{/if}
    </label>
  {/if}
  <div class="relative">
    <select
      {id} {name} bind:value {required} {disabled}
      onchange={(e) => onchange?.((e.target as HTMLSelectElement).value)}
      class="input-base appearance-none pr-10 {error ? 'input-error' : ''}"
    >
      {#if placeholder}<option value="" disabled selected={!value}>{placeholder}</option>{/if}
      {#each options as opt}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
    <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
  </div>
  {#if error}<p class="text-xs text-red-500">{error}</p>{/if}
</div>
