import { levelInfo, levelTitle } from "../game/xp";

interface XpBarProps {
  xp: number;
  /** "full" shows the level title + xp numbers; "mini" is a compact chip+bar. */
  variant?: "full" | "mini";
}

export function XpBar({ xp, variant = "full" }: XpBarProps) {
  const info = levelInfo(xp);
  return (
    <div className={`xpbar xpbar--${variant}`}>
      <span className="xpbar__level" title={`Level ${info.level}`}>
        <span className="xpbar__lvl-num">{info.level}</span>
        {variant === "full" && <span className="xpbar__lvl-title">{levelTitle(info.level)}</span>}
      </span>
      <div className="xpbar__track" role="progressbar" aria-valuemin={0} aria-valuemax={info.needed} aria-valuenow={info.into} aria-label={`Level ${info.level} progress`}>
        <div className="xpbar__fill" style={{ width: `${Math.round(info.progress * 100)}%` }} />
      </div>
      {variant === "full" && (
        <span className="xpbar__num">{info.into} / {info.needed} XP</span>
      )}
    </div>
  );
}
