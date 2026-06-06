import { useState } from "react";

function GeniusCard({
  ability,
  currentStamina,
  onEdit,
  onRemove,
  onUse,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const staminaCost = Number(ability.staminaCost) || 0;
  const canUse = staminaCost > 0 && currentStamina >= staminaCost;
  const isPassive = ability.action === "Passiva";

  return (
    <article className={`genius-card retractable-card ${isOpen ? "open" : ""}`}>
      <div className="genius-card-header">
        <div className="talent-card-left">
          <button
            type="button"
            className="collapse-toggle"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? "⌄" : "›"}
          </button>

          <strong>{ability.name || "Nova Habilidade"}</strong>
        </div>

        {!isPassive && staminaCost > 0 && (
          <button
            type="button"
            onClick={() => onUse(ability.id)}
            disabled={!canUse}
            className={canUse ? "active" : "disabled"}
          >
            Usar
          </button>
        )}
      </div>

      {isOpen && (
        <div className="genius-card-body readonly-genius-body">
          <p>
            <strong>Nível:</strong> {ability.level}
          </p>

          <p>
            <strong>Ação:</strong> {ability.action}
          </p>

          <p>
            <strong>Custo:</strong>{" "}
            {staminaCost > 0 ? `${staminaCost} Stamina` : "Sem custo"}
          </p>

          <p>
            <strong>Descrição:</strong>
          </p>

          <p>{ability.description || "Sem descrição definida."}</p>

          <div className="genius-card-actions">
            <button
              type="button"
              className="add-button"
              onClick={() => onEdit(ability)}
            >
              Editar
            </button>

            <button
              type="button"
              className="remove-button"
              onClick={() => onRemove(ability.id)}
            >
              Remover
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default GeniusCard;