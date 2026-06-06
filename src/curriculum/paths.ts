import type { Chapter, Course, Lesson, Track } from "./types";
import { getCourse, chapterById, trackLessons } from "./index";

/**
 * Learning paths: curated, cross-track journeys toward a goal ("become a web
 * frontend dev") rather than a single language. A path is an ordered list of
 * segments; each segment pulls in either a whole track or a specific run of
 * chapters, so two paths can share a foundation (e.g. TypeScript core) and then
 * diverge (frontend vs backend).
 */
export interface PathSegment {
  track: Track;
  /** Section heading shown above this segment's chapters. */
  label: string;
  /** Specific chapter ids, in order. Omit to include the whole track. */
  chapters?: string[];
  /** One line on why this segment is part of the journey. */
  why?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  accent: [string, string];
  /** The face shown on the path card — uses the LangMark of this track. */
  faceTrack: Track;
  segments: PathSegment[];
}

// TypeScript core, shared by both TS paths, then each adds its specialization.
const TS_CORE = [
  "ts-typed-basics",
  "ts-functions",
  "ts-objects-interfaces",
  "ts-unions-narrowing",
  "ts-arrays-tuples-generics",
  "ts-classes-enums",
  "ts-advanced-types",
];

export const learningPaths: LearningPath[] = [
  {
    id: "python",
    title: "Python, Start to Finish",
    subtitle: "Absolute beginner → confident Pythonista",
    blurb:
      "The friendliest on-ramp into programming. Variables, loops, functions, data structures, and real little programs — all running in your browser.",
    accent: ["#3b82f6", "#22c55e"],
    faceTrack: "python",
    segments: [{ track: "python", label: "Python", why: "One language, all the way through." }],
  },
  {
    id: "frontend",
    title: "Web Frontend",
    subtitle: "Build pages people can see and click",
    blurb:
      "Structure with HTML, style with CSS, bring it to life with JavaScript. The path to making things on the actual web.",
    accent: ["#f97316", "#ec4899"],
    faceTrack: "web",
    segments: [
      { track: "web", label: "HTML · CSS · JavaScript", why: "The three languages every web page is made of." },
    ],
  },
  {
    id: "fullstack",
    title: "Fullstack Web Dev",
    subtitle: "Frontend AND the server behind it",
    blurb:
      "Start with the page in the browser, then build the JavaScript backend that feeds it data. The full round-trip, front to back.",
    accent: ["#8b5cf6", "#22c55e"],
    faceTrack: "web",
    segments: [
      { track: "web", label: "Frontend — HTML/CSS/JS", why: "What the user actually sees." },
      { track: "node", label: "Backend — Node.js", why: "The server that powers it all." },
    ],
  },
  {
    id: "backend-node",
    title: "Web Backend (Node.js)",
    subtitle: "Servers, data, and logic in JavaScript",
    blurb:
      "Use the JavaScript you know on the server side: functions, arrays, objects, classes, JSON, and async — the toolkit behind every API.",
    accent: ["#a3b626", "#5c7a1e"],
    faceTrack: "node",
    segments: [{ track: "node", label: "Node.js / JavaScript", why: "Server-side JavaScript, end to end." }],
  },
  {
    id: "ts-frontend",
    title: "TypeScript · Frontend",
    subtitle: "Typed JavaScript for building UIs",
    blurb:
      "Master TypeScript's type system, then point it at the frontend: component state, event handlers, loading/error/success states, and typed reducers.",
    accent: ["#3178c6", "#ec4899"],
    faceTrack: "typescript",
    segments: [
      { track: "typescript", label: "TypeScript core", chapters: TS_CORE, why: "The type system, from the ground up." },
      { track: "typescript", label: "Frontend types", chapters: ["ts-frontend"], why: "The exact types you write building a UI." },
    ],
  },
  {
    id: "ts-backend",
    title: "TypeScript · Backend",
    subtitle: "Typed JavaScript for servers & APIs",
    blurb:
      "Master TypeScript's type system, then model a server with it: request/response types, Promise<T>, Result types, and typed JSON — on the Node.js runtime.",
    accent: ["#3178c6", "#5c7a1e"],
    faceTrack: "typescript",
    segments: [
      { track: "typescript", label: "TypeScript core", chapters: TS_CORE, why: "The type system, from the ground up." },
      { track: "typescript", label: "Backend types", chapters: ["ts-backend"], why: "Modeling APIs, async, and errors with types." },
      { track: "node", label: "Node.js runtime", why: "Where server-side JavaScript actually runs." },
    ],
  },
];

export function getPath(id: string): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id);
}

export interface ResolvedSegment {
  label: string;
  why?: string;
  course: Course;
  chapters: Chapter[];
}

/** Turn a path's segments into concrete chapters (skipping any that don't exist). */
export function resolvePath(path: LearningPath): ResolvedSegment[] {
  const out: ResolvedSegment[] = [];
  for (const seg of path.segments) {
    const course = getCourse(seg.track);
    let chapters: Chapter[];
    if (seg.chapters) {
      chapters = seg.chapters
        .map((cid) => chapterById(cid)?.chapter)
        .filter((c): c is Chapter => Boolean(c));
    } else {
      chapters = course.chapters;
    }
    if (chapters.length) out.push({ label: seg.label, why: seg.why, course, chapters });
  }
  return out;
}

/** Every lesson in a path, in order. */
export function pathLessons(path: LearningPath): Lesson[] {
  return resolvePath(path).flatMap((s) => s.chapters.flatMap((c) => c.lessons));
}

/** Counts + the next not-yet-completed lesson for a path. */
export function pathProgress(path: LearningPath, completed: Record<string, number>) {
  const lessons = pathLessons(path);
  const done = lessons.filter((l) => completed[l.id]).length;
  const next = lessons.find((l) => !completed[l.id]);
  return { total: lessons.length, done, next };
}

/** Sanity check used by tests: every referenced chapter id must resolve. */
export function unknownChapterIds(): string[] {
  const missing: string[] = [];
  for (const p of learningPaths) {
    for (const seg of p.segments) {
      for (const cid of seg.chapters ?? []) {
        if (!chapterById(cid)) missing.push(`${p.id}:${cid}`);
      }
      // Track must exist too.
      try {
        getCourse(seg.track);
      } catch {
        missing.push(`${p.id}:track:${seg.track}`);
      }
    }
  }
  return missing;
}

// `trackLessons` is re-exported for callers that want raw per-track data here.
export { trackLessons };
