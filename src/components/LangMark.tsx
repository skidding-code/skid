import type { Track } from "../curriculum/types";

const ACCENTS: Record<Track, [string, string]> = {
  python: ["#3b82f6", "#22c55e"],
  web: ["#f97316", "#ec4899"],
  swift: ["#f05138", "#ff8a65"],
  java: ["#e76f00", "#5382a1"],
  rust: ["#dea584", "#a33d1a"],
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
      return <path d="M60 30 C42 30 42 47 51 50 C42 53 42 70 60 70" {...stroke} />;
    case "web":
      return (
        <>
          <path d="M42 35 L29 50 L42 65" {...stroke} />
          <path d="M58 35 L71 50 L58 65" {...stroke} />
          <path d="M53 31 L47 69" {...stroke} strokeWidth={6} />
        </>
      );
    case "swift":
      // paper plane — speed
      return (
        <>
          <path d="M28 64 L73 36 L55 67 L47 55 Z" fill="#fff" stroke="#fff" strokeWidth={4} strokeLinejoin="round" />
          <path d="M47 55 L73 36" stroke="rgba(0,0,0,0.18)" strokeWidth={3} strokeLinecap="round" />
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
