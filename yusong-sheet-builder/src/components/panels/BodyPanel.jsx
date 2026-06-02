import BodyPart from "../body/BodyPart";

function BodyPanel({ character }) {
  const getPart = (id) => {
    return character.body.find((part) => part.id === id);
  };

  return (
    <section className="body-panel panel">
      <div className="section-title">
        <h2>Corpo</h2>
      </div>

      <div className="body-layout">
        <div className="body-column">
          <BodyPart part={getPart("rightArm")} />
          <BodyPart part={getPart("rightLeg")} />
        </div>

        <div className="body-center">
          <BodyPart part={getPart("head")} />

          <div className="body-silhouette">
            <span>Pilares de Atlas</span>
          </div>

          <BodyPart part={getPart("torso")} />
          <BodyPart part={getPart("abdomen")} />
        </div>

        <div className="body-column">
          <BodyPart part={getPart("leftArm")} />
          <BodyPart part={getPart("leftLeg")} />
        </div>
      </div>
    </section>
  );
}

export default BodyPanel;