import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";

export const rustCourse: Course = {
  track: "rust",
  title: "Rust",
  tagline: "Fast and fearless — the language people vote their favorite. Runs on a hosted compiler.",
  glyph: "🦀",
  accent: ["#dea584", "#a33d1a"],
  chapters: [ch01, ch02, ch03],
};
