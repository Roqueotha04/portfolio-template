"use client";

import { Info } from "@phosphor-icons/react";
import { useLang } from "@/components/providers/LanguageProvider";
import { PROJECTS, PROJECTS_INTRO, type Project } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechLogo } from "@/components/ui/TechLogo";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { renderHighlighted } from "@/lib/highlight";

const hostOf = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

export function Projects() {
  const { t } = useLang();

  const featured = PROJECTS.slice(0, 3);
  const rest = PROJECTS.slice(3);

  return (
    <section id="projects" className="relative overflow-hidden border-t border-line bg-[#0d0c0c] py-20 md:py-24">
      <div className="relative mx-auto max-w-[1120px] px-5">
        <SectionHeader title={t(PROJECTS_INTRO.label)} subtitle={t(PROJECTS_INTRO.intro)} />

        {/* Featured — alternating rows */}
        <div className="space-y-14 md:space-y-20">
          {featured.map((p, i) => (
            <FeaturedRow key={p.id} project={p} reversed={i % 2 === 1} priority={i === 0} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-14 flex items-center gap-4 md:my-16">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-txt-muted">
            {t({ es: "Más proyectos", en: "More work" })}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        {/* Grid on desktop, horizontal snap-carousel on mobile */}
        <Reveal>
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
            {rest.map((p) => (
              <div
                key={p.id}
                className="w-[78%] shrink-0 snap-start md:w-auto md:shrink"
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Featured row ─────────────────────────────────────────────────── */
function FeaturedRow({
  project,
  reversed,
  priority,
}: {
  project: Project;
  reversed: boolean;
  priority: boolean;
}) {
  const { t } = useLang();
  const link = project.links[0];

  return (
    <Reveal>
      <article className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        {/* Visual */}
        <div className={reversed ? "md:order-2" : ""}>
          <div className="transition-transform duration-500 hover:-translate-y-1">
            <BrowserFrame
              src={project.images[0]}
              alt={t(project.title)}
              url={link ? hostOf(link.url) : undefined}
              fit="contain"
              priority={priority}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>

        {/* Text */}
        <div className={reversed ? "md:order-1" : ""}>
          {project.badge && (
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-copper/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-copper">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {t(project.badge)}
            </span>
          )}

          <h3 className="font-display text-2xl font-bold text-txt-primary sm:text-3xl">
            {t(project.title)}
          </h3>

          <div className="mt-3 space-y-2.5">
            {t(project.description).map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-txt-muted">
                {renderHighlighted(para)}
              </p>
            ))}
          </div>

          {project.note && (
            <p className="mt-3 flex items-start gap-2 rounded-lg border border-line bg-white/[0.02] p-2.5 text-[13px] text-txt-muted">
              <Info size={14} className="mt-0.5 shrink-0 text-copper" />
              <span>{t(project.note)}</span>
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3.5">
            {project.tech.map((slug) => (
              <TechLogo key={slug} slug={slug} variant="icon" size={20} />
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="mt-5 flex flex-col gap-1.5">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 border-b-2 border-copper pb-0.5 text-[13px] font-medium text-txt-primary transition-colors hover:border-gold hover:text-gold"
                >
                  {t(l.label)}
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/* ── Grid card ────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang();
  const link = project.links[0];

  return (
    <article className="group flex h-full flex-col">
      <div className="transition-transform duration-500 group-hover:-translate-y-1">
        <BrowserFrame
          src={project.images[0]}
          alt={t(project.title)}
          url={link ? hostOf(link.url) : undefined}
          fit="cover"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2.5">
          <h3 className="font-display text-lg font-semibold text-txt-primary">{t(project.title)}</h3>
          {project.badge && (
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-copper">
              {t(project.badge)}
            </span>
          )}
        </div>

        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-txt-muted">
          {t(project.description)[0]}
        </p>

        <div className="mt-3 flex flex-1 flex-wrap items-end gap-2.5">
          {project.tech.slice(0, 6).map((slug) => (
            <TechLogo key={slug} slug={slug} variant="icon" size={18} />
          ))}
        </div>

        {link && (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-copper transition-colors hover:text-gold"
          >
            {t(link.label)}
          </a>
        )}
      </div>
    </article>
  );
}
