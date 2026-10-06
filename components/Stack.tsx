import { adjacentTools, stackCategories } from "@/lib/stack";

export function Stack() {
  return (
    <section id="stack" data-testid="stack" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">Stack</p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight md:text-4xl">
            Quatre familles, un seul objectif : un signal de qualité lisible.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Interface, intégration continue, gestion de test et API. C&apos;est la stack avec
            laquelle je construis et je recette une application.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {stackCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <article
                key={category.id}
                data-testid={category.testId}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <CategoryIcon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl">{category.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {category.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <li key={item.name} className="rounded-xl bg-background/70 p-3">
                        <p className="flex items-center gap-2 text-sm font-medium">
                          <ItemIcon className="size-4 text-primary" aria-hidden />
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {item.detail}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Aussi sur le bureau : {adjacentTools.join(" · ")}.
        </p>
      </div>
    </section>
  );
}
