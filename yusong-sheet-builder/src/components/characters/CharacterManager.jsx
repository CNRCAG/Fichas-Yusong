import { getCharacterDisplayName } from "../../utils/storage";

function CharacterManager({
  characters,
  onCreateCharacter,
  onOpenCharacter,
  onDeleteCharacter,
}) {
  return (
    <main className="character-manager-page theme-neutral">
      <section className="character-manager">
        <div className="character-manager-header">
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

        {characters.length === 0 ? (
          <div className="empty-character-list">
            <h2>Nenhum personagem criado.</h2>
            <p>Crie seu primeiro personagem para começar.</p>
          </div>
        ) : (
          <div className="character-card-list">
            {characters.map((character) => (
              <article key={character.id} className="character-card">
                <div className="character-card-info">
                  <h2>{getCharacterDisplayName(character)}</h2>

                  <p>
                    {character.identity?.school || "Sem escola"} ·{" "}
                    {character.identity?.characterClass || "Sem classe"} ·{" "}
                    Nível {character.identity?.level || 1}
                  </p>

                  <small>
                    Última edição:{" "}
                    {character.updatedAt
                      ? new Date(character.updatedAt).toLocaleString()
                      : "Desconhecida"}
                  </small>
                </div>

                <div className="character-card-actions">
                  <button
                    type="button"
                    className="manager-primary-button"
                    onClick={() => onOpenCharacter(character.id)}
                  >
                    Acessar Ficha
                  </button>

                  <button
                    type="button"
                    className="manager-danger-button"
                    onClick={() => onDeleteCharacter(character.id)}
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default CharacterManager;