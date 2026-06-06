import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useProgress } from "../store/progress";
import { Icon } from "../components/Icon";

export function AccountPage() {
  const { status, username, hasBackend, syncing, error, login, signup, logout } = useAuth();
  const completed = useProgress((s) => Object.keys(s.completed).length);
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [busy, setBusy] = useState(false);

  if (hasBackend === false) {
    return (
      <div className="account">
        <div className="account__card">
          <span className="placement__badge"><Icon name="lock" size={24} /></span>
          <h1>Accounts aren't set up here</h1>
          <p>
            This copy of Playground is running without an accounts server, so your progress is saved
            locally on this device (and still works fully offline). To enable sign-in + cross-device
            sync + a leaderboard, run the bundled server — see <code>README → Accounts</code>.
          </p>
          <Link to="/" className="btn btn--primary">Back to learning</Link>
        </div>
      </div>
    );
  }

  if (status === "in") {
    return (
      <div className="account">
        <div className="account__card">
          <span className="placement__badge placement__badge--done"><Icon name="check" size={26} /></span>
          <h1>Signed in as {username}</h1>
          <p>
            Your progress ({completed} lessons) syncs to your account automatically.
            {syncing ? " Syncing…" : " Up to date."}
          </p>
          <div className="account__actions">
            <Link to="/leaderboard" className="btn btn--primary"><Icon name="trophy" size={16} /> Leaderboard</Link>
            <button className="btn btn--soft" onClick={logout}>Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") await signup(u.trim(), p);
    else await login(u.trim(), p);
    setBusy(false);
  };

  return (
    <div className="account">
      <div className="account__card">
        <span className="placement__badge"><Icon name="trophy" size={24} /></span>
        <h1>{mode === "signup" ? "Create an account" : "Welcome back"}</h1>
        <p>Sync your progress across devices and climb the leaderboard. It's optional — skip it and everything still works locally.</p>
        <form className="account__form" onSubmit={submit}>
          <label>
            Username
            <input value={u} onChange={(e) => setU(e.target.value)} autoCapitalize="off" autoCorrect="off" placeholder="3–20 letters/numbers" required />
          </label>
          <label>
            Password
            <input type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="at least 6 characters" required />
          </label>
          {error && <div className="account__error">{error}</div>}
          <button className="btn btn--primary btn--lg" type="submit" disabled={busy}>
            {busy ? "…" : mode === "signup" ? "Sign up" : "Log in"}
          </button>
        </form>
        <button className="link-muted" onClick={() => setMode(mode === "signup" ? "login" : "signup")}>
          {mode === "signup" ? "Already have an account? Log in" : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}
