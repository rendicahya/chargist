export function validateShared({ batteryCapacity, chargerPower, currentBattery }, T) {
  return {
    batteryCapacityError: batteryCapacity <= 0 ? T.errorCapacity : '',
    chargerPowerError: chargerPower <= 0 ? T.errorChargerPower : '',
    currentBatteryError: currentBattery < 0 || currentBattery > 100 ? T.errorCurrentBattery : '',
  };
}

export function validateTarget({ targetBattery, currentBattery }, T) {
  if (targetBattery < 0 || targetBattery > 100) return T.errorTargetRange;
  if (targetBattery <= currentBattery) return T.errorTargetMin;
  return '';
}

export function validateTime({ availableHours, availableMinutes }, T) {
  return {
    availableHoursError: availableHours < 0 ? T.errorHours : '',
    availableMinutesError: availableMinutes < 0 || availableMinutes > 59 ? T.errorMinutes : '',
    timeError: availableHours <= 0 && availableMinutes <= 0 ? T.errorTimeEmpty : '',
  };
}

export function validateBudget({ budget }, T) {
  if (budget <= 0) return T.errorBudgetZero;
  return '';
}

export function validateEnergy({ energyKwh }, T) {
  if (!(energyKwh > 0)) return T.errorEnergyZero;
  return '';
}

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}