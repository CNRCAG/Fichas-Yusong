// src/components/ui/GeniusCard.jsx
function GeniusCard({ level, description, currentStamina, staminaCost, onUse }) {
  const canUse = currentStamina >= staminaCost;

  return (
    <article className="genius-card">
      <div className="genius-info">
        <strong>{level}</strong>
        <p>{description}</p>
        {staminaCost > 0 && <small>Custo: {staminaCost} Stamina</small>}
      </div>
      {staminaCost > 0 && (
        <button
          onClick={onUse}
          disabled={!canUse}
          className={canUse ? "active" : "disabled"}
        >
          Usar
        </button>
      )}
    </article>
  );
}

export default GeniusCard;