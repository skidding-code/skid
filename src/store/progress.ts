import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "system" | "light" | "dark";

interface ProgressState {
  /** lessonId -> completed timestamp (ms). */
  completed: Record<string, number>;
  /** lessonId -> the learner's last code (string for python, JSON for web). */
  saved: Record<string, string>;
  /** Total stars earned (one per completed lesson) for the hero stat. */
  theme: ThemeMode;

  markComplete: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;
  saveCode: (lessonId: string, code: string) => void;
  getSaved: (lessonId: string) => string | undefined;
  resetLesson: (lessonId: string) => void;
  resetAll: () => void;
  setTheme: (t: ThemeMode) => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      saved: {},
      theme: "system",

      markComplete: (lessonId) =>
        set((s) =>
          s.completed[lessonId]
            ? s
            : { completed: { ...s.completed, [lessonId]: Date.now() } },
        ),
      isComplete: (lessonId) => !!get().completed[lessonId],
      saveCode: (lessonId, code) =>
        set((s) => ({ saved: { ...s.saved, [lessonId]: code } })),
      getSaved: (lessonId) => get().saved[lessonId],
      resetLesson: (lessonId) =>
        set((s) => {
          const completed = { ...s.completed };
          const saved = { ...s.saved };
          delete completed[lessonId];
          delete saved[lessonId];
          return { completed, saved };
        }),
      resetAll: () => set({ completed: {}, saved: {} }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: "playground-progress-v1" },
  ),
);
