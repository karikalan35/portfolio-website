import { useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import CursorGlow from "./components/CursorGlow";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() =>
    window.localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark",
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const startedAt = performance.now();
    const minimumDuration = 1100;
    let timeoutId;

    const finishLoading = () => {
      const remaining = Math.max(
        0,
        minimumDuration - (performance.now() - startedAt),
      );
      timeoutId = window.setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener("load", finishLoading);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <LoadingScreen isExiting={!isLoading} />
      <div className={isLoading ? "site-content site-content--loading" : "site-content"}>
        <button
          type="button"
          className="fixed right-6 top-6 z-40 inline-flex items-center justify-center rounded-md border border-border bg-surface p-2.5 text-text-dim shadow-lg transition-colors duration-200 hover:border-border-hover hover:text-text-bright focus-visible:border-accent"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-pressed={theme === "light"}
          onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <CursorGlow />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </>
  );
}
