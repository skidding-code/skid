import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";

export const discordpyCourse: Course = {
  track: "discordpy",
  title: "Discord Bots",
  tagline: "Build a Discord bot in Python — commands, events, embeds. A guided, code-checked walkthrough.",
  glyph: "🤖",
  accent: ["#5865f2", "#7c3aed"],
  chapters: [ch01, ch02, ch03],
};
