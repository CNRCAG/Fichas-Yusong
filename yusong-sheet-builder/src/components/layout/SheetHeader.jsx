import StatCard from "../ui/StatCard";
import { schools } from "../../data/schools";

function SheetHeader({ character }) {
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
            <input type="text" value={identity.name} readOnly />
          </label>

          <label>
            Nível
            <input type="number" value={identity.level} readOnly />
          </label>

          <label>
            Idade
            <input type="text" value={identity.age} readOnly />
          </label>

          <label>
            Altura
            <input type="text" value={identity.height} readOnly />
          </label>

          <label>
            Escola
            <select value={identity.school} disabled>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Tipo
            <select value={identity.type} disabled>
              <option value="prodigio">Prodígio</option>
              <option value="diligente-persistente">Diligente Persistente</option>
              <option value="diligente-super-humano">Diligente Super Humano</option>
            </select>
          </label>

          <label>
            Classe
            <select value={identity.characterClass} disabled>
              <option value="bruto">Bruto</option>
              <option value="agil">Ágil</option>
              <option value="tatico">Tático</option>
              <option value="comando">Comando</option>
            </select>
          </label>

          <label>
            Origem
            <input type="text" value={identity.origin} readOnly />
          </label>

          <label>
            Arte Marcial
            <input type="text" value={identity.martialArt} readOnly />
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