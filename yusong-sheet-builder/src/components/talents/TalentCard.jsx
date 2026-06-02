function TalentCard({ talent }) {
  return (
    <article className="talent-card">
      <div className="talent-card-header">
        <div>
          <h3>{talent.name}</h3>
          <span>
            {talent.cost} • {talent.action}
          </span>
        </div>

        <button type="button">Usar</button>
      </div>

      <p>{talent.description}</p>
    </article>
  );
}

export default TalentCard;