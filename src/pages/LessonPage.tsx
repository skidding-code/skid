import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { getLesson, neighbors } from "../curriculum";
import { isWebFiles, isRemoteTrack, type Track, type WebFiles } from "../curriculum/types";
import { useProgress } from "../store/progress";
import { useToasts } from "../store/toasts";
import { pythonRunner } from "../runtime/pyodideRunner";
import { runRemote } from "../runtime/remoteRunner";
import { evalSourceRules, type RuleResult } from "../runtime/checker";
import { combinedSource, isDomRule } from "../runtime/webBundle";
import { XP_PER_LESSON, xpFromCompleted, levelInfo, levelTitle } from "../game/xp";
import { buildBadgeContext, earnedBadgeIds, badgeById } from "../game/badges";
import { playSuccess, playLevelUp, playBadge } from "../game/sound";
import { Editor, type EditorLang } from "../components/Editor";
import { Console, type OutputLine } from "../components/Console";
import { Preview, type ConsoleEntry } from "../components/Preview";
import { Prose } from "../components/Prose";
import { Checklist } from "../components/Checklist";
import { Mascot, type Mood } from "../components/Mascot";
import { Confetti } from "../components/Confetti";

type WebTab = "html" | "css" | "js";

export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const fl = id ? getLesson(id) : undefined;
  if (!fl) return <Navigate to="/" replace />;
  return <LessonInner key={fl.lesson.id} flId={fl.lesson.id} />;
}

