import { Link, useLocation } from "react-router-dom";
import { useProgress, type ThemeMode } from "../store/progress";

const order: ThemeMode[] = ["system", "light", "dark"];
const themeGlyph: Record<ThemeMode, string> = { system: "🌓", light: "☀️", dark: "🌙" };

export function Header() {
  const { theme, setTheme } = useProgress();
  const loc = useLocation();
  const isLesson = loc.pathname.startsWith("/lesson/");

  if (isLesson) return null; // the lesson view has its own compact top bar

  return (
    <header className="appbar">
      <Link to="/" className="appbar__brand" aria-label="Playground home">
        <span className="appbar__logo" aria-hidden="true">
          <span className="appbar__logo-glyph">{"</>"}</span>
        </span>
        <span className="appbar__title">Playground</span>
      </Link>
      <nav className="appbar__nav">
        <Link to="/learn/python" className="appbar__link">Python</Link>
        <Link to="/learn/web" className="appbar__link">Web</Link>
        <Link to="/sandbox" className="appbar__link">Sandbox</Link>
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
