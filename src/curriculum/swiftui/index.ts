import type { Course } from "../types";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";

export const swiftuiCourse: Course = {
  track: "swiftui",
  title: "SwiftUI",
  tagline: "Build iOS & macOS app screens with SwiftUI — views, stacks, state. Guided and code-checked.",
  glyph: "📱",
  accent: ["#fb6d3a", "#0a84ff"],
  chapters: [ch01, ch02, ch03],
};
