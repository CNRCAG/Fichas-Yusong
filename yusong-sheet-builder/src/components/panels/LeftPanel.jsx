import { useState } from "react";
import PanelTabs from "../ui/PanelTabs";
import TalentCard from "../talents/TalentCard";

const tabs = [
  { id: "talents", label: "Talentos" },
  { id: "genius", label: "Gênio" },
];

const exampleTalents = [
  {
    id: "corpo-de-ferro",
    name: "Corpo de Ferro",
    cost: "25 Stamina",
    action: "Padrão",
    description: "Reduz pela metade o próximo dano recebido.",
  },
  {
    id: "filho-do-vento",
    name: "Filho do Vento",
    cost: "25 Stamina",
    action: "Movimento",
    description: "Durante a duração, cada esquiva gera 1 Ponto de Vento.",
  },
];

function LeftPanel({ character }) {
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

            <div className="talent-list">
              {exampleTalents.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
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
    </aside>
  );
}

export default LeftPanel;