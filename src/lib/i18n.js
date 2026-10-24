export const translations = {
  id: {
    // Header
    appTitle: 'Chargist',
    appSubtitle: 'Hitung biaya & waktu pengisian daya',

    // Shared Inputs
    cardVehicleTitle: '🚗 Data Kendaraan & Charging',
    locationLabel: 'Lokasi Charging',
    locationHome: '🏠 Rumah',
    locationSpklu: '⚡ SPKLU',
    spkluInfo: 'Tarif SPKLU: Rp2.466,78/kWh + PBJT-TL 10%',
    homeDayaLabel: 'Daya Listrik Rumah',
    homeInfo: (tariff) => `Tarif: Rp${tariff}/kWh · Tanpa PBJT-TL`,
    evModelLabel: 'Pilih Model EV',
    evCustom: '✏️ Custom',
    batteryCapacityLabel: 'Kapasitas Baterai EV',
    currentBatteryLabel: 'Baterai Saat Ini',
    chargerTypeLabel: 'Tipe Charger',
    chargerPowerLabel: 'Daya Charger',
    efficiencyLabel: 'Efisiensi Pengisian',
    efficiencyConservative: '60% (konservatif)',
    efficiencyOptimal: '95% (optimal)',

    // Tab labels & tooltips
    tabTarget: '🎯 Target',
    tabTime: '⏱️ Waktu',
    tabBudget: '💰 Anggaran',
    tabHistory: '📋 Riwayat',
    tooltipTarget: 'Tentukan target % baterai yang ingin dicapai. App akan menghitung energi, waktu, dan biaya yang dibutuhkan.',
    tooltipTime: 'Masukkan berapa lama waktu yang tersedia untuk mengisi daya. App akan menghitung seberapa penuh baterai dan biayanya.',
    tooltipBudget: 'Masukkan anggaran biaya yang dimiliki. App akan menghitung energi dan % baterai yang bisa didapat.',
    tooltipHistory: 'Lihat log pengisian dan statistik penggunaan listrik kamu.',

    // Save session
    saveSession: 'Simpan Sesi',
    saveSessionTitle: 'Konfirmasi Sesi Pengisian',
    saveSessionConfirm: 'Simpan',
    saveSessionCancel: 'Batal',
    saveSessionSuccess: 'Sesi berhasil disimpan!',
    evModelNameLabel: 'Nama Kendaraan',
    sessionDate: 'Tanggal',
    sessionTime: 'Jam',

    // History tab
    historyTitle: 'Riwayat Pengisian',
    historyEmpty: 'Belum ada riwayat pengisian.',
    historyEmptyHint: 'Simpan sesi dari tab kalkulasi untuk mulai mencatat.',
    statsTitle: 'Statistik',
    statsTotalSessions: 'Total Sesi',
    statsTotalKwh: 'Total Energi',
    statsTotalCost: 'Total Biaya',
    statsAvgPerDay: 'Rata-rata/hari',
    statsAvgPerWeek: 'Rata-rata/minggu',
    statsAvgPerMonth: 'Rata-rata/bulan',
    statsAvgCostPerSession: 'Rata-rata biaya/sesi',
    colDate: 'Tanggal',
    colEV: 'Kendaraan',
    colBattery: 'Baterai',
    colEnergy: 'Energi',
    colCost: 'Biaya',
    colLocation: 'Lokasi',
    colActions: 'Aksi',
    editEntry: 'Edit',
    deleteEntry: 'Hapus',
    deleteConfirm: 'Hapus entri ini?',

    // Mode Target
    targetBatteryLabel: 'Baterai Target',
    warningOver80: 'Pengisian di atas 80% memperlambat laju pengisian dan dapat mempercepat degradasi baterai jangka panjang.',
    energyFromGrid: 'Energi dari PLN',
    energyToBattery: 'Energi ke Baterai',
    chargingTime: 'Waktu Pengisian',
    estimatedRange: 'Estimasi Jarak',
    basedOnBattery: (pct) => `Berdasarkan ${pct}% baterai`,

    // Mode Time
    chargingTimeLabel: 'Waktu Pengisian',
    jamUnit: 'jam',
    menitUnit: 'menit',
    lessThanOneMinute: '< 1 menit',
    batteryFinal: 'Baterai Akhir',
    chargeCompleteMsg: (time) => `Baterai akan penuh dalam ${time}, lebih cepat dari waktu yang tersedia.`,

    // Mode Budget
    budgetLabel: 'Biaya yang Tersedia',
    budgetPbjtInfo: 'Sudah termasuk PBJT-TL 10%',
    chargingTimeEst: 'Waktu Pengisian',

    // Result
    costBreakdown: 'Rincian Biaya',
    energyCostLabel: 'Biaya Energi',
    pbjtLabel: 'PBJT-TL',
    pbjtDesc: '10% dari biaya energi',
    totalCostLabel: 'Total Biaya',

    // Validation errors
    errorCapacity: 'Kapasitas harus lebih dari 0 kWh.',
    errorChargerPower: 'Daya charger harus lebih dari 0 kW.',
    errorCurrentBattery: 'Baterai saat ini harus antara 0–100%.',
    errorTargetRange: 'Target baterai harus antara 0–100%.',
    errorTargetMin: 'Target harus lebih besar dari baterai saat ini.',
    errorHours: 'Jam tidak boleh negatif.',
    errorMinutes: 'Menit harus antara 0–59.',
    errorTimeEmpty: 'Masukkan waktu yang tersedia.',
    errorBudgetZero: 'Biaya harus lebih dari Rp0.',
    errorBatteryFull: 'Baterai sudah penuh.',

    // Misc
    progressBarLabel: 'Segmen berwarna = energi yang akan diisi',

    rangeBeforeLabel: 'Sebelum Pengisian',
    rangeAfterLabel: 'Setelah Pengisian',
    rangeGainedLabel: 'Penambahan Range',
    bbmCompareTitle: 'Perbandingan dengan BBM',
    bbmEfficiency: '(asumsi 12 km/liter)',
    bbmPertalite: 'Pertalite',
    bbmPertamax: 'Pertamax',
    evSaves: (amount) => `EV hemat ${amount}`,
    bbmSaves: (amount) => `BBM hemat ${amount}`,
    bbmEfficiencyValue: '12',
    energyLabel: 'Energi',

    footer: 'Dibuat dengan ❤️ untuk komunitas EV Indonesia',
  },

  en: {
    // Header
    appTitle: 'Chargist',
    appSubtitle: 'Calculate charging cost & time',

    // Shared Inputs
    cardVehicleTitle: '🚗 Vehicle & Charging Data',
    locationLabel: 'Charging Location',
    locationHome: '🏠 Home',
    locationSpklu: '⚡ SPKLU',
    spkluInfo: 'SPKLU rate: Rp2,466.78/kWh + PBJT-TL 10%',
    homeDayaLabel: 'Home Power Capacity',
    homeInfo: (tariff) => `Rate: Rp${tariff}/kWh · No PBJT-TL`,
    evModelLabel: 'Select EV Model',
    evCustom: '✏️ Custom',
    batteryCapacityLabel: 'EV Battery Capacity',
    currentBatteryLabel: 'Current Battery',
    chargerTypeLabel: 'Charger Type',
    chargerPowerLabel: 'Charger Power',
    efficiencyLabel: 'Charging Efficiency',
    efficiencyConservative: '60% (conservative)',
    efficiencyOptimal: '95% (optimal)',

    // Tab labels & tooltips
    tabTarget: '🎯 Target',
    tabTime: '⏱️ Time',
    tabBudget: '💰 Budget',
    tabHistory: '📋 History',
    tooltipTarget: 'Set a target battery %. The app will calculate the energy, time, and cost needed.',
    tooltipTime: 'Enter how long you have to charge. The app will calculate how full the battery gets and the cost.',
    tooltipBudget: 'Enter your budget. The app will calculate how much energy and battery % you can get.',
    tooltipHistory: 'View your charging log and electricity usage statistics.',

        // Save session
    saveSession: 'Save Session',
    saveSessionTitle: 'Confirm Charging Session',
    saveSessionConfirm: 'Save',
    saveSessionCancel: 'Cancel',
    saveSessionSuccess: 'Session saved!',
    evModelNameLabel: 'Vehicle Name',
    sessionDate: 'Date',
    sessionTime: 'Time',

    // History tab
    historyTitle: 'Charging History',
    historyEmpty: 'No charging history yet.',
    historyEmptyHint: 'Save a session from the calculator tabs to start logging.',
    statsTitle: 'Statistics',
    statsTotalSessions: 'Total Sessions',
    statsTotalKwh: 'Total Energy',
    statsTotalCost: 'Total Cost',
    statsAvgPerDay: 'Avg/day',
    statsAvgPerWeek: 'Avg/week',
    statsAvgPerMonth: 'Avg/month',
    statsAvgCostPerSession: 'Avg cost/session',
    colDate: 'Date',
    colEV: 'Vehicle',
    colBattery: 'Battery',
    colEnergy: 'Energy',
    colCost: 'Cost',
    colLocation: 'Location',
    colActions: 'Actions',
    editEntry: 'Edit',
    deleteEntry: 'Delete',
    deleteConfirm: 'Delete this entry?',

    // Mode Target
    targetBatteryLabel: 'Target Battery',
    warningOver80: 'Charging above 80% slows down the charging rate and may accelerate long-term battery degradation.',
    energyFromGrid: 'Energy from Grid',
    energyToBattery: 'Energy to Battery',
    chargingTime: 'Charging Time',
    estimatedRange: 'Est. Range',
    basedOnBattery: (pct) => `Based on ${pct}% battery`,

    // Mode Time
    chargingTimeLabel: 'Charging Time',
    jamUnit: 'hr',
    menitUnit: 'min',
    lessThanOneMinute: '< 1 min',
    batteryFinal: 'Final Battery',
    chargeCompleteMsg: (time) => `Battery will be full in ${time}, faster than the available time.`,

    // Mode Budget
    budgetLabel: 'Available Budget',
    budgetPbjtInfo: 'Includes PBJT-TL 10%',
    chargingTimeEst: 'Charging Time',

    // Result
    costBreakdown: 'Cost Breakdown',
    energyCostLabel: 'Energy Cost',
    pbjtLabel: 'PBJT-TL',
    pbjtDesc: '10% of energy cost',
    totalCostLabel: 'Total Cost',

    // Validation errors
    errorCapacity: 'Capacity must be greater than 0 kWh.',
    errorChargerPower: 'Charger power must be greater than 0 kW.',
    errorCurrentBattery: 'Current battery must be between 0–100%.',
    errorTargetRange: 'Target battery must be between 0–100%.',
    errorTargetMin: 'Target must be greater than current battery.',
    errorHours: 'Hours cannot be negative.',
    errorMinutes: 'Minutes must be between 0–59.',
    errorTimeEmpty: 'Please enter the available charging time.',
    errorBudgetZero: 'Budget must be greater than Rp0.',
    errorBatteryFull: 'Battery is already full.',

    // Misc
    progressBarLabel: 'Colored segment = energy to be charged',

    rangeBeforeLabel: 'Before Charging',
    rangeAfterLabel: 'After Charging',
    rangeGainedLabel: 'Range Gained',
    bbmCompareTitle: 'Compared to Gasoline',
    bbmEfficiency: '(assumes 12 km/liter)',
    bbmPertalite: 'Pertalite',
    bbmPertamax: 'Pertamax',
    evSaves: (amount) => `EV saves ${amount}`,
    bbmSaves: (amount) => `Gas saves ${amount}`,
    bbmEfficiencyValue: '12',
    energyLabel: 'Energy',

    footer: 'Made with ❤️ for the Indonesian EV community',
  },
};

// localStorage bisa melempar error (private mode, storage diblokir), jadi jangan sampai app gagal dimuat
function readLang() {
  try {
    const stored = localStorage.getItem('lang');
    return stored in translations ? stored : 'id';
  } catch {
    return 'id';
  }
}

function writeLang(lang) {
  try {
    localStorage.setItem('lang', lang);
  } catch {
    // abaikan kegagalan tulis
  }
}

export const langStore = (() => {
  let _lang = readLang();
  let _subscribers = [];

  return {
    subscribe(fn) {
      _subscribers.push(fn);
      fn(_lang);
      return () => { _subscribers = _subscribers.filter(s => s !== fn); };
    },
    toggle() {
      _lang = _lang === 'id' ? 'en' : 'id';
      writeLang(_lang);
      _subscribers.forEach(s => s(_lang));
    },
    get() { return _lang; }
  };
})();

export function t(lang) {
  return translations[lang] ?? translations['id'];
}