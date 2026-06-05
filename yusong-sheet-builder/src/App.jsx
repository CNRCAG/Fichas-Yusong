import { useState, useEffect } from "react";
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

function App() {
  const [character, setCharacter] = useState(characterInitialState);
  const selectedSchool = getSchoolById(character.identity.school);

  useEffect(() => {
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

    setCharacter((prev) => {
      let memberDiceIndex = 0;

      return {
        ...prev,

        resources: {
          ...prev.resources,
          currentLife: Math.min(prev.resources.currentLife, newLife),
          maxLife: newLife,
          currentStamina: Math.min(prev.resources.currentStamina, newStamina),
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
              currentArmor: Math.min(part.currentArmor, newVitalArmor),
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
            currentArmor: Math.min(part.currentArmor, newArmor),
          };
        }

        return part;
      }),
    };
  });
}, [character.attributes, character.identity.level]);

  // Atualiza qualquer campo do identity
    function handleUpdateIdentity(field, value) {
    setCharacter((prev) => {
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

  // Atualiza características
  function handleUpdateAttribute(field, value) {
    const numericValue = Number(value);

    setCharacter((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [field]: Math.min(12, Math.max(1, numericValue)),
      },
    }));
  }

  // Altera armadura dos membros
  function handleChangeBodyArmor(partId, amount) {
    setCharacter((prev) => ({
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

  // Usa talento e gasta stamina
  function handleUseTalent(talentId) {
    setCharacter((prev) => {
      const talent = prev.talents.find((t) => t.id === talentId);

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

  // Usa habilidade de gênio e gasta stamina
  function handleUseGenius(level) {
    const cost = 10;

    setCharacter((prev) => {
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


  function handleToggleCondition(conditionId) {
    setCharacter((prev) => {
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

  function handleUpdateSkill(skillId, value) {
    const numericValue = Number(value);

    setCharacter((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillId]: Math.min(5, Math.max(0, numericValue)),
      },
    }));
  }

  function handleAddTalent(talent) {
    setCharacter((prev) => {
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
    setCharacter((prev) => ({
      ...prev,
      talents: prev.talents.filter((talent) => talent.id !== talentId),
    }));
  }

  function handleChangeBodyDice(partId, newDice) {
    setCharacter((prev) => {
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

  return (
    <main className={`app-page ${selectedSchool.themeClass}`}>
      <section className="character-sheet">
        <SheetHeader
          character={character}
          onUpdateIdentity={handleUpdateIdentity}
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