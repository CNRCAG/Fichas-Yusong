// Utilitário de rolagem de dados no padrão usado pelo sistema Pilares de Atlas
// Suporta notações como "1d4", "2d8", "1d6+1d4", "1d20+8", "1d4+2", "1d20+1-4".

const SIGNED_TOKEN = /([+-]?)(\d+d\d+|\d+)/gi;

/**
 * Rola um único dado de "sides" lados.
 */
function rollSingleDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Faz o parsing de uma notação de dados em uma lista de termos.
 * Cada termo é { type: "dice", count, sides, sign } ou { type: "flat", value }.
 * Suporta sinais (+/-) antes de cada termo, então "1d20+1-4" funciona.
 */
export function parseDiceNotation(notation) {
  if (!notation || typeof notation !== "string") return [];

  const cleaned = notation.replace(/\s+/g, "");
  const terms = [];
  let match;

  SIGNED_TOKEN.lastIndex = 0;
  while ((match = SIGNED_TOKEN.exec(cleaned)) !== null) {
    const sign = match[1] === "-" ? -1 : 1;
    const raw = match[2];
    const diceMatch = raw.match(/^(\d+)d(\d+)$/i);

    if (diceMatch) {
      terms.push({
        type: "dice",
        count: parseInt(diceMatch[1], 10),
        sides: parseInt(diceMatch[2], 10),
        sign,
        raw: match[0],
      });
    } else {
      const flat = parseInt(raw, 10) * sign;
      terms.push({ type: "flat", value: Number.isNaN(flat) ? 0 : flat, raw: match[0] });
    }
  }

  return terms;
}

/**
 * Rola uma notação de dados completa e retorna o detalhamento.
 * Retorna null se a notação não contiver nenhum dado válido (ex: "-", "").
 */
export function rollDiceNotation(notation) {
  const terms = parseDiceNotation(notation);
  const hasDice = terms.some((t) => t.type === "dice");
  if (!hasDice) return null;

  const rolls = [];
  let total = 0;

  terms.forEach((term) => {
    if (term.type === "dice") {
      for (let i = 0; i < term.count; i += 1) {
        const value = rollSingleDie(term.sides) * term.sign;
        rolls.push({ sides: term.sides, value });
        total += value;
      }
    } else {
      total += term.value;
      if (term.value !== 0) {
        rolls.push({ sides: null, value: term.value, flat: true });
      }
    }
  });

  return { notation, rolls, total };
}

/**
 * Anexa um modificador numérico (positivo ou negativo) ao final de uma notação.
 * Ex: applyModifier("1d20+1", -4) => "1d20+1-4"
 */
export function applyModifier(notation, modifier) {
  if (!modifier) return notation;
  return modifier > 0 ? `${notation}+${modifier}` : `${notation}${modifier}`;
}
