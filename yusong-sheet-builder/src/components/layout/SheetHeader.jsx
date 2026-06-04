import { schools } from "../../data/schools";
import StatCard from "../ui/StatCard";
import { origins } from "../../data/origins";
import { martialArts } from "../../data/martialArts";

function SheetHeader({ character, onUpdateIdentity }) {
  const { identity, resources } = character;

  return (
    <header className="sheet-header">
      <section className="header-info">
        <div className="portrait-box">
          <span>Imagem</span>
        </div>

        <div className="identity-grid">
          <label>
            Nome
            <input
              type="text"
              value={identity.name}
              onChange={(e) => onUpdateIdentity("name", e.target.value)}
            />
          </label>

          <label>
            Nível
            <input
              type="number"
              value={identity.level}
              onChange={(e) => onUpdateIdentity("level", Number(e.target.value))}
            />
          </label>

          <label>
            Idade
            <input
              type="text"
              value={identity.age}
              onChange={(e) => onUpdateIdentity("age", e.target.value)}
            />
          </label>

          <label>
            Altura
            <input
              type="text"
              value={identity.height}
              onChange={(e) => onUpdateIdentity("height", e.target.value)}
            />
          </label>

          <label>
            Escola
            <select
              value={identity.school}
              onChange={(e) => onUpdateIdentity("school", e.target.value)}
            >
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Tipo
            <select
              value={identity.type}
              onChange={(e) => onUpdateIdentity("type", e.target.value)}
            >
              <option value="prodigio">Prodígio</option>
              <option value="diligente-persistente">Diligente Persistente</option>
              <option value="diligente-super-humano">Diligente Super Humano</option>
            </select>
          </label>

          <label>
            Classe
            <select
              value={identity.characterClass}
              onChange={(e) => onUpdateIdentity("characterClass", e.target.value)}
            >
              <option value="bruto">Bruto</option>
              <option value="agil">Ágil</option>
              <option value="tatico">Tático</option>
              <option value="comando">Comando</option>
            </select>
          </label>

          {/* Origem como dropdown */}
          <label>
            Origem
            <select
              value={identity.origin}
              onChange={(e) => onUpdateIdentity("origin", e.target.value)}
            >
              <option value="">Escolha uma opção</option>
              {origins.map((o) => (
                <option key={o.name} value={o.name}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>

          {/* Arte Marcial como dropdown */}
          <label>
            Arte Marcial
            <select
              value={identity.martialArt}
              onChange={(e) => onUpdateIdentity("martialArt", e.target.value)}
            >
              <option value="">Escolha uma opção</option>
              {martialArts.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="combat-summary">
        <StatCard
          label="Vida Real"
          value={`${resources.currentLife} / ${resources.maxLife}`}
        />
        <StatCard
          label="Stamina"
          value={`${resources.currentStamina} / ${resources.maxStamina}`}
        />
        <StatCard label="RD" value={resources.rd} />
        <StatCard label="Movimento" value={`${resources.movement}m`} />
        <StatCard label="Corrida" value={`${resources.run}m`} />
      </section>
    </header>
  );
}

export default SheetHeader;