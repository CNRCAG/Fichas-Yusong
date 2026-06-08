import { useEffect, useState } from "react";

function StatCard({
  label,
  value,
  currentValue,
  maxValue,
  editable = false,
  onChange,
}) {
  const [localValue, setLocalValue] = useState(String(currentValue ?? ""));

  useEffect(() => {
    setLocalValue(String(currentValue ?? ""));
  }, [currentValue]);

  function commitValue() {
    if (!editable) return;

    const numericValue = Number(localValue);

    if (localValue === "" || Number.isNaN(numericValue)) {
      setLocalValue(String(currentValue ?? 0));
      return;
    }

    const limitedValue = Math.min(
      Number(maxValue) || 0,
      Math.max(0, Math.floor(numericValue))
    );

    setLocalValue(String(limitedValue));
    onChange?.(limitedValue);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      commitValue();
      event.currentTarget.blur();
    }
  }

  return (
    <article className="stat-card">
      <span>{label}</span>

      {editable ? (
        <strong className="editable-resource">
          <input
            type="text"
            inputMode="numeric"
            value={localValue}
            onChange={(event) => setLocalValue(event.target.value)}
            onBlur={commitValue}
            onKeyDown={handleKeyDown}
          />

          <span>/</span>

          <span>{maxValue}</span>
        </strong>
      ) : (
        <strong>{value}</strong>
      )}
    </article>
  );
}

export default StatCard;