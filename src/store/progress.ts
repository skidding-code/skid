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

/** Union two completed maps, keeping the earliest completion timestamp. */
function mergeCompleted(
  a: Record<string, number>,
  b: Record<string, number>,
): Record<string, number> {
  const out: Record<string, number> = { ...a };
  for (const [k, v] of Object.entries(b)) {
    out[k] = out[k] ? Math.min(out[k], v) : v;
  }
  return out;
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
  /** Placement result per track: chapterId to start at ("" = aced/mastered). */
  placement: Record<string, string>;
  /** Personal plan is opt-in — OFF by default. */
  planEnabled: boolean;

  markComplete: (lessonId: string) => void;
  /** Mark many lessons complete at once (e.g. "assume earlier lessons done"). */
  markManyComplete: (lessonIds: string[]) => void;
  isComplete: (lessonId: string) => boolean;
  saveCode: (lessonId: string, code: string) => void;
  getSaved: (lessonId: string) => string | undefined;
  resetLesson: (lessonId: string) => void;
  resetAll: () => void;
  setTheme: (t: ThemeMode) => void;
  setSound: (on: boolean) => void;
  setPlacement: (track: string, chapterId: string) => void;
  setPlanEnabled: (on: boolean) => void;
  /** Merge a remote (cloud) snapshot into local progress — union, never lose. */
  mergeRemote: (r: Partial<ProgressState>) => void;
}

/** The progress fields that sync to an account (no functions). */
export type SyncState = Pick<
  ProgressState,
  "completed" | "saved" | "streak" | "lastActiveDay" | "placement" | "planEnabled"
>;

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      saved: {},
      theme: "system",
      soundOn: true,
      streak: 0,
      lastActiveDay: null,
      placement: {},
      planEnabled: false,

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
      markManyComplete: (lessonIds) =>
        set((s) => {
          const completed = { ...s.completed };
          const now = Date.now();
          for (const id of lessonIds) if (!completed[id]) completed[id] = now;
          return { completed };
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
      resetAll: () =>
        set({ completed: {}, saved: {}, streak: 0, lastActiveDay: null, placement: {}, planEnabled: false }),
      setTheme: (theme) => set({ theme }),
      setSound: (soundOn) => set({ soundOn }),
      setPlacement: (track, chapterId) =>
        set((s) => ({ placement: { ...s.placement, [track]: chapterId } })),
      setPlanEnabled: (planEnabled) => set({ planEnabled }),
      mergeRemote: (r) =>
        set((s) => ({
          // Union completed lessons, keeping the earliest timestamp for each.
          completed: mergeCompleted(s.completed, r.completed ?? {}),
          // Local edits win for saved code; otherwise take the remote copy.
          saved: { ...(r.saved ?? {}), ...s.saved },
          streak: Math.max(s.streak, r.streak ?? 0),
          lastActiveDay: [s.lastActiveDay, r.lastActiveDay].filter(Boolean).sort().pop() ?? null,
          placement: { ...(r.placement ?? {}), ...s.placement },
          planEnabled: s.planEnabled || !!r.planEnabled,
        })),
    }),
    { name: "playground-progress-v1" },
  ),
);
