# Shipping Playground to native platforms

Playground is one web codebase. The **primary cross-platform target is the PWA**
— building `dist/` and hosting it (or opening it) lets it install and run as an
app on Windows, macOS, iOS, iPadOS, Android, and the web with no extra tooling.

If you want **signed native binaries**, wrap the same `dist/` build with one of
the toolchains below. These steps require the matching OS/toolchain (which is
why they aren't run in the Linux build container that produced this repo).

## Desktop (Windows · macOS · Linux) — Tauri

Tauri produces small native binaries around a system webview. Requires Rust +
the platform build tools (MSVC on Windows, Xcode CLT on macOS).

```bash
npm create tauri-app@latest        # or: npm i -D @tauri-apps/cli
# Point Tauri at this project's build:
#   tauri.conf.json -> build.frontendDist = "../dist"
#                      build.beforeBuildCommand = "npm run build"
npx tauri build                    # -> .msi / .dmg / .AppImage
```

- Windows `.msi`/`.exe`: run `npx tauri build` on Windows.
- macOS `.dmg`/`.app`: run `npx tauri build` on macOS (signing needs an Apple
  Developer ID).

## iOS / iPadOS / Android — Capacitor

```bash
npm i -D @capacitor/cli && npm i @capacitor/core
npx cap init Playground cc.playground.app --web-dir=dist
npm run build && npx cap add ios && npx cap add android
npx cap sync
npx cap open ios        # opens Xcode  (build/sign/run needs macOS + Xcode)
npx cap open android    # opens Android Studio
```

iOS/iPadOS builds must be compiled and signed in Xcode on a Mac with an Apple
Developer account; Android builds in Android Studio.

## Why the PWA is the honest default here

Native iOS/iPadOS/macOS binaries cannot be compiled or signed on Linux (they
need Xcode + Apple hardware), and Windows binaries need a Windows/MSVC
toolchain. The PWA reaches every one of those platforms from a single build that
*was* produced and tested here — so it's the path this repo ships green.
