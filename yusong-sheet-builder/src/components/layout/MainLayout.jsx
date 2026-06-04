import LeftPanel from "../panels/LeftPanel";
import BodyPanel from "../panels/BodyPanel";
import RightPanel from "../panels/RightPanel";

function MainLayout({ character, onChangeBodyArmor }) {
  return (
    <section className="main-layout">
      <LeftPanel character={character} />

      <BodyPanel
        character={character}
        onChangeBodyArmor={onChangeBodyArmor}
      />

      <RightPanel character={character} />
    </section>
  );
}

export default MainLayout;