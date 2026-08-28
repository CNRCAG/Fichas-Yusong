function DiceLog({ entries }) {
  if (!entries || entries.length === 0) return null;

  return (
    <div className="dice-log">
      <span className="dice-log-title">Rolagens recentes</span>
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
