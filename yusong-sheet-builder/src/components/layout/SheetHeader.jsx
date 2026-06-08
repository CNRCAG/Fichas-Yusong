import { useRef } from "react";
import { schools } from "../../data/schools";
import StatCard from "../ui/StatCard";
import { origins } from "../../data/origins";
import { martialArts } from "../../data/martialArts";

function SheetHeader({ character, onUpdateIdentity, onUpdateResource }) {
  const { identity, resources } = character;
  const fileInputRef = useRef(null);

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Escolha um arquivo de imagem válido.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      onUpdateIdentity("image", reader.result);
    };

    reader.readAsDataURL(file);
  }

  function handleRemoveImage(event) {
    event.stopPropagation();
    onUpdateIdentity("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <header className="sheet-header">
      <section className="header-info">
        <button
          type="button"
          className={`portrait-box ${identity.image ? "has-image" : ""}`}
          onClick={handleImageClick}
        >
          {identity.image ? (
            <>
              <img src={identity.image} alt="Imagem do personagem" />

              <span className="portrait-overlay">Trocar imagem</span>

              <span
                role="button"
                tabIndex={0}
                className="portrait-remove"
                onClick={handleRemoveImage}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleRemoveImage(event);
                  }
                }}
              >
                ×
              </span>
            </>
          ) : (
            <span>Imagem</span>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="portrait-input"
            onChange={handleImageChange}
          />
        </button>

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
              type="text"
              inputMode="numeric"
              value={identity.level}
              onChange={(e) => onUpdateIdentity("level", e.target.value)}
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
              <option value="">Escolha uma escola</option>

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
              <option value="">Escolha um tipo</option>
              <option value="prodigio">Prodígio</option>
              <option value="diligente-persistente">
                Diligente Persistente
              </option>
              <option value="diligente-super-humano">
                Diligente Super Humano
              </option>
            </select>
          </label>

          <label>
            Classe
            <select
              value={identity.characterClass}
              onChange={(e) =>
                onUpdateIdentity("characterClass", e.target.value)
              }
            >
              <option value="">Escolha uma classe</option>
              <option value="bruto">Bruto</option>
              <option value="agil">Ágil</option>
              <option value="tatico">Tático</option>
              <option value="comando">Comando</option>
            </select>
          </label>

          <label>
            Origem
            <select
              value={identity.origin}
              onChange={(e) => onUpdateIdentity("origin", e.target.value)}
            >
              <option value="">Escolha uma opção</option>

              {origins.map((origin) => (
                <option key={origin.name} value={origin.name}>
                  {origin.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Arte Marcial
            <select
              value={identity.martialArt}
              onChange={(e) => onUpdateIdentity("martialArt", e.target.value)}
            >
              <option value="">Escolha uma opção</option>

              {martialArts.map((martialArt) => (
                <option key={martialArt.name} value={martialArt.name}>
                  {martialArt.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="combat-summary">
        <StatCard
          label="Vida Real"
          editable
          currentValue={resources.currentLife}
          maxValue={resources.maxLife}
          onChange={(value) => onUpdateResource("currentLife", value)}
        />

        <StatCard
          label="Stamina"
          editable
          currentValue={resources.currentStamina}
          maxValue={resources.maxStamina}
          onChange={(value) => onUpdateResource("currentStamina", value)}
        />
        
        <StatCard label="RD" value={resources.rd} />
        <StatCard label="Movimento" value={`${resources.movement}m`} />
        <StatCard label="Corrida" value={`${resources.run}m`} />
      </section>
    </header>
  );
}

export default SheetHeader;