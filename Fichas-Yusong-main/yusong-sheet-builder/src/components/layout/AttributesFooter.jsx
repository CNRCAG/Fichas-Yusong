import AttributeBox from "../attributes/AttributeBox";
import { attributes } from "../../data/attributes";


function AttributesFooter({ character, onUpdateAttribute, onRoll }) {
  return (
    <footer className="attributes-panel panel">
      <div className="section-title">
        <h2>Características</h2>
        <small>Limite comum: 7 · Limite especial: 12</small>
      </div>

      <div className="attributes-grid">
        {attributes.map((attribute) => (
          <AttributeBox
            key={attribute.key}
            attributeKey={attribute.key}
            label={attribute.label}
            name={attribute.name}
            value={character.attributes[attribute.key]}
            onUpdateAttribute={onUpdateAttribute}
            onRoll={onRoll}
          />
        ))}
      </div>

      <div className="reaction-row">
        <button
          type="button"
          className="reaction-card reaction-card-rollable"
          onClick={() => onRoll("Esquiva", character.reactions.dodge)}
          title="Rolar Esquiva"
        >
          <span>Esquiva</span>
          <strong>{character.reactions.dodge}</strong>
        </button>

        <button
          type="button"
          className="reaction-card reaction-card-rollable"
          onClick={() => onRoll("Contra-ataque", character.reactions.counterAttack)}
          title="Rolar Contra-ataque"
        >
          <span>Contra-ataque</span>
          <strong>{character.reactions.counterAttack}</strong>
        </button>
      </div>
    </footer>
  );
}

export default AttributesFooter;