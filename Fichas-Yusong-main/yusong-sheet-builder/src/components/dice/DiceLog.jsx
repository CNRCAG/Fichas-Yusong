import { useState } from "react";

function DiceLog({ entries }) {
  const [collapsed, setCollapsed] = useState(false);

  if (!entries || entries.length === 0) return null;

  if (collapsed) {
    return (
      <button
        type="button"
        className="dice-log-reopen"
        onClick={() => setCollapsed(false)}
        title="Mostrar rolagens recentes"
      >
        🎲
      </button>
    );
  }

  return (
    <div className="dice-log">
      <div className="dice-log-header">
        <span className="dice-log-title">Rolagens recentes</span>
        <button
          type="button"
          className="dice-log-close"
          onClick={() => setCollapsed(true)}
          title="Minimizar"
        >
          ✕
        </button>
      </div>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <span className="dice-log-entry-label">{entry.label}</span>
            <span className="dice-log-entry-notation">{entry.notation}</span>
            <strong className="dice-log-entry-total">{entry.total}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiceLog;
