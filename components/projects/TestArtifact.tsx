import type { ProjectArtifact } from "@/lib/projects";

const statusLabel = {
  passed: "passed",
  failed: "failed",
  skipped: "skipped",
} as const;

const statusClass = {
  passed: "text-pass",
  failed: "text-fail",
  skipped: "text-warn",
} as const;

export function TestArtifact({
  slug,
  artifact,
}: {
  slug: string;
  artifact: ProjectArtifact;
}) {
  if (artifact.kind === "routes") {
    return (
      <div
        data-testid={`project-artifact-${slug}`}
        className="rounded-xl border border-border bg-background p-4"
        aria-label="Routes de l'API"
      >
        <p className="font-mono text-xs text-muted-foreground">API REST · extrait du dépôt</p>
        <ul className="mt-3 space-y-2">
          {artifact.routes.map((route) => (
            <li key={`${route.method}-${route.path}`} className="text-sm">
              <span className="font-mono text-xs text-pass">{route.method}</span>{" "}
              <span className="font-mono text-xs">{route.path}</span>
              <span className="mt-0.5 block text-muted-foreground">{route.detail}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">{artifact.note}</p>
      </div>
    );
  }

  if (artifact.kind === "run") {
    const total = artifact.passed + artifact.failed + artifact.skipped;
    return (
      <div
        data-testid={`project-artifact-${slug}`}
        className="rounded-xl border border-border bg-background p-4"
        aria-label="Rapport d'exécution de tests"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs text-muted-foreground">{artifact.suite}</p>
          <p className="font-mono text-xs text-muted-foreground">{artifact.browser}</p>
        </div>
        <p className="mt-3 font-heading text-2xl tracking-tight">
          {artifact.passed}
          <span className="text-base text-muted-foreground"> / {total} passed</span>
        </p>
        <div
          className="mt-3 flex h-2 overflow-hidden rounded-full bg-muted"
          aria-hidden
        >
          <span
            className="bg-pass"
            style={{ width: `${(artifact.passed / total) * 100}%` }}
          />
          <span
            className="bg-fail"
            style={{ width: `${(artifact.failed / total) * 100}%` }}
          />
          <span
            className="bg-warn"
            style={{ width: `${(artifact.skipped / total) * 100}%` }}
          />
        </div>
        <p className="mt-2 font-mono text-[11px] text-muted-foreground">
          {artifact.failed} failed · {artifact.skipped} skipped · {artifact.duration}
        </p>
        <ul className="mt-4 space-y-1.5">
          {artifact.cases.map((testCase) => (
            <li key={testCase.name} className="flex items-center justify-between gap-3 text-sm">
              <span>{testCase.name}</span>
              <span className={`font-mono text-[11px] uppercase ${statusClass[testCase.status]}`}>
                {statusLabel[testCase.status]} · {testCase.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (artifact.kind === "bug") {
    return (
      <div
        data-testid={`project-artifact-${slug}`}
        className="rounded-xl border border-fail/40 bg-background p-4"
        aria-label="Rapport d'anomalie"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs text-fail">{artifact.id}</p>
          <p className="rounded-full border border-fail/40 px-2 py-0.5 font-mono text-[11px] text-fail uppercase">
            {artifact.severity}
          </p>
        </div>
        <h4 className="mt-3 text-sm leading-snug font-medium">{artifact.title}</h4>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">{artifact.environment}</p>
        <ol className="mt-4 list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
          {artifact.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="font-mono text-[11px] text-muted-foreground uppercase">Attendu</dt>
            <dd>{artifact.expected}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] text-muted-foreground uppercase">Obtenu</dt>
            <dd>{artifact.actual}</dd>
          </div>
        </dl>
        <p className="mt-4 border-t border-border pt-3 text-sm text-pass">{artifact.status}</p>
      </div>
    );
  }

  return (
    <div
      data-testid={`project-artifact-${slug}`}
      className="rounded-xl border border-border bg-background p-4"
      aria-label="Tableau de bord de couverture"
    >
      <p className="font-mono text-xs text-muted-foreground">{artifact.release}</p>
      <p className="mt-2 font-heading text-4xl tracking-tight text-pass">{artifact.headline}</p>
      <p className="text-sm text-muted-foreground">des parcours critiques couverts</p>
      <ul className="mt-4 space-y-3">
        {artifact.areas.map((area) => (
          <li key={area.name}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span>{area.name}</span>
              <span className="font-mono text-xs">{area.value} %</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
              <span className="block h-full bg-pass" style={{ width: `${area.value}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">{artifact.note}</p>
    </div>
  );
}
