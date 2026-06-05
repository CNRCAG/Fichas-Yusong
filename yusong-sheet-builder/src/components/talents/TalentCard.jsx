import { useState } from "react";

function TalentCard({ talent, currentStamina, onUseTalent, onRemoveTalent }) {
  const [isOpen, setIsOpen] = useState(false);
  const isPassive = talent.action === "Passiva";
  const canUse = isPassive || currentStamina >= talent.staminaCost;

  return (
    <article className={`talent-card retractable-card ${isOpen ? "open" : ""}`}>
      <div className="talent-card-header">
        <div className="talent-card-left">
          <button
            type="button"
            className="collapse-toggle"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? "⌄" : "›"}
          </button>

          <h3>{talent.name}</h3>
        </div>

        {!isPassive && (
          <button
            type="button"
            onClick={() => onUseTalent(talent.id)}
            disabled={!canUse}
            className={canUse ? "active" : "disabled"}
          >
            Usar
          </button>
        )}
      </div>

      {isOpen && (
        <div className="talent-card-body">
          <p>
            <strong>Categoria:</strong> {talent.category}
          </p>

          <p>
            <strong>Ação:</strong> {talent.action}
          </p>

          <p>
            <strong>Custo:</strong>{" "}
            {talent.specialCost || `${talent.staminaCost} Stamina`}
          </p>

          {talent.prerequisites && (
            <p>
              <strong>Pré-requisitos:</strong> {talent.prerequisites}
            </p>
          )}

          <p>{talent.description}</p>

          <button
            type="button"
            className="remove-button"
            onClick={() => onRemoveTalent(talent.id)}
          >
            Remover
          </button>
        </div>
      )}
    </article>
  );
}

export default TalentCard;