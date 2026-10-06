import type { RoutesArtifact } from "@/lib/projects";

export function TestArtifact({
  slug,
  artifact,
}: {
  slug: string;
  artifact: RoutesArtifact;
}) {
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
