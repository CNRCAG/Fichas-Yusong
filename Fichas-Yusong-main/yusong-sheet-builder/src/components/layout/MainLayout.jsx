import BodyPanel from "../panels/BodyPanel";
import LeftPanel from "../panels/LeftPanel";
import RightPanel from "../panels/RightPanel";

function MainLayout({
  character,
  onChangeBodyArmor,
  onChangeBodyDice,
  onUseTalent,
  onAddTalent,
  onRemoveTalent,
  onUseGenius,
  onUpdateSkill,
  onToggleCondition,
  onUpdateGeniusName,
  onAddGeniusAbility,
  onUpdateGeniusAbility,
  onRemoveGeniusAbility,
  onUseGeniusAbility,
  onAddInventoryItem,
  onUpdateInventoryItem,
  onRemoveInventoryItem,
  onUpdateNotes,
  notesResetVersion,
}) {
  return (
    <div className="main-layout">
      <aside className="left-panel panel">
        <LeftPanel
          character={character}
          onUseTalent={onUseTalent}
          onAddTalent={onAddTalent}
          onRemoveTalent={onRemoveTalent}
          onUseGenius={onUseGenius}
          onUpdateGeniusName={onUpdateGeniusName}
          onAddGeniusAbility={onAddGeniusAbility}
          onUpdateGeniusAbility={onUpdateGeniusAbility}
          onRemoveGeniusAbility={onRemoveGeniusAbility}
          onUseGeniusAbility={onUseGeniusAbility}
        />
      </aside>

      <main className="center-panel">
        <BodyPanel
          character={character}
          onChangeBodyArmor={onChangeBodyArmor}
          onChangeBodyDice={onChangeBodyDice}
        />
      </main>

      <aside className="right-panel panel">
        <RightPanel
          character={character}
          onUpdateSkill={onUpdateSkill}
          onToggleCondition={onToggleCondition}
          onAddInventoryItem={onAddInventoryItem}
          onUpdateInventoryItem={onUpdateInventoryItem}
          onRemoveInventoryItem={onRemoveInventoryItem}
          onUpdateNotes={onUpdateNotes}
          
        />
      </aside>
    </div>
  );
}

export default MainLayout;