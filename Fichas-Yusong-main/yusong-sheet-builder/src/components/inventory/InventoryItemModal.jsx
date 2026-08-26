import { useEffect, useState } from "react";
import { systemItems } from "../../data/items";

const emptyItem = {
  name: "",
  category: "Geral",
  damage: "-",
  use: "Utilitário",
  quantity: 1,
  description: "",
  source: "custom",
};

function InventoryItemModal({ item, onSave, onClose }) {
  const [mode, setMode] = useState("system");
  const [selectedSystemItemId, setSelectedSystemItemId] = useState("");
  const [formData, setFormData] = useState(emptyItem);
  const [localQuantity, setLocalQuantity] = useState("1");

  useEffect(() => {
    if (item) {
      setMode(item.source === "system" ? "system" : "custom");
      setFormData({
        ...emptyItem,
        ...item,
      });
      setLocalQuantity(String(item.quantity ?? 1));
    } else {
      setMode("system");
      setSelectedSystemItemId("");
      setFormData(emptyItem);
      setLocalQuantity("1");
    }
  }, [item]);

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function selectSystemItem(itemId) {
    setSelectedSystemItemId(itemId);

    const selected = systemItems.find((currentItem) => currentItem.id === itemId);

    if (!selected) return;

    setFormData({
      ...selected,
      quantity: Number(localQuantity) || 1,
      source: "system",
      systemItemId: selected.id,
    });
  }

  function commitQuantity() {
    const numericValue = Number(localQuantity);

    if (localQuantity === "" || Number.isNaN(numericValue)) {
      setLocalQuantity(String(formData.quantity ?? 1));
      return;
    }

    const limitedValue = Math.max(1, Math.floor(numericValue));

    updateField("quantity", limitedValue);
    setLocalQuantity(String(limitedValue));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const numericQuantity = Number(localQuantity);
    const finalQuantity =
      localQuantity === "" || Number.isNaN(numericQuantity)
        ? 1
        : Math.max(1, Math.floor(numericQuantity));

    onSave({
      ...formData,
      name: formData.name || "Item sem nome",
      quantity: finalQuantity,
    });
  }

  return (
    <div className="modal-backdrop">
      <section className="modal-panel inventory-modal">
        <div className="modal-header">
          <h2>{item ? "Editar Item" : "Adicionar Item"}</h2>

          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {!item && (
          <div className="inventory-mode-tabs">
            <button
              type="button"
              className={mode === "system" ? "active" : ""}
              onClick={() => setMode("system")}
            >
              Item do Sistema
            </button>

            <button
              type="button"
              className={mode === "custom" ? "active" : ""}
              onClick={() => {
                setMode("custom");
                setFormData(emptyItem);
                setSelectedSystemItemId("");
                setLocalQuantity("1");
              }}
            >
              Criar Item
            </button>
          </div>
        )}

        <form className="inventory-modal-form" onSubmit={handleSubmit}>
          {mode === "system" && !item && (
            <label>
              Item
              <select
                value={selectedSystemItemId}
                onChange={(event) => selectSystemItem(event.target.value)}
              >
                <option value="">Escolha um item</option>

                {systemItems.map((systemItem) => (
                  <option key={systemItem.id} value={systemItem.id}>
                    {systemItem.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="inventory-modal-grid">
            <label>
              Nome
              <input
                type="text"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                disabled={mode === "system" && !item}
              />
            </label>

            <label>
              Categoria
              <input
                type="text"
                value={formData.category}
                onChange={(event) => updateField("category", event.target.value)}
                disabled={mode === "system" && !item}
              />
            </label>

            <label>
              Quantidade
              <input
                type="text"
                inputMode="numeric"
                value={localQuantity}
                onChange={(event) => setLocalQuantity(event.target.value)}
                onBlur={commitQuantity}
              />
            </label>
          </div>

          <div className="inventory-modal-grid">
            <label>
              Dano
              <input
                type="text"
                value={formData.damage}
                onChange={(event) => updateField("damage", event.target.value)}
                disabled={mode === "system" && !item}
              />
            </label>

            <label>
              Uso
              <input
                type="text"
                value={formData.use}
                onChange={(event) => updateField("use", event.target.value)}
                disabled={mode === "system" && !item}
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
              disabled={mode === "system" && !item}
              placeholder="Descreva o item..."
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

export default InventoryItemModal;