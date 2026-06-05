import { Link } from "react-router-dom";
import { courses, trackLessons } from "../curriculum";
import { useProgress } from "../store/progress";
import { ProgressRing } from "../components/ProgressRing";
import { Mascot } from "../components/Mascot";

export function Home() {
  const completed = useProgress((s) => s.completed);

  const totalLessons = courses.reduce((n, c) => n + trackLessons(c.track).length, 0);
  const totalDone = Object.keys(completed).length;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__text">
          <div className="hero__eyebrow">Learn to code · by doing</div>
          <h1 className="hero__title">
            Write real code,<br />
            <span className="hero__title-grad">watch it come alive.</span>
          </h1>
          <p className="hero__sub">
            A hands-on way to learn <strong>Python</strong> and the <strong>web</strong>.
            Every lesson runs for real — right here, no setup, on any device.
          </p>
          <div className="hero__cta">
            <Link to="/learn/python" className="btn btn--primary btn--lg">Start with Python →</Link>
            <Link to="/learn/web" className="btn btn--ghost btn--lg">Build a web page</Link>
          </div>
          {totalDone > 0 && (
            <div className="hero__progress">
              <ProgressRing value={totalDone / totalLessons} size={44} stroke={5} id="hero" />
              <span>
                {totalDone} of {totalLessons} lessons complete — keep going!
              </span>
            </div>
          )}
        </div>
        <div className="hero__art" aria-hidden="true">
          <div className="hero__blob" />
          <Mascot mood="happy" size={150} />
        </div>
      </section>

      <section className="tracks">
        <h2 className="section-title">Pick a path</h2>
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
              A blank canvas. Write and run Python or web code freely — no goals, just play.
            </p>
            <div className="course-card__meta">
              <span className="course-card__go">Open the sandbox →</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="why">
        <h2 className="section-title">Why it sticks</h2>
        <div className="why__grid">
          <Feature glyph="⚡" title="Runs instantly">
            Python runs in your browser through WebAssembly. Web pages render live as you build them. Nothing to install.
          </Feature>
          <Feature glyph="🎯" title="Real goals">
            Each lesson checks your actual output and code, so you always know when you've truly got it.
          </Feature>
          <Feature glyph="📱" title="Works everywhere">
            Install it as an app on your phone, tablet, or computer. Your progress is saved on your device.
          </Feature>
          <Feature glyph="🧭" title="Gentle on-ramp">
            Start from "Hello, world!" and grow into loops, functions, and interactive apps — one small win at a time.
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
