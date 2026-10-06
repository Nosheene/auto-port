# Portfolio QA Automation — Nosheene Mohammad

Vitrine d'une pratique d'automatisation des tests : un site Next.js couvert par sa propre suite Playwright, avec des sélecteurs stables et une exécution dans GitHub Actions.

Le parcours professionnel affiché est réel (intégration e-learning, recette, LMS). Les projets TaskChef et Restaurant viennent des dépôts publics de formation. Le badge « Conception ISTQB » désigne des techniques de conception de cas (partitions d'équivalence, valeurs limites, transitions d'état), pas un certificat nominatif.

## Stack

- Next.js (App Router) et React
- TypeScript
- Tailwind CSS et shadcn/ui
- Lucide React
- Playwright
- GitHub Actions

## Pourquoi des `data-testid`

Les tests de bout en bout ne doivent pas casser parce qu'un libellé a été reformulé ou qu'une classe CSS a changé. Chaque élément interactif expose un `data-testid` unique, stable et sémantique :

| Zone | Exemples |
| --- | --- |
| Navigation | `nav-home`, `nav-stack`, `nav-projects`, `nav-contact`, `nav-menu-toggle` |
| Actions | `cta-projects`, `cta-contact`, `cta-linkedin`, `theme-toggle` |
| Projets | `project-card-taskchef`, `project-repo-taskchef`, `project-card-restaurant` |
| Contact | `contact-name`, `contact-email`, `contact-subject`, `contact-message`, `contact-submit` |
| Retours | `contact-success`, `contact-error`, `contact-name-error` |

Le formulaire prépare un vrai e-mail pour mohammadnosheene@gmail.com. Après validation, il ouvre la messagerie de la personne avec le message déjà rédigé (`mailto:`). Un lien Gmail est proposé si aucune application mail n'est installée. Le message part quand la personne confirme l'envoi, et la réponse arrive sur son adresse. Le téléphone est un lien `tel:` (`06 84 47 71 19`). Aucune clé API n'est requise, donc ça fonctionne tel quel sur Vercel.

## Arborescence

```text
app/                  pages et layout (App Router)
components/           Hero, Stack, Projects, Contact, ThemeToggle
components/projects/  rapports de test et d'anomalie
lib/                  données, validation du formulaire
tests/                suite Playwright
.github/workflows/    exécution CI
```

## Lancer le site en local

Prérequis : Node.js 22.

```bash
npm install
npm run dev
```

Le site est servi sur [http://127.0.0.1:43123](http://127.0.0.1:43123). Le mode sombre est le thème par défaut.

Pour vérifier la qualité du code :

```bash
npm run lint
npm run build
```

## Exécuter Playwright

Chromium est installé une fois :

```bash
npx playwright install chromium
npm run test:e2e
```

La commande démarre le site si besoin, puis joue `tests/portfolio.spec.ts` : chargement, bascule de thème, projets réels, validation du formulaire, puis préparation de l'e-mail (Gmail, messagerie, téléphone).

Le rapport HTML est généré dans `playwright-report/`.

```bash
npx playwright show-report
```

## Intégration continue

`.github/workflows/playwright.yml` lance la suite à chaque `push` et `pull_request` vers `main` : installation, build de production, tests Playwright, archive du rapport.

## Contact

Nosheene Mohammad — Ozoir-la-Ferrière  
[mohammadnosheene@gmail.com](mailto:mohammadnosheene@gmail.com)  
[06 84 47 71 19](tel:+33684477119)  
[LinkedIn](https://www.linkedin.com/in/nosheene-mohammad-498980160)
