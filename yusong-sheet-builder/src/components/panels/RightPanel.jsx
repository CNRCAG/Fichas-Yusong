import { useState } from "react";
import PanelTabs from "../ui/PanelTabs";
import { skills } from "../../data/skills";
import { conditions } from "../../data/conditions";

const tabs = [
  { id: "inventory", label: "Inventário" },
  { id: "skills", label: "Perícias" },
  { id: "conditions", label: "Condições" },
  { id: "notes", label: "Notas" },
];

function RightPanel({ character, onUpdateSkill, onToggleCondition }) {
  const [activeTab, setActiveTab] = useState("inventory");
  const [openSkillId, setOpenSkillId] = useState(null);
  const [openConditionId, setOpenConditionId] = useState(null);

  function toggleSkill(skillId) {
    setOpenSkillId((current) => (current === skillId ? null : skillId));
  }

  function toggleConditionInfo(conditionId) {
    setOpenConditionId((current) =>
      current === conditionId ? null : conditionId
    );
  }

  return (
    <aside className="right-panel panel">
      <PanelTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="panel-content">
        {activeTab === "inventory" && (
          <>
            <div className="section-title">
              <h2>Inventário</h2>
            </div>

            <div className="inventory-section">
              <h3>Carregados</h3>

              <div className="inventory-row">
                <span>Item</span>
                <span>Dano</span>
                <span>Uso</span>
              </div>
            </div>

            <button type="button" className="add-button">
              + Adicionar Item
            </button>
          </>
        )}

        {activeTab === "skills" && (
          <>
            <div className="section-title">
              <h2>Perícias</h2>
            </div>

            <div className="skill-list">
              {skills.map((skill) => {
                const isOpen = openSkillId === skill.id;
                const value = character.skills?.[skill.id] ?? 0;

                return (
                  <article
                    key={skill.id}
                    className={`skill-card retractable-card ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    <div className="retractable-header">
                      <button
                        type="button"
                        className="retractable-toggle"
                        onClick={() => toggleSkill(skill.id)}
                      >
                        {isOpen ? "⌄" : "›"}
                      </button>

                      <strong>{skill.name}</strong>

                      <select
                        className="skill-rank-select"
                        value={value}
                        onChange={(event) =>
                          onUpdateSkill(skill.id, event.target.value)
                        }
                      >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>

                    {isOpen && (
                      <div className="retractable-content">
                        <p>{skill.description}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "conditions" && (
          <>
            <div className="section-title">
              <h2>Condições</h2>
            </div>

            <div className="condition-list">
              {conditions.map((condition) => {
                const isOpen = openConditionId === condition.id;
                const isActive = character.conditions?.[condition.id] ?? false;

                return (
                  <article
                    key={condition.id}
                    className={`condition-card retractable-card ${
                      isOpen ? "open" : ""
                    } ${isActive ? "active-condition" : ""}`}
                  >
                    <div className="retractable-header condition-header">
                      <button
                        type="button"
                        className="retractable-toggle"
                        onClick={() => toggleConditionInfo(condition.id)}
                      >
                        {isOpen ? "⌄" : "›"}
                      </button>

                      <strong>{condition.name}</strong>

                      <label className="condition-switch">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => onToggleCondition(condition.id)}
                        />
                        <span>{isActive ? "Ativa" : "Inativa"}</span>
                      </label>
                    </div>

                    {isOpen && (
                      <div className="retractable-content">
                        <p>{condition.description}</p>

                        <p>
                          <strong>Efeito:</strong> {condition.effect}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <div className="section-title">
              <h2>Notas</h2>
            </div>

            <textarea
              className="notes-area"
              value={character.notes}
              readOnly
              placeholder="Anotações da sessão..."
            />
          </>
        )}
      </div>
    </aside>
  );
}

export default RightPanel;