<script lang="ts">
  interface Props {
    value?: string;
    length?: number;
    onComplete?: (otp: string) => void;
    error?: string;
  }
  let { value = $bindable(''), length = 6, onComplete, error }: Props = $props();

  let boxes = $state<string[]>(Array(length).fill(''));
  let refs: HTMLInputElement[] = [];

  function handleInput(i: number, e: Event) {
    const input = e.target as HTMLInputElement;
    const char = input.value.replace(/\D/g, '').slice(-1);
    boxes[i] = char;
    value = boxes.join('');
    if (char && i < length - 1) refs[i + 1]?.focus();
    if (value.length === length) onComplete?.(value);
  }

  function handleKeydown(i: number, e: KeyboardEvent) {
    if (e.key === 'Backspace' && !boxes[i] && i > 0) refs[i - 1]?.focus();
  }

  function handlePaste(e: ClipboardEvent) {
    const text = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, length) ?? '';
    boxes = [...text.padEnd(length, '').split('').slice(0, length)];
    value = boxes.join('');
    if (value.length === length) { refs[length - 1]?.focus(); onComplete?.(value); }
  }
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 justify-center">
    {#each boxes as _, i}
      <input
        bind:this={refs[i]}
        type="text" inputmode="numeric" maxlength="1" value={boxes[i]}
        oninput={(e) => handleInput(i, e)}
        onkeydown={(e) => handleKeydown(i, e)}
        onpaste={handlePaste}
        class="w-12 h-12 text-center text-xl font-bold rounded-xl border-2 transition-colors outline-none {error ? 'border-red-400' : 'border-slate-200 focus:border-brand-blue'}"
      />
    {/each}
  </div>
  {#if error}<p class="text-xs text-red-500 text-center">{error}</p>{/if}
</div>
