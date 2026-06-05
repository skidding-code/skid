import { Link, useParams, Navigate } from "react-router-dom";
import { getCourse, trackLessons } from "../curriculum";
import type { Track } from "../curriculum/types";
import { useProgress } from "../store/progress";
import { ProgressRing } from "../components/ProgressRing";

export function CoursePage() {
  const { track } = useParams<{ track: string }>();
  const completed = useProgress((s) => s.completed);

  if (track !== "python" && track !== "web") return <Navigate to="/" replace />;
  const course = getCourse(track as Track);
  const list = trackLessons(course.track);
  const done = list.filter((l) => completed[l.lesson.id]).length;

  return (
    <div className="course-page">
      <div
        className="course-hero"
        style={
          { ["--c1" as string]: course.accent[0], ["--c2" as string]: course.accent[1] } as React.CSSProperties
        }
      >
        <Link to="/" className="course-hero__back">← All paths</Link>
        <div className="course-hero__row">
          <span className="course-hero__glyph">{course.glyph}</span>
          <div>
            <h1 className="course-hero__title">{course.title}</h1>
            <p className="course-hero__tag">{course.tagline}</p>
          </div>
          <div className="course-hero__ring">
            <ProgressRing
              value={list.length ? done / list.length : 0}
              gradient={["#ffffff", "#ffffff"]}
              size={72}
              stroke={7}
              label={`${done}/${list.length}`}
              id={`hero-${course.track}`}
            />
          </div>
        </div>
      </div>

      <div className="chapters">
        {course.chapters.map((chapter, ci) => {
          const chDone = chapter.lessons.filter((l) => completed[l.id]).length;
          return (
            <section className="chapter" key={chapter.id}>
              <div className="chapter__head">
                <span className="chapter__glyph">{chapter.glyph}</span>
                <div className="chapter__heading">
                  <h2 className="chapter__title">
                    <span className="chapter__num">Chapter {ci + 1}</span>
                    {chapter.title}
                  </h2>
                  <p className="chapter__summary">{chapter.summary}</p>
                </div>
                <span className="chapter__count">
                  {chDone}/{chapter.lessons.length}
                </span>
              </div>
              <ol className="lesson-list">
                {chapter.lessons.map((lesson) => {
                  const isDone = !!completed[lesson.id];
                  return (
                    <li key={lesson.id}>
                      <Link to={`/lesson/${lesson.id}`} className={`lesson-row ${isDone ? "lesson-row--done" : ""}`}>
                        <span className={`lesson-row__mark ${isDone ? "is-done" : ""}`}>
                          {isDone ? "✓" : "▶"}
                        </span>
                        <span className="lesson-row__main">
                          <span className="lesson-row__title">{lesson.title}</span>
                          <span className="lesson-row__sub">{lesson.subtitle}</span>
                        </span>
                        <span className="lesson-row__meta">
                          {lesson.concepts.slice(0, 2).map((c) => (
                            <span key={c} className="chip">{c}</span>
                          ))}
                          <span className="lesson-row__mins">{lesson.estimatedMinutes} min</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
