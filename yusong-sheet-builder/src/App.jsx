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

  // Atualiza recursos e reações automaticamente
  useEffect(() => {
    const newLife = calculateLife(character.attributes.health, character.identity.level);
    const newStamina = calculateStamina(character.attributes.constitution, character.attributes.health);
    const newMovement = calculateMovement(character.attributes.agility, character.attributes.size);
    const newRun = calculateRun(newMovement);
    const newRD = calculateRD(character.attributes.size);
    const newDodge = calculateDodge(character.attributes.agility, character.attributes.reaction);
    const newCounterAttack = calculateCounterAttack(character.attributes.agility, character.attributes.intelligence);

    setCharacter(prev => ({
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
      }
    }));
  }, [character.attributes, character.identity.level]);

  // Atualiza qualquer campo do identity
  function handleUpdateIdentity(field, value) {
    setCharacter(prev => ({
      ...prev,
      identity: {
        ...prev.identity,
        [field]: value
      }
    }));
  }

  function handleChangeBodyArmor(partId, amount) {
    setCharacter(prev => ({
      ...prev,
      body: prev.body.map(part => {
        if (part.id !== partId) return part;
        const newArmor = Math.min(part.maxArmor, Math.max(0, part.currentArmor + amount));
        return { ...part, currentArmor: newArmor };
      }),
    }));
  }

  function handleUseTalent(talentId) {
    setCharacter(prev => {
      const talent = prev.talents.find(t => t.id === talentId);
      if (!talent || prev.resources.currentStamina < talent.staminaCost) return prev;
      return {
        ...prev,
        resources: {
          ...prev.resources,
          currentStamina: prev.resources.currentStamina - talent.staminaCost
        }
      };
    });
  }

  function handleUseGenius(level) {
    const cost = 10;
    setCharacter(prev => {
      if (prev.resources.currentStamina < cost) return prev;
      return {
        ...prev,
        resources: {
          ...prev.resources,
          currentStamina: prev.resources.currentStamina - cost
        }
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
          onUseTalent={handleUseTalent}
          onUseGenius={handleUseGenius}
        />

        <AttributesFooter character={character} />
      </section>
    </main>
  );
}

export default App;