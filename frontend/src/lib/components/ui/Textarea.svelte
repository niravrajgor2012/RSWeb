<script lang="ts">
  interface Props {
    label?: string;
    placeholder?: string;
    value?: string;
    rows?: number;
    required?: boolean;
    name?: string;
    error?: string;
    maxlength?: number;
  }
  let { label, placeholder, value = $bindable(''), rows = 4, required, name, error, maxlength }: Props = $props();
  const id = label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random().toString(36).slice(2);
</script>

<div class="flex flex-col gap-1">
  {#if label}
    <label for={id} class="text-sm font-medium text-slate-700">
      {label}{#if required}<span class="text-red-500 ml-0.5">*</span>{/if}
    </label>
  {/if}
  <textarea
    {id} {name} bind:value {placeholder} {rows} {required} {maxlength}
    class="input-base resize-y min-h-[80px] {error ? 'input-error' : ''}"
  ></textarea>
  <div class="flex justify-between">
    {#if error}<p class="text-xs text-red-500">{error}</p>{:else}<span></span>{/if}
    {#if maxlength}<p class="text-xs text-slate-400">{value.length}/{maxlength}</p>{/if}
  </div>
</div>
