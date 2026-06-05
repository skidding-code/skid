import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";
import { ch04 } from "./ch04";

export const javaCourse: Course = {
  track: "java",
  title: "Java",
  tagline: "The workhorse behind apps, Android, and big systems — runs on a hosted compiler.",
  glyph: "☕",
  accent: ["#e76f00", "#5382a1"],
  chapters: [ch01, ch02, ch03, ch04],
};