function LessonInner({ flId }: { flId: string }) {
  const fl = getLesson(flId)!;
  const { lesson, chapter, course } = fl;
  const nav = useNavigate();
  const { prev, next } = neighbors(lesson.id);
  const posInChapter = chapter.lessons.findIndex((l) => l.id === lesson.id) + 1;

  const { saveCode, getSaved, markComplete, isComplete, resetLesson } = useProgress();
  const pushToast = useToasts((s) => s.push);

  const isWeb = lesson.track === "web";
  const isPython = lesson.track === "python";
  const isRemote = isRemoteTrack(lesson.track);
  // For single-file code tracks, which CodeMirror grammar + file name to show.
  const codeLang = lesson.track as Track; // EditorLang is a superset of these
  const codeFileName =
    lesson.track === "python" ? "main.py"
    : lesson.track === "java" ? "Main.java"
    : lesson.track === "rust" ? "main.rs"
    : lesson.track === "swift" ? "main.swift"
    : "main";

  // ── editor state ──────────────────────────────────────────────────────────
  const [pyCode, setPyCode] = useState<string>(() => {
    const saved = getSaved(lesson.id);
    if (saved !== undefined && !isWeb) return saved;
    return isWebFiles(lesson.starter) ? "" : lesson.starter;
  });
  const [web, setWeb] = useState<WebFiles>(() => {
    if (isWeb && isWebFiles(lesson.starter)) {
      const saved = getSaved(lesson.id);
      if (saved) {
        try {
          return JSON.parse(saved) as WebFiles;
        } catch {
          /* fall through */
        }
      }
      return { ...lesson.starter };
    }
    return { html: "", css: "", js: "" };
  });
  const [webTab, setWebTab] = useState<WebTab>("html");

  // ── run / output state ──────────────────────────────────────────────────────
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [running, setRunning] = useState(false);
  const [runNonce, setRunNonce] = useState(0);
  const [results, setResults] = useState<RuleResult[]>([]);
  const [evaluated, setEvaluated] = useState(false);
  const [mood, setMood] = useState<Mood>("idle");
  const [status, setStatus] = useState<string>("");
  const [confetti, setConfetti] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [resultTab, setResultTab] = useState<"preview" | "console">("preview");

  // ── hints / solution ────────────────────────────────────────────────────────
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionOpen, setSolutionOpen] = useState(false);

  const consoleTextRef = useRef("");

  // Persist edits (lightweight; store is localStorage-backed).
  useEffect(() => {
    if (!isWeb) saveCode(lesson.id, pyCode);
  }, [pyCode, isWeb, lesson.id, saveCode]);
  useEffect(() => {
    if (isWeb) saveCode(lesson.id, JSON.stringify(web));
  }, [web, isWeb, lesson.id, saveCode]);

  // Warm up the Python runtime as soon as a Python lesson opens.
  useEffect(() => {
    if (isPython) void pythonRunner.whenReady((d) => setStatus(d));
  }, [isPython]);

  const domRules = useMemo(() => lesson.checks.filter(isDomRule), [lesson.checks]);

  const finalize = useCallback(
    (rr: RuleResult[]) => {
      setResults(rr);
      setEvaluated(true);
      setRunning(false);
      const success = rr.length === 0 || rr.every((r) => r.passed);
      if (success) {
        setMood("happy");
        if (!isComplete(lesson.id)) {
          // First-time completion → award XP, fire reward toasts, level-ups, badges.
          const before = useProgress.getState();
          const beforeCount = Object.keys(before.completed).length;
          const beforeLevel = levelInfo(xpFromCompleted(beforeCount)).level;
          const beforeBadges = earnedBadgeIds(buildBadgeContext(before.completed, before.streak));

          markComplete(lesson.id);

          const after = useProgress.getState();
          const afterCount = Object.keys(after.completed).length;
          const afterLevel = levelInfo(xpFromCompleted(afterCount)).level;
          const afterBadges = earnedBadgeIds(buildBadgeContext(after.completed, after.streak));

          setConfetti((c) => c + 1);
          playSuccess();
          pushToast({ kind: "xp", emoji: "⭐", title: `+${XP_PER_LESSON} XP`, detail: lesson.title });
          if (afterLevel > beforeLevel) {
            playLevelUp();
            pushToast({ kind: "level", emoji: "🎉", title: `Level ${afterLevel}!`, detail: levelTitle(afterLevel) });
          }
          for (const id of afterBadges) {
            if (!beforeBadges.has(id)) {
              const b = badgeById(id);
              if (b) {
                playBadge();
                pushToast({ kind: "badge", emoji: b.emoji, title: "Badge unlocked!", detail: b.title });
              }
            }
          }
        }
        if (rr.length > 0) setCelebrate(true);
      } else {
        setMood("oops");
      }
    },
    [isComplete, markComplete, lesson.id, lesson.title, pushToast],
  );

  // ── Single-file code run (Python locally; Swift/Java/Rust on the hosted runner) ──
  const runCode = useCallback(async () => {
    setRunning(true);
    setCelebrate(false);
    setMood("thinking");
    setOutput([]);
    setStatus("");
    consoleTextRef.current = "";

    if (isPython) {
      if (!pythonRunner.isReady) {
        setOutput([{ tone: "meta", text: "Starting Python… (first run downloads the runtime)" }]);
      }
      const res = await pythonRunner.run(pyCode, {
        onStatus: (d) => setStatus(d),
        onStdout: (t) => {
          consoleTextRef.current += t;
          setOutput((o) => [...o, { tone: "out", text: t.replace(/\n$/, "") }]);
        },
        onStderr: (t) => {
          consoleTextRef.current += t;
          setOutput((o) => [...o, { tone: "err", text: t.replace(/\n$/, "") }]);
        },
      });
      if (!res.ok && res.error) setOutput((o) => [...o, { tone: "err", text: res.error! }]);
    } else {
      // Remote compile + run (Swift / Java / Rust).
      setOutput([{ tone: "meta", text: `Compiling ${course.title} on the hosted runner…` }]);
      const res = await runRemote(lesson.track, pyCode);
      consoleTextRef.current = res.stdout;
      const lines: OutputLine[] = [];
      if (res.stdout) lines.push(...res.stdout.replace(/\n$/, "").split("\n").map((t) => ({ tone: "out" as const, text: t })));
      if (res.stderr) lines.push(...res.stderr.replace(/\n$/, "").split("\n").map((t) => ({ tone: "err" as const, text: t })));
      if (res.serviceError && res.error) lines.push({ tone: "meta", text: res.error });
      setOutput(lines.length ? lines : [{ tone: "meta", text: "(no output)" }]);
    }

    setStatus("");
    const rr = evalSourceRules(lesson.checks, { stdout: consoleTextRef.current, code: pyCode });
    finalize(rr);
  }, [pyCode, lesson.checks, lesson.track, isPython, course.title, finalize]);

  // ── Web run ────────────────────────────────────────────────────────────────
  const onConsole = useCallback((e: ConsoleEntry) => {
    consoleTextRef.current += e.text + "\n";
    setOutput((o) => [...o, { tone: e.level === "error" ? "err" : e.level === "warn" ? "warn" : "out", text: e.text }]);
  }, []);

  const onDomResults = useCallback(
    (domResults: Array<boolean | null>, consoleText?: string) => {
      // Merge: source rules evaluated here; dom rules filled from the iframe.
      // Prefer the iframe's authoritative console buffer for stdout checks.
      const source = evalSourceRules(lesson.checks, {
        stdout: consoleText ?? consoleTextRef.current,
        code: combinedSource(web),
      });
      let di = 0;
      const merged: RuleResult[] = lesson.checks.map((rule, i) => {
        if (isDomRule(rule)) {
          const v = domResults[di++];
          return { rule, passed: v === true };
        }
        return source[i];
      });
      finalize(merged);
    },
    [lesson.checks, web, finalize],
  );

  const runWeb = useCallback(() => {
    setRunning(true);
    setCelebrate(false);
    setMood("thinking");
    setOutput([]);
    consoleTextRef.current = "";
    setResultTab("preview");
    setRunNonce((n) => n + 1);
  }, []);

  const run = isWeb ? runWeb : runCode;

  // Keyboard: Cmd/Ctrl+Enter to run.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        void run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [run]);

  const onReset = () => {
    if (!isWeb) setPyCode(isWebFiles(lesson.starter) ? "" : lesson.starter);
    else if (isWebFiles(lesson.starter)) setWeb({ ...lesson.starter });
    setOutput([]);
    setResults([]);
    setEvaluated(false);
    setMood("idle");
    setCelebrate(false);
    resetLesson(lesson.id);
  };

  const revealSolution = () => {
    setSolutionOpen(true);
    if (!isWeb && !isWebFiles(lesson.solution)) setPyCode(lesson.solution);
    else if (isWeb && isWebFiles(lesson.solution)) setWeb({ ...lesson.solution });
  };

  const allPass = evaluated && results.length > 0 && results.every((r) => r.passed);
  const accentStyle = {
    ["--c1" as string]: course.accent[0],
    ["--c2" as string]: course.accent[1],
  } as React.CSSProperties;

  const webLangForTab: Record<WebTab, EditorLang> = { html: "html", css: "css", js: "javascript" };

  return (
    <div className="lesson" style={accentStyle}>
      <Confetti fire={confetti} />

      {/* top bar */}
      <div className="lesson__bar">
        <Link to={`/learn/${course.track}`} className="lesson__back" aria-label="Back to course">
          ←
        </Link>
        <div className="lesson__bar-title">
          <span className="lesson__bar-glyph">{chapter.glyph}</span>
          <div>
            <div className="lesson__bar-name">{lesson.title}</div>
            <div className="lesson__bar-chapter">
              {course.title} · {chapter.title} · Lesson {posInChapter} of {chapter.lessons.length}
            </div>
          </div>
        </div>
        <div className="lesson__bar-actions">
          <button className="btn btn--soft" onClick={onReset} title="Reset this lesson">↺ Reset</button>
          {prev && <button className="btn btn--soft" onClick={() => nav(`/lesson/${prev.id}`)}>‹ Prev</button>}
          {next && <button className="btn btn--soft" onClick={() => nav(`/lesson/${next.id}`)}>Next ›</button>}
        </div>
      </div>

      <div className="lesson__grid">
        {/* teaching panel */}
        <aside className="lesson__teach">
          <div className="lesson__intro-head">
            <div className="lesson__chips">
              {lesson.concepts.map((c) => (
                <span key={c} className="chip chip--accent">{c}</span>
              ))}
              <span className="chip">{lesson.estimatedMinutes} min</span>
            </div>
          </div>

          <Prose blocks={lesson.intro} />

          <div className="goals">
            <h4 className="goals__title">Your goal</h4>
            <Checklist results={evaluated ? results : lesson.checks.map((rule) => ({ rule, passed: false }))} evaluated={evaluated} />
          </div>

          {celebrate && allPass && (
            <div className="welldone">
              <Mascot mood="happy" size={44} />
              <div>
                <strong>Nice work!</strong>
                <p>{lesson.wellDone ?? "You completed the lesson."}</p>
                {next && (
                  <button className="btn btn--primary btn--sm" onClick={() => nav(`/lesson/${next.id}`)}>
                    Next lesson →
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="help">
            {lesson.hints.length > 0 && (
              <div className="hints">
                <div className="hints__head">
                  <span>Hints</span>
                  <span className="hints__count">
                    {hintsShown}/{lesson.hints.length}
                  </span>
                </div>
                {lesson.hints.slice(0, hintsShown).map((h, i) => (
                  <div key={i} className="hint">
                    <span className="hint__num">{i + 1}</span>
                    {h}
                  </div>
                ))}
                {hintsShown < lesson.hints.length && (
                  <button className="btn btn--ghost btn--sm" onClick={() => setHintsShown((n) => n + 1)}>
                    {hintsShown === 0 ? "Show a hint" : "Show another hint"}
                  </button>
                )}
              </div>
            )}
            <button className="link-muted" onClick={solutionOpen ? () => setSolutionOpen(false) : revealSolution}>
              {solutionOpen ? "Hide solution" : "Reveal solution"}
            </button>
          </div>
        </aside>

        {/* workspace panel */}
        <main className="lesson__work">
          <div className="workbar">
            {!isWeb ? (
              <span className="workbar__file">{codeFileName}</span>
            ) : (
              <div className="filetabs">
                {(["html", "css", "js"] as WebTab[]).map((t) => (
                  <button
                    key={t}
                    className={`filetab ${webTab === t ? "is-active" : ""}`}
                    onClick={() => setWebTab(t)}
                  >
                    {t === "js" ? "script.js" : t === "css" ? "style.css" : "index.html"}
                  </button>
                ))}
              </div>
            )}
            <button className="btn btn--run" onClick={() => void run()} disabled={running}>
              {running ? "Running…" : "► Run"}
              <kbd className="run-kbd">⌘↵</kbd>
            </button>
          </div>

          <div className="editor-wrap">
            {!isWeb ? (
              <Editor value={pyCode} language={codeLang as EditorLang} onChange={setPyCode} ariaLabel={`${course.title} code editor`} />
            ) : (
              <Editor
                value={web[webTab === "js" ? "js" : webTab]}
                language={webLangForTab[webTab]}
                onChange={(v) => setWeb((w) => ({ ...w, [webTab === "js" ? "js" : webTab]: v }))}
                ariaLabel={`${webTab} editor`}
              />
            )}
          </div>

          <div className="results">
            <div className="results__tabs">
              {isWeb && (
                <button
                  className={`results__tab ${resultTab === "preview" ? "is-active" : ""}`}
                  onClick={() => setResultTab("preview")}
                >
                  Preview
                </button>
              )}
              <button
                className={`results__tab ${!isWeb || resultTab === "console" ? "is-active" : ""}`}
                onClick={() => setResultTab("console")}
              >
                Console
              </button>
              <div className="results__status">
                {running && (status || "Running…")}
                {!running && evaluated && (allPass ? "✓ All goals met" : results.length ? "Keep going — check the goals" : "")}
              </div>
              <Mascot mood={running ? "thinking" : mood} size={30} />
            </div>

            <div className="results__body">
              {isWeb && (
                <div style={{ display: resultTab === "preview" ? "block" : "none", height: "100%" }}>
                  <Preview
                    files={web}
                    runNonce={runNonce}
                    domRules={domRules}
                    onConsole={onConsole}
                    onDomResults={onDomResults}
                  />
                </div>
              )}
              {(!isWeb || resultTab === "console") && (
                <Console
                  lines={output}
                  running={running}
                  emptyHint={
                    isPython
                      ? "Press Run to execute your Python."
                      : isRemote
                        ? `Press Run to compile & run on the hosted ${course.title} runner.`
                        : "console.log(...) output shows up here."
                  }
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
