import BodyPanel from "../panels/BodyPanel";
import LeftPanel from "../panels/LeftPanel";
import RightPanel from "../panels/RightPanel";

function MainLayout({
  character,
  onChangeBodyArmor,
  onSetBodyArmor,
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
  onRoll,
  presentationMode,
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
          presentationMode={presentationMode}
        />
      </aside>

      <main className="center-panel">
        <BodyPanel
          character={character}
          onChangeBodyArmor={onChangeBodyArmor}
          onSetBodyArmor={onSetBodyArmor}
          onChangeBodyDice={onChangeBodyDice}
          onRoll={onRoll}
          presentationMode={presentationMode}
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
          onRoll={onRoll}
          presentationMode={presentationMode}
        />
      </aside>
    </div>
  );
}

export default MainLayout;