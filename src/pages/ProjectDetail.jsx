import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, ZoomIn } from "lucide-react";
import { GithubIcon } from "../components/icons";
import { PROJECTS, STATUS_COLOR, initials } from "../data/projects";
import Lightbox from "../components/Lightbox";

function isVideo(src) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(src);
}

export default function ProjectDetail() {
  const { id } = useParams();
  const index = PROJECTS.findIndex((p) => p.id === id);

  const [lightboxSrc, setLightboxSrc] = useState(null);

  if (index === -1) {
    return <Navigate to="/projects" replace />;
  }

  const project = PROJECTS[index];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="page-shell pt-12 pb-24 max-w-[860px] mx-auto">
      <Link
        className="inline-flex items-center gap-2 font-mono text-[0.82rem] text-text-dim mb-8 transition-colors duration-200 hover:text-accent focus-visible:text-accent"
        to="/projects"
      >
        <ArrowLeft size={15} /> Back to projects
      </Link>

      <div className="relative h-[220px] rounded-lg border border-border bg-grid-pattern bg-[length:22px_22px] flex items-center justify-center mb-8 overflow-hidden">
        {project.image ? (
          <button
            className="w-full h-full cursor-pointer group relative"
            onClick={() => setLightboxSrc(project.image)}
            aria-label={`View ${project.title} image full size`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/40 group-focus-visible:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="flex items-center gap-1.5 font-mono text-[0.78rem] text-text-bright bg-black/60 border border-border rounded px-3 py-1.5">
                <ZoomIn size={15} /> View full image
              </span>
            </span>
          </button>
        ) : (
          <span className="font-mono text-5xl font-semibold text-text-dim tracking-wide">
            {initials(project.title)}
          </span>
        )}
      </div>
      <Lightbox
        src={lightboxSrc}
        alt={project.title}
        onClose={() => setLightboxSrc(null)}
      />

      <div className="flex items-center gap-4 flex-wrap mb-4 font-mono text-[0.78rem] text-text-dim">
        <span className="font-mono text-[0.72rem] px-2.5 py-1 rounded-full bg-accent-dim border border-accent-border text-accent whitespace-nowrap">
          {project.category.join(" · ")}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-[7px] h-[7px] rounded-full shrink-0"
            style={{ background: STATUS_COLOR[project.status] }}
          />
          {project.status}
        </span>
        <span>{project.year}</span>
      </div>

      <h1 className="text-[2rem] font-bold text-text-bright m-0 mb-5 tracking-tight">
        {project.title}
      </h1>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            className="font-mono text-[0.72rem] px-2.5 py-1 rounded-full border border-border text-text-dim whitespace-nowrap"
            key={tech}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3 my-6 mb-12">
        {project.github && project.github !== "#" && (
          <a
            className="inline-flex items-center gap-2 font-mono text-[0.82rem] px-[18px] py-2.5 rounded-md border border-border text-text transition-all duration-200 hover:border-border-hover hover:bg-surface-hover focus-visible:border-border-hover focus-visible:bg-surface-hover"
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon size={16} /> GitHub
          </a>
        )}
        {project.demo && project.demo !== "#" && (
          <a
            className="inline-flex items-center gap-2 font-mono text-[0.82rem] px-[18px] py-2.5 rounded-md border border-accent-border-strong bg-accent-dim text-accent transition-all duration-200 hover:bg-accent-dim-hover focus-visible:bg-accent-dim-hover"
            href={project.demo}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>

      <section className="mb-10">
        <h2 className="font-mono text-[0.85rem] text-accent uppercase tracking-wider m-0 mb-3.5">
          Overview
        </h2>
        <p className="text-text leading-[1.75] m-0">{project.overview}</p>
      </section>

      <section className="mb-10">
        <h2 className="font-mono text-[0.85rem] text-accent uppercase tracking-wider m-0 mb-3.5">
          Problem
        </h2>
        <p className="text-text leading-[1.75] m-0">{project.problem}</p>
      </section>

      <section className="mb-10">
        <h2 className="font-mono text-[0.85rem] text-accent uppercase tracking-wider m-0 mb-3.5">
          Solution
        </h2>
        <p className="text-text leading-[1.75] m-0">{project.solution}</p>
      </section>

      <section className="mb-10">
        <h2 className="font-mono text-[0.85rem] text-accent uppercase tracking-wider m-0 mb-3.5">
          Key Features
        </h2>
        <ul className="flex flex-col gap-2.5">
          {project.features.map((feature) => (
            <li
              className="relative pl-[22px] text-text leading-relaxed before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-[1px] before:bg-accent"
              key={feature}
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-mono text-[0.85rem] text-accent uppercase tracking-wider m-0 mb-3.5">
          Screenshots
        </h2>
        {project.screenshots && project.screenshots.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 max-[640px]:grid-cols-2">
            {project.screenshots.map((src, i) => (
              <button
                key={src}
                className="h-[110px] w-full rounded-md border border-border bg-grid-pattern bg-[length:14px_14px] cursor-pointer group relative overflow-hidden transition-colors duration-200 hover:border-accent-border focus-visible:border-accent-border"
                onClick={() => setLightboxSrc(src)}
                aria-label={`View ${project.title} screenshot ${i + 1} full size`}
              >
                {isVideo(src) ? (
                  <video
                    src={src}
                    aria-label={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/40 group-focus-visible:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ZoomIn size={18} className="text-text-bright" />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 max-[640px]:grid-cols-2">
            <div className="h-[90px] rounded-md border border-border bg-grid-pattern bg-[length:14px_14px]" />
            <div className="h-[90px] rounded-md border border-border bg-grid-pattern bg-[length:14px_14px]" />
            <div className="h-[90px] rounded-md border border-border bg-grid-pattern bg-[length:14px_14px]" />
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="font-mono text-[0.85rem] text-accent uppercase tracking-wider m-0 mb-3.5">
          Challenges
        </h2>
        <p className="text-text leading-[1.75] m-0">{project.challenges}</p>
      </section>

      <section className="mb-10">
        <h2 className="font-mono text-[0.85rem] text-accent uppercase tracking-wider m-0 mb-3.5">
          Future Improvements
        </h2>
        <p className="text-text leading-[1.75] m-0">{project.future}</p>
      </section>

      <div className="flex justify-between gap-4 border-t border-border pt-8 mt-12">
        <Link
          className="flex flex-col gap-1.5 p-4 border border-border rounded-md flex-1 transition-all duration-200 hover:border-border-hover hover:-translate-y-0.5 focus-visible:border-border-hover focus-visible:-translate-y-0.5 min-w-0"
          to={`/projects/${prev.id}`}
        >
          <span className="font-mono text-[0.7rem] text-text-dim uppercase tracking-wider">
            <ArrowLeft size={12} style={{ display: "inline", verticalAlign: "-1px" }} /> Previous
          </span>
          <span className="text-text-bright font-semibold text-[0.92rem] whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {prev.title}
          </span>
        </Link>
        <Link
          className="flex flex-col gap-1.5 p-4 border border-border rounded-md flex-1 transition-all duration-200 hover:border-border-hover hover:-translate-y-0.5 focus-visible:border-border-hover focus-visible:-translate-y-0.5 min-w-0 text-right items-end"
          to={`/projects/${next.id}`}
        >
          <span className="font-mono text-[0.7rem] text-text-dim uppercase tracking-wider">
            Next <ArrowRight size={12} style={{ display: "inline", verticalAlign: "-1px" }} />
          </span>
          <span className="text-text-bright font-semibold text-[0.92rem] whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {next.title}
          </span>
        </Link>
      </div>
    </div>
  );
}
