export function calculateLife(health, level) {
  return 6 + Number(health) * Number(level);
}

export function calculateStamina(constitution, health) {
  return (Number(constitution) + Number(health)) * 5 * 5 + 100;
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

/*
  Tabela corrigida:
  1 = 1d4
  2 = 1d6
  3 = 1d8
  4 = 1d10
  5 = 1d12
  6 = 2d8
  7 = 1d20
  8 = 2d20
  9 = 2d20+2
  10 = 2d20+4
  11 = 2d20+6
  12 = 2d20+9
*/
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
    9: "2d20+2",
    10: "2d20+4",
    11: "2d20+6",
    12: "2d20+9",
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

/*
  Armadura de partes vitais:
  Cabeça, Torso e Abdômen.
  Valor base: floor((CON + SAU) / 2)
*/
export function getVitalArmorByValue(value) {
  const numericValue = Number(value);

  const table = {
    1: 20,
    2: 25,
    3: 30,
    4: 35,
    5: 40,
    6: 45,
    7: 50,
    8: 55,
    9: 60,
    10: 65,
    11: 70,
    12: 75,
  };

  return table[numericValue] || 20;
}

export function calculateVitalArmor(constitution, health) {
  const value = calculateAverage(constitution, health);
  return getVitalArmorByValue(value);
}

export function getDiceMaxValue(dice) {
  const table = {
    "1d4": 4,
    "1d6": 6,
    "1d8": 8,
    "1d10": 10,
    "1d12": 12,
    "2d8": 16,
    "1d20": 20,
    "2d20": 40,
  };

  return table[String(dice).toLowerCase()] || 4;
}

export function calculateMemberArmor(dice) {
  return getDiceMaxValue(dice) * 2;
}

export function calculateMemberDicePool(strength, agility) {
  const value = Math.floor((Number(strength) + Number(agility)) / 2);

  const table = {
    1: ["1d4", "1d6", "1d8", "1d10"],
    2: ["1d4", "1d6", "1d10", "1d10"],
    3: ["1d6", "1d10", "1d10", "1d12"],
    4: ["1d8", "1d10", "1d10", "1d12"],
    5: ["1d10", "1d12", "1d12", "1d12"],
    6: ["1d12", "1d12", "1d12", "2d8"],
    7: ["1d12", "1d12", "2d8", "1d20"],
    8: ["1d12", "2d8", "2d8", "1d20"],
    9: ["2d8", "2d8", "2d8", "1d20"],
    10: ["2d8", "2d8", "1d20", "1d20"],
    11: ["2d8", "1d20", "1d20", "2d20"],
    12: ["1d20", "1d20", "2d20", "2d20"],
  };

  return table[value] || table[1];
}