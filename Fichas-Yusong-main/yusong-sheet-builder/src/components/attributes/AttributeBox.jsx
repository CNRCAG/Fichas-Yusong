import { useEffect, useState } from "react";

function AttributeBox({
  attributeKey,
  label,
  name,
  value,
  onUpdateAttribute,
  onRoll,
}) {
  const [localValue, setLocalValue] = useState(String(value));

  useEffect(() => {
    setLocalValue(String(value));
  }, [value]);

  function commitValue() {
    const numericValue = Number(localValue);

    if (!localValue || Number.isNaN(numericValue)) {
      setLocalValue(String(value));
      return;
    }

    const limitedValue = Math.min(12, Math.max(1, numericValue));

    onUpdateAttribute(attributeKey, limitedValue);
    setLocalValue(String(limitedValue));
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      commitValue();
      event.currentTarget.blur();
    }
  }

  return (
    <article className="attribute-box">
      <span>{label}</span>

      <input
        className="attribute-input"
        type="text"
        inputMode="numeric"
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
        onBlur={commitValue}
        onKeyDown={handleKeyDown}
      />

      <div className="attribute-bottom-row">
        <small>{name}</small>

        <button
          type="button"
          className="attribute-roll-button"
          onClick={() => onRoll(`Teste (${name})`, `1d20+${value}`)}
          title={`Rolar teste de ${name} (1d20+${value})`}
        >
          🎲
        </button>
      </div>
    </article>
  );
}

export default AttributeBox;