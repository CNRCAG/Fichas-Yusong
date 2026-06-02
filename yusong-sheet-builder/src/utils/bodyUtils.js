export function getBodyPartState(currentArmor) {
  if (Number(currentArmor) <= 0) {
    return "Inutilizado";
  }

  return "Normal";
}

export function getBodyPartStatusClass(currentArmor) {
  if (Number(currentArmor) <= 0) {
    return "body-status disabled";
  }

  return "body-status normal";
}

export function clampArmor(value, maxValue) {
  const numericValue = Number(value);
  const numericMax = Number(maxValue);

  if (numericValue < 0) {
    return 0;
  }

  if (numericValue > numericMax) {
    return numericMax;
  }

  return numericValue;
}