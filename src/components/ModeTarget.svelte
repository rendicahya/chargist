<script>
  import ProgressBar from './ProgressBar.svelte';
  import { calcTarget } from '../lib/calc.js';
  import { EV_PRESETS } from '../lib/constants.js';
  import RangeInfo from './RangeInfo.svelte';
  import BBMCompare from './BBMCompare.svelte';
  import EnergyInfo from './EnergyInfo.svelte';
  import CostBreakdown from './CostBreakdown.svelte';
  import ChargingTimeBox from './ChargingTimeBox.svelte';
  import SliderInput from './SliderInput.svelte';

  export let batteryCapacity, currentBattery, chargerPower, tariffPerKwh;
  export let targetBattery, targetBatteryError;
  export let sharedValid;
  export let pbjt_rate;
  export let selectedEV = 'custom';
  export let efficiency;
  export let T;
  export let onResult = null;

  $: result = calcTarget({ batteryCapacity, currentBattery, targetBattery, chargerPower, tariffPerKwh, pbjt_rate, efficiency });
  $: showResult = sharedValid && !targetBatteryError && result.energyNeeded > 0;
  $: evPreset = selectedEV !== 'custom' ? EV_PRESETS.find(p => p.label === selectedEV) : null;

  $: timeLabel = (() => {
    const h = result.chargingHours > 0 ? `${result.chargingHours} ${T.jamUnit}` : '';
    const m = result.chargingMinutes > 0 ? ` ${result.chargingMinutes} ${T.menitUnit}` : '';
    return (h + m).trim() || T.lessThanOneMinute;
  })();

  // Kirim null saat hasil tidak valid supaya data sesi lama tidak ikut tersimpan
  $: if (onResult) {
    onResult(showResult ? {
      energyFromGrid: result.energyFromGrid,
      cost: result.totalCost,
      batteryEnd: targetBattery,
    } : null);
  }
</script>

<SliderInput
  id="targetBattery"
  label={T.targetBatteryLabel}
  bind:value={targetBattery}
  min={0} max={100} unit="%"
  tickMin="0%" tickMid="50%" tickMax="100%"
  warning={T.warningOver80}
  warningThreshold={80}
/>
{#if targetBatteryError}<p class="text-xs text-red-500 mt-0.5">{targetBatteryError}</p>{/if}

<ProgressBar mode="target" {currentBattery} {targetBattery} {T} />

{#if showResult}
  <div class="space-y-3 pt-2 border-t border-slate-100">

    <EnergyInfo
      {T}
      energyFromGrid={result.energyFromGrid}
      energyToBattery={result.energyNeeded}
      {efficiency}
    />

    <RangeInfo
      {T} {evPreset}
      batteryStart={currentBattery}
      batteryEnd={targetBattery}
    />

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
      batteryEnd={targetBattery}
      totalCost={result.totalCost}
    />

  </div>
{/if}