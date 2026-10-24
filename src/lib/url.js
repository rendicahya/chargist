import { EV_PRESETS, HOME_TARIFFS } from './constants.js';

// Rentang valid untuk setiap nilai numerik (sama dengan batas input di UI)
const NUMERIC_RANGES = {
  batteryCapacity: [0.1, 9999],
  currentBattery: [0, 100],
  chargerPower: [0.1, 9999],
  targetBattery: [0, 100],
  availableHours: [0, 24],
  availableMinutes: [0, 59],
  budget: [0, 99999999],
  efficiency: [0.6, 0.95],
};

const ALLOWED_VALUES = {
  tab: ['target', 'time', 'budget', 'history'],
  location: ['home', 'spklu'],
  selectedEV: [...EV_PRESETS.map(p => p.label), 'custom'],
  homeDaya: HOME_TARIFFS.map(t => t.label),
};

const PARAM_KEYS = {
  tab: 'tab',
  location: 'loc',
  batteryCapacity: 'cap',
  currentBattery: 'cur',
  chargerPower: 'pwr',
  targetBattery: 'tgt',
  availableHours: 'hr',
  availableMinutes: 'min',
  budget: 'bdg',
  efficiency: 'eff',
  selectedEV: 'ev',
  homeDaya: 'daya',
};

function toNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string' || value.trim() === '') return NaN;
  return Number(value);
}

// Kembalikan nilai yang sudah divalidasi, atau undefined jika tidak valid
// supaya pemanggil bisa jatuh ke nilai berikutnya / default
export function sanitizeStateValue(key, value) {
  if (key in NUMERIC_RANGES) {
    const [min, max] = NUMERIC_RANGES[key];
    const parsed = toNumber(value);
    return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : undefined;
  }
  if (key in ALLOWED_VALUES) {
    return ALLOWED_VALUES[key].includes(value) ? value : undefined;
  }
  return undefined;
}

export function stateToUrl(state) {
  const params = new URLSearchParams();
  for (const [key, param] of Object.entries(PARAM_KEYS)) {
    if (state[key] !== undefined && state[key] !== null) {
      params.set(param, state[key]);
    }
  }
  const base = window.location.pathname;
  window.history.replaceState({}, '', `${base}?${params.toString()}`);
}

export function urlToState(defaults) {
  const params = new URLSearchParams(window.location.search);
  const state = { ...defaults };
  for (const [key, param] of Object.entries(PARAM_KEYS)) {
    if (!params.has(param)) continue;
    const value = sanitizeStateValue(key, params.get(param));
    if (value !== undefined) state[key] = value;
  }
  return state;
}
