import type { Track } from "../curriculum/types";
import type { EditorLang } from "../components/Editor";

/** How a single-file track is executed (web is multi-file and handled apart). */
export type ExecKind = "python" | "iframe" | "typescript" | "wandbox" | "godbolt" | "none";

export interface TrackConfig {
  /** CodeMirror grammar for the single-file editor. */
  lang: EditorLang;
  exec: ExecKind;
  /** File name shown above the editor. */
  fileName: string;
  /** false → "Check" only: grade code patterns, no live execution. */
  runnable: boolean;
  /** A short note shown for hosted / guided tracks. */
  note?: string;
}

/** Config for every single-file track (everything except the multi-file `web`). */
export const TRACK_CONFIG: Record<Exclude<Track, "web">, TrackConfig> = {
  python: { lang: "python", exec: "python", fileName: "main.py", runnable: true },
  swift: { lang: "swift", exec: "godbolt", fileName: "main.swift", runnable: true,
    note: "Compiles & runs on Compiler Explorer." },
  java: { lang: "java", exec: "wandbox", fileName: "Main.java", runnable: true,
    note: "Compiles & runs on Wandbox." },
  rust: { lang: "rust", exec: "wandbox", fileName: "main.rs", runnable: true,
    note: "Compiles & runs on Wandbox." },
  node: { lang: "javascript", exec: "iframe", fileName: "index.js", runnable: true },
  typescript: { lang: "typescript", exec: "typescript", fileName: "main.ts", runnable: true,
    note: "Type-checked TypeScript, transpiled and run right in your browser." },
  bash: { lang: "bash", exec: "wandbox", fileName: "script.sh", runnable: true,
    note: "Runs on Wandbox." },
  discordpy: { lang: "python", exec: "none", fileName: "bot.py", runnable: false,
    note: "Guided: we check your code. Running a real bot needs your own token + machine." },
  mcmods: { lang: "java", exec: "none", fileName: "ExampleMod.java", runnable: false,
    note: "Guided: we check your code. Building a mod needs the Forge/Gradle toolchain + Minecraft." },
  swiftui: { lang: "swift", exec: "none", fileName: "ContentView.swift", runnable: false,
    note: "Guided: we check your code. Running SwiftUI needs Xcode on a Mac." },
};

export function trackConfig(track: Track): TrackConfig {
  return TRACK_CONFIG[track as Exclude<Track, "web">];
}
