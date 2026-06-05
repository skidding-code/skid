import { Link } from "react-router-dom";
import { courses, trackLessons, nextIncomplete, getLesson } from "../curriculum";
import { useProgress } from "../store/progress";
import { ProgressRing } from "../components/ProgressRing";
import { Mascot } from "../components/Mascot";
import { XpBar } from "../components/XpBar";
import { xpFromCompleted } from "../game/xp";

export function Home() {
  const completed = useProgress((s) => s.completed);
  const streak = useProgress((s) => s.streak);

  const totalLessons = courses.reduce((n, c) => n + trackLessons(c.track).length, 0);
  const totalDone = Object.keys(completed).length;
  const xp = xpFromCompleted(totalDone);

  // Most-recently completed lesson → resume from the next one in that track.
  const lastDoneId = Object.entries(completed).sort((a, b) => b[1] - a[1])[0]?.[0];
  const lastTrack = lastDoneId ? getLesson(lastDoneId)?.lesson.track : undefined;
  const resume = lastTrack ? nextIncomplete(lastTrack, completed) : undefined;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__text">
          <div className="hero__eyebrow">Learn to code · by actually doing it</div>
          <h1 className="hero__title">
            Write real code,<br />
            <span className="hero__title-grad">watch it come alive.</span>
          </h1>
          <p className="hero__sub">
            Learn <strong>Python</strong>, <strong>JavaScript</strong>, <strong>Swift</strong>,{" "}
            <strong>Java</strong> &amp; <strong>Rust</strong> by running code yourself — not by
            watching someone else do it. No setup, no "works on my machine," no tears.
            (Okay, maybe happy ones.)
          </p>
          <div className="hero__cta">
            <Link to="/learn/python" className="btn btn--primary btn--lg">Start with Python →</Link>
            <Link to="/learn/web" className="btn btn--ghost btn--lg">Build a web page</Link>
          </div>
          {totalDone > 0 && (
            <Link to="/progress" className="hero__progress">
              <ProgressRing value={totalDone / totalLessons} size={44} stroke={5} id="hero" />
              <div className="hero__progress-meta">
                <XpBar xp={xp} variant="mini" />
                <span className="hero__progress-line">
                  {totalDone}/{totalLessons} lessons{streak > 0 ? ` · 🔥 ${streak}-day streak` : ""} — keep going!
                </span>
              </div>
            </Link>
          )}
        </div>
        <div className="hero__art" aria-hidden="true">
          <div className="hero__blob" />
          <Mascot mood="happy" size={150} />
        </div>
      </section>

      {resume && (
        <section className="resume">
          <Link to={`/lesson/${resume.lesson.id}`} className="resume__card">
            <span className="resume__glyph">{resume.chapter.glyph}</span>
            <span className="resume__text">
              <span className="resume__eyebrow">Jump back in</span>
              <span className="resume__title">{resume.lesson.title}</span>
              <span className="resume__sub">{resume.course.title} · {resume.chapter.title}</span>
            </span>
            <span className="resume__go">Resume →</span>
          </Link>
        </section>
      )}

      <section className="tracks">
        <h2 className="section-title">Pick your language</h2>
        <div className="tracks__grid">
          {courses.map((c) => {
            const list = trackLessons(c.track);
            const done = list.filter((l) => completed[l.lesson.id]).length;
            return (
              <Link
                to={`/learn/${c.track}`}
                key={c.track}
                className="course-card"
                style={
                  {
                    ["--c1" as string]: c.accent[0],
                    ["--c2" as string]: c.accent[1],
                  } as React.CSSProperties
                }
              >
                <div className="course-card__top">
                  <span className="course-card__glyph">{c.glyph}</span>
                  <ProgressRing
                    value={list.length ? done / list.length : 0}
                    gradient={c.accent}
                    id={c.track}
                    size={52}
                  />
                </div>
                <h3 className="course-card__title">{c.title}</h3>
                <p className="course-card__tag">{c.tagline}</p>
                <div className="course-card__meta">
                  <span>{c.chapters.length} chapters</span>
                  <span>·</span>
                  <span>{list.length} lessons</span>
                  <span className="course-card__go">{done > 0 ? "Continue →" : "Start →"}</span>
                </div>
              </Link>
            );
          })}

          <Link to="/sandbox" className="course-card course-card--sandbox">
            <div className="course-card__top">
              <span className="course-card__glyph">🧪</span>
            </div>
            <h3 className="course-card__title">Sandbox</h3>
            <p className="course-card__tag">
              A blank canvas with zero rules and zero judgment. Write and run Python or web code just to see what happens.
            </p>
            <div className="course-card__meta">
              <span className="course-card__go">Mess around →</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="why">
        <h2 className="section-title">Why it sticks</h2>
        <div className="why__grid">
          <Feature glyph="⚡" title="It actually runs">
            Python and web run right in your browser; Swift, Java &amp; Rust compile on a hosted runner. Real output, not "trust me, it works."
          </Feature>
          <Feature glyph="🎯" title="Checks that mean it">
            Each lesson inspects your real output and code. The little circles only go green when you've genuinely nailed it — no participation trophies.
          </Feature>
          <Feature glyph="📱" title="Runs on basically anything">
            Phone, tablet, laptop, that suspicious computer in the garage. Install it like an app; your progress tags along.
          </Feature>
          <Feature glyph="🧭" title="Starts from absolute zero">
            We begin at "Hello, world!" and sneak up on loops, functions, and tiny apps before you notice you've become a programmer.
          </Feature>
        </div>
      </section>
    </div>
  );
}

function Feature({ glyph, title, children }: { glyph: string; title: string; children: React.ReactNode }) {
  return (
    <div className="feature">
      <span className="feature__glyph">{glyph}</span>
      <h3 className="feature__title">{title}</h3>
      <p className="feature__body">{children}</p>
    </div>
  );
}
