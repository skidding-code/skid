/** Experience points & levels. XP is derived from completed lessons so it can
 * never drift from real progress. */

export const XP_PER_LESSON = 50;
const XP_PER_LEVEL = 150; // ~3 lessons per level — frequent, satisfying level-ups

export function xpFromCompleted(count: number): number {
  return count * XP_PER_LESSON;
}

export interface LevelInfo {
  level: number;
  /** XP earned within the current level. */
  into: number;
  /** XP needed to fill the current level. */
  needed: number;
  /** 0..1 progress through the current level. */
  progress: number;
  /** XP remaining until the next level. */
  toNext: number;
}

export function levelInfo(xp: number): LevelInfo {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const into = xp % XP_PER_LEVEL;
  return {
    level,
    into,
    needed: XP_PER_LEVEL,
    progress: into / XP_PER_LEVEL,
    toNext: XP_PER_LEVEL - into,
  };
}

/** A playful title for each level band, because numbers alone are boring. */
export function levelTitle(level: number): string {
  const titles = [
    "Hello World", // 1
    "Curly Brace Cadet", // 2
    "Loop Wrangler", // 3
    "Bug Whisperer", // 4
    "Function Forger", // 5
    "Syntax Sorcerer", // 6
    "Refactor Ranger", // 7
    "Stack Overlord", // 8
    "Compiler Charmer", // 9
    "Code Wizard", // 10
  ];
  return titles[Math.min(level - 1, titles.length - 1)] ?? "Code Wizard";
}
