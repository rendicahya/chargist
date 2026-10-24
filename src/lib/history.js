import { persisted, persist } from './persist.js';

const HISTORY_KEY = 'chargingHistory';

export function loadHistory() {
  try {
    return persisted(HISTORY_KEY, []);
  } catch {
    return [];
  }
}

export function saveHistory(entries) {
  persist(HISTORY_KEY, entries);
}

export function createEntry({
  evModel,
  batteryCapacity,
  batteryStart,
  batteryEnd,
  energyFromGrid,
  cost,
  location,
  date,
  time,
}) {
  return {
    id: crypto.randomUUID(),
    evModel: evModel ?? 'Custom',
    batteryCapacity,
    batteryStart,
    batteryEnd,
    energyFromGrid,
    cost,
    location,
    date,
    time,
    createdAt: new Date().toISOString(),
  };
}

export function calcStats(entries) {
  if (!entries.length) return null;

  const totalSessions = entries.length;
  const totalKwh = entries.reduce((s, e) => s + e.energyFromGrid, 0);
  const totalCost = entries.reduce((s, e) => s + e.cost, 0);

  // Hitung rentang hari dari sesi pertama sampai terakhir berdasarkan tanggal yang diisi user,
  // fallback ke createdAt jika tanggal sesi tidak valid
  const dates = entries.map(e => {
    const sessionTime = new Date(`${e.date}T${e.time || '00:00'}`).getTime();
    return Number.isFinite(sessionTime) ? sessionTime : new Date(e.createdAt).getTime();
  });
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const daySpan = Math.max(1, (maxDate - minDate) / (1000 * 60 * 60 * 24));
  const weekSpan = Math.max(1, daySpan / 7);
  const monthSpan = Math.max(1, daySpan / 30);

  return {
    totalSessions,
    totalKwh: totalKwh.toFixed(2),
    totalCost,
    avgKwhPerDay: (totalKwh / daySpan).toFixed(2),
    avgKwhPerWeek: (totalKwh / weekSpan).toFixed(2),
    avgKwhPerMonth: (totalKwh / monthSpan).toFixed(2),
    avgCostPerSession: (totalCost / totalSessions).toFixed(0),
  };
}