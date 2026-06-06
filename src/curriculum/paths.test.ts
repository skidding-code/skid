import { describe, it, expect } from "vitest";
import { learningPaths, resolvePath, pathLessons, unknownChapterIds } from "./paths";

describe("learning paths", () => {
  it("reference only chapters/tracks that exist", () => {
    expect(unknownChapterIds()).toEqual([]);
  });

  it("each path resolves to at least one chapter and runs in order", () => {
    for (const p of learningPaths) {
      const segs = resolvePath(p);
      expect(segs.length).toBeGreaterThan(0);
      const lessons = pathLessons(p);
      expect(lessons.length).toBeGreaterThan(0);
      // Lesson ids within a path are unique (no chapter pulled in twice).
      const ids = lessons.map((l) => l.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("the two TypeScript paths share a core but diverge", () => {
    const fe = pathLessons(learningPaths.find((p) => p.id === "ts-frontend")!).map((l) => l.id);
    const be = pathLessons(learningPaths.find((p) => p.id === "ts-backend")!).map((l) => l.id);
    // Shared TypeScript-core lessons exist in both…
    expect(fe.some((id) => be.includes(id))).toBe(true);
    // …but each has lessons the other doesn't (the specialization).
    expect(fe.some((id) => !be.includes(id))).toBe(true);
    expect(be.some((id) => !fe.includes(id))).toBe(true);
  });
});
