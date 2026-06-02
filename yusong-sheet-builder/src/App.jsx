import { characterInitialState } from "./data/characterInitialState";
import { getSchoolById } from "./data/schools";

import SheetHeader from "./components/layout/SheetHeader";
import MainLayout from "./components/layout/MainLayout";
import AttributesFooter from "./components/layout/AttributesFooter";

import "./styles/global.css";
import "./styles/themes.css";
import "./styles/sheet.css";
import "./styles/header.css";
import "./styles/panels.css";
import "./styles/body.css";
import "./styles/attributes.css";

function App() {
  const character = characterInitialState;
  const selectedSchool = getSchoolById(character.identity.school);

  return (
    <main className={`app-page ${selectedSchool.themeClass}`}>
      <section className="character-sheet">
        <SheetHeader character={character} />
        <MainLayout character={character} />
        <AttributesFooter character={character} />
      </section>
    </main>
  );
}

export default App;