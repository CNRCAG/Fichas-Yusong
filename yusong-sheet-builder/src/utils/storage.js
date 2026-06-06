import { characterInitialState } from "../data/characterInitialState";

export const CHARACTER_LIST_KEY = "yusong.characters";
export const ACTIVE_CHARACTER_ID_KEY = "yusong.activeCharacterId";

export function createCharacterId() {
  return crypto.randomUUID();
}

export function getCharacterDisplayName(character) {
  return character.identity?.name?.trim() || "Personagem sem nome";
}

function mergeCharacterState(base, saved) {
  return {
    ...base,
    ...saved,

    id: saved?.id || createCharacterId(),
    createdAt: saved?.createdAt || new Date().toISOString(),
    updatedAt: saved?.updatedAt || new Date().toISOString(),

    identity: {
      ...base.identity,
      ...(saved?.identity || {}),
    },

    resources: {
      ...base.resources,
      ...(saved?.resources || {}),
    },

    attributes: {
      ...base.attributes,
      ...(saved?.attributes || {}),
    },

    reactions: {
      ...base.reactions,
      ...(saved?.reactions || {}),
    },

    body: Array.isArray(saved?.body) ? saved.body : base.body,
    talents: Array.isArray(saved?.talents) ? saved.talents : base.talents,

    genius: {
      ...base.genius,
      ...(saved?.genius || {}),
      abilities: Array.isArray(saved?.genius?.abilities)
        ? saved.genius.abilities
        : base.genius.abilities,
    },

    inventory: Array.isArray(saved?.inventory)
      ? saved.inventory
      : base.inventory,

    skills:
      saved?.skills && typeof saved.skills === "object"
        ? saved.skills
        : base.skills,

    conditions:
      saved?.conditions && typeof saved.conditions === "object"
        ? saved.conditions
        : base.conditions,

    notes: saved?.notes ?? base.notes,
  };
}

export function createNewCharacterState(baseCharacter = characterInitialState) {
  const now = new Date().toISOString();

  return {
    ...baseCharacter,
    id: createCharacterId(),
    createdAt: now,
    updatedAt: now,
  };
}

export function loadCharactersFromStorage() {
  try {
    const savedCharacters = localStorage.getItem(CHARACTER_LIST_KEY);

    if (!savedCharacters) {
      return [];
    }

    const parsedCharacters = JSON.parse(savedCharacters);

    if (!Array.isArray(parsedCharacters)) {
      return [];
    }

    return parsedCharacters.map((character) =>
      mergeCharacterState(characterInitialState, character)
    );
  } catch (error) {
    console.error("Erro ao carregar personagens:", error);
    return [];
  }
}

export function saveCharactersToStorage(characters) {
  try {
    localStorage.setItem(CHARACTER_LIST_KEY, JSON.stringify(characters));
  } catch (error) {
    console.error("Erro ao salvar personagens:", error);
  }
}

export function loadActiveCharacterId() {
  return localStorage.getItem(ACTIVE_CHARACTER_ID_KEY);
}

export function saveActiveCharacterId(characterId) {
  localStorage.setItem(ACTIVE_CHARACTER_ID_KEY, characterId);
}

export function clearActiveCharacterId() {
  localStorage.removeItem(ACTIVE_CHARACTER_ID_KEY);
}