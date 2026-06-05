import { useProgress } from "../store/progress";

/**
 * Tiny WebAudio sound effects — synthesized, so there are no audio assets to
 * download and they work offline. All gated by the user's sound preference.
 */

let ctx: AudioContext | null = null;
function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

function blip(freq: number, start: number, dur: number, type: OscillatorType = "sine", gain = 0.08) {
  const a = ac();
  if (!a) return;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = a.currentTime + start;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function enabled(): boolean {
  return useProgress.getState().soundOn;
}

/** A bright two-note "correct!" chime. */
export function playSuccess() {
  if (!enabled()) return;
  blip(660, 0, 0.12, "triangle");
  blip(990, 0.09, 0.18, "triangle");
}

/** A rising fanfare for leveling up. */
export function playLevelUp() {
  if (!enabled()) return;
  [523, 659, 784, 1047].forEach((f, i) => blip(f, i * 0.1, 0.22, "square", 0.06));
}

/** A sparkly two-tone for unlocking a badge. */
export function playBadge() {
  if (!enabled()) return;
  blip(880, 0, 0.1, "sine");
  blip(1320, 0.08, 0.22, "sine");
}
