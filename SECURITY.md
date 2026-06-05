# Security model

Playground runs other people's code by design — yours. Here's how it's kept safe.

## Threat: the learner's own code (web lessons & sandbox)

HTML/CSS/JS you write runs in an `<iframe sandbox="allow-scripts">` with
**`referrerpolicy="no-referrer"`** and crucially **without
`allow-same-origin`**. That means the preview:

- runs as an **opaque origin** — it cannot read or write this app's
  `localStorage`, cookies, IndexedDB, or the parent DOM;
- cannot navigate the top window or call same-origin APIs;
- communicates with the app only through `postMessage`. The parent **verifies
  `event.source` is the preview's own `contentWindow`** before trusting a
  message, and only ever reads three message shapes (console line, ready,
  validation result).

Worst case, a learner's script can mess up its own preview frame — never the app
around it. (A learner could spoof a "passed" validation message to mark their
*own* lesson complete; that's self-cheating, not a security issue.)

## Threat: the learner's Python

Python executes via **Pyodide (WebAssembly) inside a Web Worker** — sandboxed by
the browser's WASM model and isolated from the UI thread. The worker is
terminated and respawned to kill runaway loops. The Pyodide runtime is served
**from this app's own origin** (copied into `public/pyodide` at build), so no
third-party CDN is involved and Python works offline.

## Third-party: the hosted compiler (Swift / Java / Rust)

These languages have no in-browser runtime, so their source is sent to
**Wandbox** (`https://wandbox.org`) to compile and run, and the output is
returned. This is the one place code leaves the device, it only happens for
those three tracks, and it's disclosed in the UI and the README. No credentials,
tokens, or personal data are transmitted — just the snippet being run.

## Data & secrets

- No backend, no accounts, no authentication. All progress (completed lessons,
  XP, streak, saved code) lives in **`localStorage` on the device** and never
  leaves it.
- The repository contains **no secrets or API keys**; the hosted runner and the
  Pages deploy use no tokens beyond the GitHub-provided `GITHUB_TOKEN` in CI.

## Reviewed for

No `eval`, no `innerHTML`/`dangerouslySetInnerHTML`, no `allow-same-origin`, no
`target="_blank"` without `rel`, and exactly one external network destination
(the Wandbox compiler). Reporting an issue: open a GitHub issue on the repo.
