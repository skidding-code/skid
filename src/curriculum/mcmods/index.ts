import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";
import { ch04 } from "./ch04";
import { ch05 } from "./ch05";
import { ch06 } from "./ch06";

export const mcmodsCourse: Course = {
  track: "mcmods",
  title: "Minecraft Mods",
  tagline: "Write Minecraft mods in Java with Forge — items, blocks, events. Guided and code-checked.",
  glyph: "🧱",
  accent: ["#7cae42", "#4d6b2a"],
  chapters: [ch01, ch02, ch03, ch04, ch05, ch06],
};
