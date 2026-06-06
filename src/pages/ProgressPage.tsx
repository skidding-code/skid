import { Link } from "react-router-dom";
import { courses, trackLessons } from "../curriculum";
import { useProgress } from "../store/progress";
import { xpFromCompleted, levelInfo, levelTitle } from "../game/xp";
import { ALL_BADGES, buildBadgeContext, earnedBadgeIds } from "../game/badges";
import { XpBar } from "../components/XpBar";
import { ProgressRing } from "../components/ProgressRing";
import { LangMark } from "../components/LangMark";
import { Icon } from "../components/Icon";

export function ProgressPage() {
  const { completed, streak, soundOn, setSound, resetAll, planEnabled, setPlanEnabled } = useProgress();
  const total = Object.keys(completed).length;
  const xp = xpFromCompleted(total);
  const info = levelInfo(xp);
  const ctx = buildBadgeContext(completed, streak);
  const earned = earnedBadgeIds(ctx);

  const onReset = () => {
    if (confirm("Reset ALL progress, XP, streak, and saved code? This can't be undone.")) resetAll();
  };

  return (
    <div className="progress-page">
      <div className="profile-hero">
        <div className="profile-hero__main">
          <h1 className="profile-hero__name">Level {info.level} · {levelTitle(info.level)}</h1>
          <XpBar xp={xp} variant="full" />
          <div className="profile-hero__stats">
            <Stat big={String(total)} label="lessons done" />
            <Stat big={String(xp)} label="total XP" />
            <Stat big={<><span>{streak}</span><Icon name="flame" size={22} /></>} label="day streak" />
            <Stat big={`${earned.size}/${ALL_BADGES.length}`} label="badges" />
          </div>
        </div>
      </div>

      <section>
        <h2 className="section-title">Languages</h2>
        <div className="lang-progress">
          {courses.map((c) => {
            const list = trackLessons(c.track);
            const done = list.filter((l) => completed[l.lesson.id]).length;
            return (
              <Link to={`/learn/${c.track}`} key={c.track} className="lang-progress__item">
                <LangMark track={c.track} size={44} radius={13} />
                <div className="lang-progress__body">
                  <div className="lang-progress__name">{c.title}</div>
                  <div className="lang-progress__count">{done}/{list.length} lessons</div>
                </div>
                <ProgressRing value={list.length ? done / list.length : 0} gradient={c.accent} id={`pp-${c.track}`} size={40} stroke={5} />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="section-title">Badges</h2>
        <div className="badges">
          {ALL_BADGES.map((b) => {
            const got = earned.has(b.id);
            return (
              <div key={b.id} className={`badge ${got ? "badge--earned" : "badge--locked"}`} title={b.description}>
                <span className="badge__emoji">{got ? b.emoji : <Icon name="lock" size={22} />}</span>
                <span className="badge__title">{b.title}</span>
                <span className="badge__desc">{b.description}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="settings">
        <h2 className="section-title">Settings</h2>
        <label className="toggle">
          <input type="checkbox" checked={soundOn} onChange={(e) => setSound(e.target.checked)} />
          <span>Sound effects {soundOn ? "on" : "off"}</span>
        </label>
        <label className="toggle">
          <input type="checkbox" checked={planEnabled} onChange={(e) => setPlanEnabled(e.target.checked)} />
          <span>Personal plan {planEnabled ? "on" : "off"} <span className="toggle__hint">— a step-by-step checklist from your placement test (off by default)</span></span>
        </label>
        <div className="settings__links">
          <Link to="/placement" className="btn btn--soft">Take the placement test</Link>
          {planEnabled && <Link to="/plan" className="btn btn--soft">Open my plan</Link>}
        </div>
        <button className="btn btn--soft" onClick={onReset}>Reset all progress</button>
      </section>
    </div>
  );
}

function Stat({ big, label }: { big: React.ReactNode; label: string }) {
  return (
    <div className="stat">
      <div className="stat__big">{big}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}
