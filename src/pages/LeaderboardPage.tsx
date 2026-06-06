import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type LeaderEntry } from "../net/api";
import { useAuth } from "../store/auth";
import { Icon } from "../components/Icon";
import { levelInfo } from "../game/xp";

export function LeaderboardPage() {
  const { username, hasBackend } = useAuth();
  const [entries, setEntries] = useState<LeaderEntry[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api
      .leaderboard()
      .then((r) => setEntries(r.entries))
      .catch((e) => setErr(e instanceof Error ? e.message : "Couldn't load the leaderboard."));
  }, []);

  if (hasBackend === false) {
    return (
      <div className="leaderboard">
        <div className="account__card">
          <h1>No leaderboard here</h1>
          <p>This copy runs without an accounts server. Enable the bundled server to compete.</p>
          <Link to="/" className="btn btn--primary">Back</Link>
        </div>
      </div>
    );
  }

  const medal = ["🥇", "🥈", "🥉"];

  return (
    <div className="leaderboard">
      <div className="lb-head">
        <h1><Icon name="trophy" size={26} /> Leaderboard</h1>
        <p>Top learners by XP. Earn 50 XP per lesson — go get 'em.</p>
        {!username && <Link to="/account" className="btn btn--primary btn--sm">Sign in to join</Link>}
      </div>
      {err && <div className="account__error">{err}</div>}
      {!entries && !err && <div className="route-loading">Loading…</div>}
      {entries && entries.length === 0 && <p className="lb-empty">No one's on the board yet — be the first!</p>}
      {entries && entries.length > 0 && (
        <ol className="lb-list">
          {entries.map((e, i) => (
            <li key={e.username} className={`lb-row ${e.username === username ? "lb-row--me" : ""}`}>
              <span className="lb-rank">{medal[i] ?? i + 1}</span>
              <span className="lb-name">{e.username}{e.username === username ? " (you)" : ""}</span>
              <span className="lb-lvl">Lv {levelInfo(e.xp).level}</span>
              <span className="lb-xp">{e.xp} XP</span>
              <span className="lb-lessons">{e.lessons} lessons</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
