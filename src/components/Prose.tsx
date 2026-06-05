import type { Prose as ProseBlock } from "../curriculum/types";

const toneGlyph: Record<string, string> = { tip: "💡", note: "📌", warn: "⚠️" };

/** Renders a lesson's teaching content from its declarative Prose blocks. */
export function Prose({ blocks }: { blocks: ProseBlock[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h":
            return <h3 key={i} className="prose__h">{b.text}</h3>;
          case "p":
            return <p key={i} className="prose__p">{b.text}</p>;
          case "code":
            return (
              <pre key={i} className="prose__code">
                <code>{b.text}</code>
              </pre>
            );
          case "callout":
            return (
              <div key={i} className={`callout callout--${b.tone}`}>
                <span className="callout__glyph">{toneGlyph[b.tone]}</span>
                <span>{b.text}</span>
              </div>
            );
          case "list":
            return (
              <ul key={i} className="prose__list">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "image":
            return <img key={i} className="prose__img" src={b.src} alt={b.alt} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
