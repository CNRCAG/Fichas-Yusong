import { getBodyPartState, getBodyPartStatusClass } from "../../utils/bodyUtils";

function BodyPart({ part, className = "", onChangeArmor }) {
  const state = getBodyPartState(part.currentArmor);
  const statusClass = getBodyPartStatusClass(part.currentArmor);

  const isAtMinimum = part.currentArmor <= 0;
  const isAtMaximum = part.currentArmor >= part.maxArmor;

  return (
    <article className={`body-part ${className}`}>
      <div className="body-part-top">
        <h3>{part.name}</h3>
        <span className={statusClass}>{state}</span>
      </div>

      <strong className="body-dice">{part.dice}</strong>

      <div className="armor-control">
        <button
          type="button"
          onClick={() => onChangeArmor(part.id, -1)}
          disabled={isAtMinimum}
        >
          -
        </button>

        <strong>
          {part.currentArmor} / {part.maxArmor}
        </strong>

        <button
          type="button"
          onClick={() => onChangeArmor(part.id, 1)}
          disabled={isAtMaximum}
        >
          +
        </button>
      </div>
    </article>
  );
}

export default BodyPart;