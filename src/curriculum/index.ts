import type { Course, Chapter, Lesson, Track } from "./types";
import { pythonCourse } from "./python";
import { webCourse } from "./web";
import { swiftCourse } from "./swift";
import { javaCourse } from "./java";
import { rustCourse } from "./rust";
import { nodeCourse } from "./node";
import { typescriptCourse } from "./typescript";
import { bashCourse } from "./bash";
import { discordpyCourse } from "./discordpy";
import { mcmodsCourse } from "./mcmods";
import { swiftuiCourse } from "./swiftui";

export const courses: Course[] = [
  pythonCourse,
  nodeCourse,
  typescriptCourse,
  webCourse,
  swiftCourse,
  javaCourse,
  rustCourse,
  bashCourse,
  discordpyCourse,
  swiftuiCourse,
  mcmodsCourse,
]
  // Hide any course that has no chapters yet (keeps the UI tidy if a track is WIP).
  .filter((c) => c.chapters.length > 0);

export function getCourse(track: Track): Course {
  const c = courses.find((c) => c.track === track);
  if (!c) throw new Error(`Unknown track: ${track}`);
  return c;
}

/** Every lesson, flattened, in curriculum order, tagged with its context. */
export interface FlatLesson {
  lesson: Lesson;
  chapter: Chapter;
  course: Course;
  index: number; // position within the whole track
}

function flatten(course: Course): FlatLesson[] {
  const out: FlatLesson[] = [];
  let i = 0;
  for (const chapter of course.chapters) {
    for (const lesson of chapter.lessons) {
      out.push({ lesson, chapter, course, index: i++ });
    }
  }
  return out;
}

const flatByTrack = new Map<Track, FlatLesson[]>();
const lessonIndex = new Map<string, FlatLesson>();
for (const course of courses) {
  const flat = flatten(course);
  flatByTrack.set(course.track, flat);
  for (const fl of flat) lessonIndex.set(fl.lesson.id, fl);
}

export function trackLessons(track: Track): FlatLesson[] {
  return flatByTrack.get(track) ?? [];
}

export function getLesson(id: string): FlatLesson | undefined {
  return lessonIndex.get(id);
}

export function neighbors(id: string): { prev?: Lesson; next?: Lesson } {
  const fl = lessonIndex.get(id);
  if (!fl) return {};
  const list = trackLessons(fl.lesson.track);
  return {
    prev: list[fl.index - 1]?.lesson,
    next: list[fl.index + 1]?.lesson,
  };
}

export function courseStats(track: Track) {
  return { total: trackLessons(track).length };
}

/** Find a chapter (and its course) by id, across all tracks. */
export function chapterById(chapterId: string): { chapter: Chapter; course: Course } | undefined {
  for (const course of courses) {
    const chapter = course.chapters.find((c) => c.id === chapterId);
    if (chapter) return { chapter, course };
  }
  return undefined;
}

/** The first lesson of a chapter — i.e. where to start when placed there. */
export function firstLessonOfChapter(chapterId: string): FlatLesson | undefined {
  const found = chapterById(chapterId);
  if (!found) return undefined;
  const firstId = found.chapter.lessons[0]?.id;
  return firstId ? lessonIndex.get(firstId) : undefined;
}

/** All lessons in a track from a given chapter onward (for a personal plan). */
export function lessonsFromChapter(track: Track, chapterId: string): FlatLesson[] {
  const list = trackLessons(track);
  const start = list.findIndex((fl) => fl.chapter.id === chapterId);
  return start < 0 ? list : list.slice(start);
}

/** All lessons in a track BEFORE a given chapter (the "assumed completed" set). */
export function lessonsBeforeChapter(track: Track, chapterId: string): FlatLesson[] {
  const list = trackLessons(track);
  const start = list.findIndex((fl) => fl.chapter.id === chapterId);
  return start <= 0 ? [] : list.slice(0, start);
}

/** The chapter id that follows the given one in a track (or the same id if it's
 * already the last chapter). */
export function chapterAfter(track: Track, chapterId: string): string {
  const course = getCourse(track);
  const i = course.chapters.findIndex((c) => c.id === chapterId);
  return course.chapters[i + 1]?.id ?? chapterId;
}

/** The first lesson in a track the learner hasn't completed yet — i.e. where to
 * resume. Returns undefined when the whole track is done. */
export function nextIncomplete(
  track: Track,
  completed: Record<string, number>,
): FlatLesson | undefined {
  return trackLessons(track).find((fl) => !completed[fl.lesson.id]);
}
