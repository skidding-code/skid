import { courses, trackLessons } from "../curriculum";
import type { Track } from "../curriculum/types";

export interface Badge {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

/** Everything a badge predicate needs, computed once from raw progress. */
export interface BadgeContext {
  completed: Record<string, number>;
  total: number; // total lessons completed
  byTrack: Record<Track, number>;
  tracksTouched: number; // distinct tracks with >=1 completion
  fullCourses: number; // courses 100% complete
  chaptersCleared: number; // chapters 100% complete
  streak: number;
}

export function buildBadgeContext(
  completed: Record<string, number>,
  streak: number,
): BadgeContext {
  const byTrack = {} as Record<Track, number>;
  let chaptersCleared = 0;
  let fullCourses = 0;
  for (const course of courses) {
    let courseDone = 0;
    for (const chapter of course.chapters) {
      const done = chapter.lessons.filter((l) => completed[l.id]).length;
      if (done === chapter.lessons.length && chapter.lessons.length > 0) chaptersCleared++;
      courseDone += done;
    }
    byTrack[course.track] = courseDone;
    const totalInCourse = trackLessons(course.track).length;
    if (totalInCourse > 0 && courseDone === totalInCourse) fullCourses++;
  }
  const tracksTouched = (Object.values(byTrack) as number[]).filter((n) => n > 0).length;
  return {
    completed,
    total: Object.keys(completed).length,
    byTrack,
    tracksTouched,
    fullCourses,
    chaptersCleared,
    streak,
  };
}

interface BadgeDef extends Badge {
  earned: (c: BadgeContext) => boolean;
}

const DEFS: BadgeDef[] = [
  { id: "first-steps", emoji: "🌱", title: "First Steps", description: "Finish your very first lesson.", earned: (c) => c.total >= 1 },
  { id: "warming-up", emoji: "🔌", title: "Warmed Up", description: "Complete 5 lessons.", earned: (c) => c.total >= 5 },
  { id: "chapter-clear", emoji: "📖", title: "Chapter Closed", description: "Finish every lesson in a chapter.", earned: (c) => c.chaptersCleared >= 1 },
  { id: "dedicated", emoji: "💪", title: "Dedicated", description: "Complete 25 lessons.", earned: (c) => c.total >= 25 },
  { id: "graduate", emoji: "🎓", title: "Graduate", description: "Finish an entire language course.", earned: (c) => c.fullCourses >= 1 },
  { id: "half-century", emoji: "💯", title: "Half-Century", description: "Complete 50 lessons.", earned: (c) => c.total >= 50 },
  { id: "bilingual", emoji: "🗣️", title: "Bilingual", description: "Try lessons in 2 different languages.", earned: (c) => c.tracksTouched >= 2 },
  { id: "polyglot", emoji: "🌍", title: "Polyglot", description: "Try lessons in 3 different languages.", earned: (c) => c.tracksTouched >= 3 },
  { id: "pentaglot", emoji: "🗺️", title: "Full House", description: "Try all five languages.", earned: (c) => c.tracksTouched >= 5 },
  { id: "streak-3", emoji: "🔥", title: "On a Roll", description: "Keep a 3-day streak.", earned: (c) => c.streak >= 3 },
  { id: "streak-7", emoji: "🚒", title: "Unstoppable", description: "Keep a 7-day streak.", earned: (c) => c.streak >= 7 },
  { id: "completionist", emoji: "🏆", title: "Completionist", description: "Finish every course. Show-off.", earned: (c) => c.fullCourses >= courses.length },
];

export const ALL_BADGES: Badge[] = DEFS.map(({ earned: _earned, ...b }) => b);

export function earnedBadgeIds(c: BadgeContext): Set<string> {
  return new Set(DEFS.filter((d) => d.earned(c)).map((d) => d.id));
}

export function badgeById(id: string): Badge | undefined {
  return DEFS.find((d) => d.id === id);
}
