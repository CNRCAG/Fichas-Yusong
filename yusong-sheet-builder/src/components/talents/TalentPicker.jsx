import { useMemo, useState } from "react";
import { talents } from "../../data/talents";

const categoryLabels = [
  { id: "all", label: "Todos" },
  { id: "geral", label: "Geral" },
  { id: "bruto", label: "Bruto" },
  { id: "agil", label: "Ágil" },
  { id: "tatico", label: "Tático" },
  { id: "comando", label: "Comando" },
];

function TalentPicker({ characterTalents, onAddTalent, onRemoveTalent, onClose }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openTalentId, setOpenTalentId] = useState(null);

  const characterTalentIds = characterTalents.map((talent) => talent.id);

  const filteredTalents = useMemo(() => {
    return talents.filter((talent) => {
      const matchesCategory =
        activeCategory === "all" || talent.category === activeCategory;

      const matchesSearch = talent.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  function toggleTalent(talentId) {
    setOpenTalentId((current) => (current === talentId ? null : talentId));
  }

  return (
    <div className="modal-backdrop">
      <section className="talent-picker modal-panel">
        <div className="modal-header">
          <h2>Adicionar Talento</h2>

          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <input
          className="picker-search"
          type="text"
          placeholder="Buscar talento..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="picker-categories">
        {categoryLabels.map((category) => (
            <button
            key={category.id}
            type="button"
            data-category={category.id}
            className={activeCategory === category.id ? "active" : ""}
            onClick={() => setActiveCategory(category.id)}
            >
            {category.label}
            </button>
        ))}
        </div>

        <div className="picker-list">
          {filteredTalents.map((talent) => {
            const isOpen = openTalentId === talent.id;
            const isAdded = characterTalentIds.includes(talent.id);

            return (
              <article key={talent.id} className="talent-picker-card">
                <div className="talent-picker-header">
                  <button
                    type="button"
                    className="collapse-toggle"
                    onClick={() => toggleTalent(talent.id)}
                  >
                    {isOpen ? "⌄" : "›"}
                  </button>

                  <strong className="talent-picker-name">{talent.name}</strong>

                  <button
                    type="button"
                    className={`talent-picker-action ${isAdded ? "remove" : "add"}`}
                    onClick={() => {
                      if (isAdded) {
                        onRemoveTalent(talent.id);
                      } else {
                        onAddTalent(talent);
                      }
                    }}
                  >
                    {isAdded ? "−" : "+"}
                  </button>
                </div>

                {isOpen && (
                  <div className="talent-picker-body">
                    <p>
                      <strong>Categoria:</strong> {talent.category}
                    </p>

                    <p>
                      <strong>Ação:</strong> {talent.action}
                    </p>

                    <p>
                      <strong>Custo:</strong>{" "}
                      {talent.specialCost || `${talent.staminaCost} Stamina`}
                    </p>

                    {talent.prerequisites && (
                      <p>
                        <strong>Pré-requisitos:</strong> {talent.prerequisites}
                      </p>
                    )}

                    <p>{talent.description}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default TalentPicker;