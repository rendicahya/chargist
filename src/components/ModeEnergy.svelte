<script>
  import { validateEnergy } from '../lib/validation.js';
  import ProgressBar from './ProgressBar.svelte';
  import { calcEnergy } from '../lib/calc.js';
  import { EV_PRESETS } from '../lib/constants.js';
  import RangeInfo from './RangeInfo.svelte';
  import BBMCompare from './BBMCompare.svelte';
  import EnergyInfo from './EnergyInfo.svelte';
  import CostBreakdown from './CostBreakdown.svelte';
  import BatteryFinalBox from './BatteryFinalBox.svelte';
  import ChargingTimeBox from './ChargingTimeBox.svelte';
  import NumberInput from './NumberInput.svelte';

  export let batteryCapacity, currentBattery, chargerPower, tariffPerKwh;
  export let energyKwh;
  export let sharedValid;
  export let pbjt_rate;
  export let selectedEV = 'custom';
  export let efficiency;
  export let T;
  export let onResult = null;

  $: energyError = validateEnergy({ energyKwh }, T);
  $: result = calcEnergy({ energyKwh, batteryCapacity, currentBattery, chargerPower, tariffPerKwh, pbjt_rate, efficiency });
  $: evPreset = selectedEV !== 'custom' ? EV_PRESETS.find(p => p.label === selectedEV) : null;
  $: batteryFull = sharedValid && currentBattery >= 100;
  $: showResult = sharedValid && !batteryFull && !energyError;

  $: timeLabel = ((result.chargingHours > 0 ? `${result.chargingHours} ${T.jamUnit}` : '') +
    (result.chargingMinutes > 0 ? ` ${result.chargingMinutes} ${T.menitUnit}` : '')).trim() || T.lessThanOneMinute;

  // Kirim null saat hasil tidak valid supaya data sesi lama tidak ikut tersimpan
  $: if (onResult) {
    onResult(showResult ? {
      energyFromGrid: result.energyFromGrid,
      cost: result.totalCost,
      batteryEnd: result.finalBattery,
    } : null);
  }
</script>

<NumberInput
  id="energyKwh"
  label={T.energyKwhLabel}
  bind:value={energyKwh}
  min={0} max={9999} step={0.01} unit="kWh"
  error={energyError}
/>
{#if !energyError}
  <p class="text-xs text-slate-400 -mt-1">{T.energyKwhInfo}</p>
{/if}
{#if batteryFull}<p class="text-xs text-red-500 -mt-1">{T.errorBatteryFull}</p>{/if}

<ProgressBar
  mode="time"
  {currentBattery}
  finalBattery={showResult ? result.finalBattery : currentBattery}
  batteryGained={showResult ? result.batteryGained : 0}
  {T}
/>

{#if showResult}
  <div class="space-y-3 pt-2 border-t border-slate-100">

    {#if result.exceedsCapacity}
      <div class="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        </svg>
        <p class="text-xs text-amber-700">{T.warningEnergyOverCapacity}</p>
      </div>
    {/if}

    <EnergyInfo
      {T}
      energyFromGrid={result.energyFromGrid}
      energyToBattery={result.energyToBattery}
      {efficiency}
      capped={result.exceedsCapacity}
    />

    <RangeInfo
      {T} {evPreset}
      batteryStart={currentBattery}
      batteryEnd={result.finalBattery}
    />

    <BatteryFinalBox {T} finalBattery={result.finalBattery} />

    <ChargingTimeBox {T} {timeLabel} />

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
