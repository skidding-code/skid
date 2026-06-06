import { Link } from "react-router-dom";
import type { Track } from "../curriculum/types";
import { lessonsFromChapter, getCourse } from "../curriculum";
import { useProgress } from "../store/progress";
import { LangMark } from "../components/LangMark";
import { Icon } from "../components/Icon";

export function PlanPage() {
  const { placement, planEnabled, completed, setPlanEnabled } = useProgress();
  const tracks = Object.keys(placement) as Track[];

  if (tracks.length === 0) {
    return (
      <div className="plan-page">
        <Empty
          title="No plan yet"
          body="Take the quick placement test and we'll turn the result into a step-by-step plan."
          cta={<Link to="/placement" className="btn btn--primary btn--lg">Find my level →</Link>}
        />
      </div>
    );
  }

  return (
    <div className="plan-page">
      <div className="plan-head">
        <h1>Your plan</h1>
        <p>Built from your placement test — work top to bottom, or jump around. Progress saves automatically.</p>
        {!planEnabled && (
          <button className="btn btn--soft" onClick={() => setPlanEnabled(true)}>Turn the plan on everywhere</button>
        )}
      </div>

      {tracks.map((track) => {
        const startChapter = placement[track] || "";
        const lessons = lessonsFromChapter(track, startChapter);
        const done = lessons.filter((fl) => completed[fl.lesson.id]).length;
        const nextId = lessons.find((fl) => !completed[fl.lesson.id])?.lesson.id;
        const course = getCourse(track);
        return (
          <section className="plan-track" key={track}>
            <div className="plan-track__head">
              <LangMark track={track} size={40} radius={12} />
              <div className="plan-track__title">{course.title}</div>
              <div className="plan-track__count">{done}/{lessons.length}</div>
            </div>
            <ol className="plan-list">
              {lessons.map((fl) => {
                const isDone = !!completed[fl.lesson.id];
                const isNext = fl.lesson.id === nextId;
                return (
                  <li key={fl.lesson.id}>
                    <Link to={`/lesson/${fl.lesson.id}`} className={`plan-row ${isDone ? "is-done" : ""} ${isNext ? "is-next" : ""}`}>
                      <span className="plan-row__mark">
                        {isDone ? <Icon name="check" size={14} /> : isNext ? <Icon name="play" size={13} /> : null}
                      </span>
                      <span className="plan-row__title">{fl.lesson.title}</span>
                      <span className="plan-row__chap">{fl.chapter.title}</span>
                      {isNext && <span className="plan-row__next">Next</span>}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

function Empty({ title, body, cta }: { title: string; body: string; cta: React.ReactNode }) {
  return (
    <div className="plan-empty">
      <span className="placement__badge"><Icon name="compass" size={26} /></span>
      <h1>{title}</h1>
      <p>{body}</p>
      {cta}
    </div>
  );
}
