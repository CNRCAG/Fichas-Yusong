import { getBodyPartState, getBodyPartStatusClass } from "../../utils/bodyUtils";

function BodyPart({ part, className = "" }) {
  const state = getBodyPartState(part.currentArmor);
  const statusClass = getBodyPartStatusClass(part.currentArmor);

  return (
    <article className={`body-part ${className}`}>
      <div className="body-part-top">
        <h3>{part.name}</h3>
        <span className={statusClass}>{state}</span>
      </div>

      <strong className="body-dice">{part.dice}</strong>

      <div className="armor-control">
        <button type="button">-</button>

        <strong>
          {part.currentArmor} / {part.maxArmor}
        </strong>

        <button type="button">+</button>
      </div>
    </article>
  );
}

export default BodyPart;