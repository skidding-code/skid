import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";

export const nodeCourse: Course = {
  track: "node",
  title: "JavaScript",
  tagline: "The language of the web and Node. Runs live, right here — variables, functions, objects.",
  glyph: "🟨",
  accent: ["#a3b626", "#5c7a1e"],
  chapters: [ch01, ch02, ch03],
};
