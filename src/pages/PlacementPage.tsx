import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Track } from "../curriculum/types";
import {
  courses,
  chapterById,
  firstLessonOfChapter,
  getCourse,
  trackLessons,
  lessonsBeforeChapter,
  chapterAfter,
} from "../curriculum";
import { PLACEMENT, recommend, type Placement } from "../curriculum/placement";
import { useProgress } from "../store/progress";
import { LangMark } from "../components/LangMark";
import { Icon } from "../components/Icon";

const TRACK_ORDER: Track[] = ["python", "web", "swift", "java", "rust"];
type Phase = "pick" | "quiz" | "results";

export function PlacementPage() {
  const nav = useNavigate();
  const { setPlacement, setPlanEnabled, planEnabled } = useProgress();

  const [phase, setPhase] = useState<Phase>("pick");
  const [selected, setSelected] = useState<Set<Track>>(new Set(["python", "web"]));
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [pos, setPos] = useState(0);
  const [wantPlan, setWantPlan] = useState(false);

  // Flattened question queue across the selected tracks.
  const queue = useMemo(() => {
    const q: { track: Track; qi: number }[] = [];
    for (const t of TRACK_ORDER) {
      const qs = PLACEMENT[t];
      if (!selected.has(t) || !qs) continue;
      qs.forEach((_, qi) => q.push({ track: t, qi }));
    }
    return q;
  }, [selected]);

  const toggleTrack = (t: Track) =>
    setSelected((s) => {
      const next = new Set(s);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });

  const start = () => {
    const init: Record<string, number[]> = {};
    for (const t of selected) init[t] = (PLACEMENT[t] ?? []).map(() => -1);
    setAnswers(init);
    setPos(0);
    setPhase("quiz");
  };

  const choose = (idx: number) => {
    const { track, qi } = queue[pos];
    setAnswers((a) => {
      const copy = { ...a, [track]: [...(a[track] ?? [])] };
      copy[track][qi] = idx;
      return copy;
    });
    if (pos + 1 < queue.length) setPos(pos + 1);
    else finish();
  };

  const finish = () => {
    // Persist placement per tested track.
    for (const t of selected) {
      const rec = recommend(t, answers[t] ?? []);
      setPlacement(t, rec.chapterId ?? "");
    }
    setPhase("results");
  };

  if (phase === "pick") {
    return (
      <div className="placement">
        <div className="placement__intro">
          <span className="placement__badge"><Icon name="target" size={26} /></span>
          <h1>Find your level</h1>
          <p>
            A few quick questions per language — no pressure, no grades. We'll drop you in at the
            right spot so you don't slog through stuff you already know (or get thrown in the deep end).
          </p>
        </div>
        <h2 className="placement__h2">Which languages should we test?</h2>
        <div className="placement__pick">
          {courses.filter((c) => PLACEMENT[c.track]).map((c) => {
            const on = selected.has(c.track);
            return (
              <button
                key={c.track}
                className={`pickcard ${on ? "pickcard--on" : ""}`}
                onClick={() => toggleTrack(c.track)}
                aria-pressed={on}
              >
                <LangMark track={c.track} size={44} radius={13} />
                <span className="pickcard__name">{c.title}</span>
                <span className="pickcard__check">{on && <Icon name="check" size={16} />}</span>
              </button>
            );
          })}
        </div>
        <div className="placement__actions">
          <button className="btn btn--primary btn--lg" disabled={selected.size === 0} onClick={start}>
            Start the test ({queue.length} questions) →
          </button>
          <Link to="/" className="btn btn--ghost btn--lg">Maybe later</Link>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    const { track, qi } = queue[pos];
    const q = PLACEMENT[track]![qi];
    return (
      <div className="placement placement--quiz">
        <div className="quiz__bar">
          <div className="quiz__progress"><span style={{ width: `${(pos / queue.length) * 100}%` }} /></div>
          <span className="quiz__count">Question {pos + 1} of {queue.length}</span>
        </div>
        <div className="quiz__head">
          <LangMark track={track} size={40} radius={12} />
          <div>
            <div className="quiz__concept">{getCourse(track).title} · {q.concept}</div>
            <h2 className="quiz__prompt">{q.prompt}</h2>
          </div>
        </div>
        {q.code && <pre className="quiz__code"><code>{q.code}</code></pre>}
        <div className="quiz__options">
          {q.options.map((opt, i) => (
            <button key={i} className="quiz__option" onClick={() => choose(i)}>
              <span className="quiz__opt-key">{String.fromCharCode(65 + i)}</span>
              <code>{opt}</code>
            </button>
          ))}
        </div>
        <button className="link-muted" onClick={() => choose(-1)}>Not sure — skip</button>
      </div>
    );
  }

  // results
  return (
    <div className="placement">
      <div className="placement__intro">
        <span className="placement__badge placement__badge--done"><Icon name="trophy" size={26} /></span>
        <h1>Here's where to start</h1>
        <p>Saved to this device, so you'll see it on the home screen whenever you come back.</p>
      </div>

      <div className="results-list">
        {TRACK_ORDER.filter((t) => selected.has(t)).map((t) => (
          <ResultCard key={t} track={t} rec={recommend(t, answers[t] ?? [])} />
        ))}
      </div>

      {courses.filter((c) => !selected.has(c.track)).length > 0 && (
        <div className="blank-courses">
          <h2 className="placement__h2">Courses you didn't test — start fresh anytime</h2>
          <div className="blank-courses__grid">
            {courses.filter((c) => !selected.has(c.track)).map((c) => {
              const first = trackLessons(c.track)[0];
              return (
                <Link key={c.track} to={first ? `/lesson/${first.lesson.id}` : `/learn/${c.track}`} className="blank-course">
                  <LangMark track={c.track} size={36} radius={11} />
                  <span className="blank-course__name">{c.title}</span>
                  <span className="blank-course__go">Start →</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <label className="plan-toggle">
        <input
          type="checkbox"
          checked={wantPlan}
          onChange={(e) => {
            setWantPlan(e.target.checked);
            setPlanEnabled(e.target.checked || planEnabled);
          }}
        />
        <span>
          <strong>Build me a personal plan (optional)</strong>
          <span className="plan-toggle__sub">
            Turns your results into a step-by-step checklist on a Plan page. Off by default — you can
            toggle it anytime in Progress → Settings.
          </span>
        </span>
      </label>

      <div className="placement__actions">
        {wantPlan && <Link to="/plan" className="btn btn--primary btn--lg">See my plan →</Link>}
        <button className="btn btn--soft" onClick={() => { setPhase("pick"); setPos(0); }}>Retake</button>
        <button className="btn btn--ghost" onClick={() => nav("/")}>Go home</button>
      </div>
    </div>
  );
}

function ResultCard({ track, rec }: { track: Track; rec: Placement }) {
  const nav = useNavigate();
  const markManyComplete = useProgress((s) => s.markManyComplete);
  const course = getCourse(track);

  // Where we'd start, and what we assume you already know (everything before it).
  const pq = PLACEMENT[track];
  const lastTested = pq && pq.length ? pq[pq.length - 1].chapterId : undefined;
  const startChapterId = rec.aced
    ? lastTested
      ? chapterAfter(track, lastTested)
      : course.chapters[0]?.id
    : rec.chapterId ?? course.chapters[0]?.id;
  const startCh = startChapterId ? chapterById(startChapterId) : undefined;
  const startLesson = startChapterId ? firstLessonOfChapter(startChapterId) : undefined;
  const assumed = startChapterId ? lessonsBeforeChapter(track, startChapterId) : [];
  const firstLesson = trackLessons(track)[0];

  const continueHere = () => {
    if (assumed.length) markManyComplete(assumed.map((fl) => fl.lesson.id));
    nav(startLesson ? `/lesson/${startLesson.lesson.id}` : `/learn/${track}`);
  };
  const startScratch = () => nav(firstLesson ? `/lesson/${firstLesson.lesson.id}` : `/learn/${track}`);

  // Which chapters we're assuming are done.
  const assumedChapters = [...new Set(assumed.map((fl) => fl.chapter.title))];

  return (
    <div className="result-card result-card--big">
      <div className="result-card__top">
        <LangMark track={track} size={48} />
        <div className="result-card__body">
          <div className="result-card__track">
            {course.title} · {rec.correct}/{rec.total} correct{rec.aced ? " — aced it! ⭐" : ""}
          </div>
          <div className="result-card__head">
            {rec.aced ? "You're past the basics — start at" : "Start at"}: {startCh?.chapter.title ?? "the beginning"}
          </div>
          {startCh?.chapter.summary && <div className="result-card__sub">{startCh.chapter.summary}</div>}
        </div>
      </div>

      {assumedChapters.length > 0 && (
        <div className="assume">
          <div className="assume__title">
            <Icon name="check" size={14} /> We'll assume you've already done {assumed.length} lesson{assumed.length === 1 ? "" : "s"}:
          </div>
          <div className="assume__chapters">
            {assumedChapters.map((name) => (
              <span key={name} className="chip">{name}</span>
            ))}
          </div>
        </div>
      )}

      <div className="result-card__actions">
        <button className="btn btn--primary" onClick={continueHere}>
          {assumed.length ? "Continue from here (mark those done)" : "Start here"} →
        </button>
        <button className="btn btn--soft" onClick={startScratch}>Start from scratch</button>
      </div>
    </div>
  );
}
