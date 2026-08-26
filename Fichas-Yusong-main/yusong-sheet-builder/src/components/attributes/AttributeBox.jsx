import { useEffect, useState } from "react";

function AttributeBox({ attributeKey, label, name, value, onUpdateAttribute }) {
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

      <div className="section-title">
        <small>Limite comum: 7 • Limite especial: 12</small>
      </div>

      <input
        className="attribute-input"
        type="text"
        inputMode="numeric"
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
        onBlur={commitValue}
        onKeyDown={handleKeyDown}
      />

      <small>{name}</small>
    </article>
  );
}

export default AttributeBox;