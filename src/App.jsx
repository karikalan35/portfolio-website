import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import CursorGlow from "./components/CursorGlow";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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
