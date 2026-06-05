import type { Track } from "../curriculum/types";

/**
 * Runs Swift / Java / Rust on a hosted compiler service (Wandbox), since none of
 * them have an in-browser runtime. Wandbox is token-free and CORS-enabled.
 *
 * No DOM APIs are used (only `fetch`), so this same module runs in the browser
 * AND in Node — which lets the curriculum be verified server-side against the
 * real compilers (see scripts/verify-remote.mjs).
 */

const WANDBOX = "https://wandbox.org/api";

// track -> the language label Wandbox uses in /list.json
const WANDBOX_LANG: Partial<Record<Track, string>> = {
  swift: "Swift",
  java: "Java",
  rust: "Rust",
};

export interface RemoteRunResult {
  ok: boolean;
  stdout: string;
  stderr: string;
  error?: string;
  /** True when the failure is the hosted service being unavailable, not the
   * learner's code — so the UI can say "try again" rather than "you broke it". */
  serviceError?: boolean;
}

let compilerCache: Record<string, string> | null = null;
let compilerCachePromise: Promise<Record<string, string>> | null = null;

/** Map each supported language to its newest available Wandbox compiler id. */
async function resolveCompilers(): Promise<Record<string, string>> {
  if (compilerCache) return compilerCache;
  if (compilerCachePromise) return compilerCachePromise;
  compilerCachePromise = (async () => {
    const res = await fetch(`${WANDBOX}/list.json`);
    if (!res.ok) throw new Error(`Wandbox list ${res.status}`);
    const list: Array<{ name: string; language: string }> = await res.json();
    const map: Record<string, string> = {};
    // list.json is newest-first; take the first compiler seen per language.
    for (const c of list) {
      if (!map[c.language]) map[c.language] = c.name;
    }
    compilerCache = map;
    return map;
  })();
  return compilerCachePromise;
}

const TRANSIENT = /Resource temporarily unavailable|catatonit|OCI runtime|failed to exec/i;

interface WandboxResponse {
  status?: string;
  compiler_error?: string;
  compiler_output?: string;
  program_output?: string;
  program_error?: string;
  signal?: string;
}

async function compileOnce(compiler: string, code: string, timeoutMs: number): Promise<WandboxResponse> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${WANDBOX}/compile.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ compiler, code, stdin: "", save: false }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`Wandbox compile ${res.status}`);
    return (await res.json()) as WandboxResponse;
  } finally {
    clearTimeout(timer);
  }
}

/** Compile + run a single source file on the hosted service. Never throws for
 * compile/runtime errors — those come back in the result. Throws only never;
 * network problems are reported as `serviceError`. */
export async function runRemote(track: Track, code: string, timeoutMs = 35_000): Promise<RemoteRunResult> {
  const lang = WANDBOX_LANG[track];
  if (!lang) {
    return { ok: false, stdout: "", stderr: "", error: `No hosted runner for ${track}.`, serviceError: true };
  }
  try {
    const compilers = await resolveCompilers();
    const compiler = compilers[lang];
    if (!compiler) {
      return { ok: false, stdout: "", stderr: "", error: `No ${lang} compiler available right now.`, serviceError: true };
    }

    let r = await compileOnce(compiler, code, timeoutMs);
    // One retry if the service hiccuped at the container level.
    if (TRANSIENT.test(`${r.compiler_error ?? ""}${r.program_error ?? ""}`)) {
      await new Promise((res) => setTimeout(res, 1200));
      r = await compileOnce(compiler, code, timeoutMs);
    }

    const compileErr = (r.compiler_error ?? "").trim();
    const stdout = r.program_output ?? "";
    const runErr = r.program_error ?? "";

    if (TRANSIENT.test(`${compileErr}${runErr}`)) {
      return {
        ok: false,
        stdout,
        stderr: compileErr || runErr,
        error: "The hosted compiler is busy right now — give it another go in a moment.",
        serviceError: true,
      };
    }

    // status is the program's exit code as a string ("0" == success).
    // Success = the program ran and exited 0. Compiler *warnings* (e.g. Rust's
    // "unused variant") also land in compiler_error but don't fail the build, so
    // they must not fail grading; a real compile error yields a non-zero status.
    const ok = (r.status ?? "1") === "0";
    return {
      ok,
      stdout,
      // On success, surface only runtime stderr — not compiler warnings.
      stderr: ok ? runErr : [compileErr, runErr].filter(Boolean).join("\n"),
      error: ok ? undefined : compileErr || runErr || `Exited with status ${r.status}`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      stdout: "",
      stderr: msg,
      error: "Couldn't reach the hosted compiler. Check your connection and try again.",
      serviceError: true,
    };
  }
}
