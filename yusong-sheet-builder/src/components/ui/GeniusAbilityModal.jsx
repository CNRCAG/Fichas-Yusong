import { useEffect, useState } from "react";

const emptyAbility = {
  name: "Nova Habilidade",
  level: "Nível 1",
  action: "Passiva",
  staminaCost: 0,
  description: "",
};

function GeniusAbilityModal({ ability, onSave, onClose }) {
  const [formData, setFormData] = useState(emptyAbility);
  const [localStaminaCost, setLocalStaminaCost] = useState("0");

  useEffect(() => {
    const initialData = ability || emptyAbility;

    setFormData({
      ...emptyAbility,
      ...initialData,
    });

    setLocalStaminaCost(String(initialData.staminaCost ?? 0));
  }, [ability]);

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function commitStaminaCost() {
    const numericValue = Number(localStaminaCost);

    if (localStaminaCost === "" || Number.isNaN(numericValue)) {
      setLocalStaminaCost(String(formData.staminaCost ?? 0));
      return;
    }

    const limitedValue = Math.max(0, Math.floor(numericValue));

    updateField("staminaCost", limitedValue);
    setLocalStaminaCost(String(limitedValue));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const numericValue = Number(localStaminaCost);
    const finalCost =
      localStaminaCost === "" || Number.isNaN(numericValue)
        ? 0
        : Math.max(0, Math.floor(numericValue));

    onSave({
      ...formData,
      staminaCost: finalCost,
    });
  }

  return (
    <div className="modal-backdrop">
      <section className="modal-panel genius-modal">
        <div className="modal-header">
          <h2>{ability ? "Editar Habilidade" : "Nova Habilidade"}</h2>

          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="genius-modal-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              type="text"
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </label>

          <div className="genius-modal-grid">
            <label>
              Nível
              <select
                value={formData.level}
                onChange={(event) => updateField("level", event.target.value)}
              >
                <option value="Nível 1">Nível 1</option>
                <option value="Nível 2">Nível 2</option>
                <option value="Nível 3">Nível 3</option>
                <option value="Despertar">Despertar</option>
              </select>
            </label>

            <label>
              Ação
              <select
                value={formData.action}
                onChange={(event) => updateField("action", event.target.value)}
              >
                <option value="Passiva">Passiva</option>
                <option value="Livre">Livre</option>
                <option value="Movimento">Movimento</option>
                <option value="Padrão">Padrão</option>
                <option value="Completa">Completa</option>
                <option value="Reação">Reação</option>
                <option value="Varia">Varia</option>
              </select>
            </label>

            <label>
              Custo de Stamina
              <input
                type="text"
                inputMode="numeric"
                value={localStaminaCost}
                onChange={(event) => setLocalStaminaCost(event.target.value)}
                onBlur={commitStaminaCost}
              />
            </label>
          </div>

          <label>
            Descrição
            <textarea
              value={formData.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Descreva o efeito da habilidade..."
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="remove-button" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="add-button">
              Salvar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default GeniusAbilityModal;