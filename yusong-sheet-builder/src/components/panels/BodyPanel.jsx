import BodyPart from "../body/BodyPart";

const partPositions = {
  head: "part-head",
  torso: "part-torso",
  abdomen: "part-abdomen",
  rightArm: "part-right-arm",
  leftArm: "part-left-arm",
  rightLeg: "part-right-leg",
  leftLeg: "part-left-leg",
};

function BodySilhouette() {
  return (
    <svg
      className="body-silhouette"
      viewBox="0 0 260 560"
      role="img"
      aria-label="Silhueta corporal tática do personagem"
    >
      <defs>
        <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(230, 230, 230, 0.68)" />
          <stop offset="100%" stopColor="rgba(115, 115, 115, 0.36)" />
        </linearGradient>
      </defs>

      {/* SILHUETA ÚNICA */}
      <path
        className="body-svg-shape"
        d="
          M130 34

          C105 34 90 55 90 84
          C90 116 107 138 130 138
          C153 138 170 116 170 84
          C170 55 155 34 130 34

          M116 138
          H144
          V176
          C138 180 122 180 116 176
          Z

          M78 180
          C94 164 112 158 130 158
          C148 158 166 164 182 180

          C196 198 202 225 204 260
          L210 380
          C212 410 199 430 181 426
          C165 422 160 400 160 372
          L158 300

          C152 326 142 346 130 346
          C118 346 108 326 102 300

          L100 372
          C100 400 95 422 79 426
          C61 430 48 410 50 380
          L56 260
          C58 225 64 198 78 180

          M102 338
          C110 360 120 372 130 372
          C140 372 150 360 158 338

          L154 404
          C150 422 142 434 132 438
          L126 438
          C116 434 108 422 104 404
          Z

          M103 404
          C111 426 121 438 128 440
          L116 520
          C113 540 101 550 86 546
          C72 542 67 527 71 508
          Z

          M132 440
          C139 438 149 426 157 404
          L189 508
          C193 527 188 542 174 546
          C159 550 147 540 144 520
          Z
        "
      />

      {/* LINHAS TÁTICAS */}
      <g className="body-svg-lines">
        <line x1="130" y1="138" x2="130" y2="438" />

        <polygon points="94,206 166,206 160,286 100,286" />
        <polygon points="100,300 160,300 154,388 106,388" />

        <line x1="58" y1="278" x2="100" y2="278" />
        <line x1="160" y1="278" x2="202" y2="278" />

        <line x1="78" y1="462" x2="116" y2="462" />
        <line x1="144" y1="462" x2="182" y2="462" />

        <circle cx="130" cy="84" r="4" />
        <circle cx="130" cy="246" r="4" />
        <circle cx="130" cy="344" r="4" />
      </g>
    </svg>
  );
}

function BodyPanel({ character }) {
  return (
    <section className="body-panel panel">
      <div className="section-title">
        <h2>Corpo</h2>
      </div>

      <div className="body-map">
        <div className="body-grid-lines"></div>

        <div className="body-figure" aria-hidden="true">
          <BodySilhouette />
        </div>

        {character.body.map((part) => (
          <BodyPart
            key={part.id}
            part={part}
            className={`body-part-floating ${partPositions[part.id]}`}
          />
        ))}
      </div>
    </section>
  );
}

export default BodyPanel;