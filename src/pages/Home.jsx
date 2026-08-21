
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/icons";
import { PROJECTS, EXPERIENCE } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);



  return (
    <>
      <div className="page-shell">
        <div className="grid grid-cols-[minmax(260px,380px)_1fr] gap-16 min-h-screen items-start max-[860px]:block">
          <header className="sticky top-0 h-screen flex flex-col justify-between pt-24 pb-16 max-[860px]:static max-[860px]:h-auto max-[860px]:pt-16 max-[860px]:pb-8">
            <div>
              <h1 className="text-[2.5rem] font-bold text-text-bright m-0 mb-2 tracking-tight">
                [Your Name]
              </h1>
              <p className="text-[1.1rem] font-semibold text-text m-0 mb-4">
                Full-Stack Developer &middot; AI &amp; Data Analytics
              </p>

            <p className="text-[0.95rem] text-text-dim leading-relaxed max-w-[320px] m-0 mb-10">
              I build web platforms, analytics dashboards, and AI-assisted
              tools — and dig into the data behind them.
            </p>

            <nav
              className="flex flex-col gap-1"
              aria-label="Section navigation"
            >
              <a
                href="#about"
                className="group flex items-center gap-3 py-2.5 font-mono text-[0.8rem] tracking-wide text-text-dim transition-colors duration-200 hover:text-text-bright focus-visible:text-text-bright"
              >
                <span className="w-8 h-px bg-text-dim transition-all duration-200 group-hover:w-12 group-hover:bg-accent group-focus-visible:w-12 group-focus-visible:bg-accent" />
                About
              </a>
              <a
                href="#experience"
                className="group flex items-center gap-3 py-2.5 font-mono text-[0.8rem] tracking-wide text-text-dim transition-colors duration-200 hover:text-text-bright focus-visible:text-text-bright"
              >
                <span className="w-8 h-px bg-text-dim transition-all duration-200 group-hover:w-12 group-hover:bg-accent group-focus-visible:w-12 group-focus-visible:bg-accent" />
                Experience
              </a>
              <a
                href="#projects"
                className="group flex items-center gap-3 py-2.5 font-mono text-[0.8rem] tracking-wide text-text-dim transition-colors duration-200 hover:text-text-bright focus-visible:text-text-bright"
              >
                <span className="w-8 h-px bg-text-dim transition-all duration-200 group-hover:w-12 group-hover:bg-accent group-focus-visible:w-12 group-focus-visible:bg-accent" />
                Projects
              </a>
            </nav>
          </div>

          <div className="flex gap-5">
            <a
              href="https://github.com/karikalan35"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group text-text-dim transition-all duration-200 hover:text-accent hover:-translate-y-0.5 focus-visible:text-accent focus-visible:-translate-y-0.5"
            >
              <GithubIcon size={20} className="text-inherit transition-colors duration-200 group-hover:text-accent" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group text-text-dim transition-all duration-200 hover:text-accent hover:-translate-y-0.5 focus-visible:text-accent focus-visible:-translate-y-0.5"
            >
              <LinkedinIcon size={20} className="text-inherit transition-colors duration-200 group-hover:text-accent" />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="group text-text-dim transition-all duration-200 hover:text-accent hover:-translate-y-0.5 focus-visible:text-accent focus-visible:-translate-y-0.5"
            >
              <Mail size={20} className="text-inherit transition-colors duration-200 group-hover:text-accent" />
            </a>
          </div>
        </header>

        <main className="pt-24 pb-16 max-[860px]:pt-0 max-[860px]:pb-12">
          <section
            id="about"
            className="mb-24 scroll-mt-8"
          >
            <p className="font-mono text-[0.8rem] text-accent mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-border">
              About
            </p>
            <div className="space-y-4">
              <p className="text-text leading-[1.75] max-w-[640px] text-base">
                I'm a computer science student who likes taking projects from
                a rough idea to something people can actually use — whether
                that's a full-stack platform, an analytics dashboard, or a
                small AI-powered tool. Most of what's here came out of
                coursework or team projects, built with a preference for
                clear structure over cleverness.
              </p>
              <p className="text-text leading-[1.75] max-w-[640px] text-base">
                Lately I've been splitting time between full-stack web
                development, statistics and data analytics, and applied AI —
                the projects below reflect all three.
              </p>
            </div>
          </section>

          <section id="experience" className="mb-24 scroll-mt-8">
            <p className="font-mono text-[0.8rem] text-accent mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-border">
              Experience
            </p>
            <div className="flex flex-col gap-1">
              {EXPERIENCE.map((item) => (
                <div
                  className="grid grid-cols-[140px_1fr] gap-6 p-5 rounded-md border border-transparent transition-all duration-200 hover:border-border-hover hover:bg-surface hover:-translate-y-0.5 max-[640px]:grid-cols-1 max-[640px]:gap-1.5"
                  key={item.title}
                >
                  <span className="font-mono text-[0.78rem] text-text-dim pt-0.5">
                    {item.range}
                  </span>
                  <div>
                    <h3 className="text-text-bright font-semibold text-base m-0 mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-accent text-[0.85rem] m-0 mb-2.5">
                      {item.org}
                    </p>
                    <p className="text-text-dim leading-[1.65] text-[0.92rem] m-0 mb-3">
                      {item.description}
                    </p>
                    {item.stack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.stack.map((tech) => (
                          <span
                            className="font-mono text-[0.72rem] px-2.5 py-1 rounded-full border border-border text-text-dim whitespace-nowrap"
                            key={tech}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="mb-24 scroll-mt-8">
            <p className="font-mono text-[0.8rem] text-accent mb-5 flex items-center gap-3 after:content-[''] after:flex-1 after:h-px after:bg-border">
              Featured Projects
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
              {featured.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>
          </section>

          <footer className="font-mono text-[0.78rem] text-text-dim pt-8 border-t border-border mt-8">
            <Link
              to="/projects"
              className="transition-colors duration-200 hover:text-accent focus-visible:text-accent"
            >
              View all projects &rarr;
            </Link>
          </footer>
        </main>
        </div>
      </div>
    </>
  );
}

