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

export const webCourse: Course = {
  track: "web",
  title: "Web",
  tagline: "Build real pages and apps the whole world can open — HTML, CSS & JavaScript.",
  glyph: "🌐",
  accent: ["#f97316", "#ec4899"],
  chapters: [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09],
};
