export function calculateLife(health, level) {
  return 6 + Number(health) * Number(level);
}

export function calculateStamina(constitution, health) {
  return (Number(constitution) + Number(health)) * 5 + 100;
}

export function calculateMovement(agility, size) {
  const movement = 4 + Number(agility) - Number(size);

  if (movement < 1) {
    return 1;
  }

  return movement;
}

export function calculateRun(movement) {
  return Number(movement) * 2 + 4;
}

export function calculateRD(size) {
  const numericSize = Number(size);

  if (numericSize >= 12) return 8;
  if (numericSize >= 10) return 6;
  if (numericSize >= 7) return 4;
  if (numericSize >= 5) return 2;

  return 0;
}

export function calculateAverage(valueA, valueB) {
  return Math.floor((Number(valueA) + Number(valueB)) / 2);
}

export function getReactionDice(value) {
  const numericValue = Number(value);

  const table = {
    1: "1d4",
    2: "1d6",
    3: "1d8",
    4: "1d10",
    5: "1d12",
    6: "2d8",
    7: "1d20",
    8: "2d20",
    9: "+2",
    10: "+2",
    11: "+2",
    12: "+3",
  };

  return table[numericValue] || "1d4";
}

export function calculateDodge(agility, reaction) {
  const value = calculateAverage(agility, reaction);
  return getReactionDice(value);
}

export function calculateCounterAttack(agility, intelligence) {
  const value = calculateAverage(agility, intelligence);
  return getReactionDice(value);
}