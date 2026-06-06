import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { ToastHost } from "./components/ToastHost";
import { Home } from "./pages/Home";
import { useResolvedTheme } from "./hooks/useTheme";
import { useAuth } from "./store/auth";

// Lesson + Sandbox pull in CodeMirror and the runtimes — load them on demand so
// the home/course screens stay light and fast.
const CoursePage = lazy(() => import("./pages/CoursePage").then((m) => ({ default: m.CoursePage })));
const LessonPage = lazy(() => import("./pages/LessonPage").then((m) => ({ default: m.LessonPage })));
const SandboxPage = lazy(() => import("./pages/SandboxPage").then((m) => ({ default: m.SandboxPage })));
const ProgressPage = lazy(() => import("./pages/ProgressPage").then((m) => ({ default: m.ProgressPage })));
const PlacementPage = lazy(() => import("./pages/PlacementPage").then((m) => ({ default: m.PlacementPage })));
const PlanPage = lazy(() => import("./pages/PlanPage").then((m) => ({ default: m.PlanPage })));
const AccountPage = lazy(() => import("./pages/AccountPage").then((m) => ({ default: m.AccountPage })));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage").then((m) => ({ default: m.LeaderboardPage })));

function NotFound() {
  return (
    <div className="notfound">
      <h1>404: this page ran off to debug itself.</h1>
      <p style={{ color: "var(--text-dim)" }}>
        It's not you, it's our routing. Let's get you somewhere that exists.
      </p>
      <Link to="/" className="btn btn--primary">Take me home</Link>
    </div>
  );
}

function Loading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-loading__spinner" aria-hidden="true" />
      Warming up the editor…
    </div>
  );
}

function Shell() {
  // Applies the theme to <html> and keeps it in sync app-wide.
  useResolvedTheme();
  // Detect an accounts backend and, if signed in, pull + sync cloud progress.
  useEffect(() => {
    void useAuth.getState().init();
  }, []);
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn/:track" element={<CoursePage />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
            <Route path="/sandbox" element={<SandboxPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/placement" element={<PlacementPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <ToastHost />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
