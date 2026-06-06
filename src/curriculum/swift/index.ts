import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";
import { ch04 } from "./ch04";
import { ch05 } from "./ch05";
import { ch06 } from "./ch06";
import { ch07 } from "./ch07";
import { ch08 } from "./ch08";
import { ch09 } from "./ch09";

export const swiftCourse: Course = {
  track: "swift",
  title: "Swift",
  tagline: "Apple's friendly, modern language — runs on a hosted compiler.",
  glyph: "🐦",
  accent: ["#f05138", "#ff8a65"],
  chapters: [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09],
};
