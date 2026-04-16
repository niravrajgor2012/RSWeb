<script lang="ts">
  import { Upload, FileText, X } from 'lucide-svelte';

  interface Props {
    label?: string;
    accept?: string;
    maxMb?: number;
    file?: File | null;
    error?: string;
    hint?: string;
  }
  let { label = 'Upload File', accept = '*', maxMb = 5, file = $bindable(null), error = $bindable(''), hint }: Props = $props();

  let dragging = $state(false);

  function handleFiles(fileList: FileList | null) {
    const f = fileList?.[0];
    if (!f) return;
    if (f.size > maxMb * 1024 * 1024) { error = `File must be under ${maxMb}MB`; return; }
    error = '';
    file = f;
  }
</script>

<div class="flex flex-col gap-1">
  {#if label}<p class="text-sm font-medium text-slate-700">{label}</p>{/if}

  {#if file}
    <div class="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
      <FileText class="w-5 h-5 text-brand-blue shrink-0" />
      <span class="text-sm text-slate-700 flex-1 truncate">{file.name}</span>
      <button onclick={() => file = null} class="text-slate-400 hover:text-red-500"><X class="w-4 h-4" /></button>
    </div>
  {:else}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div
      class="relative border-2 border-dashed rounded-xl p-8 text-center transition-colors {dragging ? 'border-brand-blue bg-blue-50' : 'border-slate-200 hover:border-brand-blue/50 hover:bg-slate-50'} {error ? 'border-red-300' : ''}"
      ondragover={(e) => { e.preventDefault(); dragging = true; }}
      ondragleave={() => dragging = false}
      ondrop={(e) => { e.preventDefault(); dragging = false; handleFiles(e.dataTransfer?.files ?? null); }}
      onclick={() => document.getElementById('file-input-hidden')?.click()}
    >
      <input id="file-input-hidden" type="file" {accept} class="hidden" onchange={(e) => handleFiles((e.target as HTMLInputElement).files)} />
      <Upload class="w-8 h-8 mx-auto mb-2 text-slate-400" />
      <p class="text-sm font-medium text-slate-700">Drag & drop or <span class="text-brand-blue">browse</span></p>
      {#if hint}<p class="text-xs text-slate-500 mt-1">{hint}</p>{/if}
      <p class="text-xs text-slate-400 mt-1">Max {maxMb}MB</p>
    </div>
  {/if}
  {#if error}<p class="text-xs text-red-500">{error}</p>{/if}
</div>
