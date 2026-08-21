import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  return (
    <>
   <CursorGlow />  {/* This is a comment */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
    </>
  );
}
