<script>
  import { clamp } from '../lib/validation.js';

  export let id;
  export let label;
  export let value;
  export let min;
  export let max;
  export let step = 1;
  export let unit = '';
  export let color = 'emerald'; // warna nilai yang ditampilkan
  export let tickMin = null;
  export let tickMid = null;
  export let tickMax = null;
  export let warning = null; // teks peringatan opsional
  export let warningThreshold = null; // nilai trigger peringatan
  export let displayValue = null; // override tampilan nilai jika perlu

  // Geser nilai satu step; dibulatkan ke jumlah desimal step supaya tidak muncul 0.8200000001
  function nudge(direction) {
    const decimals = (String(step).split('.')[1] ?? '').length;
    value = clamp(Number((value + direction * step).toFixed(decimals)), min, max);
  }

  const stepButtonClass = `w-8 h-8 shrink-0 rounded-lg border border-slate-200 bg-slate-50
    text-slate-600 font-bold leading-none hover:bg-emerald-50 hover:text-emerald-600
    disabled:opacity-40 disabled:pointer-events-none transition-colors
    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`;
</script>

<div class="flex flex-col gap-2">
  <div class="flex items-center justify-between">
    <label for={id} class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
    <span class="text-sm font-bold
      {warningThreshold !== null && value > warningThreshold ? 'text-amber-500' : `text-${color}-600`}">
      <span class="text-sm font-bold text-{color}-600">
        {displayValue !== null ? displayValue : `${value}${unit}`}
      </span>
    </span>
  </div>
  <div class="flex items-center gap-3">
    <button type="button" class={stepButtonClass} aria-label="{label} −"
      disabled={value <= min} on:click={() => nudge(-1)}>−</button>
    <input {id} type="range" bind:value {min} {max} {step}
      class="w-full h-2 rounded-full appearance-none cursor-pointer
             bg-slate-200 accent-emerald-500" />
    <button type="button" class={stepButtonClass} aria-label="{label} +"
      disabled={value >= max} on:click={() => nudge(1)}>+</button>
  </div>
  {#if tickMin !== null || tickMid !== null || tickMax !== null}
    <!-- px-11 = lebar tombol (w-8) + gap (gap-3), supaya tick sejajar dengan slider -->
    <div class="flex justify-between text-xs text-slate-400 px-11">
      <span>{tickMin ?? min}{unit}</span>
      {#if tickMid !== null}<span>{tickMid}{unit}</span>{/if}
      <span>{tickMax ?? max}{unit}</span>
    </div>
  {/if}
  {#if warning && warningThreshold !== null && value > warningThreshold}
    <div class="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
      <p class="text-xs text-amber-700">{warning}</p>
    </div>
  {/if}
  <slot />
</div>