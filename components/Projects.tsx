import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { TestArtifact } from "@/components/projects/TestArtifact";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="projets" data-testid="projects" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">Projets</p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight md:text-4xl">
            Scrum Flow IA, Relève, TaskChef et Restaurant, 4 projets qui mettent en œuvre mes
            compétences front et back.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Chaque carte présente l’application et les technologies. Scrum Flow IA et Relève se
            regardent sur demande.
          </p>
        </div>

        <div data-testid="projects-list" className="mt-8 grid gap-5">
            {projects.map((project) => (
              <article
                key={project.slug}
                data-testid={`project-card-${project.slug}`}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {project.image ? (
                  <figure
                    data-testid={`project-image-${project.slug}`}
                    className="border-b border-border bg-muted/30"
                  >
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      className="h-auto w-full"
                      sizes="(max-width: 768px) 100vw, 72rem"
                    />
                  </figure>
                ) : null}
                <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] md:p-6">
                <div>
                  <p className="font-mono text-xs text-primary">
                    Projet {project.index} · {project.sourceLabel ?? "dépôt réel"}
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
                  {project.tools.length > 0 ? (
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
                  ) : null}
                  {project.repoUrl || project.demoUrl || project.demoCta ? (
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                      {project.demoCta ? (
                        <a
                          href={project.demoCta.href}
                          data-testid={`project-demo-${project.slug}`}
                          className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {project.demoCta.label}
                        </a>
                      ) : null}
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
                {project.artifact ? (
                  <TestArtifact slug={project.slug} artifact={project.artifact} />
                ) : project.tools.length > 0 ? (
                  <div
                    data-testid={`project-aside-${project.slug}`}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <p className="font-mono text-xs text-muted-foreground">Technologies</p>
                    <ul className="mt-3 space-y-2 text-sm">
                      {project.tools.map((tool) => (
                        <li key={tool} className="border-l border-primary/40 pl-3">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div
                    data-testid={`project-aside-${project.slug}`}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <p className="font-mono text-xs text-muted-foreground">Démo</p>
                    <p className="mt-3 text-sm leading-relaxed">
                      La démonstration se fait sur demande, par message.
                    </p>
                  </div>
                )}
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
