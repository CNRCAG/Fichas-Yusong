import { bodyParts } from "./bodyParts";

export const characterInitialState = {
  identity: {
    name: "",
    level: 1,
    age: "",
    height: "",
    school: "seirin",
    type: "prodigio",
    characterClass: "bruto",
    origin: "",
    martialArt: "",
    concept: "",
    image: "",
  },

  resources: {
    currentLife: 0,
    maxLife: 0,
    currentStamina: 0,
    maxStamina: 0,
    rd: 0,
    movement: 0,
    run: 0,
  },

  attributes: {
    strength: 1,
    agility: 1,
    constitution: 1,
    size: 1,
    power: 1,
    intelligence: 1,
    charisma: 1,
    reaction: 1,
    health: 1,
  },

  reactions: {
    dodge: "1d4",
    counterAttack: "1d4",
  },

  body: bodyParts.map((part) => ({
    ...part,
    currentArmor: part.armor,
    maxArmor: part.armor,
  })),

  talents: [],

  genius: {
    name: "",
    level1: "",
    level2: "",
    level3: "",
    awakening: "",
  },

  inventory: [],

  skills: {},

  conditions: [],

  notes: "",
};