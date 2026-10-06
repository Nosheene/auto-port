import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { practiceBadges, profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

const suite = [
  { id: "hero.charge", label: "La page d'accueil s'affiche", state: "passed" },
  { id: "theme.bascule", label: "Le mode sombre et clair bascule", state: "passed" },
  { id: "contact.envoi", label: "Le formulaire de contact envoie un e-mail", state: "passed" },
] as const;

export function Hero() {
  return (
    <section id="hero" data-testid="hero" className="relative overflow-hidden border-b border-border">
      <div className="lab-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:px-8 md:py-24">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
            {profile.role}
          </p>
          <h1 className="mt-4 max-w-xl font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance md:text-6xl">
            La recette manuelle ne scale pas. L&apos;automatisation, si.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Je suis {profile.name.split(" ")[0]}, développeuse full-stack avec une pratique
            concrète de la recette, des tests d&apos;API et de l&apos;analyse d&apos;anomalies. Je
            conçois des tests qui sécurisent les mises en production.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Repères de pratique">
            {practiceBadges.map((badge) => (
              <li key={badge.id}>
                <span
                  data-testid={badge.testId}
                  className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium"
                  title={
                    badge.id === "istqb"
                      ? "Techniques de conception du syllabus ISTQB : partitions, valeurs limites, transitions. Ce n'est pas un certificat nominatif."
                      : undefined
                  }
                >
                  {badge.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground">
            « Conception ISTQB » désigne la méthode de cas (partitions, valeurs limites,
            transitions d&apos;état), pas une certification nominative. Les diplômes sont dans le
            parcours.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projets"
              data-testid="cta-projects"
              className={cn(buttonVariants({ size: "lg" }), "h-11 w-full px-5 sm:w-auto")}
            >
              Voir les projets
            </a>
            <a
              href="#contact"
              data-testid="cta-contact"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 w-full px-5 sm:w-auto")}
            >
              Écrire un message
            </a>
            <a
              href={profile.linkedin}
              data-testid="cta-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg", variant: "ghost" }), "h-11 px-4")}
            >
              LinkedIn
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>

          <p className="mt-6 font-mono text-xs text-muted-foreground">
            {profile.location} · {profile.region} · {profile.english}
          </p>
        </div>

        <aside
          data-testid="hero-suite"
          aria-label="Extrait de la suite Playwright de ce portfolio"
          className="rounded-2xl border border-border bg-card/90 p-4 shadow-sm md:p-5"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
            <p className="font-mono text-xs text-muted-foreground">tests/portfolio.spec.ts</p>
            <p className="font-mono text-xs text-pass">3 passed</p>
          </div>
          <ol className="mt-3 space-y-2">
            {suite.map((check) => (
              <li
                key={check.id}
                className="flex items-start justify-between gap-3 rounded-lg bg-background/70 px-3 py-2.5"
              >
                <span>
                  <span className="block font-mono text-[11px] text-muted-foreground">{check.id}</span>
                  <span className="mt-0.5 block text-sm">{check.label}</span>
                </span>
                <span className="mt-0.5 font-mono text-[11px] tracking-wide text-pass uppercase">
                  {check.state}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            La même suite s&apos;exécute en local et dans GitHub Actions, à chaque push sur la
            branche principale.
          </p>
        </aside>
      </div>
    </section>
  );
}
