import { getBodyPartState, getBodyPartStatusClass } from "../../utils/bodyUtils";

function BodyPart({ part }) {
  const state = getBodyPartState(part.currentArmor);
  const statusClass = getBodyPartStatusClass(part.currentArmor);

  return (
    <article className="body-part">
      <div className="body-part-header">
        <h3>{part.name}</h3>
        <span>{state}</span>
      </div>

      <strong className="body-dice">{part.dice}</strong>

      <div className="armor-control">
        <button type="button">-</button>
        <strong>
          {part.currentArmor} / {part.maxArmor}
        </strong>
        <button type="button">+</button>
      </div>

      <p className={statusClass}>{state}</p>
    </article>
  );
}

export default BodyPart;