import { getBodyPartState, getBodyPartStatusClass } from "../../utils/bodyUtils";

function BodyPart({
  part,
  className = "",
  diceOptions = [],
  onChangeArmor,
  onChangeDice,
}) {
  const state = getBodyPartState(part.currentArmor);
  const statusClass = getBodyPartStatusClass(part.currentArmor);

  const isAtMinimum = part.currentArmor <= 0;
  const isAtMaximum = part.currentArmor >= part.maxArmor;
  const isMember = part.type === "member";

  return (
    <article className={`body-part ${className}`}>
      <div className="body-part-top">
        <h3>{part.name}</h3>
        <span className={statusClass}>{state}</span>
      </div>

      {isMember ? (
        <select
          className="body-dice-select"
          value={part.dice}
          onChange={(event) => onChangeDice(part.id, event.target.value)}
        >
          {diceOptions.map((dice, index) => (
            <option key={`${dice}-${index}`} value={dice}>
              {dice}
            </option>
          ))}
        </select>
      ) : (
        <strong className="body-dice">{part.dice}</strong>
      )}

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