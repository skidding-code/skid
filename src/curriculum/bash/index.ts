import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";
import { ch04 } from "./ch04";
import { ch05 } from "./ch05";
import { ch06 } from "./ch06";

export const bashCourse: Course = {
  track: "bash",
  title: "Terminal",
  tagline: "Command the shell. echo, variables, loops and pipes — runs on a hosted runner.",
  glyph: "💻",
  accent: ["#34d399", "#065f46"],
  chapters: [ch01, ch02, ch03, ch04, ch05, ch06],
};
