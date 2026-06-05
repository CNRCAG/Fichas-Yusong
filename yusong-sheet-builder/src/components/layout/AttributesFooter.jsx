import AttributeBox from "../attributes/AttributeBox";
import { attributes } from "../../data/attributes";


function AttributesFooter({ character, onUpdateAttribute }) {
  return (
    <footer className="attributes-panel panel">
      <div className="section-title">
        <h2>Características</h2>
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
          />
        ))}
      </div>

      <div className="reaction-row">
        <article className="reaction-card">
          <span>Esquiva</span>
          <strong>{character.reactions.dodge}</strong>
        </article>

        <article className="reaction-card">
          <span>Contra-ataque</span>
          <strong>{character.reactions.counterAttack}</strong>
        </article>
      </div>
    </footer>
  );
}

export default AttributesFooter;