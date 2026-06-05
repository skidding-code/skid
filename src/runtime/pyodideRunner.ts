/**
 * Main-thread controller for the Pyodide worker. Manages the worker lifecycle,
 * streams stdout/stderr to callers, and enforces a wall-clock timeout by
 * terminating and respawning the worker if a run runs away (e.g. an infinite
 * loop). A single shared instance is enough for the whole app.
 */

export interface RunHandlers {
  onStdout?: (text: string) => void;
  onStderr?: (text: string) => void;
  onStatus?: (detail: string) => void;
}

export interface RunResult {
  ok: boolean;
  /** Combined stdout for convenience (also streamed via handlers). */
  stdout: string;
  /** Combined stderr (Python tracebacks land here). */
  stderr: string;
  /** Set when execution threw or timed out. */
  error?: string;
  timedOut?: boolean;
}

type Pending = {
  id: number;
  handlers: RunHandlers;
  stdout: string;
  stderr: string;
  resolve: (r: RunResult) => void;
  timer: number;
};

const DEFAULT_TIMEOUT_MS = 12_000;

export class PyodideRunner {
  private worker: Worker | null = null;
  private nextId = 1;
  private pending: Pending | null = null;
  private ready = false;
  private readyWaiters: Array<() => void> = [];
  private statusWaiters: Array<(d: string) => void> = [];

  /** Resolves once the runtime has finished downloading + booting. */
  whenReady(onStatus?: (d: string) => void): Promise<void> {
    this.spawn();
    if (onStatus) this.statusWaiters.push(onStatus);
    if (this.ready) return Promise.resolve();
    return new Promise((res) => this.readyWaiters.push(res));
  }

  get isReady(): boolean {
    return this.ready;
  }

  private spawn() {
    if (this.worker) return;
    this.worker = new Worker(new URL("./pyodide.worker.ts", import.meta.url), {
      type: "module",
    });
    this.worker.onmessage = (ev: MessageEvent) => this.handle(ev.data);
  }

  private handle(msg: {
    type: string;
    id?: number;
    text?: string;
    ok?: boolean;
    error?: string;
    detail?: string;
  }) {
    switch (msg.type) {
      case "ready":
        this.ready = true;
        this.readyWaiters.splice(0).forEach((r) => r());
        break;
      case "loading":
        if (msg.detail) this.statusWaiters.forEach((s) => s(msg.detail!));
        break;
      case "stdout":
        if (this.pending && msg.id === this.pending.id) {
          this.pending.stdout += msg.text ?? "";
          this.pending.handlers.onStdout?.(msg.text ?? "");
        }
        break;
      case "stderr":
        if (this.pending && msg.id === this.pending.id) {
          this.pending.stderr += msg.text ?? "";
          this.pending.handlers.onStderr?.(msg.text ?? "");
        }
        break;
      case "result":
        if (this.pending && msg.id === this.pending.id) {
          const p = this.pending;
          this.pending = null;
          window.clearTimeout(p.timer);
          p.resolve({
            ok: !!msg.ok,
            stdout: p.stdout,
            stderr: p.stderr,
            error: msg.error,
          });
        }
        break;
    }
  }

  /** Run a snippet of Python. Rejects only on internal errors, never on
   * Python exceptions — those come back as `{ ok:false, error }`. */
  run(code: string, handlers: RunHandlers = {}, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<RunResult> {
    this.spawn();
    if (handlers.onStatus) this.statusWaiters.push(handlers.onStatus);

    // Only one run at a time; a new run cancels any in-flight one by force.
    // Settle the old promise first so its awaiter doesn't hang forever.
    if (this.pending) {
      const old = this.pending;
      this.pending = null;
      window.clearTimeout(old.timer);
      old.resolve({
        ok: false,
        stdout: old.stdout,
        stderr: old.stderr,
        error: "Cancelled by a newer run.",
      });
      this.hardReset("superseded");
    }

    const id = this.nextId++;
    return new Promise<RunResult>((resolve) => {
      const timer = window.setTimeout(() => {
        const p = this.pending;
        this.pending = null;
        this.hardReset("timeout");
        p?.resolve({
          ok: false,
          stdout: p.stdout,
          stderr: p.stderr,
          error: `Your code ran longer than ${Math.round(timeoutMs / 1000)} seconds and was stopped. Check for a loop that never ends.`,
          timedOut: true,
        });
      }, timeoutMs);

      this.pending = { id, handlers, stdout: "", stderr: "", resolve, timer };
      this.worker!.postMessage({ type: "run", id, code });
    });
  }

  /** Terminate the worker (killing any runaway code) and start a fresh one. */
  hardReset(_reason?: string) {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.ready = false;
    if (this.pending) {
      window.clearTimeout(this.pending.timer);
      this.pending = null;
    }
    this.spawn();
  }
}

export const pythonRunner = new PyodideRunner();
