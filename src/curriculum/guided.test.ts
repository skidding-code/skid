import { describe, it, expect } from "vitest";
import { courses } from "./index";
import { isWebFiles, type Track } from "./types";
import { trackConfig } from "../runtime/tracks";
import { evalSourceRules } from "../runtime/checker";

/**
 * Guided tracks (Discord bots, MC mods, SwiftUI) aren't executed — they're
 * graded purely on code patterns. Verify every guided lesson the way a learner
 * would: the SOLUTION passes all checks, and the STARTER fails at least one.
 * (Their checks must be code-only — never stdout/dom.)
 */
const GUIDED = courses.filter((c) => c.track !== "web" && !trackConfig(c.track as Track).runnable);

describe("guided-track lessons grade correctly", () => {
  it("there are guided courses to check", () => {
    expect(GUIDED.length).toBeGreaterThan(0);
  });

  for (const course of GUIDED) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        it(`${lesson.id}: solution passes, starter fails`, () => {
          expect(isWebFiles(lesson.solution)).toBe(false);
          expect(isWebFiles(lesson.starter)).toBe(false);
          const solution = lesson.solution as string;
          const starter = lesson.starter as string;

          // No execution → checks must be source-based only.
          for (const c of lesson.checks) {
            expect(["codeContains", "codeNotContains", "codeMatches"]).toContain(c.kind);
          }

          const solRes = evalSourceRules(lesson.checks, { stdout: "", code: solution });
          expect(solRes.every((r) => r.passed)).toBe(true);

          const starterRes = evalSourceRules(lesson.checks, { stdout: "", code: starter });
          expect(starterRes.some((r) => !r.passed)).toBe(true);
        });
      }
    }
  }
});
