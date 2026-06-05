/**
 * Pyodide runs in a dedicated module worker. Keeping Python off the main thread
 * means a learner's accidental `while True:` freezes only the worker — the UI
 * stays responsive and the parent can terminate + respawn this worker to
 * recover.
 *
 * Typed lib-agnostically (via a small `ctx` shim) so this file can compile
 * under the app's DOM lib without pulling in the conflicting WebWorker lib.
 */

// Pyodide is served from our own origin (copied into /public/pyodide at build
// time) so Python works offline and needs no third-party CDN. Resolve it
// relative to wherever the app is hosted so it works at the domain root AND on a
// sub-path (e.g. GitHub Pages /<repo>/). In the production build the worker lives
// under <base>/assets/, so "../pyodide/" lands on <base>/pyodide/; in dev the
// worker is served from /src/... so fall back to the root /pyodide/.
const INDEX_URL = import.meta.url.includes("/assets/")
  ? new URL(/* @vite-ignore */ "../pyodide/", import.meta.url).href
  : new URL("/pyodide/", self.location.origin).href;

type InMsg = { type: "run"; id: number; code: string };
type OutMsg =
  | { type: "ready" }
  | { type: "loading"; detail: string }
  | { type: "stdout"; id: number; text: string }
  | { type: "stderr"; id: number; text: string }
  | { type: "result"; id: number; ok: boolean; error?: string };

const ctx = self as unknown as {
  postMessage: (m: OutMsg) => void;
  onmessage: ((ev: MessageEvent<InMsg>) => void) | null;
};
const post = (m: OutMsg) => ctx.postMessage(m);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pyodide: any = null;
let bootPromise: Promise<void> | null = null;

async function boot(): Promise<void> {
  if (bootPromise) return bootPromise;
  bootPromise = (async () => {
    post({ type: "loading", detail: "Downloading the Python runtime…" });
    // @vite-ignore keeps Vite from trying to bundle the CDN module.
    const mod = await import(/* @vite-ignore */ `${INDEX_URL}pyodide.mjs`);
    post({ type: "loading", detail: "Starting Python…" });
    pyodide = await mod.loadPyodide({ indexURL: INDEX_URL });
    // input() would hang forever in a worker — make it a friendly no-op.
    pyodide.runPython(
      "import builtins\n" +
        "def _no_input(prompt=''):\n" +
        "    print(prompt, end='')\n" +
        "    return ''\n" +
        "builtins.input = _no_input\n",
    );
    post({ type: "ready" });
  })();
  return bootPromise;
}

ctx.onmessage = async (ev: MessageEvent<InMsg>) => {
  const msg = ev.data;
  if (msg.type !== "run") return;
  const { id, code } = msg;
  try {
    await boot();
    // Pyodide's `batched` callback fires once per flushed line and strips the
    // trailing newline. Re-add exactly one so accumulated output preserves line
    // boundaries (needed for line-count / multi-line checks).
    const line = (t: string) => (t.endsWith("\n") ? t : t + "\n");
    pyodide.setStdout({ batched: (t: string) => post({ type: "stdout", id, text: line(t) }) });
    pyodide.setStderr({ batched: (t: string) => post({ type: "stderr", id, text: line(t) }) });
    await pyodide.runPythonAsync(code);
    post({ type: "result", id, ok: true });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    post({ type: "result", id, ok: false, error });
  }
};

// Begin downloading immediately so the first run feels fast.
void boot();
