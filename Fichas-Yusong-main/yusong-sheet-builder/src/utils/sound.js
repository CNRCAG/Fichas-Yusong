// Efeitos sonoros sintetizados via Web Audio API — não depende de nenhum
// arquivo de áudio externo, então funciona 100% offline (importante pra
// feira, onde a internet pode não ser confiável).

let audioContext = null;
let noiseBuffer = null;
let muted = false;

const STORAGE_KEY = "pilares-de-atlas:sound-muted";

try {
  muted = window.localStorage.getItem(STORAGE_KEY) === "true";
} catch {
  muted = false;
}

function getContext() {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

/**
 * Gera (uma única vez, reaproveitando depois) um buffer curto de ruído
 * branco, usado como matéria-prima pra simular o "clack" seco de um
 * dado físico — muito mais parecido com dado de verdade do que um bipe.
 */
function getNoiseBuffer(ctx) {
  if (noiseBuffer) return noiseBuffer;
  const duration = 0.12;
  const length = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  noiseBuffer = buffer;
  return noiseBuffer;
}

export function isSoundMuted() {
  return muted;
}

export function setSoundMuted(value) {
  muted = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // localStorage indisponível — segue sem persistir, sem quebrar nada
  }
}

/**
 * Toca um "clack" curto e seco (ruído filtrado + envelope percussivo),
 * simulando o som físico de um dado batendo na mesa.
 */
function playClack(ctx, { startTime, frequency, q = 1.1, duration = 0.06, peakGain = 0.5 }) {
  const source = ctx.createBufferSource();
  source.buffer = getNoiseBuffer(ctx);

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(frequency, startTime);
  filter.Q.value = q;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(peakGain, startTime + 0.003);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  source.start(startTime);
  source.stop(startTime + duration + 0.02);
}

/**
 * Toca uma nota curta e suave (usada só no acorde de crítico), com um
 * envelope macio pra não soar como bipe de fliperama.
 */
function playTone(ctx, { frequency, startTime, duration, peakGain = 0.12 }) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(peakGain, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

/**
 * Som de "dado rolando": uma série de clacks secos que vai desacelerando,
 * como um dado de verdade quicando e indo parar na mesa.
 */
export function playRollingSound() {
  if (muted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Intervalos crescentes entre os clacks (desacelera, como um dado real)
  const gaps = [0, 0.04, 0.045, 0.05, 0.06, 0.08, 0.1];
  let t = now;

  gaps.forEach((gap, index) => {
    t += gap;
    const settling = index / (gaps.length - 1); // 0 no início, 1 no fim
    const frequency = 900 - settling * 400 + Math.random() * 220;
    playClack(ctx, {
      startTime: t,
      frequency,
      duration: 0.05 + settling * 0.03,
      peakGain: 0.45 - settling * 0.18,
      q: 1 + settling * 1.5,
    });
  });
}

/**
 * Som de resultado. Reage ao conteúdo da rolagem:
 * - crítico (algum dado bateu o valor máximo dele) -> clack final + brilho leve
 * - "zerado"/mínimo (algum dado saiu 1, ou total ficou em 0) -> clack surdo e grave
 * - resultado normal -> um clack final único, mais "encorpado"
 */
export function playResultSound(rollResult) {
  if (muted || !rollResult) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const diceRolls = (rollResult.rolls || []).filter((r) => !r.flat);

  const hasCritical = diceRolls.some((r) => r.value === r.sides && r.sides);
  const hasFumble =
    diceRolls.some((r) => r.value === 1) || rollResult.total <= 0;

  // clack final "pousando na mesa", sempre toca
  playClack(ctx, {
    startTime: now,
    frequency: hasFumble ? 260 : 480,
    duration: 0.09,
    peakGain: 0.4,
    q: 0.8,
  });

  if (hasCritical) {
    [659.25, 987.77].forEach((frequency, index) => {
      playTone(ctx, {
        frequency,
        startTime: now + 0.05 + index * 0.06,
        duration: 0.2,
        peakGain: 0.09,
      });
    });
  }
}
