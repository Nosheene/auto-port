import { experiences, trainings } from "@/lib/profile";

export function Experience() {
  return (
    <section id="parcours" data-testid="experience" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">Parcours</p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight md:text-4xl">
            Le terrain réel : intégrer, recetter, expliquer.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Intégration e-learning, support LMS et recette fonctionnelle. Les trois études de cas
            de la section suivante sont des scénarios fictifs, séparés de ce parcours.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {experiences.map((experience) => (
            <li key={experience.organization} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-mono text-xs text-primary">{experience.period}</p>
              <h3 className="mt-3 font-heading text-xl leading-snug">{experience.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{experience.organization}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                {experience.points.map((point) => (
                  <li key={point} className="border-l border-primary/40 pl-3">
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
          <h3 className="font-heading text-lg">Formations</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            {trainings.map((training) => (
              <li key={training}>{training}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
