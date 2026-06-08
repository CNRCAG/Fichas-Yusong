import { useMemo, useState } from "react";
import { getCharacterDisplayName } from "../../utils/storage";
import { getSchoolById } from "../../data/schools";

function formatCharacterDate(date) {
  if (!date) return "Desconhecida";

  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

function getCharacterSchoolName(character) {
  const schoolId = character.identity?.school;
  const school = schoolId ? getSchoolById(schoolId) : null;

  return school?.name || "Sem escola";
}

function getCharacterClassName(character) {
  const characterClass = character.identity?.characterClass;

  const classNames = {
    bruto: "Bruto",
    agil: "Ágil",
    tatico: "Tático",
    comando: "Comando",
  };

  return classNames[characterClass] || "Sem classe";
}

function getCharacterTypeName(character) {
  const type = character.identity?.type;

  const typeNames = {
    prodigio: "Prodígio",
    "diligente-persistente": "Diligente Persistente",
    "diligente-super-humano": "Diligente Super Humano",
  };

  return typeNames[type] || "Sem tipo";
}

function CharacterManager({
  characters,
  onCreateCharacter,
  onOpenCharacter,
  onDeleteCharacter,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCharacters = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return characters;

    return characters.filter((character) => {
      const name = getCharacterDisplayName(character).toLowerCase();
      const school = getCharacterSchoolName(character).toLowerCase();
      const characterClass = getCharacterClassName(character).toLowerCase();

      return (
        name.includes(normalizedSearch) ||
        school.includes(normalizedSearch) ||
        characterClass.includes(normalizedSearch)
      );
    });
  }, [characters, searchTerm]);

  return (
    <main className="character-manager-page theme-neutral">
      <section className="character-manager">
        <div className="character-manager-topbar">
          <div>
            <h1>Personagens</h1>
            <p>Escolha uma ficha salva ou crie um novo personagem.</p>
          </div>

          <button
            type="button"
            className="manager-primary-button"
            onClick={onCreateCharacter}
          >
            Novo Personagem
          </button>
        </div>

        <div className="character-manager-toolbar">
          <h2>Estudantes: {characters.length}</h2>

          <label className="character-search">
            <span>Buscar personagem</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por nome, escola ou classe..."
            />
          </label>
        </div>

        {characters.length === 0 ? (
          <div className="empty-character-list">
            <h2>Nenhum personagem criado.</h2>
            <p>Crie seu primeiro personagem para começar.</p>
          </div>
        ) : filteredCharacters.length === 0 ? (
          <div className="empty-character-list">
            <h2>Nenhum resultado encontrado.</h2>
            <p>Tente buscar por outro nome, escola ou classe.</p>
          </div>
        ) : (
          <div className="character-card-list">
            {filteredCharacters.map((character) => {
              const name = getCharacterDisplayName(character);
              const schoolName = getCharacterSchoolName(character);
              const school = character.identity?.school
                ? getSchoolById(character.identity.school)
                : null;

              const cardThemeClass = school?.themeClass || "theme-neutral";
              const className = getCharacterClassName(character);
              const typeName = getCharacterTypeName(character);
              const level = character.identity?.level || 1;
              const image = character.identity?.image;

              return (
                <article key={character.id} className={`character-card ${cardThemeClass}`}>
                  <div className="character-card-menu">
                    <button
                      type="button"
                      title="Excluir personagem"
                      onClick={() => onDeleteCharacter(character.id)}
                    >
                      ×
                    </button>
                  </div>

                  <div className="character-card-main">
                    <div className="character-portrait">
                      {image ? (
                        <img src={image} alt={name} />
                      ) : (
                        <span>{name.slice(0, 1).toUpperCase()}</span>
                      )}
                    </div>

                    <div className="character-card-info">
                      <h2>{name}</h2>

                      <strong>{className}</strong>

                      <p>{typeName}</p>

                      <small>
                        {schoolName} · Nível {level}
                      </small>

                      <small>
                        Atualizado em {formatCharacterDate(character.updatedAt)}
                      </small>
                    </div>
                  </div>

                  <div className="character-card-actions">
                    <button
                      type="button"
                      className="manager-primary-button"
                      onClick={() => onOpenCharacter(character.id)}
                    >
                      Acessar Ficha
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default CharacterManager;