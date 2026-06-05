export interface OutputLine {
  text: string;
  tone: "out" | "err" | "warn" | "info" | "meta";
}

interface ConsoleProps {
  lines: OutputLine[];
  running?: boolean;
  emptyHint?: string;
}

/** A terminal-style output pane shared by the Python console and the web
 * preview's captured console. */
export function Console({ lines, running, emptyHint }: ConsoleProps) {
  return (
    <div className="console" role="log" aria-live="polite">
      {lines.length === 0 && !running ? (
        <div className="console__empty">{emptyHint ?? "Output will appear here when you run your code."}</div>
      ) : (
        <pre className="console__body">
          {lines.map((l, i) => (
            <span key={i} className={`console__line console__line--${l.tone}`}>
              {l.text}
              {"\n"}
            </span>
          ))}
          {running && <span className="console__cursor">▋</span>}
        </pre>
      )}
    </div>
  );
}
