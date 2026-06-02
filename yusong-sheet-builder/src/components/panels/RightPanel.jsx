import { useState } from "react";
import PanelTabs from "../ui/PanelTabs";

const tabs = [
  { id: "inventory", label: "Inventário" },
  { id: "skills", label: "Perícias" },
  { id: "conditions", label: "Condições" },
  { id: "notes", label: "Notas" },
];

const exampleSkills = [
  "Acrobacia",
  "Atletismo",
  "Crime",
  "Enganação",
  "Fama",
  "Fortitude",
  "Furtividade",
  "Intimidação",
  "Intuição",
  "Medicina",
  "Ofício",
  "Percepção",
  "Persuasão",
  "Pontaria",
  "Tática",
  "Tecnologia",
  "Vontade",
];

const exampleConditions = [
  "Amedrontado",
  "Ansioso",
  "Desesperado",
  "Enfurecido",
  "Exausto",
  "Caído",
  "Agarrado",
  "Motivado",
  "Sangrando",
];

function RightPanel({ character }) {
  const [activeTab, setActiveTab] = useState("inventory");

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
              {exampleSkills.map((skill) => (
                <article key={skill} className="skill-card">
                  <span>{skill}</span>
                  <strong>0 / 5</strong>
                </article>
              ))}
            </div>
          </>
        )}

        {activeTab === "conditions" && (
          <>
            <div className="section-title">
              <h2>Condições</h2>
            </div>

            <div className="condition-list">
              {exampleConditions.map((condition) => (
                <label key={condition} className="condition-card">
                  <input type="checkbox" />
                  <span>{condition}</span>
                </label>
              ))}
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