import { getSchoolById } from "../data/schools";

const CARD_WIDTH = 900;
const CARD_HEIGHT = 540;

const CLASS_NAMES = {
  bruto: "Bruto",
  agil: "Ágil",
  tatico: "Tático",
  comando: "Comando",
};

const TYPE_NAMES = {
  prodigio: "Prodígio",
  "diligente-persistente": "Diligente Persistente",
  "diligente-super-humano": "Diligente Super Humano",
};

function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawStatBlock(ctx, x, y, width, label, value, accentColor) {
  const height = 74;
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  roundRect(ctx, x, y, width, height, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 1;
  roundRect(ctx, x, y, width, height, 6);
  ctx.stroke();

  ctx.fillStyle = "#8d96a3";
  ctx.font = "600 15px 'IBM Plex Mono', monospace";
  ctx.textBaseline = "top";
  ctx.fillText(label.toUpperCase(), x + 14, y + 10);

  ctx.fillStyle = accentColor;
  ctx.font = "700 30px 'IBM Plex Mono', monospace";
  ctx.fillText(value, x + 14, y + 32);
}

/**
 * Gera e dispara o download da Carteirinha de Lutador de um personagem
 * como um arquivo PNG. Desenhado inteiramente em canvas (sem dependências
 * externas), então funciona offline — a única parte que depende de rede
 * é o avatar do personagem, se ele tiver sido definido via URL externa
 * (ex: gerado pelo "Gerar Aleatório"); se a imagem não carregar por falta
 * de internet, a carteirinha é gerada normalmente, só sem o avatar.
 */
export async function exportFighterCard(character) {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");

  const school = getSchoolById(character.identity.school);
  const accent = character.identity.school ? school.color : "#3a8fa8";
  const accentLight = character.identity.school
    ? lighten(school.color, 45)
    : "#5fd0e8";

  // fundo
  ctx.fillStyle = "#0a0d10";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // textura sutil de grade
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 1;
  for (let gx = 0; gx < CARD_WIDTH; gx += 30) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, CARD_HEIGHT);
    ctx.stroke();
  }
  for (let gy = 0; gy < CARD_HEIGHT; gy += 30) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(CARD_WIDTH, gy);
    ctx.stroke();
  }

  // borda externa
  ctx.strokeStyle = accentLight;
  ctx.lineWidth = 3;
  roundRect(ctx, 10, 10, CARD_WIDTH - 20, CARD_HEIGHT - 20, 14);
  ctx.stroke();

  // cabeçalho
  ctx.fillStyle = accent;
  roundRect(ctx, 10, 10, CARD_WIDTH - 20, 64, 14);
  ctx.fill();
  ctx.fillStyle = "#0a0d10";
  ctx.fillRect(10, 54, CARD_WIDTH - 20, 20);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textBaseline = "middle";
  ctx.fillText("FICHA DE LUTADOR · CIRCUITO DE SOYANG", 34, 42);

  ctx.textAlign = "right";
  ctx.font = "600 18px 'IBM Plex Mono', monospace";
  ctx.fillText(school.name.toUpperCase(), CARD_WIDTH - 34, 42);
  ctx.textAlign = "left";

  // avatar
  const avatarSize = 190;
  const avatarX = 40;
  const avatarY = 100;
  ctx.save();
  roundRect(ctx, avatarX, avatarY, avatarSize, avatarSize, 10);
  ctx.clip();
  ctx.fillStyle = "#12161a";
  ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);

  const avatarImg = await loadImage(character.identity.image);
  if (avatarImg) {
    ctx.drawImage(avatarImg, avatarX, avatarY, avatarSize, avatarSize);
  } else {
    ctx.fillStyle = "#4a5560";
    ctx.font = "600 16px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SEM IMAGEM", avatarX + avatarSize / 2, avatarY + avatarSize / 2);
    ctx.textAlign = "left";
  }
  ctx.restore();
  ctx.strokeStyle = accentLight;
  ctx.lineWidth = 2;
  roundRect(ctx, avatarX, avatarY, avatarSize, avatarSize, 10);
  ctx.stroke();

  // emblema da escola (canto do avatar)
  if (school.emblem) {
    const emblemImg = await loadImage(school.emblem);
    if (emblemImg) {
      const emblemSize = 54;
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        avatarX + avatarSize - 8,
        avatarY + avatarSize - 8,
        emblemSize / 2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#0a0d10";
      ctx.fill();
      ctx.clip();
      ctx.drawImage(
        emblemImg,
        avatarX + avatarSize - 8 - emblemSize / 2,
        avatarY + avatarSize - 8 - emblemSize / 2,
        emblemSize,
        emblemSize
      );
      ctx.restore();
    }
  }

  // nome e identidade
  const infoX = avatarX + avatarSize + 34;
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 40px 'Bebas Neue', 'Arial Narrow', sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(character.identity.name || "Lutador sem nome", infoX, 140);

  ctx.fillStyle = accentLight;
  ctx.font = "600 18px 'IBM Plex Mono', monospace";
  const classText = CLASS_NAMES[character.identity.characterClass] || "Sem classe";
  const typeText = TYPE_NAMES[character.identity.type] || "Sem tipo";
  ctx.fillText(`${typeText} · ${classText}`, infoX, 170);

  ctx.fillStyle = "#c3cad2";
  ctx.font = "500 16px 'Inter', sans-serif";
  const originText = character.identity.origin || "—";
  const martialArtText = character.identity.martialArt || "—";
  ctx.fillText(`Origem: ${originText}`, infoX, 200);
  ctx.fillText(`Arte marcial: ${martialArtText}`, infoX, 224);
  ctx.fillText(
    `Nível ${character.identity.level || 1}${
      character.identity.age ? ` · ${character.identity.age} anos` : ""
    }`,
    infoX,
    248
  );

  // stats principais
  const statsY = 300;
  const statWidth = (CARD_WIDTH - 80 - 3 * 16) / 4;
  drawStatBlock(
    ctx,
    40,
    statsY,
    statWidth,
    "Vida",
    `${character.resources.currentLife} / ${character.resources.maxLife}`,
    "#ff8a8a"
  );
  drawStatBlock(
    ctx,
    40 + (statWidth + 16) * 1,
    statsY,
    statWidth,
    "Stamina",
    `${character.resources.currentStamina} / ${character.resources.maxStamina}`,
    "#8ad0ff"
  );
  drawStatBlock(
    ctx,
    40 + (statWidth + 16) * 2,
    statsY,
    statWidth,
    "Esquiva",
    character.reactions.dodge,
    accentLight
  );
  drawStatBlock(
    ctx,
    40 + (statWidth + 16) * 3,
    statsY,
    statWidth,
    "Contra-ataque",
    character.reactions.counterAttack,
    accentLight
  );

  // talentos (até 3, resumido)
  const talentsY = statsY + 74 + 26;
  ctx.fillStyle = "#8d96a3";
  ctx.font = "600 14px 'IBM Plex Mono', monospace";
  ctx.fillText("TALENTOS", 40, talentsY);

  const talentNames = character.talents.slice(0, 4).map((t) => t.name);
  ctx.fillStyle = "#e6e9ed";
  ctx.font = "500 16px 'Inter', sans-serif";
  ctx.fillText(
    talentNames.length ? talentNames.join("  ·  ") : "Nenhum talento",
    40,
    talentsY + 24
  );

  // rodapé
  ctx.fillStyle = "#5a6472";
  ctx.font = "500 13px 'IBM Plex Mono', monospace";
  ctx.fillText("SISTEMA PILARES DE ATLAS", 40, CARD_HEIGHT - 26);

  triggerDownload(canvas, character.identity.name);
}

function lighten(hex, amount) {
  const value = hex.replace("#", "");
  const num = parseInt(value, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `rgb(${r}, ${g}, ${b})`;
}

function triggerDownload(canvas, name) {
  const safeName = (name || "lutador")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `carteirinha-${safeName || "lutador"}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
