import { useState } from "react";
import PanelTabs from "../ui/PanelTabs";
import TalentCard from "../talents/TalentCard";
import GeniusCard from "../talents/GeniusCard";

const tabs = [
  { id: "talents", label: "Talentos" },
  { id: "genius", label: "Gênio" },
];

function LeftPanel({ character, onUseTalent, onUseGenius }) {
  const [activeTab, setActiveTab] = useState("talents");

  return (
    <aside className="left-panel panel">
      <PanelTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="panel-content">
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
    </aside>
  );
}

export default LeftPanel;