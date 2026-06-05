import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";

export const swiftCourse: Course = {
  track: "swift",
  title: "Swift",
  tagline: "Apple's friendly, modern language — runs on a hosted compiler.",
  glyph: "🐦",
  accent: ["#f05138", "#ff8a65"],
  chapters: [ch01, ch02, ch03],
};
