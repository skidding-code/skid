import { Link, useLocation } from "react-router-dom";
import { useProgress, type ThemeMode } from "../store/progress";
import { xpFromCompleted, levelInfo } from "../game/xp";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

const order: ThemeMode[] = ["system", "light", "dark"];
const themeGlyph: Record<ThemeMode, string> = { system: "🌓", light: "☀️", dark: "🌙" };

export function Header() {
  const { theme, setTheme, completed, streak } = useProgress();
  const { canInstall, promptInstall } = useInstallPrompt();
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
            {streak > 0 && <span className="appbar__streak">🔥{streak}</span>}
            <span className="appbar__lvl" aria-label={`Level ${info.level}`}>
              <span className="appbar__lvl-dot">{info.level}</span>
              <span className="appbar__lvl-bar"><span style={{ width: `${Math.round(info.progress * 100)}%` }} /></span>
            </span>
          </Link>
        )}
        <Link to="/sandbox" className="appbar__link appbar__link--hide-sm">Sandbox</Link>
        <Link to="/progress" className="appbar__link appbar__link--hide-sm">Progress</Link>
        {canInstall && (
          <button className="appbar__link appbar__install" onClick={() => void promptInstall()} title="Install Playground as an app">
            ⬇ Install
          </button>
        )}
        <button
          className="appbar__theme"
          onClick={() => setTheme(order[(order.indexOf(theme) + 1) % order.length])}
          title={`Theme: ${theme}`}
          aria-label={`Switch theme (currently ${theme})`}
        >
          {themeGlyph[theme]}
        </button>
      </nav>
    </header>
  );
}
