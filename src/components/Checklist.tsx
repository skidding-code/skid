import type { RuleResult } from "../runtime/checker";

interface ChecklistProps {
  results: RuleResult[];
  /** Before the first run there are no results yet. */
  evaluated: boolean;
}

/** The "goals" panel — a live checklist of the lesson's success criteria. */
export function Checklist({ results, evaluated }: ChecklistProps) {
  if (results.length === 0) {
    return (
      <div className="checklist checklist--free">
        <span className="checklist__free-glyph">✨</span>
        Free explore — there's no wrong answer here. Run anything you like.
      </div>
    );
  }
  return (
    <ul className="checklist">
      {results.map((r, i) => {
        const state = !evaluated ? "pending" : r.passed ? "pass" : "fail";
        return (
          <li key={i} className={`checklist__item checklist__item--${state}`}>
            <span className="checklist__box" aria-hidden="true">
              {state === "pass" ? "✓" : state === "fail" ? "○" : "○"}
            </span>
            <span className="checklist__label">{r.rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
