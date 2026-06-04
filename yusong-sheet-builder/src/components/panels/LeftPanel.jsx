import { useState } from "react";
import PanelTabs from "../ui/PanelTabs";
import TalentCard from "../talents/TalentCard";
import { origins } from "../../data/origins";
import { martialArts } from "../../data/martialArts";

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
          <>
            <div className="section-title">
              <h2>Talentos</h2>
            </div>

            {/* Benefícios das Origens e Artes Marciais */}
            <div className="benefits-list">
              {character.identity.origin && (
                <div className="benefit-card">
                  <strong>{character.identity.origin}:</strong>{" "}
                  {origins.find(o => o.name === character.identity.origin)?.benefit}
                </div>
              )}

              {character.identity.martialArt && (
                <div className="benefit-card">
                  <strong>{character.identity.martialArt}:</strong>{" "}
                  {martialArts.find(m => m.name === character.identity.martialArt)?.benefit}
                </div>
              )}
            </div>

            {/* Lista de talentos */}
            <div className="talent-list">
              {character.talents.map((talent) => (
                <TalentCard
                  key={talent.id}
                  talent={talent}
                  currentStamina={character.resources.currentStamina}
                  onUseTalent={onUseTalent}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === "genius" && (
          <>
            <div className="section-title">
              <h2>Perícia de Gênio</h2>
            </div>

            <article className="genius-card">
              <h3>{character.genius.name || "Sem nome definido"}</h3>
              <p><strong>Nível 1:</strong> {character.genius.level1 || "Não definido"}</p>
              <p><strong>Nível 2:</strong> {character.genius.level2 || "Não definido"}</p>
              <p><strong>Nível 3:</strong> {character.genius.level3 || "Não definido"}</p>
              <p><strong>Despertar:</strong> {character.genius.awakening || "Não definido"}</p>
            </article>
          </>
        )}
      </div>
    </aside>
  );
}

export default LeftPanel;