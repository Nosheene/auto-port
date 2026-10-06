"use client";

import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import { TestArtifact } from "@/components/projects/TestArtifact";
import { filterProjects, projectFilters, type ProjectFilter } from "@/lib/projects";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const visible = useMemo(() => filterProjects(filter), [filter]);

  return (
    <section id="projets" data-testid="projects" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
            Études de cas
          </p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight md:text-4xl">
            TaskChef et Restaurant, deux projets réels, puis trois contextes fictifs.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            TaskChef et Restaurant viennent des dépôts de formation. Les trois études suivantes
            restent des scénarios anonymisés : secteurs, outils et chiffres y sont fictifs.
          </p>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrer les études de cas"
        >
          {projectFilters.map((item) => {
            const selected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-testid={item.testId}
                aria-pressed={selected}
                onClick={() => setFilter(item.id)}
                className={`h-9 rounded-full border px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} étude{visible.length > 1 ? "s" : ""} affichée
          {visible.length > 1 ? "s" : ""}.
        </p>

        {visible.length === 0 ? (
          <p data-testid="projects-empty" className="mt-8 text-sm text-muted-foreground">
            Aucune étude ne correspond à ce filtre.
          </p>
        ) : (
          <div data-testid="projects-list" className="mt-8 grid gap-5">
            {visible.map((project) => (
              <article
                key={project.slug}
                data-testid={`project-card-${project.slug}`}
                className="grid gap-6 rounded-2xl border border-border bg-card p-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] md:p-6"
              >
                <div>
                  <p className="font-mono text-xs text-primary">
                    {project.fictional
                      ? `Étude ${project.index} · scénario fictif`
                      : `Projet ${project.index} · dépôt réel`}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl tracking-tight md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.sector}</p>
                  <p className="mt-4 text-sm leading-relaxed">{project.summary}</p>
                  <h4 className="mt-5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                    Contexte
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {project.context}
                  </p>
                  <h4 className="mt-4 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                    Démarche
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {project.approach}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Outils">
                    {project.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px]"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                  {project.repoUrl || project.demoUrl ? (
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          data-testid={`project-repo-${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                        >
                          Code sur GitHub
                          <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                      ) : null}
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          data-testid={`project-demo-${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                        >
                          Site en ligne
                          <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                  <dl className="mt-5 grid grid-cols-3 gap-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="font-heading text-xl tracking-tight text-pass md:text-2xl">
                          {metric.value}
                        </dt>
                        <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                          {metric.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <TestArtifact slug={project.slug} artifact={project.artifact} />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
