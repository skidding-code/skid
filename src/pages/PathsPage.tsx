import { Link, useParams, Navigate } from "react-router-dom";
import { learningPaths, getPath, resolvePath, pathProgress } from "../curriculum/paths";
import { useProgress } from "../store/progress";
import { LangMark } from "../components/LangMark";
import { ProgressRing } from "../components/ProgressRing";
import { Icon } from "../components/Icon";

/** /paths — the gallery of goal-oriented journeys. */
export function PathsPage() {
  const completed = useProgress((s) => s.completed);
  return (
    <div className="paths">
      <header className="paths__head">
        <div className="paths__eyebrow"><Icon name="compass" size={18} /> Learning paths</div>
        <h1 className="paths__title">Pick a destination, not just a language</h1>
        <p className="paths__sub">
          Each path is a guided route across the right chapters — in the right order — toward a real
          goal. Languages are the tools; these are the journeys.
        </p>
      </header>

      <div className="paths__grid">
        {learningPaths.map((p) => {
          const { total, done } = pathProgress(p, completed);
          return (
            <Link
              key={p.id}
              to={`/paths/${p.id}`}
              className="path-card"
              style={{ ["--c1" as string]: p.accent[0], ["--c2" as string]: p.accent[1] } as React.CSSProperties}
            >
              <div className="path-card__top">
                <LangMark track={p.faceTrack} size={50} />
                <ProgressRing value={total ? done / total : 0} gradient={p.accent} id={`path-${p.id}`} size={46} />
              </div>
              <h2 className="path-card__title">{p.title}</h2>
              <p className="path-card__subtitle">{p.subtitle}</p>
              <p className="path-card__blurb">{p.blurb}</p>
              <div className="path-card__meta">
                <span>{total} lessons</span>
                <span>·</span>
                <span>{p.segments.length} stage{p.segments.length > 1 ? "s" : ""}</span>
                <span className="path-card__go">{done > 0 ? `Continue (${done}/${total}) →` : "Start path →"}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** /paths/:id — the detailed, ordered itinerary for one path. */
export function PathDetailPage() {
  const { id } = useParams<{ id: string }>();
  const path = id ? getPath(id) : undefined;
  const completed = useProgress((s) => s.completed);
  if (!path) return <Navigate to="/paths" replace />;

  const segments = resolvePath(path);
  const { total, done, next } = pathProgress(path, completed);
  const accentStyle = {
    ["--c1" as string]: path.accent[0],
    ["--c2" as string]: path.accent[1],
  } as React.CSSProperties;

  let stepNo = 0;

  return (
    <div className="pathview" style={accentStyle}>
      <Link to="/paths" className="pathview__back">← All paths</Link>

      <header className="pathview__hero">
        <LangMark track={path.faceTrack} size={64} />
        <div className="pathview__hero-text">
          <div className="pathview__eyebrow">{path.subtitle}</div>
          <h1 className="pathview__title">{path.title}</h1>
          <p className="pathview__blurb">{path.blurb}</p>
          <div className="pathview__cta">
            {next ? (
              <Link to={`/lesson/${next.id}`} className="btn btn--primary btn--lg">
                {done > 0 ? "Continue path →" : "Start path →"}
              </Link>
            ) : (
              <span className="pathview__done"><Icon name="check" size={18} /> Path complete — nice.</span>
            )}
            <span className="pathview__count">
              <ProgressRing value={total ? done / total : 0} gradient={path.accent} id="pathview" size={40} />
              {done}/{total} lessons
            </span>
          </div>
        </div>
      </header>

      <ol className="pathview__segments">
        {segments.map((seg, si) => (
          <li key={si} className="pathseg">
            <div className="pathseg__head">
              <LangMark track={seg.course.track} size={30} radius={8} />
              <div>
                <h2 className="pathseg__label">{seg.label}</h2>
                {seg.why && <p className="pathseg__why">{seg.why}</p>}
              </div>
              <Link to={`/learn/${seg.course.track}`} className="pathseg__course">Open {seg.course.title} →</Link>
            </div>

            <ul className="pathseg__chapters">
              {seg.chapters.map((ch) => {
                const chDone = ch.lessons.filter((l) => completed[l.id]).length;
                const first = ch.lessons[0];
                return (
                  <li key={ch.id} className="pathchap">
                    <span className="pathchap__num">{++stepNo}</span>
                    <span className="pathchap__glyph" aria-hidden="true">{ch.glyph}</span>
                    <span className="pathchap__text">
                      <Link to={first ? `/lesson/${first.id}` : `/learn/${seg.course.track}`} className="pathchap__title">
                        {ch.title}
                      </Link>
                      <span className="pathchap__summary">{ch.summary}</span>
                    </span>
                    <span className={`pathchap__count ${chDone === ch.lessons.length && ch.lessons.length ? "is-done" : ""}`}>
                      {chDone === ch.lessons.length && ch.lessons.length ? (
                        <Icon name="check" size={14} />
                      ) : null}
                      {chDone}/{ch.lessons.length}
                    </span>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
