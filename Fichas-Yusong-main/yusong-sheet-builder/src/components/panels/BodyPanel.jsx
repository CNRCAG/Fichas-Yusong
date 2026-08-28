import bodyHologram from "../../assets/body/body-hologram.webp";
import BodyPart from "../body/BodyPart";

const partPositions = {
  head: "part-head",
  torso: "part-torso",
  abdomen: "part-abdomen",
  rightArm: "part-right-arm",
  leftArm: "part-left-arm",
  rightLeg: "part-right-leg",
  leftLeg: "part-left-leg",
};

function BodySilhouette() {
  return (
    <img
      className="body-silhouette"
      src={bodyHologram}
      alt="Silhueta holográfica do personagem"
      draggable={false}
    />
  );
}

function BodyPanel({ character, onChangeBodyArmor, onSetBodyArmor, onChangeBodyDice, onRoll }) {
  const memberDiceOptions = character.body
    .filter((part) => part.type === "member")
    .map((part) => part.dice);

  return (
    <section className="body-panel panel center-panel">
      <div className="section-title">
        <h2>Corpo</h2>
      </div>

      <div className="body-map">
        <div className="body-grid-lines"></div>

        <div className="body-figure-frame">
          <div className="body-figure" aria-hidden="true">
            <BodySilhouette />
          </div>

          {character.body.map((part) => (
            <BodyPart
              key={part.id}
              part={part}
              className={`body-part-floating ${partPositions[part.id]}`}
              diceOptions={memberDiceOptions}
              onChangeArmor={onChangeBodyArmor}
              onSetArmor={onSetBodyArmor}
              onChangeDice={onChangeBodyDice}
              onRoll={onRoll}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default BodyPanel;