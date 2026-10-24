<script>
  import ProgressBar from './ProgressBar.svelte';
  import { calcTime } from '../lib/calc.js';
  import { EV_PRESETS } from '../lib/constants.js';
  import RangeInfo from './RangeInfo.svelte';
  import BBMCompare from './BBMCompare.svelte';
  import EnergyInfo from './EnergyInfo.svelte';
  import CostBreakdown from './CostBreakdown.svelte';
  import BatteryFinalBox from './BatteryFinalBox.svelte';
  import NumberInput from './NumberInput.svelte';

  export let batteryCapacity, currentBattery, chargerPower, tariffPerKwh;
  export let availableHours, availableMinutes;
  export let availableHoursError, availableMinutesError, timeError;
  export let sharedValid;
  export let pbjt_rate;
  export let selectedEV = 'custom';
  export let efficiency;
  export let T;
  export let onResult = null;

  $: result = calcTime({ batteryCapacity, currentBattery, chargerPower, availableHours, availableMinutes, tariffPerKwh, pbjt_rate, efficiency });
  $: batteryFull = sharedValid && currentBattery >= 100;
  $: showResult = sharedValid && !batteryFull && !timeError && !availableHoursError && !availableMinutesError && (availableHours > 0 || availableMinutes > 0);
  $: evPreset = selectedEV !== 'custom' ? EV_PRESETS.find(p => p.label === selectedEV) : null;

  $: timeLabel = result
    ? ((result.actualHours > 0 ? `${result.actualHours} ${T.jamUnit}` : '') +
      (result.actualMinutes > 0 ? ` ${result.actualMinutes} ${T.menitUnit}` : '')).trim() || T.lessThanOneMinute
    : '';

  // Apakah pengisian selesai sebelum waktu tersedia habis
  $: chargeComplete = result &&
    result.actualHours * 60 + result.actualMinutes < availableHours * 60 + availableMinutes;

  // Kirim null saat hasil tidak valid supaya data sesi lama tidak ikut tersimpan
  $: if (onResult) {
    onResult(showResult ? {
      energyFromGrid: result.energyFromGrid,
      cost: result.totalCost,
      batteryEnd: result.finalBattery,
    } : null);
  }
</script>

<div class="flex flex-col gap-1">
  <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{T.chargingTimeLabel}</p>
  <div class="flex gap-3">
    <NumberInput
      id="availableHours"
      label=""
      bind:value={availableHours}
      min={0} max={24} unit={T.jamUnit}
      error={availableHoursError}
    />
    <NumberInput
      id="availableMinutes"
      label=""
      bind:value={availableMinutes}
      min={0} max={59} unit={T.menitUnit}
      error={availableMinutesError}
    />
  </div>
  {#if timeError}<p class="text-xs text-red-500 mt-0.5">{timeError}</p>{/if}
  {#if batteryFull}<p class="text-xs text-red-500 mt-0.5">{T.errorBatteryFull}</p>{/if}
</div>

<ProgressBar mode="time" {currentBattery} finalBattery={result.finalBattery} batteryGained={result.batteryGained} {T} />

{#if showResult}
  <div class="space-y-3 pt-2 border-t border-slate-100">

    <EnergyInfo
      {T}
      energyFromGrid={result.energyFromGrid}
      energyToBattery={result.energyToBattery}
      {efficiency}
    />

    <BatteryFinalBox {T} finalBattery={result.finalBattery} />

    <RangeInfo
      {T} {evPreset}
      batteryStart={currentBattery}
      batteryEnd={result.finalBattery}
    />

    <!-- Notifikasi selesai lebih cepat -->
    {#if chargeComplete}
      <div class="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
        </svg>
        <p class="text-xs text-emerald-700">{T.chargeCompleteMsg(timeLabel)}</p>
      </div>
    {/if}

    <CostBreakdown
      {T}
      energyFromGrid={result.energyFromGrid}
      {tariffPerKwh}
      energyCost={result.energyCost}
      pbjt={result.pbjt}
      {pbjt_rate}
      totalCost={result.totalCost}
    />

    <BBMCompare
      {T} {evPreset}
      batteryStart={currentBattery}
      batteryEnd={result.finalBattery}
      totalCost={result.totalCost}
    />

  </div>
{/if}