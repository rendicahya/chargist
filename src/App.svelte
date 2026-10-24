<script>
  import { DEFAULTS, EV_PRESETS, HOME_TARIFFS, SPKLU_TARIFF } from './lib/constants.js';
  import { validateShared, validateTarget, validateTime } from './lib/validation.js';
  import SharedInputs from './components/SharedInputs.svelte';
  import ModeTarget from './components/ModeTarget.svelte';
  import ModeTime from './components/ModeTime.svelte';
  import ModeBudget from './components/ModeBudget.svelte';
  import ModeEnergy from './components/ModeEnergy.svelte';
  import Tooltip from './components/Tooltip.svelte';
  import { PBJT_TL_RATE } from './lib/constants.js';
  import { persisted, persist } from './lib/persist.js';
  import { CHARGING_EFFICIENCY } from './lib/constants.js';
  import { sanitizeStateValue, stateToUrl, urlToState } from './lib/url.js';
  import { langStore, t } from './lib/i18n.js';
  import HistoryTab from './components/HistoryTab.svelte';
  import SaveSessionButton from './components/SaveSessionButton.svelte';

  const urlState = urlToState({});
  // URL diutamakan, lalu localStorage; nilai yang tidak valid jatuh ke default
  const g = (key, def) => urlState[key] ?? sanitizeStateValue(key, persisted(key)) ?? def;

  let activeTab        = g('tab', 'target');
  let location         = g('location', 'spklu');
  let batteryCapacity  = g('batteryCapacity', DEFAULTS.batteryCapacity);
  let currentBattery   = g('currentBattery', DEFAULTS.currentBattery);
  let chargerPower     = g('chargerPower', DEFAULTS.chargerPower);
  let targetBattery    = g('targetBattery', DEFAULTS.targetBattery);
  let availableHours   = g('availableHours', DEFAULTS.availableHours);
  let availableMinutes = g('availableMinutes', DEFAULTS.availableMinutes);
  let budget           = g('budget', DEFAULTS.budget);
  let energyKwh        = g('energyKwh', DEFAULTS.energyKwh);
  let efficiency       = g('efficiency', CHARGING_EFFICIENCY);
  let selectedEV       = g('selectedEV', 'custom');
  let homeDaya         = g('homeDaya', HOME_TARIFFS[2].label);
  let lang = 'id';
  let sessionResult = null;

  // Preset EV harus cocok dengan kapasitasnya; jika tidak, anggap custom agar kapasitas bisa diedit
  const initialEV = EV_PRESETS.find(p => p.label === selectedEV);
  if (initialEV && initialEV.capacity !== batteryCapacity) selectedEV = 'custom';

  langStore.subscribe(l => lang = l);

  $: T = t(lang);
  $: tariffPerKwh = location === 'spklu'
    ? SPKLU_TARIFF
    : HOME_TARIFFS.find(h => h.label === homeDaya).tariff;
  $: shared = validateShared({ batteryCapacity, chargerPower, currentBattery }, T);
  $: targetBatteryError = validateTarget({ targetBattery, currentBattery }, T);
  $: timeErrors = validateTime({ availableHours, availableMinutes }, T);
  $: sharedValid = Object.values(shared).every(e => e === '');
  $: activePBJTRate = location === 'spklu' ? PBJT_TL_RATE : 0;
  
  $: {
    persist('tab', activeTab);
    persist('location', location);
    persist('batteryCapacity', batteryCapacity);
    persist('currentBattery', currentBattery);
    persist('chargerPower', chargerPower);
    persist('targetBattery', targetBattery);
    persist('availableHours', availableHours);
    persist('availableMinutes', availableMinutes);
    persist('budget', budget);
    persist('energyKwh', energyKwh);
    persist('efficiency', efficiency);
    persist('selectedEV', selectedEV);
    persist('homeDaya', homeDaya);
  }

  $: stateToUrl({
    tab: activeTab,
    location,
    batteryCapacity,
    currentBattery,
    chargerPower,
    targetBattery,
    availableHours,
    availableMinutes,
    budget,
    energyKwh,
    efficiency,
    selectedEV,
    homeDaya,
  });
  
  $: tabs = [
    { id: 'target',  icon: '🎯', label: T.tabTarget,  tooltip: T.tooltipTarget  },
    { id: 'time',    icon: '⏱️', label: T.tabTime,    tooltip: T.tooltipTime    },
    { id: 'budget',  icon: '💰', label: T.tabBudget,  tooltip: T.tooltipBudget  },
    { id: 'energy',  icon: '⚡', label: T.tabEnergy,  tooltip: T.tooltipEnergy  },
    { id: 'history', icon: '📋', label: T.tabHistory, tooltip: T.tooltipHistory },
  ];

  $: activeTabInfo = tabs.find(t => t.id === activeTab);
  $: modeTitle = activeTabInfo ? `${activeTabInfo.icon} ${activeTabInfo.label}` : '';

  function onModeResult(data) {
    sessionResult = data;
  }

  function onTabChange(tabId) {
    activeTab = tabId;
    sessionResult = null;   // reset manual saat ganti tab
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 font-sans">

  <header class="bg-white/80 backdrop-blur border-b border-emerald-100 shadow-sm sticky top-0 z-10">
    <div class="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
      <div class="bg-emerald-500 text-white rounded-xl p-2 shadow">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <h1 class="text-lg font-bold text-slate-800 leading-tight">{T.appTitle}</h1>
        <p class="text-xs text-slate-400">{T.appSubtitle}</p>
      </div>
      <button
        on:click={() => langStore.toggle()}
        class="ml-auto px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200
               bg-white text-slate-600 hover:bg-slate-50 transition-colors">
        {lang === 'id' ? 'EN' : 'ID'}
      </button>
    </div>
  </header>

  <main class="max-w-2xl mx-auto px-4 py-8 space-y-6">

    <SharedInputs
      bind:batteryCapacity bind:currentBattery bind:chargerPower
      bind:location bind:selectedEV bind:efficiency bind:homeDaya
      batteryCapacityError={shared.batteryCapacityError}
      chargerPowerError={shared.chargerPowerError}
      currentBatteryError={shared.currentBatteryError}
      {T}
    />

  <!-- Tab Switcher -->
    <div class="bg-white rounded-2xl shadow-md border border-slate-100 p-1.5 sm:p-2 flex gap-1 sm:gap-2">
      {#each tabs as tab}
        <div class="flex-1 min-w-0 flex flex-col items-center gap-1">
          <!-- Di layar sempit ikon ditaruh di atas label supaya 5 tab tetap muat -->
          <button
            class="w-full py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200
              flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5
              {activeTab === tab.id ? 'bg-emerald-500 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}"
            on:click={() => onTabChange(tab.id)}>
            <span aria-hidden="true">{tab.icon}</span>
            <span class="truncate max-w-full">{tab.label}</span>
          </button>
          <Tooltip text={tab.tooltip} />
        </div>
      {/each}
    </div>

    <!-- Card Mode -->
    <div class="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
      <div class="bg-slate-800 px-6 py-4">
        <h2 class="text-white font-semibold text-base tracking-wide">
          {modeTitle}
        </h2>
      </div>
      <div class="p-6 space-y-5">
        {#if activeTab === 'target'}
          <ModeTarget
            {batteryCapacity} {currentBattery} {chargerPower} {tariffPerKwh}
            bind:targetBattery {targetBatteryError} {sharedValid}
            pbjt_rate={activePBJTRate}
            {selectedEV}
            {efficiency}
            {T}
            onResult={onModeResult}
          />
        {:else if activeTab === 'time'}
          <ModeTime
            {batteryCapacity} {currentBattery} {chargerPower} {tariffPerKwh} {selectedEV} {efficiency}
            bind:availableHours bind:availableMinutes
            availableHoursError={timeErrors.availableHoursError}
            availableMinutesError={timeErrors.availableMinutesError}
            timeError={timeErrors.timeError}
            {sharedValid}
            pbjt_rate={activePBJTRate}
            {T}
            onResult={onModeResult}
          />
        {:else if activeTab === 'budget'}
          <ModeBudget
            {batteryCapacity} {currentBattery} {chargerPower} {tariffPerKwh} {selectedEV} {efficiency}
            bind:budget
            {sharedValid}
            pbjt_rate={activePBJTRate}
            {T}
            onResult={onModeResult}
          />
        {:else if activeTab === 'energy'}
          <ModeEnergy
            {batteryCapacity} {currentBattery} {chargerPower} {tariffPerKwh} {selectedEV} {efficiency}
            bind:energyKwh
            {sharedValid}
            pbjt_rate={activePBJTRate}
            {T}
            onResult={onModeResult}
          />
        {:else if activeTab === 'history'}
          <HistoryTab {T} />
        {/if}
      </div>
    </div>

    {#if sessionResult && activeTab !== 'history'}
      <SaveSessionButton {T}
        sessionData={{
          evModel: selectedEV !== 'custom' ? selectedEV : null,
          batteryCapacity,
          batteryStart: currentBattery,
          batteryEnd: Math.round(sessionResult.batteryEnd * 10) / 10,
          energyFromGrid: sessionResult.energyFromGrid,
          cost: sessionResult.cost,
          location,
        }}
      />
    {/if}

    <p class="text-center text-xs text-slate-400 pb-2">{T.footer}</p>

  </main>
</div>