import { useEffect, useRef, useState } from "react";
import type { CheckRule, WebFiles } from "../curriculum/types";
import { buildSrcDoc, isDomRule } from "../runtime/webBundle";

export interface ConsoleEntry {
  level: "log" | "info" | "warn" | "error";
  text: string;
}

interface PreviewProps {
  files: WebFiles;
  /** Bumps on each "Run" to (re)load the preview from the current files. */
  runNonce: number;
  /** Only the DOM-shaped rules; evaluated inside the iframe. */
  domRules: CheckRule[];
  onConsole: (entry: ConsoleEntry) => void;
  onDomResults: (results: Array<boolean | null>) => void;
}

/** Sandboxed live preview. The iframe runs the learner's code with
 * `allow-scripts` only — never `allow-same-origin` — so it cannot touch this
 * app's origin, storage, or cookies. A small injected bridge relays console
 * output and answers DOM validation queries. */
export function Preview({ files, runNonce, domRules, onConsole, onDomResults }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [srcDoc, setSrcDoc] = useState("");
  // Snapshot the rules for the run that is currently loading.
  const pendingRules = useRef<CheckRule[]>([]);

  // Latest props kept in refs so the message listener can be subscribed ONCE.
  // Re-subscribing on every prop change (the callbacks change as the learner
  // types) opened a window where an iframe message could land between
  // removeEventListener and addEventListener and be lost — which dropped
  // console output and made console-based checks flaky.
  const onConsoleRef = useRef(onConsole);
  const onDomResultsRef = useRef(onDomResults);
  const runNonceRef = useRef(runNonce);
  onConsoleRef.current = onConsole;
  onDomResultsRef.current = onDomResults;
  runNonceRef.current = runNonce;

  // (Re)build the document on each run.
  useEffect(() => {
    if (runNonce === 0) return;
    pendingRules.current = domRules.filter(isDomRule);
    setSrcDoc(buildSrcDoc(files));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runNonce]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      // Accept only messages from our own iframe's content window.
      if (e.source !== iframeRef.current?.contentWindow) return;
      const m = e.data;
      if (!m || typeof m !== "object") return;
      if (m.type === "pg-console") {
        onConsoleRef.current({ level: m.level, text: m.text });
      } else if (m.type === "pg-ready") {
        const rules = pendingRules.current;
        if (rules.length) {
          iframeRef.current?.contentWindow?.postMessage(
            { type: "pg-validate", id: runNonceRef.current, rules },
            "*",
          );
        } else {
          onDomResultsRef.current([]);
        }
      } else if (m.type === "pg-validate-result") {
        // Ignore results from a superseded run (e.g. Run clicked twice fast) so
        // stale DOM verdicts can't grade the current code.
        if (m.id !== runNonceRef.current) return;
        onDomResultsRef.current(m.results as Array<boolean | null>);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      className="preview-frame"
      title="Live preview"
      sandbox="allow-scripts"
      srcDoc={srcDoc}
    />
  );
}
