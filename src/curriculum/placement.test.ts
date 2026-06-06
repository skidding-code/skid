import { describe, it, expect } from "vitest";
import { PLACEMENT, recommend } from "./placement";
import type { Track } from "./types";

const tracks = Object.keys(PLACEMENT) as Track[];

describe("placement question bank", () => {
  it("every question has a valid answer index and a chapter to start at", () => {
    for (const t of tracks) {
      for (const q of PLACEMENT[t]) {
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
        expect(q.chapterId).toMatch(/^[a-z]+-/);
      }
    }
  });

  it("correct answers are not always the same index (real test, not a pattern)", () => {
    const idxs = tracks.flatMap((t) => PLACEMENT[t].map((q) => q.answer));
    expect(new Set(idxs).size).toBeGreaterThan(1);
  });
});

describe("recommend()", () => {
  it("aces when all answers are correct", () => {
    for (const t of tracks) {
      const allRight = PLACEMENT[t].map((q) => q.answer);
      const r = recommend(t, allRight);
      expect(r.aced).toBe(true);
      expect(r.chapterId).toBeNull();
      expect(r.correct).toBe(r.total);
    }
  });

  it("recommends the first missed chapter, not a later one", () => {
    const t: Track = "python";
    const ans = PLACEMENT[t].map((q) => q.answer);
    // miss question index 2 (and also 4) → should recommend q2's chapter
    ans[2] = (ans[2] + 1) % PLACEMENT[t][2].options.length;
    ans[4] = (ans[4] + 1) % PLACEMENT[t][4].options.length;
    const r = recommend(t, ans);
    expect(r.aced).toBe(false);
    expect(r.chapterId).toBe(PLACEMENT[t][2].chapterId);
  });

  it("recommends chapter 1 when the first question is missed", () => {
    const t: Track = "rust";
    const ans = PLACEMENT[t].map((q) => q.answer);
    ans[0] = (ans[0] + 1) % PLACEMENT[t][0].options.length;
    expect(recommend(t, ans).chapterId).toBe(PLACEMENT[t][0].chapterId);
  });
});
