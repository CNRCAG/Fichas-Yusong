import { useEffect, useState } from "react";
import { playRollingSound, playResultSound } from "../../utils/sound";

function DiceRollOverlay({ roll, onDone }) {
  const [phase, setPhase] = useState("rolling");

  useEffect(() => {
    if (!roll) return undefined;

    setPhase("rolling");
    playRollingSound();

    const revealTimer = setTimeout(() => {
      setPhase("result");
      playResultSound(roll);
    }, 420);
    const dismissTimer = setTimeout(() => {
      onDone();
    }, 2000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(dismissTimer);
    };
  }, [roll, onDone]);

  if (!roll) return null;

  return (
    <div className="dice-overlay" role="status" aria-live="polite">
      <div className={`dice-overlay-card ${phase === "result" ? "is-result" : "is-rolling"}`}>
        <span className="dice-overlay-label">{roll.label}</span>

        {phase === "rolling" ? (
          <strong className="dice-overlay-total dice-spin">?</strong>
        ) : (
          <>
            <strong className="dice-overlay-total">{roll.total}</strong>
            <div className="dice-overlay-breakdown">
              {roll.rolls.map((r, index) => (
                <span
                  key={index}
                  className={`dice-pip ${r.flat ? "dice-pip-flat" : ""}`}
                >
                  {r.flat ? (r.value >= 0 ? `+${r.value}` : r.value) : r.value}
                </span>
              ))}
            </div>
            {roll.modifier ? (
              <span
                className={`dice-overlay-condition-note ${
                  roll.modifier > 0 ? "is-positive" : "is-negative"
                }`}
              >
                {roll.modifier > 0 ? "+" : ""}
                {roll.modifier} por condição ativa
              </span>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default DiceRollOverlay;
