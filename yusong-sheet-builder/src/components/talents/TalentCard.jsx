function TalentCard({ talent, currentStamina, onUseTalent }) {
  const canUse = currentStamina >= talent.staminaCost;

  return (
    <article className="talent-card">
      <div className="talent-info">
        <strong>{talent.name}</strong>
        <span>Custo: {talent.staminaCost}</span>
      </div>
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