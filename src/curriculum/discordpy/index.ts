import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";
import { ch04 } from "./ch04";
import { ch05 } from "./ch05";

export const discordpyCourse: Course = {
  track: "discordpy",
  title: "Discord Bots",
  tagline: "Build a Discord bot in Python — commands, events, embeds. A guided, code-checked walkthrough.",
  glyph: "🤖",
  accent: ["#5865f2", "#7c3aed"],
  chapters: [ch01, ch02, ch03, ch04, ch05],
};
