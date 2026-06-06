import { useState } from "react";

function InventoryItemCard({ item, onEdit, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="inventory-item-card retractable-card">
      <div className="inventory-item-header">
        <button
          type="button"
          className="collapse-toggle"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? "⌄" : "›"}
        </button>

        <strong>{item.name || "Item sem nome"}</strong>

        <span className="inventory-item-quantity">
          {item.quantity ?? 1}x
        </span>
      </div>

      {isOpen && (
        <div className="retractable-content">
          <p>
            <strong>Categoria:</strong> {item.category || "Geral"}
          </p>

          <p>
            <strong>Dano:</strong> {item.damage || "-"}
          </p>

          <p>
            <strong>Uso:</strong> {item.use || "-"}
          </p>

          {item.durability !== undefined && item.durability !== "" && (
            <p>
              <strong>Vida/Durabilidade:</strong> {item.durability}
            </p>
          )}

          <p>
            <strong>Descrição:</strong>
          </p>

          <p>{item.description || "Sem descrição definida."}</p>

          <div className="genius-card-actions">
            <button
              type="button"
              className="add-button"
              onClick={() => onEdit(item)}
            >
              Editar
            </button>

            <button
              type="button"
              className="remove-button"
              onClick={() => onRemove(item.id)}
            >
              Remover
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default InventoryItemCard;