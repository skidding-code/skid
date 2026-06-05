import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { WebFiles } from "../curriculum/types";
import { pythonRunner } from "../runtime/pyodideRunner";
import { Editor, type EditorLang } from "../components/Editor";
import { Console, type OutputLine } from "../components/Console";
import { Preview, type ConsoleEntry } from "../components/Preview";

type Mode = "python" | "web";
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

export function SandboxPage() {
  const [mode, setMode] = useState<Mode>("python");
  const [py, setPy] = useState(PY_SAMPLE);
  const [web, setWeb] = useState<WebFiles>(WEB_SAMPLE);
  const [webTab, setWebTab] = useState<WebTab>("html");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [running, setRunning] = useState(false);
  const [runNonce, setRunNonce] = useState(0);
  const [status, setStatus] = useState("");
  const consoleTextRef = useRef("");

  useEffect(() => {
    if (mode === "python") void pythonRunner.whenReady((d) => setStatus(d));
  }, [mode]);

  const runPython = useCallback(async () => {
    setRunning(true);
    setOutput([]);
    consoleTextRef.current = "";
    const res = await pythonRunner.run(py, {
      onStatus: setStatus,
      onStdout: (t) => setOutput((o) => [...o, { tone: "out", text: t.replace(/\n$/, "") }]),
      onStderr: (t) => setOutput((o) => [...o, { tone: "err", text: t.replace(/\n$/, "") }]),
    });
    if (!res.ok && res.error) setOutput((o) => [...o, { tone: "err", text: res.error! }]);
    setStatus("");
    setRunning(false);
  }, [py]);

  const onConsole = useCallback((e: ConsoleEntry) => {
    setOutput((o) => [...o, { tone: e.level === "error" ? "err" : "out", text: e.text }]);
  }, []);

  const runWeb = useCallback(() => {
    setOutput([]);
    setRunNonce((n) => n + 1);
  }, []);

  const run = mode === "python" ? runPython : runWeb;
  const webLang: Record<WebTab, EditorLang> = { html: "html", css: "css", js: "javascript" };

  return (
    <div className="sandbox">
      <div className="sandbox__bar">
        <Link to="/" className="lesson__back">←</Link>
        <div className="seg">
          <button className={`seg__btn ${mode === "python" ? "is-active" : ""}`} onClick={() => setMode("python")}>
            🐍 Python
          </button>
          <button className={`seg__btn ${mode === "web" ? "is-active" : ""}`} onClick={() => setMode("web")}>
            🌐 Web
          </button>
        </div>
        <button className="btn btn--run" onClick={() => void run()} disabled={running}>
          {running ? "Running…" : "► Run"}
        </button>
      </div>

      <div className="sandbox__grid">
        <div className="sandbox__editor">
          {mode === "web" && (
            <div className="filetabs filetabs--flush">
              {(["html", "css", "js"] as WebTab[]).map((t) => (
                <button key={t} className={`filetab ${webTab === t ? "is-active" : ""}`} onClick={() => setWebTab(t)}>
                  {t === "js" ? "script.js" : t === "css" ? "style.css" : "index.html"}
                </button>
              ))}
            </div>
          )}
          {mode === "python" ? (
            <Editor value={py} language="python" onChange={setPy} ariaLabel="Python sandbox" />
          ) : (
            <Editor
              value={web[webTab]}
              language={webLang[webTab]}
              onChange={(v) => setWeb((w) => ({ ...w, [webTab]: v }))}
              ariaLabel={`${webTab} sandbox`}
            />
          )}
        </div>

        <div className="sandbox__out">
          {mode === "web" ? (
            <Preview files={web} runNonce={runNonce} domRules={[]} onConsole={onConsole} onDomResults={() => {}} />
          ) : (
            <Console lines={output} running={running} emptyHint="Press Run to execute your Python." />
          )}
          {mode === "web" && output.length > 0 && (
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
