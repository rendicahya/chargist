<script>
  export let text = '';
  let visible = false;
</script>

<div class="relative inline-flex items-center">
  <!-- Ikon tanda tanya (button supaya bisa difokus lewat keyboard) -->
  <button type="button" aria-label={text}
    class="w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold
           flex items-center justify-center cursor-default select-none
           hover:bg-emerald-100 hover:text-emerald-600 transition-colors
           focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
    on:mouseenter={() => visible = true}
    on:mouseleave={() => visible = false}
    on:focus={() => visible = true}
    on:blur={() => visible = false}
  >
    ?
  </button>

  <!-- Tooltip bubble -->
  {#if visible}
    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
                w-48 bg-slate-800 text-white text-xs rounded-xl px-3 py-2
                shadow-lg leading-relaxed pointer-events-none"
      aria-hidden="true">
      {text}
      <!-- Panah bawah -->
      <div class="absolute top-full left-1/2 -translate-x-1/2
                  border-4 border-transparent border-t-slate-800"></div>
    </div>
  {/if}
</div>
