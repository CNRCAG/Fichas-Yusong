// src/components/talents/TalentCard.jsx
function TalentCard({ talent, currentStamina, onUseTalent }) {
  const canUse = currentStamina >= talent.staminaCost;

  return (
    <article className="talent-card">
      <div className="talent-card-header">
        <h3>{talent.name}</h3>
        <span>Custo: {talent.staminaCost} Stamina</span>
      </div>

      <p>{talent.description}</p>

      <button
        onClick={() => onUseTalent(talent.id)}
        disabled={!canUse}
        className={canUse ? "active" : "disabled"}
      >
        Usar
      </button>
    </article>
  );
}

export default TalentCard;