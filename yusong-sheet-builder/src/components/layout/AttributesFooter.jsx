import AttributeBox from "../attributes/AttributeBox";

const attributeLabels = [
  { key: "strength", label: "FOR", name: "Força" },
  { key: "agility", label: "AGI", name: "Agilidade" },
  { key: "constitution", label: "CON", name: "Constituição" },
  { key: "size", label: "TAM", name: "Tamanho" },
  { key: "power", label: "POD", name: "Poder" },
  { key: "intelligence", label: "INT", name: "Inteligência" },
  { key: "charisma", label: "CAR", name: "Carisma" },
  { key: "reaction", label: "REA", name: "Reação" },
  { key: "health", label: "SAU", name: "Saúde" },
];

function AttributesFooter({ character }) {
  return (
    <footer className="attributes-panel panel">
      <div className="section-title">
        <h2>Características</h2>
      </div>

      <div className="attributes-grid">
        {attributeLabels.map((attribute) => (
          <AttributeBox
            key={attribute.key}
            label={attribute.label}
            name={attribute.name}
            value={character.attributes[attribute.key]}
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