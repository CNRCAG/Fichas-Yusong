import { useState, useEffect } from "react";
import {
  createNewCharacterState,
  loadCharactersFromStorage,
  saveCharactersToStorage,
  loadActiveCharacterId,
  saveActiveCharacterId,
  clearActiveCharacterId,
} from "./utils/storage";

import CharacterManager from "./components/characters/CharacterManager";
import { characterInitialState } from "./data/characterInitialState";
import { getSchoolById } from "./data/schools";

import {
  calculateLife,
  calculateStamina,
  calculateRD,
  calculateMovement,
  calculateRun,
  calculateDodge,
  calculateCounterAttack,
  calculateVitalArmor,
  calculateMemberDicePool,
  calculateMemberArmor,
} from "./utils/calculations";

import SheetHeader from "./components/layout/SheetHeader";
import MainLayout from "./components/layout/MainLayout";
import AttributesFooter from "./components/layout/AttributesFooter";

import "./styles/global.css";
import "./styles/themes.css";
import "./styles/sheet.css";
import "./styles/header.css";
import "./styles/panels.css";
import "./styles/body.css";
import "./styles/attributes.css";
import "./styles/characters.css";

function App() {
  const [characters, setCharacters] = useState(() =>
    loadCharactersFromStorage()
  );

  const [activeCharacterId, setActiveCharacterId] = useState(() =>
    loadActiveCharacterId()
  );

  const [sheetResetVersion, setSheetResetVersion] = useState(0);

  const character =
    characters.find(
      (currentCharacter) => currentCharacter.id === activeCharacterId
    ) || null;

  const selectedSchool =
    character?.identity?.school && getSchoolById(character.identity.school)
      ? getSchoolById(character.identity.school)
      : { themeClass: "theme-neutral" };

  useEffect(() => {
    saveCharactersToStorage(characters);
  }, [characters]);

  function updateActiveCharacter(updater) {
    setCharacters((prevCharacters) =>
      prevCharacters.map((currentCharacter) => {
        if (currentCharacter.id !== activeCharacterId) {
          return currentCharacter;
        }

        const updatedCharacter =
          typeof updater === "function" ? updater(currentCharacter) : updater;

        return {
          ...updatedCharacter,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }

  useEffect(() => {
    if (!character) return;

    const newLife = calculateLife(
      character.attributes.health,
      character.identity.level
    );

    const newStamina = calculateStamina(
      character.attributes.constitution,
      character.attributes.health
    );

    const newMovement = calculateMovement(
      character.attributes.agility,
      character.attributes.size
    );

    const newRun = calculateRun(newMovement);
    const newRD = calculateRD(character.attributes.size);

    const newDodge = calculateDodge(
      character.attributes.agility,
      character.attributes.reaction
    );

    const newCounterAttack = calculateCounterAttack(
      character.attributes.agility,
      character.attributes.intelligence
    );

    const newVitalArmor = calculateVitalArmor(
      character.attributes.constitution,
      character.attributes.health
    );

    const memberDicePool = calculateMemberDicePool(
      character.attributes.strength,
      character.attributes.agility
    );

    updateActiveCharacter((prev) => {
      let memberDiceIndex = 0;

      return {
        ...prev,

        resources: {
          ...prev.resources,

          currentLife:
            prev.resources.maxLife === 0
              ? newLife
              : Math.min(prev.resources.currentLife, newLife),

          maxLife: newLife,

          currentStamina:
            prev.resources.maxStamina === 0
              ? newStamina
              : Math.min(prev.resources.currentStamina, newStamina),

          maxStamina: newStamina,

          rd: newRD,
          movement: newMovement,
          run: newRun,
        },

        reactions: {
          dodge: newDodge,
          counterAttack: newCounterAttack,
        },

        body: prev.body.map((part) => {
          if (part.type === "vital") {
            return {
              ...part,
              armor: newVitalArmor,
              maxArmor: newVitalArmor,
              currentArmor:
                part.maxArmor === 0
                  ? newVitalArmor
                  : Math.min(part.currentArmor, newVitalArmor),
            };
          }

          if (part.type === "member") {
            const newDice = memberDicePool[memberDiceIndex] || part.dice;
            const newArmor = calculateMemberArmor(newDice);

            memberDiceIndex += 1;

            return {
              ...part,
              dice: newDice,
              armor: newArmor,
              maxArmor: newArmor,
              currentArmor:
                part.maxArmor === 0
                  ? newArmor
                  : Math.min(part.currentArmor, newArmor),
            };
          }

          return part;
        }),
      };
    });
  }, [activeCharacterId, character?.attributes, character?.identity?.level]);

  function createFreshCharacter() {
    const base = characterInitialState;

    const newLife = calculateLife(base.attributes.health, base.identity.level);

    const newStamina = calculateStamina(
      base.attributes.constitution,
      base.attributes.health
    );

    const newMovement = calculateMovement(
      base.attributes.agility,
      base.attributes.size
    );

    const newRun = calculateRun(newMovement);
    const newRD = calculateRD(base.attributes.size);

    const newDodge = calculateDodge(
      base.attributes.agility,
      base.attributes.reaction
    );

    const newCounterAttack = calculateCounterAttack(
      base.attributes.agility,
      base.attributes.intelligence
    );

    const newVitalArmor = calculateVitalArmor(
      base.attributes.constitution,
      base.attributes.health
    );

    const memberDicePool = calculateMemberDicePool(
      base.attributes.strength,
      base.attributes.agility
    );

    let memberDiceIndex = 0;

    return {
      ...base,
      notes: "",

      resources: {
        ...base.resources,
        currentLife: newLife,
        maxLife: newLife,
        currentStamina: newStamina,
        maxStamina: newStamina,
        rd: newRD,
        movement: newMovement,
        run: newRun,
      },

      reactions: {
        dodge: newDodge,
        counterAttack: newCounterAttack,
      },

      body: base.body.map((part) => {
        if (part.type === "vital") {
          return {
            ...part,
            armor: newVitalArmor,
            maxArmor: newVitalArmor,
            currentArmor: newVitalArmor,
          };
        }

        if (part.type === "member") {
          const newDice = memberDicePool[memberDiceIndex] || part.dice;
          const newArmor = calculateMemberArmor(newDice);

          memberDiceIndex += 1;

          return {
            ...part,
            dice: newDice,
            armor: newArmor,
            maxArmor: newArmor,
            currentArmor: newArmor,
          };
        }

        return part;
      }),
    };
  }

  function handleCreateCharacter() {
    const freshCharacter = createFreshCharacter();
    const newCharacter = createNewCharacterState(freshCharacter);

    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
    setActiveCharacterId(newCharacter.id);
    saveActiveCharacterId(newCharacter.id);
  }

  function handleOpenCharacter(characterId) {
    setActiveCharacterId(characterId);
    saveActiveCharacterId(characterId);
  }

  function handleBackToCharacterList() {
    setActiveCharacterId(null);
    clearActiveCharacterId();
  }

  function handleDeleteCharacter(characterId) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este personagem?"
    );

    if (!confirmDelete) return;

    setCharacters((prevCharacters) =>
      prevCharacters.filter((currentCharacter) => currentCharacter.id !== characterId)
    );

    if (activeCharacterId === characterId) {
      setActiveCharacterId(null);
      clearActiveCharacterId();
    }
  }

  function handleResetCharacter() {
    if (!character) return;

    const confirmReset = window.confirm(
      "Tem certeza que deseja resetar esta ficha? Isso apagará os dados dela."
    );

    if (!confirmReset) return;

    const freshCharacter = {
      ...createFreshCharacter(),
      id: activeCharacterId,
      createdAt: character.createdAt,
      updatedAt: new Date().toISOString(),
      notes: "",
    };

    updateActiveCharacter(freshCharacter);

    setSheetResetVersion((current) => current + 1);
  }

  function handleUpdateIdentity(field, value) {
    updateActiveCharacter((prev) => {
      let finalValue = value;

      if (field === "level") {
        const numericValue = Number(value);

        if (Number.isNaN(numericValue)) {
          finalValue = prev.identity.level;
        } else {
          finalValue = Math.min(20, Math.max(1, numericValue));
        }
      }

      return {
        ...prev,
        identity: {
          ...prev.identity,
          [field]: finalValue,
        },
      };
    });
  }

  function handleUpdateNotes(value) {
    updateActiveCharacter((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        notes: value,
      };
    });
  }

  function handleUpdateAttribute(field, value) {
    const numericValue = Number(value);

    updateActiveCharacter((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [field]: Math.min(12, Math.max(1, numericValue)),
      },
    }));
  }

  function handleChangeBodyArmor(partId, amount) {
    updateActiveCharacter((prev) => ({
      ...prev,
      body: prev.body.map((part) => {
        if (part.id !== partId) return part;

        const newArmor = Math.min(
          part.maxArmor,
          Math.max(0, part.currentArmor + amount)
        );

        return {
          ...part,
          currentArmor: newArmor,
        };
      }),
    }));
  }

  function handleChangeBodyDice(partId, newDice) {
    updateActiveCharacter((prev) => {
      const selectedPart = prev.body.find((part) => part.id === partId);

      if (!selectedPart || selectedPart.type !== "member") {
        return prev;
      }

      const oldDice = selectedPart.dice;

      if (oldDice === newDice) {
        return prev;
      }

      const targetPart = prev.body.find(
        (part) =>
          part.type === "member" &&
          part.id !== partId &&
          part.dice === newDice
      );

      const newSelectedArmor = calculateMemberArmor(newDice);
      const newTargetArmor = calculateMemberArmor(oldDice);

      return {
        ...prev,
        body: prev.body.map((part) => {
          if (part.id === partId) {
            return {
              ...part,
              dice: newDice,
              armor: newSelectedArmor,
              maxArmor: newSelectedArmor,
              currentArmor: Math.min(part.currentArmor, newSelectedArmor),
            };
          }

          if (targetPart && part.id === targetPart.id) {
            return {
              ...part,
              dice: oldDice,
              armor: newTargetArmor,
              maxArmor: newTargetArmor,
              currentArmor: Math.min(part.currentArmor, newTargetArmor),
            };
          }

          return part;
        }),
      };
    });
  }

  function handleUseTalent(talentId) {
    updateActiveCharacter((prev) => {
      const talent = prev.talents.find((currentTalent) => currentTalent.id === talentId);

      if (!talent || prev.resources.currentStamina < talent.staminaCost) {
        return prev;
      }

      return {
        ...prev,
        resources: {
          ...prev.resources,
          currentStamina: prev.resources.currentStamina - talent.staminaCost,
        },
      };
    });
  }

  function handleAddTalent(talent) {
    updateActiveCharacter((prev) => {
      const alreadyHasTalent = prev.talents.some(
        (currentTalent) => currentTalent.id === talent.id
      );

      if (alreadyHasTalent) return prev;

      return {
        ...prev,
        talents: [...prev.talents, talent],
      };
    });
  }

  function handleRemoveTalent(talentId) {
    updateActiveCharacter((prev) => ({
      ...prev,
      talents: prev.talents.filter((talent) => talent.id !== talentId),
    }));
  }

  function handleUseGenius() {
    const cost = 10;

    updateActiveCharacter((prev) => {
      if (prev.resources.currentStamina < cost) {
        return prev;
      }

      return {
        ...prev,
        resources: {
          ...prev.resources,
          currentStamina: prev.resources.currentStamina - cost,
        },
      };
    });
  }

  function handleUpdateGeniusName(value) {
    updateActiveCharacter((prev) => ({
      ...prev,
      genius: {
        ...prev.genius,
        name: value,
      },
    }));
  }

  function handleAddGeniusAbility(abilityData) {
    const newAbility = {
      id: crypto.randomUUID(),
      name: abilityData.name || "Nova Habilidade",
      level: abilityData.level || "Nível 1",
      action: abilityData.action || "Passiva",
      staminaCost: Number(abilityData.staminaCost) || 0,
      description: abilityData.description || "",
    };

    updateActiveCharacter((prev) => ({
      ...prev,
      genius: {
        ...prev.genius,
        abilities: [...prev.genius.abilities, newAbility],
      },
    }));
  }

  function handleUpdateGeniusAbility(abilityId, fieldOrData, value) {
    updateActiveCharacter((prev) => ({
      ...prev,
      genius: {
        ...prev.genius,
        abilities: prev.genius.abilities.map((ability) => {
          if (ability.id !== abilityId) return ability;

          if (typeof fieldOrData === "object") {
            return {
              ...ability,
              ...fieldOrData,
              staminaCost: Number(fieldOrData.staminaCost) || 0,
            };
          }

          return {
            ...ability,
            [fieldOrData]:
              fieldOrData === "staminaCost" ? Math.max(0, Number(value)) : value,
          };
        }),
      },
    }));
  }

  function handleRemoveGeniusAbility(abilityId) {
    updateActiveCharacter((prev) => ({
      ...prev,
      genius: {
        ...prev.genius,
        abilities: prev.genius.abilities.filter(
          (ability) => ability.id !== abilityId
        ),
      },
    }));
  }

  function handleUseGeniusAbility(abilityId) {
    updateActiveCharacter((prev) => {
      const ability = prev.genius.abilities.find(
        (currentAbility) => currentAbility.id === abilityId
      );

      if (!ability) return prev;

      const cost = Number(ability.staminaCost) || 0;

      if (cost <= 0 || prev.resources.currentStamina < cost) {
        return prev;
      }

      return {
        ...prev,
        resources: {
          ...prev.resources,
          currentStamina: prev.resources.currentStamina - cost,
        },
      };
    });
  }

  function handleUpdateResource(field, value) {
    updateActiveCharacter((prev) => {
      const numericValue = Number(value);

      if (Number.isNaN(numericValue)) {
        return prev;
      }

      const maxValueByField = {
        currentLife: prev.resources.maxLife,
        currentStamina: prev.resources.maxStamina,
      };

      const maxValue = maxValueByField[field] ?? 9999;
      const finalValue = Math.min(maxValue, Math.max(0, Math.floor(numericValue)));

      return {
        ...prev,
        resources: {
          ...prev.resources,
          [field]: finalValue,
        },
      };
    });
  }

  function handleAddInventoryItem(itemData) {
    const newItem = {
      id: crypto.randomUUID(),
      ...itemData,
    };

    updateActiveCharacter((prev) => ({
      ...prev,
      inventory: [...prev.inventory, newItem],
    }));
  }

  function handleUpdateInventoryItem(itemId, itemData) {
    updateActiveCharacter((prev) => ({
      ...prev,
      inventory: prev.inventory.map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...itemData,
            }
          : item
      ),
    }));
  }

  function handleRemoveInventoryItem(itemId) {
    updateActiveCharacter((prev) => ({
      ...prev,
      inventory: prev.inventory.filter((item) => item.id !== itemId),
    }));
  }

  function handleUpdateSkill(skillId, value) {
    const numericValue = Number(value);

    updateActiveCharacter((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillId]: Math.min(5, Math.max(0, numericValue)),
      },
    }));
  }

  function handleToggleCondition(conditionId) {
    updateActiveCharacter((prev) => {
      const currentValue = prev.conditions?.[conditionId] ?? false;

      return {
        ...prev,
        conditions: {
          ...prev.conditions,
          [conditionId]: !currentValue,
        },
      };
    });
  }

  if (!character) {
    return (
      <CharacterManager
        characters={characters}
        onCreateCharacter={handleCreateCharacter}
        onOpenCharacter={handleOpenCharacter}
        onDeleteCharacter={handleDeleteCharacter}
      />
    );
  }

  return (
    <main className={`app-page ${selectedSchool.themeClass}`}>
      <section className="character-sheet">
        <div className="sheet-actions">
          <button
            type="button"
            className="back-to-list-button"
            onClick={handleBackToCharacterList}
          >
            Voltar para Personagens
          </button>

          <button
            type="button"
            className="reset-sheet-button"
            onClick={handleResetCharacter}
          >
            Resetar Ficha
          </button>
        </div>

        <SheetHeader
          character={character}
          onUpdateIdentity={handleUpdateIdentity}
          onUpdateResource={handleUpdateResource}
        />

        <MainLayout
          character={character}
          onChangeBodyArmor={handleChangeBodyArmor}
          onChangeBodyDice={handleChangeBodyDice}
          onUseTalent={handleUseTalent}
          onAddTalent={handleAddTalent}
          onRemoveTalent={handleRemoveTalent}
          onUseGenius={handleUseGenius}
          onUpdateSkill={handleUpdateSkill}
          onToggleCondition={handleToggleCondition}
          onUpdateGeniusName={handleUpdateGeniusName}
          onAddGeniusAbility={handleAddGeniusAbility}
          onUpdateGeniusAbility={handleUpdateGeniusAbility}
          onRemoveGeniusAbility={handleRemoveGeniusAbility}
          onUseGeniusAbility={handleUseGeniusAbility}
          onAddInventoryItem={handleAddInventoryItem}
          onUpdateInventoryItem={handleUpdateInventoryItem}
          onRemoveInventoryItem={handleRemoveInventoryItem}
          onUpdateNotes={handleUpdateNotes}
          notesResetVersion={sheetResetVersion}
        />

        <AttributesFooter
          character={character}
          onUpdateAttribute={handleUpdateAttribute}
        />
      </section>
    </main>
  );
}

export default App;