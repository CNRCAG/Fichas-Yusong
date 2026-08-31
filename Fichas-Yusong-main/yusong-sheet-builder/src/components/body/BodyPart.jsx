import { useEffect, useState } from "react";
import { getBodyPartState, getBodyPartStatusClass } from "../../utils/bodyUtils";

function BodyPart({
  part,
  className = "",
  diceOptions = [],
  onChangeArmor,
  onSetArmor,
  onChangeDice,
  onRoll,
  presentationMode,
}) {
  const state = getBodyPartState(part.currentArmor);
  const statusClass = getBodyPartStatusClass(part.currentArmor);

  const isAtMinimum = part.currentArmor <= 0;
  const isAtMaximum = part.currentArmor >= part.maxArmor;
  const isMember = part.type === "member";

  const [localArmor, setLocalArmor] = useState(String(part.currentArmor));

  useEffect(() => {
    setLocalArmor(String(part.currentArmor));
  }, [part.currentArmor]);

  function commitArmor() {
    const numericValue = Number(localArmor);

    if (localArmor === "" || Number.isNaN(numericValue)) {
      setLocalArmor(String(part.currentArmor));
      return;
    }

    const limitedValue = Math.min(
      part.maxArmor,
      Math.max(0, Math.floor(numericValue))
    );

    onSetArmor(part.id, limitedValue);
    setLocalArmor(String(limitedValue));
  }

  function handleArmorKeyDown(event) {
    if (event.key === "Enter") {
      commitArmor();
      event.currentTarget.blur();
    }
  }

  return (
    <article className={`body-part ${className}`}>
      <div className="body-part-top">
        <h3>{part.name}</h3>
        <span className={statusClass}>{state}</span>
      </div>

      {isMember ? (
        <div className="body-dice-row">
          <select
            className="body-dice-select"
            value={part.dice}
            onChange={(event) => onChangeDice(part.id, event.target.value)}
            disabled={presentationMode}
          >
            {diceOptions.map((dice, index) => (
              <option key={`${dice}-${index}`} value={dice}>
                {dice}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="body-dice-roll-button"
            onClick={() => onRoll(`Dano (${part.name})`, part.dice)}
            title={
              isAtMinimum
                ? `${part.name} está inutilizado`
                : `Rolar dano de ${part.name}`
            }
            disabled={isAtMinimum}
          >
            🎲
          </button>
        </div>
      ) : (
        <strong className="body-dice">{part.dice}</strong>
      )}

      <fieldset className="armor-control" disabled={presentationMode}>
        <button
          type="button"
          onClick={() => onChangeArmor(part.id, -1)}
          disabled={isAtMinimum}
        >
          -
        </button>

        <strong className="armor-editable">
          <input
            type="text"
            inputMode="numeric"
            value={localArmor}
            onChange={(event) => setLocalArmor(event.target.value)}
            onBlur={commitArmor}
            onKeyDown={handleArmorKeyDown}
          />
          <span>/</span>
          <span>{part.maxArmor}</span>
        </strong>

        <button
          type="button"
          onClick={() => onChangeArmor(part.id, 1)}
          disabled={isAtMaximum}
        >
          +
        </button>
      </fieldset>
    </article>
  );
}

export default BodyPart;