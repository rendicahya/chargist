<script>
  import { EV_PRESETS, CHARGER_PRESETS, HOME_TARIFFS } from '../lib/constants.js';
  import SliderInput from './SliderInput.svelte';
  import NumberInput from './NumberInput.svelte';

  export let batteryCapacity, currentBattery, chargerPower;
  export let batteryCapacityError, chargerPowerError, currentBatteryError;
  export let location;
  export let selectedEV;
  export let homeDaya;
  export let efficiency;
  export let T;

  // Diturunkan dari daya charger supaya selalu sinkron dengan nilai yang dihitung (termasuk dari URL)
  let selectedCharger = CHARGER_PRESETS.find(p => p.power === chargerPower)?.label ?? 'custom';

  function onLocationChange(val) {
    location = val;
  }

  function onHomeDayaChange(e) {
    homeDaya = e.target.value;
  }

  function onEVChange(e) {
    const val = e.target.value;
    if (val === 'custom') {
      selectedEV = 'custom';  // ← tambahkan ini
      return;
    }
    const preset = EV_PRESETS.find(p => p.label === val);
    if (preset) {
      selectedEV = val;
      batteryCapacity = preset.capacity;
    }
  }

  function onChargerChange(e) {
    const val = e.target.value;
    if (val === 'custom') {
      selectedCharger = 'custom';  // ← tambahkan ini
      return;
    }
    const preset = CHARGER_PRESETS.find(p => p.label === val);
    if (preset) {
      selectedCharger = val;
      chargerPower = preset.power;
    }
  }

</script>

<div class="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
  <div class="bg-emerald-500 px-6 py-4">
    <h2 class="text-white font-semibold text-base tracking-wide">{T.cardVehicleTitle}</h2>
  </div>
  <div class="p-6 space-y-5">

    <!-- EV Preset -->
    <div class="flex flex-col gap-1">
      <label for="evPreset" class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{T.evModelLabel}</label>
      <div class="relative">
        <select id="evPreset" value={selectedEV} on:change={onEVChange}
          class="w-full appearance-none px-4 py-2.5 pr-10 text-sm text-slate-700 bg-slate-50
                 border border-slate-200 rounded-xl outline-none
                 focus:ring-2 focus:ring-emerald-400 cursor-pointer transition-colors">
          {#each EV_PRESETS as preset}
            <option value={preset.label}>{preset.label} — {preset.capacity} kWh</option>
          {/each}
          <option value="custom">{T.evCustom}</option>
        </select>
        <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5">

      <!-- Kapasitas Baterai EV — hanya tampil jika Custom -->
      {#if selectedEV === 'custom'}
        <NumberInput
          id="batteryCapacity"
          label={T.batteryCapacityLabel}
          bind:value={batteryCapacity}
          min={0.1} max={9999} step={0.1} unit="kWh"
          error={batteryCapacityError}
          on:input={() => selectedEV = 'custom'}
        />
      {/if}

      <SliderInput
        id="currentBattery"
        label={T.currentBatteryLabel}
        bind:value={currentBattery}
        min={0} max={100} unit="%"
        tickMin="0%" tickMid="50%" tickMax="100%"
        error={currentBatteryError}
      />

    </div>

    <!-- Lokasi Charging -->
    <div class="flex flex-col gap-2">
      <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{T.locationLabel}</p>
      <div class="grid grid-cols-2 gap-2">
        <button
          class="flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm font-semibold
            {location === 'home'
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'}"
          on:click={() => onLocationChange('home')}>
          {T.locationHome}
        </button>
        <button
          class="flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm font-semibold
            {location === 'spklu'
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'}"
          on:click={() => onLocationChange('spklu')}>
          {T.locationSpklu}
        </button>
      </div>

      <!-- Info SPKLU -->
      {#if location === 'spklu'}
        <p class="text-xs text-slate-400">{T.spkluInfo}</p>
      {/if}

      <!-- Pilihan daya rumah -->
      {#if location === 'home'}
        <div class="flex flex-col gap-1">
          <label for="homeDaya" class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{T.homeDayaLabel}</label>
          <div class="relative">
            <select id="homeDaya" value={homeDaya} on:change={onHomeDayaChange}
              class="w-full appearance-none px-4 py-2.5 pr-10 text-sm text-slate-700 bg-slate-50
                     border border-slate-200 rounded-xl outline-none
                     focus:ring-2 focus:ring-emerald-400 cursor-pointer transition-colors">
              {#each HOME_TARIFFS as t}
                <option value={t.label}>{t.label} — Rp{t.tariff.toLocaleString('id-ID')}/kWh</option>
              {/each}
            </select>
            <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
          <p class="text-xs text-slate-400">{T.homeInfo(HOME_TARIFFS.find(h => h.label === homeDaya)?.tariff.toLocaleString('id-ID'))}</p>
        </div>
      {/if}
    </div>

    <!-- Charger Preset -->
    <div class="flex flex-col gap-1">
      <label for="chargerPreset" class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{T.chargerTypeLabel}</label>
      <div class="relative">
        <select id="chargerPreset" value={selectedCharger} on:change={onChargerChange}
          class="w-full appearance-none px-4 py-2.5 pr-10 text-sm text-slate-700 bg-slate-50
                 border border-slate-200 rounded-xl outline-none
                 focus:ring-2 focus:ring-emerald-400 cursor-pointer transition-colors">
          {#each CHARGER_PRESETS as preset}
            <option value={preset.label}>{preset.label}</option>
          {/each}
          <option value="custom">{T.evCustom}</option>
        </select>
        <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Daya Charger — hanya tampil jika Custom -->
    {#if selectedCharger === 'custom'}
      <NumberInput
        id="chargerPower"
        label={T.chargerPowerLabel}
        bind:value={chargerPower}
        min={0.1} max={9999} step={0.1} unit="kW"
        error={chargerPowerError}
        on:input={() => {
          const preset = CHARGER_PRESETS.find(p => p.power === chargerPower);
          selectedCharger = preset ? preset.label : 'custom';
        }}
      />
    {/if}

    <SliderInput
      id="efficiency"
      label={T.efficiencyLabel}
      bind:value={efficiency}
      min={0.6} max={0.95} step={0.01}
      displayValue="{Math.round(efficiency * 100)}%"
      tickMin={T.efficiencyConservative}
      tickMax={T.efficiencyOptimal}
    />
  </div>
</div>