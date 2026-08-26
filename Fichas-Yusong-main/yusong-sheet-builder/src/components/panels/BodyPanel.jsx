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
      viewBox="0 0 260 620"
      role="img"
      aria-label="Silhueta anatômica do personagem"
    >
      <defs>
        <linearGradient id="bodyGhostFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>

      {/* preenchimento suave */}
      <g className="body-soft-fill">
        {/* cabeça */}
        <ellipse cx="130" cy="82" rx="38" ry="52" />

        {/* pescoço */}
        <path d="M116 132 H144 V170 H116 Z" />

        {/* torso */}
        <path
          d="
            M84 176
            C96 162 112 154 130 154
            C148 154 164 162 176 176
            C188 195 194 222 194 258
            C194 286 188 314 176 338
            C166 356 150 368 130 372
            C110 368 94 356 84 338
            C72 314 66 286 66 258
            C66 222 72 195 84 176
            Z
          "
        />

        {/* braço direito */}
        <path
          d="
            M76 188
            C56 208 46 244 44 292
            L42 402
            C42 428 53 445 68 444
            C82 443 91 425 92 398
            L94 278
            C95 238 90 206 76 188
            Z
          "
        />

        {/* braço esquerdo */}
        <path
          d="
            M184 188
            C204 208 214 244 216 292
            L218 402
            C218 428 207 445 192 444
            C178 443 169 425 168 398
            L166 278
            C165 238 170 206 184 188
            Z
          "
        />

        {/* quadril/pelve */}
        <path
          d="
            M102 350
            C111 366 121 376 130 380
            C139 376 149 366 158 350
            L154 406
            C148 424 140 436 130 440
            C120 436 112 424 106 406
            Z
          "
        />

        {/* perna direita */}
        <path
          d="
            M108 406
            C116 430 123 446 128 452
            L122 548
            C120 573 108 590 90 590
            C72 590 62 574 66 552
            L92 434
            C96 421 101 412 108 406
            Z
          "
        />

        {/* perna esquerda */}
        <path
          d="
            M132 452
            C137 446 144 430 152 406
            C159 412 164 421 168 434
            L194 552
            C198 574 188 590 170 590
            C152 590 140 573 138 548
            Z
          "
        />
      </g>

      {/* contornos */}
      <g className="body-outline">
        <ellipse cx="130" cy="82" rx="38" ry="52" />
        <path d="M116 132 H144 V170 H116 Z" />

        <path
          d="
            M84 176
            C96 162 112 154 130 154
            C148 154 164 162 176 176
            C188 195 194 222 194 258
            C194 286 188 314 176 338
            C166 356 150 368 130 372
            C110 368 94 356 84 338
            C72 314 66 286 66 258
            C66 222 72 195 84 176
            Z
          "
        />

        <path
          d="
            M76 188
            C56 208 46 244 44 292
            L42 402
            C42 428 53 445 68 444
            C82 443 91 425 92 398
            L94 278
            C95 238 90 206 76 188
            Z
          "
        />

        <path
          d="
            M184 188
            C204 208 214 244 216 292
            L218 402
            C218 428 207 445 192 444
            C178 443 169 425 168 398
            L166 278
            C165 238 170 206 184 188
            Z
          "
        />

        <path
          d="
            M102 350
            C111 366 121 376 130 380
            C139 376 149 366 158 350
            L154 406
            C148 424 140 436 130 440
            C120 436 112 424 106 406
            Z
          "
        />

        <path
          d="
            M108 406
            C116 430 123 446 128 452
            L122 548
            C120 573 108 590 90 590
            C72 590 62 574 66 552
            L92 434
            C96 421 101 412 108 406
            Z
          "
        />

        <path
          d="
            M132 452
            C137 446 144 430 152 406
            C159 412 164 421 168 434
            L194 552
            C198 574 188 590 170 590
            C152 590 140 573 138 548
            Z
          "
        />
      </g>

      {/* linhas anatômicas suaves */}
      <g className="body-anatomy-lines">
        {/* eixo central */}
        <path d="M130 134 V440" />

        {/* rosto mínimo */}
        <path d="M114 84 H121" />
        <path d="M139 84 H146" />
        <path d="M123 106 C127 109 133 109 137 106" />

        {/* pescoço */}
        <path d="M118 146 C122 151 126 154 130 154 C134 154 138 151 142 146" />

        {/* clavícula */}
        <path d="M88 188 C103 176 118 171 130 171 C142 171 157 176 172 188" />

        {/* peitoral */}
        <path d="M92 214 C106 205 119 201 130 201 C141 201 154 205 168 214" />
        <path d="M95 246 H165" />

        {/* abdômen */}
        <path d="M102 276 H158" />
        <path d="M106 306 H154" />
        <path d="M110 334 H150" />

        {/* laterais do torso */}
        <path d="M94 214 C88 246 88 300 103 347" />
        <path d="M166 214 C172 246 172 300 157 347" />

        {/* quadril */}
        <path d="M102 352 C113 367 121 375 130 380 C139 375 147 367 158 352" />

        {/* braços */}
        <path d="M48 278 H92" />
        <path d="M168 278 H212" />
        <path d="M48 370 H88" />
        <path d="M172 370 H212" />

        {/* pernas */}
        <path d="M84 500 H122" />
        <path d="M138 500 H176" />
        <path d="M82 560 H120" />
        <path d="M140 560 H178" />
      </g>
    </svg>
  );
}

function BodyPanel({ character, onChangeBodyArmor, onChangeBodyDice }) {
  const memberDiceOptions = character.body
    .filter((part) => part.type === "member")
    .map((part) => part.dice);

  return (
    <section className="body-panel panel center-panel">
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
            diceOptions={memberDiceOptions}
            onChangeArmor={onChangeBodyArmor}
            onChangeDice={onChangeBodyDice}
          />
        ))}
      </div>
    </section>
  );
}
export default BodyPanel;