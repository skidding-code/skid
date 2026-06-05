import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { CoursePage } from "./pages/CoursePage";
import { LessonPage } from "./pages/LessonPage";
import { SandboxPage } from "./pages/SandboxPage";
import { useResolvedTheme } from "./hooks/useTheme";

function NotFound() {
  return (
    <div className="notfound">
      <h1>Hmm, nothing here.</h1>
      <Link to="/" className="btn btn--primary">Back home</Link>
    </div>
  );
}

function Shell() {
  // Applies the theme to <html> and keeps it in sync app-wide.
  useResolvedTheme();
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn/:track" element={<CoursePage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/sandbox" element={<SandboxPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
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
