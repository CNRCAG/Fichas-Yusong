import { useEffect, useState } from "react";
import PanelTabs from "../ui/PanelTabs";
import TalentCard from "../talents/TalentCard";
import TalentPicker from "../talents/TalentPicker";
import { origins } from "../../data/origins";
import { martialArts } from "../../data/martialArts";

const tabs = [
  { id: "talents", label: "Talentos" },
  { id: "genius", label: "Gênio" },
];

function LeftPanel({
  character,
  onUseTalent,
  onAddTalent,
  onRemoveTalent,
  onUseGenius,
}) {
  const [activeTab, setActiveTab] = useState("talents");
  const [currentBenefits, setCurrentBenefits] = useState([]);
  const [isTalentPickerOpen, setIsTalentPickerOpen] = useState(false);

  useEffect(() => {
    const benefits = [];

    const originBenefit = origins.find(
      (origin) => origin.name === character.identity.origin
    );

    if (originBenefit) benefits.push(originBenefit);

    const martialBenefit = martialArts.find(
      (martialArt) => martialArt.name === character.identity.martialArt
    );

    if (martialBenefit) benefits.push(martialBenefit);

    setCurrentBenefits(benefits);
  }, [character.identity.origin, character.identity.martialArt]);

  return (
    <aside className="left-panel panel">
      <PanelTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="panel-content">
        {activeTab === "talents" && (
          <>
            <div className="section-title section-title-row">
              <h2>Talentos</h2>

              <button
                type="button"
                className="add-button"
                onClick={() => setIsTalentPickerOpen(true)}
              >
                + Talento
              </button>
            </div>

            <div className="benefits-list">
              {currentBenefits.map((benefit) => (
                <div key={benefit.name} className="benefit-card">
                  <strong>{benefit.name}:</strong> {benefit.benefit}
                </div>
              ))}
            </div>

            <div className="talent-list">
              {character.talents.length > 0 ? (
                character.talents.map((talent) => (
                  <TalentCard
                    key={talent.id}
                    talent={talent}
                    currentStamina={character.resources.currentStamina}
                    onUseTalent={onUseTalent}
                    onRemoveTalent={onRemoveTalent}
                  />
                ))
              ) : (
                <p className="empty-message">Nenhum talento adicionado.</p>
              )}
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

              <p>
                <strong>Nível 1:</strong>{" "}
                {character.genius.level1 || "Não definido"}
              </p>

              <p>
                <strong>Nível 2:</strong>{" "}
                {character.genius.level2 || "Não definido"}
              </p>

              <p>
                <strong>Nível 3:</strong>{" "}
                {character.genius.level3 || "Não definido"}
              </p>

              <p>
                <strong>Despertar:</strong>{" "}
                {character.genius.awakening || "Não definido"}
              </p>
            </article>
          </>
        )}
      </div>

      {isTalentPickerOpen && (
        <TalentPicker
          characterTalents={character.talents}
          onAddTalent={onAddTalent}
          onRemoveTalent={onRemoveTalent}
          onClose={() => setIsTalentPickerOpen(false)}
        />
      )}
    </aside>
  );
}

export default LeftPanel;