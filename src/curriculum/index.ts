import type { Course, Chapter, Lesson, Track } from "./types";
import { pythonCourse } from "./python";
import { webCourse } from "./web";

export const courses: Course[] = [pythonCourse, webCourse];

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

const flatByTrack: Record<Track, FlatLesson[]> = {
  python: flatten(pythonCourse),
  web: flatten(webCourse),
};

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

export function trackLessons(track: Track): FlatLesson[] {
  return flatByTrack[track];
}

const lessonIndex: Map<string, FlatLesson> = new Map();
for (const track of Object.keys(flatByTrack) as Track[]) {
  for (const fl of flatByTrack[track]) lessonIndex.set(fl.lesson.id, fl);
}

export function getLesson(id: string): FlatLesson | undefined {
  return lessonIndex.get(id);
}

export function neighbors(id: string): { prev?: Lesson; next?: Lesson } {
  const fl = lessonIndex.get(id);
  if (!fl) return {};
  const list = flatByTrack[fl.lesson.track];
  return {
    prev: list[fl.index - 1]?.lesson,
    next: list[fl.index + 1]?.lesson,
  };
}

export function courseStats(track: Track) {
  const list = trackLessons(track);
  return { total: list.length };
}

/** The first lesson in a track the learner hasn't completed yet — i.e. where to
 * resume. Returns undefined when the whole track is done. */
export function nextIncomplete(
  track: Track,
  completed: Record<string, number>,
): FlatLesson | undefined {
  return trackLessons(track).find((fl) => !completed[fl.lesson.id]);
}
