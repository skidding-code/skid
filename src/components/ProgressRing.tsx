interface ProgressRingProps {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  gradient?: [string, string];
  label?: string;
  id?: string;
}

/** A circular progress indicator with a gradient stroke, used on course cards
 * and the header. */
export function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  gradient = ["#7c7cf0", "#9a8bff"],
  label,
  id = "ring",
}: ProgressRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));
  const offset = c * (1 - clamped);
  const gid = `grad-${id}`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="ring" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 600ms var(--ease-spring)" }}
      />
      {label && (
        <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" className="ring__label">
          {label}
        </text>
      )}
    </svg>
  );
}
