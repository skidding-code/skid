import type { Track } from "../curriculum/types";

const ACCENTS: Record<Track, [string, string]> = {
  python: ["#3b82f6", "#22c55e"],
  web: ["#f97316", "#ec4899"],
  swift: ["#f05138", "#ff8a65"],
  java: ["#e76f00", "#5382a1"],
  rust: ["#dea584", "#a33d1a"],
  node: ["#a3b626", "#5c7a1e"],
  typescript: ["#3178c6", "#235a97"],
  bash: ["#34d399", "#065f46"],
  discordpy: ["#5865f2", "#7c3aed"],
  mcmods: ["#7cae42", "#4d6b2a"],
  swiftui: ["#fb6d3a", "#0a84ff"],
};

/** White glyph drawn for each language — original, simple, geometric marks
 * (not emoji, not trademarked logos): a snake S, code chevrons, a paper plane,
 * a coffee cup, and a gear. */
function Glyph({ track }: { track: Track }) {
  const stroke = {
    fill: "none",
    stroke: "#fff",
    strokeWidth: 7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (track) {
    case "python":
      // a coiled snake: S-curve body + a small head
      return (
        <>
          <path d="M62 30 C44 30 44 46 51 50 C58 54 56 70 38 70" {...stroke} />
          <circle cx="62" cy="30" r="4.5" fill="#fff" />
        </>
      );
    case "web":
      return (
        <>
          <path d="M42 35 L29 50 L42 65" {...stroke} />
          <path d="M58 35 L71 50 L58 65" {...stroke} />
          <path d="M53 31 L47 69" {...stroke} strokeWidth={6} />
        </>
      );
    case "swift":
    case "swiftui":
      // paper plane — speed
      return (
        <>
          <path d="M28 64 L73 36 L55 67 L47 55 Z" fill="#fff" stroke="#fff" strokeWidth={4} strokeLinejoin="round" />
          <path d="M47 55 L73 36" stroke="rgba(0,0,0,0.18)" strokeWidth={3} strokeLinecap="round" />
        </>
      );
    case "node":
      // hexagon (Node)
      return <path d="M50 24 L73 37 V63 L50 76 L27 63 V37 Z" {...stroke} />;
    case "typescript":
      // square brackets hugging a capital T — "typed"
      return (
        <>
          <path d="M40 32 H31 V68 H40" {...stroke} strokeWidth={6} />
          <path d="M60 32 H69 V68 H60" {...stroke} strokeWidth={6} />
          <line x1="44" y1="42" x2="56" y2="42" {...stroke} strokeWidth={6} />
          <line x1="50" y1="42" x2="50" y2="62" {...stroke} strokeWidth={6} />
        </>
      );
    case "bash":
      // terminal prompt  >_
      return (
        <>
          <path d="M33 40 L46 50 L33 60" {...stroke} />
          <line x1="51" y1="62" x2="68" y2="62" {...stroke} />
        </>
      );
    case "discordpy":
      // chat bubble
      return (
        <>
          <path d="M30 38 H70 a6 6 0 0 1 6 6 V60 a6 6 0 0 1 -6 6 H48 L36 75 V66 H30 a6 6 0 0 1 -6 -6 V44 a6 6 0 0 1 6 -6 Z" fill="#fff" />
          <circle cx="42" cy="52" r="3.4" fill="#5865f2" />
          <circle cx="58" cy="52" r="3.4" fill="#5865f2" />
        </>
      );
    case "mcmods":
      // isometric cube
      return (
        <>
          <path d="M50 26 L72 38 L50 50 L28 38 Z" {...stroke} />
          <path d="M28 38 V62 L50 74 V50" {...stroke} />
          <path d="M72 38 V62 L50 74" {...stroke} />
        </>
      );
    case "java":
      // coffee cup
      return (
        <>
          <path d="M33 44 H60 V56 a9 9 0 0 1 -9 9 H42 a9 9 0 0 1 -9 -9 Z" fill="#fff" />
          <path d="M60 47 a8 8 0 0 1 0 13" {...stroke} strokeWidth={5} />
          <path d="M40 30 q4 4 0 8" {...stroke} strokeWidth={4} />
          <path d="M50 30 q4 4 0 8" {...stroke} strokeWidth={4} />
        </>
      );
    case "rust":
      // gear
      return (
        <g stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round">
          <circle cx="50" cy="50" r="11" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = 50 + Math.cos(a) * 17;
            const y1 = 50 + Math.sin(a) * 17;
            const x2 = 50 + Math.cos(a) * 24;
            const y2 = 50 + Math.sin(a) * 24;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      );
  }
}

export function LangMark({ track, size = 56, radius = 16 }: { track: Track; size?: number; radius?: number }) {
  const [c1, c2] = ACCENTS[track];
  const gid = `lm-${track}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="langmark" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="92" height="92" rx={radius} fill={`url(#${gid})`} />
      <Glyph track={track} />
    </svg>
  );
}
