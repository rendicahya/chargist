<script>
  import { formatRupiah } from '../lib/calc.js';

  export let T;
  export let energyFromGrid;   // kWh dari PLN
  export let energyToBattery;  // kWh masuk baterai
  export let efficiency;       // 0.60–0.95
  export let capped = false;   // energi ke baterai dibatasi sisa kapasitas, jadi rumus tidak berlaku
</script>

<div class="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-4 space-y-3">
  <div class="flex items-center gap-2">
    <div class="bg-emerald-100 text-emerald-600 rounded-lg p-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </div>
    <p class="text-sm font-semibold text-slate-700">{T.energyLabel}</p>
  </div>

  <div class="grid grid-cols-2 gap-2 text-center">
    <div class="flex justify-between items-center bg-white rounded-lg px-3 py-2 border border-emerald-100">
      <div>
        <p class="text-xs text-slate-400">{T.energyFromGrid}</p>
        {#if !capped}<p class="text-xs text-slate-400">{energyToBattery.toFixed(2)} kWh ÷ {Math.round(efficiency * 100)}%</p>{/if}
      </div>
      <p class="text-base font-bold text-slate-800">{energyFromGrid.toFixed(2)} <span class="text-xs font-normal text-slate-500">kWh</span></p>
    </div>
    <div class="flex justify-between items-center bg-white rounded-lg px-3 py-2 border border-emerald-100">
      <div>
        <p class="text-xs text-slate-400">{T.energyToBattery}</p>
        {#if !capped}<p class="text-xs text-slate-400">{energyFromGrid.toFixed(2)} kWh × {Math.round(efficiency * 100)}%</p>{/if}
      </div>
      <p class="text-base font-bold text-violet-800">{energyToBattery.toFixed(2)} <span class="text-xs font-normal text-violet-500">kWh</span></p>
    </div>
  </div>
</div>