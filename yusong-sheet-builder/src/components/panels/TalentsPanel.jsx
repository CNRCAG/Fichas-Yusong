import { useState } from "react";
import TalentCard from "../ui/TalentCard";
import GeniusCard from "../ui/GeniusCard";

function TalentsPanel({ character, onUseTalent, onUseGenius }) {
  const [activeTab, setActiveTab] = useState("talents");

  return (
    <section className="talents-panel panel">
      <div className="tabs">
        <button
          className={activeTab === "talents" ? "active" : ""}
          onClick={() => setActiveTab("talents")}
        >
          Talentos
        </button>
        <button
          className={activeTab === "genius" ? "active" : ""}
          onClick={() => setActiveTab("genius")}
        >
          Perícia de Gênio
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "talents" && (
          <div className="talents-list">
            {character.talents.map((talent) => (
              <TalentCard
                key={talent.id}
                talent={talent}
                currentStamina={character.resources.currentStamina}
                onUseTalent={onUseTalent}
              />
            ))}
          </div>
        )}

        {activeTab === "genius" && (
          <div className="genius-list">
            {Object.entries(character.genius)
              .filter(([level, desc]) => desc)
              .map(([level, desc]) => (
                <GeniusCard
                  key={level}
                  level={level}
                  description={desc}
                  currentStamina={character.resources.currentStamina}
                  staminaCost={10} 
                  onUse={() => onUseGenius(level)}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TalentsPanel;