export type Mood = "idle" | "happy" | "thinking" | "oops";

/** "Sprig" — the little guide character. A friendly rounded blob whose face
 * reflects what's happening (running, passed, errored). Pure SVG, no assets to
 * download. */
export function Mascot({ mood = "idle", size = 64 }: { mood?: Mood; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`mascot mascot--${mood}`}
      role="img"
      aria-label={`Sprig the guide looking ${mood}`}
    >
      <defs>
        <linearGradient id="sprig-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c7cf0" />
          <stop offset="100%" stopColor="#46d39a" />
        </linearGradient>
      </defs>
      {/* leaf sprout */}
      <path d="M50 16 C50 6, 60 4, 64 10 C66 16, 56 20, 50 18 Z" fill="#46d39a" />
      <rect x="48.5" y="14" width="3" height="10" rx="1.5" fill="#2faa78" />
      {/* body */}
      <rect x="18" y="22" width="64" height="62" rx="26" fill="url(#sprig-body)" />
      {/* cheeks */}
      <circle cx="34" cy="60" r="6" fill="#ff9bb0" opacity="0.5" />
      <circle cx="66" cy="60" r="6" fill="#ff9bb0" opacity="0.5" />
      {/* eyes */}
      {mood === "happy" ? (
        <>
          <path d="M30 50 Q37 42 44 50" stroke="#1a1c2e" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M56 50 Q63 42 70 50" stroke="#1a1c2e" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M40 64 Q50 74 60 64" stroke="#1a1c2e" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : mood === "oops" ? (
        <>
          <circle cx="37" cy="50" r="5" fill="#1a1c2e" />
          <circle cx="63" cy="50" r="5" fill="#1a1c2e" />
          <path d="M42 68 Q50 62 58 68" stroke="#1a1c2e" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : mood === "thinking" ? (
        <>
          <circle cx="37" cy="50" r="5" fill="#1a1c2e" />
          <circle cx="63" cy="50" r="5" fill="#1a1c2e" />
          <line x1="42" y1="67" x2="58" y2="67" stroke="#1a1c2e" strokeWidth="4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="37" cy="50" r="5" fill="#1a1c2e" />
          <circle cx="63" cy="50" r="5" fill="#1a1c2e" />
          <path d="M41 65 Q50 71 59 65" stroke="#1a1c2e" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
