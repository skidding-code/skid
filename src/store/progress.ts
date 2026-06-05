import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "system" | "light" | "dark";

/** Local date key (YYYY-MM-DD) used for streak tracking. */
function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
}

interface ProgressState {
  /** lessonId -> completed timestamp (ms). */
  completed: Record<string, number>;
  /** lessonId -> the learner's last code (string for python, JSON for web). */
  saved: Record<string, string>;
  theme: ThemeMode;
  soundOn: boolean;
  /** Consecutive-day streak state. */
  streak: number;
  lastActiveDay: string | null;

  markComplete: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;
  saveCode: (lessonId: string, code: string) => void;
  getSaved: (lessonId: string) => string | undefined;
  resetLesson: (lessonId: string) => void;
  resetAll: () => void;
  setTheme: (t: ThemeMode) => void;
  setSound: (on: boolean) => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      saved: {},
      theme: "system",
      soundOn: true,
      streak: 0,
      lastActiveDay: null,

      markComplete: (lessonId) =>
        set((s) => {
          if (s.completed[lessonId]) return s; // already done — no double-count
          // Advance the streak (only on a genuinely new completion).
          const today = dayKey();
          let streak = s.streak;
          if (s.lastActiveDay === today) {
            streak = s.streak || 1;
          } else if (s.lastActiveDay && daysBetween(s.lastActiveDay, today) === 1) {
            streak = s.streak + 1;
          } else {
            streak = 1;
          }
          return {
            completed: { ...s.completed, [lessonId]: Date.now() },
            streak,
            lastActiveDay: today,
          };
        }),
      isComplete: (lessonId) => !!get().completed[lessonId],
      saveCode: (lessonId, code) => set((s) => ({ saved: { ...s.saved, [lessonId]: code } })),
      getSaved: (lessonId) => get().saved[lessonId],
      resetLesson: (lessonId) =>
        set((s) => {
          const completed = { ...s.completed };
          const saved = { ...s.saved };
          delete completed[lessonId];
          delete saved[lessonId];
          return { completed, saved };
        }),
      resetAll: () => set({ completed: {}, saved: {}, streak: 0, lastActiveDay: null }),
      setTheme: (theme) => set({ theme }),
      setSound: (soundOn) => set({ soundOn }),
    }),
    { name: "playground-progress-v1" },
  ),
);
