import { schools } from "../data/schools";
import { origins } from "../data/origins";
import { martialArts } from "../data/martialArts";
import { skills } from "../data/skills";
import { talents } from "../data/talents";

const GIVEN_NAMES = [
  "Ji-ho", "Min-jun", "Seo-yeon", "Ha-eun", "Dae-sung", "Yuna", "Tae-yang",
  "Soo-min", "Hyun-woo", "Areum", "Joon-ho", "Eun-bi", "Si-woo", "Na-yeon",
  "Kyung-mi", "Do-yun", "Yeji", "Jin-woo", "Chae-won", "Sung-min",
];

const SURNAMES = [
  "Kang", "Han", "Yoon", "Choi", "Park", "Kim", "Lee", "Seo", "Jung", "Oh",
  "Baek", "Song", "Yang", "Cho", "Shin",
];

const TYPES = ["prodigio", "diligente-persistente", "diligente-super-humano"];
const CLASSES = ["bruto", "agil", "tatico", "comando"];

const ATTRIBUTE_KEYS = [
  "strength", "agility", "constitution", "size", "power",
  "intelligence", "charisma", "reaction", "health",
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Distribui `points` pontos entre as chaves de `keys`, começando de `base`,
 * sem nenhuma delas passar de `cap`. Retorna um objeto { chave: valor }.
 */
function distributePoints(keys, points, base, cap) {
  const result = {};
  keys.forEach((key) => {
    result[key] = base;
  });

  let remaining = points;
  let safety = points * 20;

  while (remaining > 0 && safety > 0) {
    const key = pickRandom(keys);
    if (result[key] < cap) {
      result[key] += 1;
      remaining -= 1;
    }
    safety -= 1;
  }

  return result;
}

function buildRandomName() {
  return `${pickRandom(SURNAMES)} ${pickRandom(GIVEN_NAMES)}`;
}

function buildAvatarUrl(seed) {
  const encodedSeed = encodeURIComponent(seed);
  return `https://api.dicebear.com/9.x/bottts-neutral/png?seed=${encodedSeed}&size=256&backgroundType=gradientLinear`;
}

/**
 * Gera um pacote completo de dados de personagem aleatório:
 * identidade, atributos (18 pontos / limite 7), perícias (8 pontos),
 * um talento inicial compatível com a classe sorteada, e um avatar
 * gerado via API pública (DiceBear, sem necessidade de chave).
 *
 * Requer internet no momento da geração para o avatar carregar;
 * se estiver offline, o resto do personagem é gerado normalmente,
 * só a imagem pode não carregar.
 */
export function generateRandomCharacter() {
  const name = buildRandomName();
  const school = pickRandom(schools);
  const type = pickRandom(TYPES);
  const characterClass = pickRandom(CLASSES);
  const origin = pickRandom(origins);
  const martialArt = pickRandom(martialArts);

  const attributes = distributePoints(ATTRIBUTE_KEYS, 18, 1, 7);

  const skillIds = skills.map((skill) => skill.id);
  const skillPoints = distributePoints(skillIds, 8, 0, 3);

  const eligibleTalents = talents.filter(
    (talent) =>
      (talent.category === characterClass || talent.category === "geral") &&
      (!talent.prerequisites || talent.prerequisites.trim() === "")
  );
  const startingTalent = eligibleTalents.length
    ? pickRandom(eligibleTalents)
    : null;

  return {
    identity: {
      name,
      age: String(randomInt(16, 19)),
      height: `${(randomInt(155, 190) / 100).toFixed(2)}m`,
      school: school.id,
      type,
      characterClass,
      origin: origin.name,
      martialArt: martialArt.name,
      image: buildAvatarUrl(name),
    },
    attributes,
    skills: skillPoints,
    talent: startingTalent,
  };
}
