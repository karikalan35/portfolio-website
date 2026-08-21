import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ZoomIn } from "lucide-react";
import { GithubIcon } from "./icons";
import { STATUS_COLOR, initials } from "../data/projects";
import Lightbox from "./Lightbox";

export default function ProjectCard({ project }) {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  return (
    <div className="fade-up flex flex-col border border-border rounded-md bg-surface overflow-hidden transition-[border-color,transform] duration-200 hover:border-border-hover hover:-translate-y-[3px] focus-within:border-border-hover focus-within:-translate-y-[3px]">
      <div className="relative h-[120px] bg-grid-pattern bg-[length:18px_18px] flex items-center justify-center border-b border-border overflow-hidden">
        {project.image ? (
          <button
            className="w-full h-full cursor-pointer group relative"
            onClick={() => setLightboxSrc(project.image)}
            aria-label={`View ${project.title} image full size`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain px-2 py-1"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/40 group-focus-visible:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="flex items-center gap-1.5 font-mono text-[0.72rem] text-text-bright bg-black/60 border border-border rounded px-2.5 py-1">
                <ZoomIn size={14} /> View
              </span>
            </span>
          </button>
        ) : (
          <span className="font-mono text-[1.6rem] font-semibold text-text-dim tracking-wide">
            {initials(project.title)}
          </span>
        )}
      </div>
      <Lightbox
        src={lightboxSrc}
        alt={project.title}
        onClose={() => setLightboxSrc(null)}
      />
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[0.72rem] px-2.5 py-1 rounded-full bg-accent-dim border border-accent-border text-accent whitespace-nowrap">
            {project.category[0]}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[0.72rem] text-text-dim">
            <span
              className="w-[7px] h-[7px] rounded-full shrink-0"
              style={{ background: STATUS_COLOR[project.status] }}
            />
            {project.status}
          </span>
        </div>

        <h3 className="text-[1.05rem] font-semibold text-text-bright m-0">
          {project.title}
        </h3>
        <p className="text-text-dim text-[0.88rem] leading-relaxed m-0 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              className="font-mono text-[0.72rem] px-2.5 py-1 rounded-full border border-border text-text-dim whitespace-nowrap"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3.5">
            <span className="font-mono text-[0.75rem] text-text-dim">
              {project.year}
            </span>
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="text-text-dim flex transition-colors duration-200 hover:text-accent focus-visible:text-accent"
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-text-dim flex transition-colors duration-200 hover:text-accent focus-visible:text-accent"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          <Link
            className="font-mono text-[0.75rem] text-accent bg-transparent border border-accent-border rounded px-3 py-1.5 transition-colors duration-200 hover:bg-accent-dim hover:border-accent focus-visible:bg-accent-dim focus-visible:border-accent"
            to={`/projects/${project.id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
