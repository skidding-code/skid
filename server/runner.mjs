// Server-side compiler runner. Runs Swift on Compiler Explorer (godbolt) and
// Java/Rust/Bash on Wandbox — from the server, so the browser never has to
// reach a third-party compiler directly (no client CORS / ad-blocker / flaky
// network issues). Mirrors src/runtime/remoteRunner.ts.

const WANDBOX = "https://wandbox.org/api";
const GODBOLT = "https://godbolt.org/api";
const WANDBOX_LANG = { java: "Java", rust: "Rust", bash: "Bash script" };
const SWIFT_GODBOLT_IDS = ["swift63", "swift624", "swift62", "swift61", "swift603"];
const TRANSIENT = /Resource temporarily unavailable|catatonit|OCI runtime|failed to exec/i;

let swiftId = null;
let compilerCache = null;
let compilerCachePromise = null;

const joinText = (a) => (a || []).map((x) => x.text).join("\n");

async function fetchJSON(url, opts, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    if (res.status === 404) return { _status: 404 };
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function resolveCompilers() {
  if (compilerCache) return compilerCache;
  if (compilerCachePromise) return compilerCachePromise;
  compilerCachePromise = (async () => {
    const list = await fetchJSON(`${WANDBOX}/list.json`, {}, 20000);
    const map = {};
    for (const c of list) if (!map[c.language]) map[c.language] = c.name;
    compilerCache = map;
    return map;
  })();
  return compilerCachePromise;
}

async function runSwift(code, timeoutMs) {
  const ids = swiftId ? [swiftId] : SWIFT_GODBOLT_IDS;
  let notFound = "";
  for (const id of ids) {
    let j;
    try {
      j = await fetchJSON(
        `${GODBOLT}/compiler/${id}/compile`,
        {
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
        },
        timeoutMs,
      );
    } catch (e) {
      return { ok: false, stdout: "", stderr: String(e), error: "Couldn't reach the Swift compiler.", serviceError: true };
    }
    if (j._status === 404) {
      notFound = `Swift compiler ${id} not found`;
      continue;
    }
    swiftId = id;
    const buildFailed = (j.buildResult?.code ?? 0) !== 0;
    if (buildFailed) {
      const err = joinText(j.buildResult?.stderr);
      return { ok: false, stdout: "", stderr: err, error: err.split("\n")[0] || "Compile error" };
    }
    const stdout = joinText(j.stdout);
    const stderr = joinText(j.stderr);
    const ok = (j.code ?? 1) === 0 && j.didExecute !== false;
    return { ok, stdout, stderr: ok ? "" : stderr, error: ok ? undefined : stderr || `Exited with status ${j.code}` };
  }
  return { ok: false, stdout: "", stderr: notFound, error: "No Swift compiler available right now.", serviceError: true };
}

async function compileWandbox(compiler, code, timeoutMs) {
  return fetchJSON(
    `${WANDBOX}/compile.json`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ compiler, code, stdin: "", save: false }),
    },
    timeoutMs,
  );
}

async function runWandbox(lang, code, timeoutMs) {
  const compilers = await resolveCompilers();
  const compiler = compilers[lang];
  if (!compiler) return { ok: false, stdout: "", stderr: "", error: `No ${lang} compiler available.`, serviceError: true };
  let r = await compileWandbox(compiler, code, timeoutMs);
  if (TRANSIENT.test(`${r.compiler_error ?? ""}${r.program_error ?? ""}`)) {
    await new Promise((res) => setTimeout(res, 1200));
    r = await compileWandbox(compiler, code, timeoutMs);
  }
  const compileErr = (r.compiler_error ?? "").trim();
  const stdout = r.program_output ?? "";
  const runErr = r.program_error ?? "";
  if (TRANSIENT.test(`${compileErr}${runErr}`)) {
    return { ok: false, stdout, stderr: compileErr || runErr, error: "The hosted compiler is busy — try again.", serviceError: true };
  }
  const ok = (r.status ?? "1") === "0";
  return {
    ok,
    stdout,
    stderr: ok ? runErr : [compileErr, runErr].filter(Boolean).join("\n"),
    error: ok ? undefined : compileErr || runErr || `Exited with status ${r.status}`,
  };
}

export async function runRemote(track, code, timeoutMs = 35000) {
  if (track === "swift") return runSwift(code, timeoutMs);
  const lang = WANDBOX_LANG[track];
  if (!lang) return { ok: false, stdout: "", stderr: "", error: `No hosted runner for ${track}.`, serviceError: true };
  try {
    return await runWandbox(lang, code, timeoutMs);
  } catch (e) {
    return { ok: false, stdout: "", stderr: String(e), error: "Couldn't reach the hosted compiler.", serviceError: true };
  }
}
