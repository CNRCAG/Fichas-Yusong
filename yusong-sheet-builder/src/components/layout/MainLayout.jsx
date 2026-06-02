import LeftPanel from "../panels/LeftPanel";
import BodyPanel from "../panels/BodyPanel";
import RightPanel from "../panels/RightPanel";

function MainLayout({ character }) {
  return (
    <section className="sheet-main-layout">
      <LeftPanel character={character} />
      <BodyPanel character={character} />
      <RightPanel character={character} />
    </section>
  );
}

export default MainLayout;