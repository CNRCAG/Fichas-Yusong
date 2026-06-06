import { useState } from "react";
import PanelTabs from "../ui/PanelTabs";
import { skills } from "../../data/skills";
import { conditions } from "../../data/conditions";
import InventoryItemModal from "../inventory/InventoryItemModal";
import InventoryItemCard from "../inventory/InventoryItemCard";

const tabs = [
  { id: "inventory", label: "Inventário" },
  { id: "skills", label: "Perícias" },
  { id: "conditions", label: "Condições" },
  { id: "notes", label: "Notas" },
];

function RightPanel({
  character,
  onUpdateSkill,
  onToggleCondition,
  onAddInventoryItem,
  onUpdateInventoryItem,
  onRemoveInventoryItem,
}) {
  const [activeTab, setActiveTab] = useState("inventory");
  const [openSkillId, setOpenSkillId] = useState(null);
  const [openConditionId, setOpenConditionId] = useState(null);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [editingInventoryItem, setEditingInventoryItem] = useState(null);

  function toggleSkill(skillId) {
    setOpenSkillId((current) => (current === skillId ? null : skillId));
  }

  function toggleConditionInfo(conditionId) {
    setOpenConditionId((current) =>
      current === conditionId ? null : conditionId
    );
  }

  function openNewInventoryItemModal() {
    setEditingInventoryItem(null);
    setIsInventoryModalOpen(true);
  }

  function openEditInventoryItemModal(item) {
    setEditingInventoryItem(item);
    setIsInventoryModalOpen(true);
  }

  function closeInventoryModal() {
    setEditingInventoryItem(null);
    setIsInventoryModalOpen(false);
  }

  function handleSaveInventoryItem(itemData) {
    if (editingInventoryItem) {
      onUpdateInventoryItem(editingInventoryItem.id, itemData);
    } else {
      onAddInventoryItem(itemData);
    }

    closeInventoryModal();
  }

  return (
    <aside className="right-panel panel">
      <PanelTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="panel-content">
        {activeTab === "inventory" && (
          <>
            <div className="section-title section-title-row">
              <h2>Inventário</h2>

              <button
                type="button"
                className="add-button"
                onClick={openNewInventoryItemModal}
              >
                + Item
              </button>
            </div>

            <div className="inventory-section">
              <h3>Carregados</h3>

              <div className="inventory-row inventory-header-row">
                <span>Item</span>
                <span>Qtd.</span>
              </div>

              <div className="inventory-item-list">
                {character.inventory.length > 0 ? (
                  character.inventory.map((item) => (
                    <InventoryItemCard
                      key={item.id}
                      item={item}
                      onEdit={openEditInventoryItemModal}
                      onRemove={onRemoveInventoryItem}
                    />
                  ))
                ) : (
                  <p className="empty-message">Nenhum item adicionado.</p>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "skills" && (
          <>
            <div className="section-title">
              <h2>Perícias</h2>
            </div>

            <div className="skill-list">
              {skills.map((skill) => {
                const isOpen = openSkillId === skill.id;
                const value = character.skills?.[skill.id] ?? 0;

                return (
                  <article
                    key={skill.id}
                    className={`skill-card retractable-card ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    <div className="retractable-header">
                      <button
                        type="button"
                        className="retractable-toggle"
                        onClick={() => toggleSkill(skill.id)}
                      >
                        {isOpen ? "⌄" : "›"}
                      </button>

                      <strong>{skill.name}</strong>

                      <select
                        className="skill-rank-select"
                        value={value}
                        onChange={(event) =>
                          onUpdateSkill(skill.id, event.target.value)
                        }
                      >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>

                    {isOpen && (
                      <div className="retractable-content">
                        <p>{skill.description}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "conditions" && (
          <>
            <div className="section-title">
              <h2>Condições</h2>
            </div>

            <div className="condition-list">
              {conditions.map((condition) => {
                const isOpen = openConditionId === condition.id;
                const isActive = character.conditions?.[condition.id] ?? false;

                return (
                  <article
                    key={condition.id}
                    className={`condition-card retractable-card ${
                      isOpen ? "open" : ""
                    } ${isActive ? "active-condition" : ""}`}
                  >
                    <div className="retractable-header condition-header">
                      <button
                        type="button"
                        className="retractable-toggle"
                        onClick={() => toggleConditionInfo(condition.id)}
                      >
                        {isOpen ? "⌄" : "›"}
                      </button>

                      <strong>{condition.name}</strong>

                      <label className="condition-switch">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => onToggleCondition(condition.id)}
                        />
                        <span>{isActive ? "Ativa" : "Inativa"}</span>
                      </label>
                    </div>

                    {isOpen && (
                      <div className="retractable-content">
                        <p>{condition.description}</p>

                        <p>
                          <strong>Efeito:</strong> {condition.effect}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <div className="section-title">
              <h2>Notas</h2>
            </div>

            <textarea
              className="notes-area"
              value={character.notes}
              readOnly
              placeholder="Anotações da sessão..."
            />
          </>
        )}
      </div>

      {isInventoryModalOpen && (
        <InventoryItemModal
          item={editingInventoryItem}
          onSave={handleSaveInventoryItem}
          onClose={closeInventoryModal}
        />
      )}
    </aside>
  );
}

export default RightPanel;