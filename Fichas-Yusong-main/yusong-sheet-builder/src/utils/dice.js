// Utilitário de rolagem de dados no padrão usado pelo sistema Pilares de Atlas
// Suporta notações como "1d4", "2d8", "1d6+1d4", "1d20+8", "1d4+2".

const DICE_TOKEN = /(\d+)d(\d+)/i;

/**
 * Rola um único dado de "sides" lados.
 */
function rollSingleDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Faz o parsing de uma notação de dados em uma lista de termos.
 * Cada termo é { type: "dice", count, sides } ou { type: "flat", value }.
 */
export function parseDiceNotation(notation) {
  if (!notation || typeof notation !== "string") return [];

  const cleaned = notation.replace(/\s+/g, "");
  const terms = cleaned.split("+").filter(Boolean);

  return terms.map((term) => {
    const match = term.match(DICE_TOKEN);
    if (match) {
      return {
        type: "dice",
        count: parseInt(match[1], 10),
        sides: parseInt(match[2], 10),
        raw: term,
      };
    }
    const flat = parseInt(term, 10);
    return { type: "flat", value: Number.isNaN(flat) ? 0 : flat, raw: term };
  });
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
        const value = rollSingleDie(term.sides);
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
