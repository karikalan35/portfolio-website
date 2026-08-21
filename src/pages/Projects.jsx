import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PROJECTS, FILTERS } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="page-shell pt-16 pb-24">
      <Link
        className="inline-flex items-center gap-2 font-mono text-[0.82rem] text-text-dim mb-8 transition-colors duration-200 hover:text-accent focus-visible:text-accent"
        to="/"
      >
        <ArrowLeft size={15} /> Back home
      </Link>

      <div className="flex items-baseline justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-[1.8rem] font-bold text-text-bright m-0">
          All Projects
        </h1>
        <span className="font-mono text-[0.82rem] text-text-dim">
          {filtered.length} of {PROJECTS.length}
        </span>
      </div>

      <div
        className="flex flex-wrap gap-2.5 mb-10"
        role="group"
        aria-label="Filter projects by category"
      >
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={
              activeFilter === filter
                ? "font-mono text-[0.78rem] px-4 py-1.5 rounded-full border border-accent-border-strong bg-accent-dim text-accent transition-all duration-200"
                : "font-mono text-[0.78rem] px-4 py-1.5 rounded-full border border-border bg-transparent text-text-dim transition-all duration-200 hover:border-border-hover hover:text-text focus-visible:border-border-hover focus-visible:text-text"
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {filtered.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      ) : (
        <p className="text-text-dim font-mono text-[0.9rem] py-12 text-center">
          No projects match this filter yet.
        </p>
      )}
    </div>
  );
}
