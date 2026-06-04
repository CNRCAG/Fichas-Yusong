import BodyPanel from "../panels/BodyPanel";
import LeftPanel from "../panels/LeftPanel";
import RightPanel from "../panels/RightPanel";

function MainLayout({ character, onChangeBodyArmor, onUpdateAttribute, onUseTalent, onUseGenius }) {
  return (
    <div className="main-layout">
      {/* Painel esquerdo: Talentos + Gênio */}
      <aside className="left-panel panel">
        <LeftPanel
          character={character}
          onUseTalent={onUseTalent}
          onUseGenius={onUseGenius}
        />
      </aside>

      {/* Painel central: Corpo */}
      <main className="center-panel">
        <BodyPanel
          character={character}
          onChangeBodyArmor={onChangeBodyArmor}
        />
      </main>

      {/* Painel direito: Inventário, Perícias, Condições e Notas */}
      <aside className="right-panel panel">
        <RightPanel character={character} />
      </aside>
    </div>
  );
}

export default MainLayout;