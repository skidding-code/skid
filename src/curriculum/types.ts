/**
 * The curriculum data model.
 *
 * Lessons are pure, serializable data so that the whole curriculum can be
 * authored as plain objects, validated, and even shipped to other surfaces
 * (native wrappers) without dragging executable code along. The lesson
 * *runner* and the *checker* interpret this data at runtime.
 */

export type Track =
  | "python"
  | "web"
  | "typescript"
  | "swift"
  | "java"
  | "rust"
  | "node"
  | "bash"
  | "discordpy"
  | "mcmods"
  | "swiftui";

/** Tracks that compile/run on a hosted runner (Wandbox / Compiler Explorer). */
export const REMOTE_TRACKS: Track[] = ["swift", "java", "rust", "bash"];
export const isRemoteTrack = (t: Track): boolean => REMOTE_TRACKS.includes(t);

/** A single block of teaching content shown above/around the editor. */
export type Prose =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "code"; text: string; lang?: string }
  | { type: "callout"; tone: "tip" | "note" | "warn"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string };

/**
 * A declarative success criterion. The checker evaluates these after the
 * learner runs their code. Python rules look at stdout + source; web rules are
 * evaluated *inside* the preview iframe against the live DOM.
 */
export interface CheckRule {
  /** Shown to the learner as a checklist item ("Print your name", ...). */
  label: string;
  kind:
    // --- source / stdout (mainly Python, but codeContains works anywhere) ---
    | "stdoutContains"
    | "stdoutEquals"
    | "stdoutMatches" // value is a RegExp source string
    | "stdoutMinLines"
    | "codeContains"
    | "codeNotContains"
    | "codeMatches"
    // --- live DOM (web track) ---
    | "domExists" // value = CSS selector
    | "domCountAtLeast" // value = "selector::N"
    | "domTextContains" // value = "selector::text"
    | "domAttrEquals" // value = "selector::attr::expected"
    | "cssProp"; // value = "selector::prop::expected-substring"
  value: string;
  /** Case-insensitive matching for text comparisons. Defaults to false. */
  ci?: boolean;
}

/** The files that make up a web lesson's starting point / solution. */
export interface WebFiles {
  html: string;
  css: string;
  js: string;
}

export interface Lesson {
  id: string;
  track: Track;
  title: string;
  /** One-line hook shown in lists. */
  subtitle: string;
  /** Skill concepts introduced, shown as chips. */
  concepts: string[];
  estimatedMinutes: number;
  /** Rich teaching content rendered above the workspace. */
  intro: Prose[];
  /** What the learner edits to begin. */
  starter: string | WebFiles;
  /** A known-good answer, revealable as a last resort. */
  solution: string | WebFiles;
  /** Success criteria. An empty array means "free explore, always passes". */
  checks: CheckRule[];
  /** Progressive hints, revealed one at a time. */
  hints: string[];
  /**
   * Optional celebratory note shown when all checks pass, to reinforce the
   * concept just learned.
   */
  wellDone?: string;
}

export interface Chapter {
  id: string;
  title: string;
  /** Emoji used as the chapter glyph. */
  glyph: string;
  summary: string;
  lessons: Lesson[];
}

export interface CourseMeta {
  track: Track;
  title: string;
  tagline: string;
  /** Accent gradient stops, used across cards and progress rings. */
  accent: [string, string];
  glyph: string;
}

export interface Course extends CourseMeta {
  chapters: Chapter[];
}

/** Narrow helpers so consumers don't repeat `typeof` checks everywhere. */
export const isWebFiles = (v: string | WebFiles): v is WebFiles =>
  typeof v === "object" && v !== null && "html" in v;

export function lessonLanguage(lesson: Lesson): Track {
  return lesson.track;
}
