# Playground — Learn to Code

A Swift Playgrounds–style, hands-on way to learn **Python** and the **web**
(HTML, CSS, JavaScript). Every lesson runs for real, right in the browser — no
setup, no account, works on any device.

![icon](public/icons/icon-192.png)

## What it is

- **Two full courses — 72 lessons across 24 chapters:**
  - 🐍 **Python** (13 chapters, 39 lessons) — printing, variables, decisions,
    loops, lists, functions, strings, dictionaries, error handling, classes,
    modules & randomness, capstone mini-projects (FizzBuzz, times tables, a
    scoreboard), and comprehensions & tuples.
  - 🌐 **Web** (11 chapters, 33 lessons) — your first page, links/lists/images,
    CSS styling, flexbox layout, JavaScript, forms, events, animations, capstone
    mini-apps (click counter, color changer, mood board), a full personal
    homepage, and responsive design.
- **Real execution.** Python runs in your browser via
  [Pyodide](https://pyodide.org/) (WebAssembly) in a Web Worker, so a runaway
  loop never freezes the UI. Web lessons render in a sandboxed live preview with
  a captured console.
- **Guided lessons with real goals.** Each lesson checks your actual output
  and code (and, for the web, the live DOM) so you know when you've truly got
  it — with progressive hints and a reveal-the-solution escape hatch.
- **Free-play Sandbox** for both Python and the web.
- **Saves your progress** locally (no account needed).
- **Installable PWA** — add it to your home screen / dock and it works offline.

## Run it

```bash
npm install
npm run dev      # start the dev server (copies Pyodide in first)
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

Requires Node 18+.

## Tested

This project is verified, not just shipped. CI (`.github/workflows/ci.yml`) runs
all of it on every push:

- **Type-check** (`npm run typecheck`) and **unit tests** (`npm test`) for the
  grading engine and preview bundler.
- **End-to-end** (`npm run e2e`) — opens **every lesson** in headless Chromium,
  reveals the known-good solution, runs it, and asserts the grader reports all
  goals met (72/72). Runtime, live preview, checker, and content verified together.
- **Offline PWA** (`npm run e2e:offline`) — runs the app and Python with the
  network cut, from the service-worker cache.
- **Accessibility** (`npm run a11y`) — axe-core scan of every screen; the build
  is kept free of serious/critical WCAG 2.1 AA violations.

```bash
npm run build && npm run preview &   # serve dist on :4173
npm run e2e                          # 72/72 lessons pass end-to-end
npm run e2e:offline                  # app + Python run with the network cut
```

The offline test is the real proof of the PWA promise: it loads the app, runs
Python once (caching the runtime via the service worker), then **cuts the
network**, reloads from cache, and confirms a fresh Python worker still boots
and grades a lesson green.

## How it reaches every platform

This is one web codebase delivered as a **Progressive Web App**, so it installs
and runs as an app on **Windows, macOS, iOS, iPadOS, Android, and the web** from
a single source of truth — just open it and "Add to Home Screen" / "Install".

To ship signed native binaries, wrap the same `dist/` build with
[Tauri](https://tauri.app/) (Windows/macOS/Linux desktop) or
[Capacitor](https://capacitorjs.com/) (iOS/iPadOS/Android) — exact commands are
in [`docs/NATIVE.md`](docs/NATIVE.md).

> Honest note: native iOS/iPadOS/macOS binaries require Xcode + an Apple
> machine to compile and sign, and Windows binaries require a Windows/MSVC
> toolchain. The web/PWA target builds and runs fully cross-platform from any
> OS, which is why it's the primary delivery here.

## Architecture

```
src/
  curriculum/        Pure-data lessons (python/ and web/) + the type schema
  runtime/           Pyodide worker + controller, web preview bundle, checker
  components/        Editor (CodeMirror), Console, Preview, Checklist, Mascot…
  pages/             Home, CoursePage, LessonPage, SandboxPage
  store/             Progress (zustand + localStorage)
  styles/            Design tokens + component styles
```

Lessons are **plain serializable data** (`Lesson` objects with declarative
`CheckRule`s), so the curriculum is easy to extend, validate, and reuse.
