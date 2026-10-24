export const SPKLU_TARIFF = 2466.78;
export const PBJT_TL_RATE = 0.10;
export const CHARGING_EFFICIENCY = 0.90;

export const DEFAULTS = {
  batteryCapacity: 60,
  currentBattery: 40,
  chargerPower: 7.7,
  targetBattery: 80,
  availableHours: 1,
  availableMinutes: 0,
  budget: 50000,
  energyKwh: 20,
};

export const EV_PRESETS = [
  { label: 'Aion UT (Standard)', capacity: 44.1, range: 400, standard: 'NEDC' },
  { label: 'Aion UT (Premium)', capacity: 60, range: 500, standard: 'NEDC' },
  { label: 'Aion V (Standard)', capacity: 64.5, range: 500, standard: 'NEDC' },
  { label: 'Aion V (Long Range)', capacity: 75.3, range: 602, standard: 'NEDC' },
  { label: 'Aion Y Plus (Exclusive)', capacity: 50.66, range: 410, standard: 'NEDC' },
  { label: 'Aion Y Plus (Premium)', capacity: 63.2, range: 490, standard: 'NEDC' },
  { label: 'BYD Atto 1 (Dynamic)', capacity: 30.08, range: 305, standard: 'CLTC' },
  { label: 'BYD Atto 1 (Premium)', capacity: 38.88, range: 405, standard: 'CLTC' },
  { label: 'BYD Atto 3 (Standard Range)', capacity: 49.92, range: 410, standard: 'NEDC' },
  { label: 'BYD Atto 3 (Extended Range)', capacity: 60.48, range: 480, standard: 'NEDC' },
  { label: 'BYD Dolphin (Standard Range)', capacity: 44.9, range: 410, standard: 'NEDC' },
  { label: 'BYD Dolphin (Extended Range)', capacity: 60.48, range: 490, standard: 'NEDC' },
  { label: 'BYD M6 (Standard)', capacity: 55.4, range: 420, standard: 'NEDC' },
  { label: 'BYD M6 (Superior)', capacity: 71.8, range: 530, standard: 'NEDC' },
  { label: 'BYD Seal (Premium)', capacity: 82.56, range: 650, standard: 'NEDC' },
  { label: 'BYD Sealion 7 (RWD)', capacity: 82.5, range: 567, standard: 'NEDC' },
  { label: 'BYD Sealion 7 (AWD)', capacity: 91.3, range: 542, standard: 'NEDC' },
  { label: 'Changan Lumin EV', capacity: 28.08, range: 301, standard: 'NEDC' },
  { label: 'Chery J6 (RWD)', capacity: 65.69, range: 426, standard: 'WLTP' },
  { label: 'Chery J6 (iWD)', capacity: 69.77, range: 418, standard: 'NEDC' },
  { label: 'Chery Omoda E5', capacity: 61, range: 505, standard: 'NEDC' },
  { label: 'Denza D9', capacity: 103, range: 600, standard: 'NEDC' },
  { label: 'Geely EX2', capacity: 40.8, range: 395, standard: 'NEDC' },
  { label: 'Hyundai Ioniq 5 (Standard Range)', capacity: 58, range: 384, standard: 'WLTP' },
  { label: 'Hyundai Ioniq 5 (Long Range)', capacity: 72.6, range: 481, standard: 'WLTP' },
  { label: 'Jaecoo J5 EV', capacity: 60.9, range: 461, standard: 'CLTC' },
  { label: 'Jaecoo J6 EV (Standard Range)', capacity: 65, range: 401, standard: 'NEDC' },
  { label: 'Jaecoo J6 EV (Long Range)', capacity: 69.8, range: 501, standard: 'NEDC' },
  { label: 'MG 4 EV', capacity: 51, range: 425, standard: 'NEDC' },
  { label: 'Neta V-II', capacity: 36.1, range: 401, standard: 'CLTC' },
  { label: 'Polytron G3/G3+', capacity: 51.916, range: 402, standard: 'CLTC' },
  { label: 'Tesla Model 3', capacity: 50, range: 448, standard: 'NEDC' },
  { label: 'VinFast VF 3', capacity: 18.6, range: 210, standard: 'NEDC' },
  { label: 'VinFast VF e34', capacity: 41.9, range: 318, standard: 'NEDC' },
  { label: 'VinFast VF 5', capacity: 37.23, range: 326, standard: 'NEDC' },
  { label: 'VinFast VF 6', capacity: 59.6, range: 430, standard: 'NEDC' },
  { label: 'VinFast VF 7', capacity: 75.3, range: 496, standard: 'NEDC' },
  { label: 'Wuling Air EV (Lite/Standard)', capacity: 17.3, range: 200, standard: 'NEDC' },
  { label: 'Wuling Air EV (Long Range)', capacity: 26.7, range: 300, standard: 'NEDC' },
  { label: 'Wuling BinguoEV', capacity: 31.9, range: 333, standard: 'NEDC' },
  { label: 'Wuling Cloud EV', capacity: 50.6, range: 460, standard: 'NEDC' },
  { label: 'Wuling Darion EV', capacity: 69.2, range: 540, standard: 'CLTC' },
];

export const CHARGER_PRESETS = [
  { label: 'Portable charger — 8 A', power: 1.76 },
  { label: 'Portable charger — 13 A', power: 2.86 },
  { label: 'AC charging — 7.7 kW', power: 7.7 },
  { label: 'AC charging — 11 kW', power: 11 },
  { label: 'AC charging — 22 kW', power: 22 },
  { label: 'DC fast charging — 25 kW', power: 25 },
  { label: 'DC fast charging — 50 kW', power: 50 },
  { label: 'DC fast charging — 100 kW', power: 100 },
  { label: 'DC ultra fast charging — 150 kW', power: 150 },
  { label: 'DC ultra fast charging — 200 kW', power: 200 },
  { label: 'DC ultra fast charging — 350 kW', power: 350 },
];

export const HOME_TARIFFS = [
  { label: '900 VA', tariff: 1352 },
  { label: '1.300 VA', tariff: 1444.7 },
  { label: '2.200 VA', tariff: 1444.7 },
  { label: '3.500–5.500 VA', tariff: 1699.53 },
  { label: '>6.600 VA', tariff: 1699.53 },
];

export const BBM_EFFICIENCY = 12;  // km/liter (rata-rata)

export const BBM_PRICES = {
  pertalite: 10000,
  pertamax: 12300,
};