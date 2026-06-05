import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Track, WebFiles } from "../curriculum/types";
import { pythonRunner } from "../runtime/pyodideRunner";
import { runRemote } from "../runtime/remoteRunner";
import { Editor, type EditorLang } from "../components/Editor";
import { Console, type OutputLine } from "../components/Console";
import { Preview, type ConsoleEntry } from "../components/Preview";

type WebTab = "html" | "css" | "js";

const PY_SAMPLE = `# A tiny playground. Try changing things!
import math

for i in range(1, 6):
    print(i, "squared is", i * i)

print("pi is about", round(math.pi, 4))
`;

const WEB_SAMPLE: WebFiles = {
  html: `<h1 id="title">Hello!</h1>\n<button id="go">Surprise me</button>\n<p id="out">Click the button.</p>`,
  css: `body { font-family: system-ui; text-align: center; padding: 2rem; }\nh1 { color: #5b5bd6; }\nbutton { font-size: 1rem; padding: .6rem 1rem; border-radius: 10px; border: 0; background: #5b5bd6; color: #fff; }`,
  js: `const colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2"];\ndocument.getElementById("go").addEventListener("click", () => {\n  const c = colors[Math.floor(Math.random() * colors.length)];\n  document.body.style.background = c + "22";\n  document.getElementById("out").textContent = "Now showing " + c;\n});`,
};

const REMOTE_SAMPLES: Record<"swift" | "java" | "rust", string> = {
  swift: `// Swift runs on a hosted compiler — hit Run!\nlet langs = ["Swift", "Java", "Rust"]\nfor lang in langs {\n    print("Hello from \\(lang)!")\n}`,
  java: `// Java needs a class. Hit Run!\nclass Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            System.out.println("Line " + i);\n        }\n    }\n}`,
  rust: `// Rust, fast and fearless. Hit Run!\nfn main() {\n    for i in 1..=3 {\n        println!("Line {}", i);\n    }\n}`,
};

const MODES: { id: Track; label: string }[] = [
  { id: "python", label: "🐍 Python" },
  { id: "web", label: "🌐 Web" },
  { id: "swift", label: "🐦 Swift" },
  { id: "java", label: "☕ Java" },
  { id: "rust", label: "🦀 Rust" },
];

export function SandboxPage() {
  const [mode, setMode] = useState<Track>("python");
  const [py, setPy] = useState(PY_SAMPLE);
  const [web, setWeb] = useState<WebFiles>(WEB_SAMPLE);
  const [remote, setRemote] = useState(REMOTE_SAMPLES);
  const [webTab, setWebTab] = useState<WebTab>("html");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [running, setRunning] = useState(false);
  const [runNonce, setRunNonce] = useState(0);
  const [status, setStatus] = useState("");

  const isWeb = mode === "web";
  const isPython = mode === "python";
  const isRemote = mode === "swift" || mode === "java" || mode === "rust";

  useEffect(() => {
    if (isPython) void pythonRunner.whenReady((d) => setStatus(d));
  }, [isPython]);

  const runPython = useCallback(async () => {
    setRunning(true);
    setOutput([]);
    const res = await pythonRunner.run(py, {
      onStatus: setStatus,
      onStdout: (t) => setOutput((o) => [...o, { tone: "out", text: t.replace(/\n$/, "") }]),
      onStderr: (t) => setOutput((o) => [...o, { tone: "err", text: t.replace(/\n$/, "") }]),
    });
    if (!res.ok && res.error) setOutput((o) => [...o, { tone: "err", text: res.error! }]);
    setStatus("");
    setRunning(false);
  }, [py]);

  const runRemoteCode = useCallback(async () => {
    if (!isRemote) return;
    setRunning(true);
    setOutput([{ tone: "meta", text: `Compiling ${mode} on the hosted runner…` }]);
    const res = await runRemote(mode, remote[mode as "swift" | "java" | "rust"]);
    const lines: OutputLine[] = [];
    if (res.stdout) lines.push(...res.stdout.replace(/\n$/, "").split("\n").map((t) => ({ tone: "out" as const, text: t })));
    if (res.stderr) lines.push(...res.stderr.replace(/\n$/, "").split("\n").map((t) => ({ tone: "err" as const, text: t })));
    if (res.serviceError && res.error) lines.push({ tone: "meta", text: res.error });
    setOutput(lines.length ? lines : [{ tone: "meta", text: "(no output)" }]);
    setRunning(false);
  }, [isRemote, mode, remote]);

  const onConsole = useCallback((e: ConsoleEntry) => {
    setOutput((o) => [...o, { tone: e.level === "error" ? "err" : "out", text: e.text }]);
  }, []);

  const runWeb = useCallback(() => {
    setOutput([]);
    setRunNonce((n) => n + 1);
  }, []);

  const run = isWeb ? runWeb : isPython ? runPython : runRemoteCode;
  const webLang: Record<WebTab, EditorLang> = { html: "html", css: "css", js: "javascript" };

  return (
    <div className="sandbox">
      <div className="sandbox__bar">
        <Link to="/" className="lesson__back" aria-label="Home">←</Link>
        <div className="seg">
          {MODES.map((m) => (
            <button key={m.id} className={`seg__btn ${mode === m.id ? "is-active" : ""}`} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <button className="btn btn--run" onClick={() => void run()} disabled={running}>
          {running ? "Running…" : "► Run"}
        </button>
      </div>

      <div className="sandbox__grid">
        <div className="sandbox__editor">
          {isWeb && (
            <div className="filetabs filetabs--flush">
              {(["html", "css", "js"] as WebTab[]).map((t) => (
                <button key={t} className={`filetab ${webTab === t ? "is-active" : ""}`} onClick={() => setWebTab(t)}>
                  {t === "js" ? "script.js" : t === "css" ? "style.css" : "index.html"}
                </button>
              ))}
            </div>
          )}
          {isPython && <Editor value={py} language="python" onChange={setPy} ariaLabel="Python sandbox" />}
          {isWeb && (
            <Editor
              value={web[webTab]}
              language={webLang[webTab]}
              onChange={(v) => setWeb((w) => ({ ...w, [webTab]: v }))}
              ariaLabel={`${webTab} sandbox`}
            />
          )}
          {isRemote && (
            <Editor
              value={remote[mode as "swift" | "java" | "rust"]}
              language={mode as EditorLang}
              onChange={(v) => setRemote((r) => ({ ...r, [mode]: v }))}
              ariaLabel={`${mode} sandbox`}
            />
          )}
        </div>

        <div className="sandbox__out">
          {isWeb ? (
            <Preview files={web} runNonce={runNonce} domRules={[]} onConsole={onConsole} onDomResults={() => {}} />
          ) : (
            <Console lines={output} running={running} emptyHint="Press Run to execute your code." />
          )}
          {isWeb && output.length > 0 && (
            <div className="sandbox__console">
              <Console lines={output} emptyHint="" />
            </div>
          )}
          {status && <div className="sandbox__status">{status}</div>}
        </div>
      </div>
    </div>
  );
}
