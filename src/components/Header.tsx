import { Link, useLocation } from "react-router-dom";
import { useProgress, type ThemeMode } from "../store/progress";
import { xpFromCompleted, levelInfo } from "../game/xp";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { useAuth } from "../store/auth";
import { Icon, type IconName } from "./Icon";

const order: ThemeMode[] = ["system", "light", "dark"];
const themeIcon: Record<ThemeMode, IconName> = { system: "monitor", light: "sun", dark: "moon" };

export function Header() {
  const { theme, setTheme, completed, streak } = useProgress();
  const { canInstall, promptInstall } = useInstallPrompt();
  const { username, hasBackend } = useAuth();
  const loc = useLocation();
  const isLesson = loc.pathname.startsWith("/lesson/");

  if (isLesson) return null; // the lesson view has its own compact top bar

  const total = Object.keys(completed).length;
  const info = levelInfo(xpFromCompleted(total));

  return (
    <header className="appbar">
      <Link to="/" className="appbar__brand" aria-label="Playground home">
        <span className="appbar__logo" aria-hidden="true">
          <span className="appbar__logo-glyph">{"</>"}</span>
        </span>
        <span className="appbar__title">Playground</span>
      </Link>
      <nav className="appbar__nav">
        {total > 0 && (
          <Link to="/progress" className="appbar__stats" title="Your progress">
            {streak > 0 && (
              <span className="appbar__streak"><Icon name="flame" size={15} /> {streak}</span>
            )}
            <span className="appbar__lvl" aria-label={`Level ${info.level}`}>
              <span className="appbar__lvl-dot">{info.level}</span>
              <span className="appbar__lvl-bar"><span style={{ width: `${Math.round(info.progress * 100)}%` }} /></span>
            </span>
          </Link>
        )}
        <Link to="/sandbox" className="appbar__link appbar__link--hide-sm">Sandbox</Link>
        <Link to="/progress" className="appbar__link appbar__link--hide-sm">Progress</Link>
        {hasBackend && (
          <Link to="/account" className="appbar__link appbar__account">
            <Icon name="trophy" size={15} /> {username ?? "Sign in"}
          </Link>
        )}
        {canInstall && (
          <button className="appbar__link appbar__install" onClick={() => void promptInstall()} title="Install Playground as an app">
            <Icon name="download" size={16} /> Install
          </button>
        )}
        <button
          className="appbar__theme"
          onClick={() => setTheme(order[(order.indexOf(theme) + 1) % order.length])}
          title={`Theme: ${theme}`}
          aria-label={`Switch theme (currently ${theme})`}
        >
          <Icon name={themeIcon[theme]} size={18} />
        </button>
      </nav>
    </header>
  );
}
