# Playground — Learn to Code

A Swift Playgrounds–style, hands-on way to learn to code across **five
languages**. Every lesson runs for real, right in the browser — no setup, no
account, works on any device. And it's a game: you earn XP, level up, keep a
streak, and unlock badges as you go.

![icon](public/icons/icon-192.png)

## What it is

- **Five languages — 108 lessons:**
  - 🐍 **Python** (13 chapters, 39 lessons) — printing, variables, decisions,
    loops, lists, functions, strings, dictionaries, error handling, classes,
    modules & randomness, capstone mini-projects (FizzBuzz, times tables, a
    scoreboard), and comprehensions & tuples.
  - 🌐 **Web** (11 chapters, 33 lessons) — your first page, links/lists/images,
    CSS styling, flexbox layout, JavaScript, forms, events, animations, capstone
    mini-apps (click counter, color changer, mood board), a full personal
    homepage, and responsive design.
  - 🐦 **Swift**, ☕ **Java**, 🦀 **Rust** (4 chapters / 12 lessons each) —
    basics, control flow & collections, functions/methods/structs, plus a
    signature chapter each (Rust `match` & `Option`, Java lists & maps, Swift
    optionals & dictionaries).

- **Learning is a game:** every lesson grants XP toward leveling up (with playful
  titles), a daily **streak** keeps you coming back, and **12 badges** unlock as
  you hit milestones. Completing a lesson pops `+XP` / level-up / badge toasts
  with little sound chimes (mutable) and confetti. A **Progress** page is your
  trophy room; courses read as a "journey" path.

- **Installable PWA:** add it to your home screen / desktop and it runs like a
  native app — Python and the web lessons even work **offline**.

## Hosting

The app is build-portable — one `npm run build` works served from a domain root
**or** a sub-path (e.g. GitHub Pages `/<repo>/`), because the Pyodide runtime and
the sample asset resolve relative to wherever it's deployed.

A **Deploy to GitHub Pages** workflow (`.github/workflows/deploy.yml`) is ready to
go. To publish:

1. Enable Pages: repo **Settings → Pages → Source: "GitHub Actions"** (Pages on a
   *private* repo needs a paid plan; on a *public* repo it's free).
2. Run the workflow: **Actions → Deploy to GitHub Pages → Run workflow**.

It publishes to `https://<owner>.github.io/<repo>/`. Any static host (Netlify,
Vercel, Cloudflare Pages, S3) also works — just serve the `dist/` folder.

### Self-hosting on your own domain

`npm run build` produces a static `dist/` that works served from a domain root
or a sub-path. The robust way to serve it is any static web server:

```bash
npm ci && npm run build
npx serve -s dist -l 4173        # or nginx / Caddy / Apache pointing at dist/
```

If instead you put it behind a reverse proxy via `npm run preview`, Vite blocks
unknown hostnames by default. Hosts ending in `.renmin.site` and `localhost` are
allowed out of the box; override with an env var:

```bash
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com npm run preview -- --port 4173 --host
# or, to allow any host:
ALLOWED_HOSTS=all npm run preview -- --port 4173 --host
```

Serve over **HTTPS** so the service worker registers (needed for install +
offline). The app itself runs fine over plain HTTP too.

## How code runs

- **Python** runs in your browser via Pyodide (WebAssembly), bundled locally so
  it works **offline**.
- **Web** (HTML/CSS/JS) renders live in a sandboxed iframe — also offline.
- **Swift, Java, Rust** have no in-browser compiler, so they compile and run on
  a **hosted runner** ([Wandbox](https://wandbox.org)) — this needs an internet
  connection. Java and Rust are verified end-to-end against the real compilers
  (`npm run verify:remote`). Swift uses the same path, but free Swift containers
  are frequently down on the host side; when that happens the app says so and
  invites a retry rather than pretending it ran.
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
- **Hosted compilers** (`npm run verify:remote`, scoped to `TRACKS=java,rust` in
  CI) — compiles & runs every Swift/Java/Rust lesson's solution on the real
  compiler and asserts the grader passes. (Browsers can't reach the runner from
  the build container, but Node can — so these are verified server-side.)

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
  curriculum/        Pure-data lessons (python/ web/ swift/ java/ rust/) + schema
  runtime/           Pyodide worker + controller, hosted runner (Wandbox),
                     web preview bundle, checker
  game/              XP/levels, badges, sound effects
  components/        Editor (CodeMirror), Console, Preview, Toasts, XpBar, Mascot…
  pages/             Home, CoursePage, LessonPage, SandboxPage, ProgressPage
  store/             Progress + streak (zustand + localStorage), reward toasts
  styles/            Design tokens + component styles
```

See [`docs/AUTHORING.md`](docs/AUTHORING.md) to add lessons and
[`SECURITY.md`](SECURITY.md) for the sandbox/security model.

Lessons are **plain serializable data** (`Lesson` objects with declarative
`CheckRule`s), so the curriculum is easy to extend, validate, and reuse.
