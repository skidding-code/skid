import { useEffect, useState } from "react";
import { useProgress } from "../store/progress";

/** Resolve the user's theme preference (which may be "system") to a concrete
 * "light" | "dark", reacting to OS changes when in system mode, and reflect it
 * onto <html data-theme> so the CSS tokens switch. */
export function useResolvedTheme(): "light" | "dark" {
  const theme = useProgress((s) => s.theme);
  const [system, setSystem] = useState<"light" | "dark">(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystem(mq.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolved = theme === "system" ? system : theme;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", resolved === "dark" ? "#0e0f1c" : "#5b5bd6");
  }, [resolved]);

  return resolved;
}
