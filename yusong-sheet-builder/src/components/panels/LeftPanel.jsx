import { useEffect, useState } from "react";
import PanelTabs from "../ui/PanelTabs";
import TalentCard from "../talents/TalentCard";
import TalentPicker from "../talents/TalentPicker";
import { origins } from "../../data/origins";
import { martialArts } from "../../data/martialArts";
import GeniusCard from "../ui/GeniusCard";
import GeniusAbilityModal from "../ui/GeniusAbilityModal";

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
  onUpdateGeniusName,
  onAddGeniusAbility,
  onUpdateGeniusAbility,
  onRemoveGeniusAbility,
  onUseGeniusAbility,
}) {
  const [activeTab, setActiveTab] = useState("talents");
  const [currentBenefits, setCurrentBenefits] = useState([]);
  const [openBenefitName, setOpenBenefitName] = useState(null);
  const [isTalentPickerOpen, setIsTalentPickerOpen] = useState(false);
  const [isGeniusModalOpen, setIsGeniusModalOpen] = useState(false);
  const [editingGeniusAbility, setEditingGeniusAbility] = useState(null);

  useEffect(() => {
    const benefits = [];

    const originBenefit = origins.find(
      (origin) => origin.name === character.identity.origin
    );

    if (originBenefit) {
      benefits.push({
        ...originBenefit,
        type: "Origem",
      });
    }

    const martialBenefit = martialArts.find(
      (martialArt) => martialArt.name === character.identity.martialArt
    );

    if (martialBenefit) {
      benefits.push({
        ...martialBenefit,
        type: "Arte Marcial",
      });
    }

    setCurrentBenefits(benefits);
  }, [character.identity.origin, character.identity.martialArt]);

  function toggleBenefit(benefitName) {
    setOpenBenefitName((current) =>
      current === benefitName ? null : benefitName
    );
  }

  function openNewGeniusAbilityModal() {
    setEditingGeniusAbility(null);
    setIsGeniusModalOpen(true);
  }

  function openEditGeniusAbilityModal(ability) {
    setEditingGeniusAbility(ability);
    setIsGeniusModalOpen(true);
  }

  function handleSaveGeniusAbility(abilityData) {
    if (editingGeniusAbility) {
      onUpdateGeniusAbility(editingGeniusAbility.id, abilityData);
    } else {
      onAddGeniusAbility(abilityData);
    }

    setIsGeniusModalOpen(false);
    setEditingGeniusAbility(null);
  }

  function closeGeniusModal() {
    setIsGeniusModalOpen(false);
    setEditingGeniusAbility(null);
  }

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

            {currentBenefits.length > 0 && (
              <div className="benefits-list">
                {currentBenefits.map((benefit) => {
                  const isOpen = openBenefitName === benefit.name;

                  return (
                    <article
                      key={`${benefit.type}-${benefit.name}`}
                      className={`benefit-card retractable-card ${
                        isOpen ? "open" : ""
                      }`}
                    >
                      <div className="benefit-header">
                        <button
                          type="button"
                          className="collapse-toggle"
                          onClick={() => toggleBenefit(benefit.name)}
                        >
                          {isOpen ? "⌄" : "›"}
                        </button>

                        <div>
                          <strong>{benefit.name}</strong>
                          <span>{benefit.type}</span>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="benefit-body">
                          <p>{benefit.benefit}</p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}

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
            <div className="section-title section-title-row">
              <h2>Perícia de Gênio</h2>

              <button
                type="button"
                className="add-button"
                onClick={openNewGeniusAbilityModal}
              >
                + Habilidade
              </button>
            </div>

            <div className="genius-name-field">
              <label>
                Nome da Perícia
                <input
                  type="text"
                  value={character.genius.name}
                  onChange={(event) => onUpdateGeniusName(event.target.value)}
                  placeholder="Ex: Berserker Imortal"
                />
              </label>
            </div>

            <div className="genius-ability-list">
              {character.genius.abilities.length > 0 ? (
                character.genius.abilities.map((ability) => (
                  <GeniusCard
                    key={ability.id}
                    ability={ability}
                    currentStamina={character.resources.currentStamina}
                    onEdit={openEditGeniusAbilityModal}
                    onRemove={onRemoveGeniusAbility}
                    onUse={onUseGeniusAbility}
                  />
                ))
              ) : (
                <p className="empty-message">
                  Nenhuma habilidade de gênio adicionada.
                </p>
              )}
            </div>
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

      {isGeniusModalOpen && (
        <GeniusAbilityModal
          ability={editingGeniusAbility}
          onSave={handleSaveGeniusAbility}
          onClose={closeGeniusModal}
        />
      )}
    </aside>
  );
}

export default LeftPanel;