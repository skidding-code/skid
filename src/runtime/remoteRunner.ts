import type { Track } from "../curriculum/types";

/**
 * Runs Swift / Java / Rust on hosted compilers, since none have an in-browser
 * runtime. Java + Rust go to Wandbox (token-free, CORS). Swift goes to Compiler
 * Explorer / godbolt (token-free, CORS) because Wandbox's Swift container is
 * frequently broken on their side.
 *
 * No DOM APIs are used (only `fetch`), so this same module runs in the browser
 * AND in Node — which lets the curriculum be verified server-side against the
 * real compilers (see scripts/verify-remote.ts).
 */

const WANDBOX = "https://wandbox.org/api";
const GODBOLT = "https://godbolt.org/api";
// Swift compilers on godbolt that support execution (amd64), newest first.
const SWIFT_GODBOLT_IDS = ["swift63", "swift624", "swift62", "swift61", "swift603"];
let swiftIdCache: string | null = null;

const joinText = (a?: Array<{ text: string }>): string => (a ?? []).map((x) => x.text).join("\n");

/** Compile + run Swift on Compiler Explorer. */
async function runSwiftGodbolt(code: string, timeoutMs: number): Promise<RemoteRunResult> {
  const ids = swiftIdCache ? [swiftIdCache] : SWIFT_GODBOLT_IDS;
  let notFound = "";
  for (const id of ids) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(`${GODBOLT}/compiler/${id}/compile`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          source: code,
          options: {
            userArguments: "",
            executeParameters: { args: [], stdin: "" },
            compilerOptions: { skipAsm: true, executorRequest: true },
            filters: { execute: true },
            tools: [],
            libraries: [],
          },
          lang: "swift",
          allowStoreCodeDebug: true,
        }),
        signal: ctrl.signal,
      });
      if (res.status === 404) {
        notFound = `Swift compiler ${id} not found`;
        continue; // try the next id
      }
      if (!res.ok) throw new Error(`godbolt ${res.status}`);
      const j = (await res.json()) as {
        code?: number;
        didExecute?: boolean;
        stdout?: Array<{ text: string }>;
        stderr?: Array<{ text: string }>;
        buildResult?: { code?: number; stderr?: Array<{ text: string }> };
      };
      swiftIdCache = id;
      const buildFailed = (j.buildResult?.code ?? 0) !== 0;
      if (buildFailed) {
        const err = joinText(j.buildResult?.stderr);
        return { ok: false, stdout: "", stderr: err, error: err.split("\n")[0] || "Compile error" };
      }
      const stdout = joinText(j.stdout);
      const stderr = joinText(j.stderr);
      const ok = (j.code ?? 1) === 0 && j.didExecute !== false;
      return { ok, stdout, stderr: ok ? "" : stderr, error: ok ? undefined : stderr || `Exited with status ${j.code}` };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return {
        ok: false,
        stdout: "",
        stderr: msg,
        error: "Couldn't reach the Swift compiler. Check your connection and try again.",
        serviceError: true,
      };
    } finally {
      clearTimeout(timer);
    }
  }
  return { ok: false, stdout: "", stderr: notFound, error: "No Swift compiler available right now.", serviceError: true };
}

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
  // Swift runs on Compiler Explorer (Wandbox's Swift container is unreliable).
  if (track === "swift") return runSwiftGodbolt(code, timeoutMs);

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
